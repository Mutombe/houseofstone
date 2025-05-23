from datetime import timedelta, timezone
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django.db.models import Avg, Count
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import AdminActionLogSerializer, BlogPostSerializer, PropertyAlertSerializer, UserSerializer, ProfileSerializer
from .models import BlogPost, Profile, PropertyAlert, PropertyShare
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from rest_framework import viewsets
from .models import Property, PropertyImage, SavedSearch, FavoriteProperty, Neighborhood, Inquiry, PropertyInteraction, AdminActionLog
from django.db.models import Q, F
from django.db.models.functions import TruncHour
from django.db.models import CharField, Value, Case, When
from .serializers import PropertySerializer, NeighborhoodSerializer, SavedSearchSerializer, FavoritePropertySerializer, InquirySerializer
from django.core.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters
from .models import Agent
from .serializers import AgentSerializer

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
    permission_classes = [AllowAny]
    queryset = Property.objects.prefetch_related('property_agents__agent')
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
    permission_classes = [AllowAny]

    def post(self, request, pk):
        property = get_object_or_404(Property, pk=pk)
        expiration = timezone.now() + timedelta(days=7)
        
        share = PropertyShare.objects.create(
            property=property,
            user=request.user,
            expires_at=expiration
        )
        
        return Response({
            'share_link': f"{settings.FRONTEND_URL}/properties/{property.id}/"
        })

class PropertyShareRedirect(APIView):
    def get(self, request, token):
        share = get_object_or_404(PropertyShare, share_token=token)
        if share.expires_at < timezone.now():
            return Response({'error': 'Link expired'}, status=410)
            
        serializer = PropertySerializer(share.property)
        return Response(serializer.data)
    
class PropertyRecommendationViews(APIView):
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

class PropertyRecommendationView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        user = request.user if request.user.is_authenticated else None
        session_key = request.session.session_key
        
        # Get base queryset
        base_queryset = Property.objects.filter(is_published=True)
        
        # Strategy 1: Personalized recommendations for logged-in users
        if user and user.is_authenticated:
            recommendations = self.get_personalized_recommendations(user)
            
        # Strategy 2: Session-based recommendations for anonymous users
        elif session_key:
            recommendations = self.get_session_based_recommendations(session_key)
            
        # Strategy 3: Fallback global recommendations
        else:
            recommendations = self.get_global_recommendations()

        serializer = PropertySerializer(recommendations, many=True)
        return Response(serializer.data)

    def get_personalized_recommendations(self, user):
        # Collaborative filtering based on similar users
        similar_users = self.find_similar_users(user)
        
        # Content-based filtering based on user preferences
        user_preferences = self.extract_user_preferences(user)
        
        return Property.objects.filter(
            Q(propertyinteraction__user__in=similar_users) |
            Q(**user_preferences)
        ).distinct().order_by('-created_at')[:10]

    def get_session_based_recommendations(self, session_key):
        # Get recent interactions from session
        recent_properties = PropertyInteraction.objects.filter(
            session_key=session_key
        ).values_list('property', flat=True)[:5]
        
        if recent_properties:
            # Find properties with similar features
            return Property.objects.filter(
                Q(property_type__in=Property.objects.filter(
                    id__in=recent_properties).values('property_type')) |
                Q(location__in=Property.objects.filter(
                    id__in=recent_properties).values('location'))
            ).exclude(id__in=recent_properties)[:10]
        
        return self.get_global_recommendations()

    def get_global_recommendations(self):
        # Combine popularity and freshness
        return Property.objects.annotate(
            popularity_score=Count('propertyinteraction') + F('price')/1000
        ).order_by('-popularity_score', '-created_at')[:10]

    def find_similar_users(self, user):
        # Find users with similar interaction patterns
        user_properties = user.propertyinteraction_set.values_list('property', flat=True)
        return User.objects.annotate(
            common_interactions=Count(
                'propertyinteraction',
                filter=Q(propertyinteraction__property__in=user_properties)
        ).order_by('-common_interactions')[:5])

    def extract_user_preferences(self, user):
        # Extract preferences from user's historical data
        preferences = {
            'price__lte': user.propertyinteraction_set.aggregate(
                avg_price=Avg('property__price'))['avg_price'] * 1.2,
            'property_type__in': user.propertyinteraction_set.values_list(
                'property__property_type', flat=True).distinct()
        }
        return {k: v for k, v in preferences.items() if v}

class AdminDashboardView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        from django.db.models import Count, DateField
        from django.db.models.functions import Trunc
        
        # View statistics
        view_stats = PropertyInteraction.objects.filter(
            interaction_type='view'
        ).annotate(
            date=Trunc('timestamp', 'day', output_field=DateField())
        ).values('date').annotate(
            views=Count('id')
        ).order_by('-date')[:7]

        popular_properties = Property.objects.annotate(
            view_count=Count('propertyinteraction')
        ).order_by('-view_count')[:5]
        stats = {
            'total_views': PropertyInteraction.objects.filter(interaction_type='view').count(),
            'views_last_7_days': list(view_stats),
            'popular_properties': [
                {
                    'id': p.id,
                    'title': p.title,
                    'views': p.view_count
                } for p in popular_properties
            ],
            # Add this to existing stats
            'views_by_type': PropertyInteraction.objects.values('interaction_type')
                              .annotate(count=Count('id')),
            'total_users': User.objects.count(),
            'active_listings': Property.objects.filter(is_published=True).count(),
            'total_inquiries': Inquiry.objects.count(),
            'popular_locations': Property.objects.values('location')
                             .annotate(count=Count('id'))
                             .order_by('-count')[:5],
            'active_admins': User.objects.filter(is_staff=True).count(),
            'recent_actions': AdminActionLog.objects.filter(admin=request.user)
                              .order_by('-timestamp')[:10],
            'user_growth': User.objects.extra({
                'date': "date(date_joined)"
            }).values('date').annotate(count=Count('id')).order_by('-date')[:7],
            'admin_activity': AdminActionLog.objects.values('action_type')
                               .annotate(total=Count('id'))
                               .order_by('-total')
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

class PropertyStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, pk):
        property = get_object_or_404(Property, pk=pk)
        
        # Verify ownership if not admin
        if not request.user.is_staff and property.agent != request.user:
            return Response({"detail": "Not authorized"}, status=403)

        stats = {
            'total_views': PropertyInteraction.objects.filter(
                property=property,
                interaction_type='view'
            ).count(),
            'view_timeline': PropertyInteraction.objects.filter(property=property)
                              .annotate(hour=TruncHour('timestamp'))
                              .values('hour')
                              .annotate(count=Count('id'))
                              .order_by('-hour')[:24],
            'user_types': PropertyInteraction.objects.filter(property=property)
                           .annotate(
                               is_authenticated=Case(
                                   When(user__isnull=False, then=Value('Registered')),
                                   default=Value('Anonymous'),
                                   output_field=CharField()
                               )
                           )
                           .values('is_authenticated')
                           .annotate(count=Count('id'))
        }
        
        return Response(stats)

class AdminUserManagementViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active', 'is_staff', 'is_superuser']
    search_fields = ['username', 'email', 'firstname', 'lastname']
    ordering_fields = ['date_joined', 'last_login']
    pagination_class = PageNumberPagination

    def get_queryset(self):
        return User.objects.all().order_by('-date_joined')

    @action(detail=True, methods=['post'])
    def reset_password(self, request, pk=None):
        user = self.get_object()
        new_password = request.data.get('new_password')
        if not new_password:
            return Response({'error': 'New password required'}, status=400)
        
        user.password = make_password(new_password)
        user.save()
        
        AdminActionLog.objects.create(
            admin=request.user,
            action_type='user_modified',
            target_user=user,
            details={'action': 'password_reset'},
            ip_address=request.META.get('REMOTE_ADDR')
        )
        return Response({'status': 'password reset'})

    @action(detail=True, methods=['post'])
    def modify_roles(self, request, pk=None):
        user = self.get_object()
        is_staff = request.data.get('is_staff')
        is_superuser = request.data.get('is_superuser')
        
        if is_staff is not None:
            user.is_staff = is_staff
        if is_superuser is not None:
            user.is_superuser = is_superuser
        user.save()
        
        AdminActionLog.objects.create(
            admin=request.user,
            action_type='permission_changed',
            target_user=user,
            details={'new_roles': {'is_staff': user.is_staff, 'is_superuser': user.is_superuser}},
            ip_address=request.META.get('REMOTE_ADDR')
        )
        return Response(UserSerializer(user).data)
    
class AdminActionLogViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = AdminActionLogSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ['action_type', 'admin', 'target_user']
    search_fields = ['admin__username', 'target_user__username', 'details']
    ordering_fields = ['timestamp']
    
    def get_queryset(self):
        queryset = AdminActionLog.objects.all().order_by('-timestamp')
        
        # For non-superusers, only show their own actions
        if not self.request.user.is_superuser:
            queryset = queryset.filter(admin=self.request.user)
            
        return queryset.select_related('admin', 'target_user')

    @action(detail=False, methods=['get'])
    def recent_activity(self, request):
        logs = self.get_queryset().filter(
            timestamp__gte=timezone.now() - timedelta(days=1)
        )[:50]
        serializer = self.get_serializer(logs, many=True)
        return Response(serializer.data)
    
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer
    permission_classes = [IsAdminUser]
    filterset_fields = ['is_active', 'is_staff']
    search_fields = ['email', 'first_name', 'last_name']

class AgentViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing agents with full CRUD operations
    """
    queryset = Agent.objects.all()
    serializer_class = AgentSerializer
    permission_classes = [AllowAny]  # Adjust permissions as needed
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    
    # Filter fields
    filterset_fields = {
        'position': ['exact'],
        'permissions': ['exact'],
        'is_active': ['exact'],
        'branch': ['exact', 'icontains'],
        'agency_name': ['exact', 'icontains']
    }
    
    # Search fields
    search_fields = ['first_name', 'surname', 'email', 'cell_number', 'agency_name', 'branch']
    
    # Ordering fields
    ordering_fields = ['first_name', 'surname', 'created_at', 'updated_at']
    ordering = ['first_name', 'surname']
    
    def get_queryset(self):
        """
        Override to filter by active status if needed
        """
        queryset = Agent.objects.all()
        
        # Filter by active status if specified in query params
        is_active = self.request.query_params.get('is_active', None)
        if is_active is not None:
            queryset = queryset.filter(is_active=is_active.lower() == 'true')
            
        return queryset
    
    def create(self, request, *args, **kwargs):
        """
        Create a new agent
        """
        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            agent = serializer.save()
            return Response(
                AgentSerializer(agent).data, 
                status=status.HTTP_201_CREATED
            )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def update(self, request, *args, **kwargs):
        """
        Update an existing agent
        """
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        
        if serializer.is_valid():
            agent = serializer.save()
            return Response(AgentSerializer(agent).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, *args, **kwargs):
        """
        Delete an agent (soft delete by setting is_active to False)
        """
        instance = self.get_object()
        
        # Soft delete - set is_active to False instead of actual deletion
        instance.is_active = False
        instance.save()
        
        return Response(
            {'message': 'Agent deactivated successfully'}, 
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['post'])
    def activate(self, request, pk=None):
        """
        Activate a deactivated agent
        """
        agent = self.get_object()
        agent.is_active = True
        agent.save()
        return Response(
            {'message': 'Agent activated successfully'}, 
            status=status.HTTP_200_OK
        )
    
    @action(detail=True, methods=['post'])
    def deactivate(self, request, pk=None):
        """
        Deactivate an active agent
        """
        agent = self.get_object()
        agent.is_active = False
        agent.save()
        return Response(
            {'message': 'Agent deactivated successfully'}, 
            status=status.HTTP_200_OK
        )
    
    @action(detail=False, methods=['get'])
    def active(self, request):
        """
        Get only active agents
        """
        active_agents = Agent.objects.filter(is_active=True)
        serializer = self.get_serializer(active_agents, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def inactive(self, request):
        """
        Get only inactive agents
        """
        inactive_agents = Agent.objects.filter(is_active=False)
        serializer = self.get_serializer(inactive_agents, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_position(self, request):
        """
        Get agents by position
        """
        position = request.query_params.get('position', None)
        if not position:
            return Response(
                {'error': 'Position parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        agents = Agent.objects.filter(position=position, is_active=True)
        serializer = self.get_serializer(agents, many=True)
        return Response(serializer.data)
    
    @action(detail=False, methods=['get'])
    def by_branch(self, request):
        """
        Get agents by branch
        """
        branch = request.query_params.get('branch', None)
        if not branch:
            return Response(
                {'error': 'Branch parameter is required'}, 
                status=status.HTTP_400_BAD_REQUEST
            )
        
        agents = Agent.objects.filter(branch__icontains=branch, is_active=True)
        serializer = self.get_serializer(agents, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def properties(self, request, pk=None):
        """
        Get all properties assigned to this agent
        """
        agent = self.get_object()
        properties = agent.agent_properties.all()
        
        # Import PropertySerializer here to avoid circular imports
        from .serializers import PropertySerializer
        serializer = PropertySerializer(
            [pa.property for pa in properties], 
            many=True, 
            context={'request': request}
        )
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        """
        Get agent statistics
        """
        agent = self.get_object()
        
        # Calculate statistics
        total_properties = agent.agent_properties.count()
        primary_properties = agent.agent_properties.filter(is_primary=True).count()
        
        # Get property statuses
        available_properties = agent.agent_properties.filter(
            property__status='available'
        ).count()
        sold_properties = agent.agent_properties.filter(
            property__status='sold'
        ).count()
        pending_properties = agent.agent_properties.filter(
            property__status='pending'
        ).count()
        
        stats = {
            'total_properties': total_properties,
            'primary_properties': primary_properties,
            'available_properties': available_properties,
            'sold_properties': sold_properties,
            'pending_properties': pending_properties,
        }
        
        return Response(stats)