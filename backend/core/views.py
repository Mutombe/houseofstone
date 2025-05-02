from datetime import timedelta, timezone
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django.db.models import Avg, Count
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import BlogPostSerializer, PropertyAlertSerializer, UserSerializer, ProfileSerializer
from .models import BlogPost, Profile, PropertyAlert, PropertyShare
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from rest_framework import viewsets
from .models import Property, PropertyImage, SavedSearch, FavoriteProperty, Neighborhood, Inquiry
from .serializers import PropertySerializer, NeighborhoodSerializer, SavedSearchSerializer, FavoritePropertySerializer, InquirySerializer
from django.core.exceptions import ValidationError
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    user = serializer.save(is_active=True)
                    # Let the signal handle profile creation
                    
                    refresh = RefreshToken.for_user(user)
                    return Response({
                        "detail": "Registration successful",
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                        "user": UserSerializer(user).data
                    }, status=status.HTTP_201_CREATED)
            except Exception as e:
                return Response({"detail": str(e)}, status=status.HTTP_400_BAD_REQUEST)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)
        user = self.user
        user_serializer = UserSerializer(user)
        
        data['user'] = user_serializer.data
        
        return data

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        user = request.user
        profile, created = Profile.objects.get_or_create(user=user)
        
        serializer = ProfileSerializer(profile)
        response_data = serializer.data
        response_data['is_patient'] = hasattr(user, 'patient')
        response_data['is_doctor'] = hasattr(user, 'doctor')
        
        return Response(response_data)
    
    def put(self, request):
        user = request.user
        profile = user.profile
        
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.filter(is_published=True)
    serializer_class = PropertySerializer
    filterset_fields = {
        'price': ['lte', 'gte'],
        'property_type': ['exact'],
        'location': ['icontains']
    }

    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)

class NeighborhoodViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Neighborhood.objects.all()
    serializer_class = NeighborhoodSerializer

class SavedSearchViewSet(viewsets.ModelViewSet):
    serializer_class = SavedSearchSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return SavedSearch.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class FavoritePropertyViewSet(viewsets.ModelViewSet):
    serializer_class = FavoritePropertySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return FavoriteProperty.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class InquiryViewSet(viewsets.ModelViewSet):
    serializer_class = InquirySerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Inquiry.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class MortgageCalculatorView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        loan_amount = request.data.get('loan_amount')
        interest_rate = request.data.get('interest_rate')
        loan_term = request.data.get('loan_term')  # In years
        
        # Validate inputs
        try:
            monthly_rate = (float(interest_rate) / 100) / 12
            payments = int(loan_term) * 12
            monthly_payment = (float(loan_amount) * monthly_rate) / (1 - (1 + monthly_rate) ** -payments)
            return Response({'payment': round(monthly_payment, 2)})
        except Exception as e:
            return Response({'error': str(e)}, status=400)
        
class BlogPostViewSet(viewsets.ModelViewSet):
    queryset = BlogPost.objects.all()
    serializer_class = BlogPostSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)

class PropertyAlertViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyAlertSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return PropertyAlert.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PropertyShareView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, pk):
        property = get_object_or_404(Property, pk=pk)
        expiration = timezone.now() + timedelta(days=7)
        
        share = PropertyShare.objects.create(
            property=property,
            user=request.user,
            expires_at=expiration
        )
        
        return Response({
            'share_link': f"{settings.FRONTEND_URL}/property/{property.id}/share/{share.share_token}/"
        })

class PropertyShareRedirect(APIView):
    def get(self, request, token):
        share = get_object_or_404(PropertyShare, share_token=token)
        if share.expires_at < timezone.now():
            return Response({'error': 'Link expired'}, status=410)
            
        serializer = PropertySerializer(share.property)
        return Response(serializer.data)
    
class PropertyRecommendationView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get user's favorite properties
        favorites = FavoriteProperty.objects.filter(user=request.user)
        
        # Simple content-based filtering
        recommendations = Property.objects.none()
        
        if favorites.exists():
            # Get common features from favorites
            avg_price = favorites.aggregate(avg_price=Avg('property__price'))['avg_price']
            common_type = favorites.values('property__property_type').annotate(count=Count('id')).order_by('-count').first()
            
            recommendations = Property.objects.filter(
                property_type=common_type['property_type'],
                price__range=(avg_price * 0.7, avg_price * 1.3)
            ).exclude(favoriteproperty__user=request.user)
        
        serializer = PropertySerializer(recommendations[:10], many=True)
        return Response(serializer.data)
    
class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        stats = {
            'total_users': User.objects.count(),
            'active_listings': Property.objects.filter(is_published=True).count(),
            'total_inquiries': Inquiry.objects.count(),
            'popular_locations': Property.objects.values('location')
                             .annotate(count=Count('id'))
                             .order_by('-count')[:5]
        }
        return Response(stats)
    
class UserDashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        stats = {
            'favorite_properties': FavoriteProperty.objects.filter(user=user).count(),
            'active_alerts': PropertyAlert.objects.filter(user=user, is_active=True).count(),
            'pending_inquiries': Inquiry.objects.filter(user=user).count(),
            'recent_views': [...]  # Implement view tracking if needed
        }
        return Response(stats)