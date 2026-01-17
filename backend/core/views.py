from datetime import timedelta, timezone
from django.conf import settings
from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.permissions import AllowAny, IsAuthenticatedOrReadOnly
from django.db.models import Avg, Count, Sum, Min, Max
from django.utils import timezone
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from django.contrib.auth.models import User
from .serializers import AdminActionLogSerializer, BlogPostSerializer, PropertyAlertSerializer, PropertyDetailSerializer, PropertyListSerializer, UserSerializer, ProfileSerializer, PropertySerializer, PropertyWithStatsSerializer, LeadSourceSerializer, PropertyLeadSerializer, PropertyStatSerializer, NotificationSerializer
from .models import BlogPost, Profile, PropertyAlert, PropertyShare
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework_simplejwt.tokens import RefreshToken
from django.db import transaction
from rest_framework import viewsets
from .models import Property, PropertyImage, SavedSearch, FavoriteProperty, Neighborhood, Inquiry, PropertyInteraction, AdminActionLog, Notification
from django.db.models import Q, F
from django.db.models.functions import TruncHour
from django.db.models import CharField, Value, Case, When
from .serializers import PropertySerializer, NeighborhoodSerializer, SavedSearchSerializer, FavoritePropertySerializer, InquirySerializer
from django.core.exceptions import ValidationError
from rest_framework.pagination import PageNumberPagination
from rest_framework import filters
from django_filters.rest_framework import DjangoFilterBackend
from .models import PropertyLead, LeadSource, PropertyStat
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import filters
from .models import Agent
from .serializers import AgentSerializer
from datetime import datetime
import logging
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework import viewsets
from rest_framework import generics


logger = logging.getLogger(__name__)
class RegisterView(APIView):
    permission_classes = [AllowAny]
    
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            try:
                with transaction.atomic():
                    # Create user
                    user = serializer.save(is_active=True)
                    
                    # Check for matching agent
                    email = serializer.validated_data['email']
                    try:
                        agent = Agent.objects.get(email=email)
                        agent.user = user
                        agent.save()
                        print(f"Linked existing agent {email} to new user")
                    except Agent.DoesNotExist:
                        # No agent found, proceed normally
                        print(f"No existing agent found for {email}, user created without agent")
                        pass
                    
                    # Generate tokens
                    refresh = RefreshToken.for_user(user)
                    user_data = UserSerializer(user).data
                    
                    # Add is_agent flag to response
                    user_data['is_agent'] = hasattr(user, 'agent_profile')
                    
                    return Response({
                        "detail": "Registration successful",
                        "access": str(refresh.access_token),
                        "refresh": str(refresh),
                        "user": user_data
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
    
from rest_framework.pagination import PageNumberPagination

class PropertyPagination(PageNumberPagination):
    page_size = 12
    page_size_query_param = 'page_size'
    max_page_size = 100

class PropertyViewSet(viewsets.ModelViewSet):
    serializer_class = PropertySerializer
    pagination_class = PropertyPagination  # ADD THIS LINE
    
    filterset_fields = {
        'price': ['lte', 'gte'],
        'property_type': ['exact'],
        'location': ['icontains'],
        'status': ['exact'],
        'category': ['exact'],
        'beds': ['lte', 'gte'],
        'baths': ['lte', 'gte'],
    }
    
    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    def get_queryset(self):
        """Optimized queryset with selective prefetching based on action"""
        base_queryset = Property.objects.filter(is_published=True)
        
        if self.action in ['retrieve', 'stats']:
            return base_queryset.select_related('user').prefetch_related(
                'images',
                'features',
                'property_agents__agent',
                'stats',
                'leads__source'
            )
        elif self.action == 'list':
            return base_queryset.select_related('user').prefetch_related('images')
        
        return base_queryset

    def list(self, request, *args, **kwargs):
        """Override list to add custom response metadata"""
        queryset = self.filter_queryset(self.get_queryset())
        
        # Apply additional filters
        search_term = request.query_params.get('search')
        if search_term:
            queryset = queryset.filter(
                Q(title__icontains=search_term) |
                Q(location__icontains=search_term) |
                Q(description__icontains=search_term)
            )
        
        # Sorting
        ordering = request.query_params.get('ordering', '-created_at')
        queryset = queryset.order_by(ordering)
        
        # Paginate
        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            response = self.get_paginated_response(serializer.data)
            
            # Add custom metadata
            response.data['current_page'] = int(request.query_params.get('page', 1))
            response.data['page_size'] = self.paginator.get_page_size(request)
            
            return response
        
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

class AdminPropertyPagination(PageNumberPagination):
    page_size = 10
    page_size_query_param = 'page_size'
    max_page_size = 100

    def get_paginated_response(self, data):
        return Response({
            'count': self.page.paginator.count,
            'total_pages': self.page.paginator.num_pages,
            'current_page': self.page.number,
            'page_size': self.get_page_size(self.request),
            'next': self.get_next_link(),
            'previous': self.get_previous_link(),
            'results': data
        })

class AdminPropertyViewSet(viewsets.ModelViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]  # Changed this
    serializer_class = PropertySerializer
    pagination_class = AdminPropertyPagination  # Enable pagination

    filterset_fields = {
        'price': ['lte', 'gte'],
        'property_type': ['exact'],
        'location': ['icontains'],
        'status': ['exact'],
        'category': ['exact'],
        'beds': ['lte', 'gte'],
        'baths': ['lte', 'gte'],
    }
    def get_permissions(self):
        """
        Instantiate and return the list of permissions that this view requires.
        """
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated()]
        return [AllowAny()]
    
    
    def get_queryset(self):
        """Optimized queryset with selective prefetching based on action"""
        base_queryset = Property.objects.filter(is_published=True)
        
        if self.action in ['retrieve', 'stats']:
            # Full prefetch for detail views and stats
            return base_queryset.select_related('user').prefetch_related(
                'images',
                'features',
                'property_agents__agent',
                'stats',
                'leads__source'
            )
        elif self.action == 'list':
            # Minimal prefetch for list views
            return base_queryset.select_related('user').prefetch_related('images')
        
        return base_queryset

    def get_serializer_class(self):
        """Use different serializers for different actions"""
        if self.action == 'list':
            return PropertySerializer  # Lighter serializer for list view
        elif self.action == 'retrieve':
            return PropertyDetailSerializer  # Full serializer for detail view
        return PropertySerializer

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        """Override create to return detailed validation errors"""
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def list(self, request, *args, **kwargs):
        logger.info(f"Properties list requested with params: {request.query_params}")

        # For authenticated admin/staff users, show ALL properties (including unpublished)
        # For regular users or unauthenticated, only show published
        if request.user.is_authenticated and (request.user.is_staff or request.user.is_superuser):
            base_queryset = Property.objects.all().select_related('user').prefetch_related('images')
            logger.info("Admin user - showing all properties including unpublished")
        else:
            base_queryset = Property.objects.filter(is_published=True).select_related('user').prefetch_related('images')
    
        # Apply filters from query parameters
        filters = {}
    
        # Price range filter
        price_min = request.query_params.get('price_min')
        price_max = request.query_params.get('price_max')
        if price_min:
            filters['price__gte'] = price_min
        if price_max:
            filters['price__lte'] = price_max
    
        # Property type filter
        property_type = request.query_params.get('property_type')
        if property_type and property_type != 'all':
            filters['property_type'] = property_type
    
        # Category filter
        category = request.query_params.get('category')
        if category and category != 'all':
            filters['category'] = category
    
        # Status filter
        status = request.query_params.get('status')
        if status and status != 'all':
            filters['status'] = status
    
        # Bedrooms filter
        beds_min = request.query_params.get('beds_min')
        if beds_min:
            filters['beds__gte'] = beds_min
    
        # Bathrooms filter
        baths_min = request.query_params.get('baths_min')
        if baths_min:
            filters['baths__gte'] = baths_min
    
        # Apply filters to queryset
        if filters:
            base_queryset = base_queryset.filter(**filters)
    
        # Handle search parameter
        search_term = request.query_params.get('search')
        if search_term:
            base_queryset = base_queryset.filter(
                Q(title__icontains=search_term) |
                Q(location__icontains=search_term) |
                Q(description__icontains=search_term)
            )
        
        ordering_param = request.query_params.get('ordering', '-created_at')
    
        # Map frontend sorting options to actual model fields
        ordering_map = {
            'newest': '-created_at',
            'price-low': 'price',
            'price-high': '-price',
            'beds': '-beds',
            'sqft': '-sqft'
        }
    
    
        # Apply ordering
        ordering = ordering_map.get(ordering_param, ordering_param)
        valid_fields = [f.name for f in Property._meta.get_fields()]
        valid_fields += ['-' + f for f in valid_fields]  
        if ordering in valid_fields:
            base_queryset = base_queryset.order_by(ordering)
        else:
        # Fall back to default ordering if invalid
            base_queryset = base_queryset.order_by('-created_at')
        logger.info(f"Final queryset has {base_queryset.count()} properties after filtering and ordering")

        # Use pagination
        page = self.paginate_queryset(base_queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            logger.info(f"Returning paginated response with {len(serializer.data)} properties")
            return self.get_paginated_response(serializer.data)

        # Fallback for non-paginated (shouldn't happen with pagination_class set)
        serializer = self.get_serializer(base_queryset, many=True)
        logger.info(f"Returning {len(serializer.data)} properties")
        return Response(serializer.data)

    @action(detail=True, methods=['get'])
    def stats(self, request, pk=None):
        property = self.get_object()
        
        # Use aggregation and annotation for better performance
        from django.db.models import Sum, Count, F
        
        # Get stats in a single query with annotations
        stats_data = property.stats.aggregate(
            total_views=Sum('views'),
            avg_daily_views=Avg('views')
        )
        
        # Last 7 days stats with single query
        date_7_days_ago = timezone.now().date() - timedelta(days=7)
        recent_stats = property.stats.filter(
            date__gte=date_7_days_ago
        ).values('date', 'views').order_by('date')
        
        # Lead sources breakdown with single query
        lead_sources = property.leads.values('source__name').annotate(
            count=Count('id')
        ).order_by('-count')
        
        # Total leads count
        total_leads = property.leads.count()
        
        return Response({
            'total_views': stats_data['total_views'] or 0,
            'avg_daily_views': stats_data['avg_daily_views'] or 0,
            'total_leads': total_leads,
            'recent_stats': list(recent_stats),
            'lead_sources': list(lead_sources)
        })

class PublicPropertyListView(AdminPropertyViewSet):
    permission_classes = [AllowAny]
    
    def get_queryset(self):
        return Property.objects.filter(is_published=True).select_related('user').prefetch_related('images')

class PublicPropertyDetailView(generics.RetrieveAPIView):
    """Public endpoint for property details - no authentication required"""
    permission_classes = [AllowAny]
    serializer_class = PropertyDetailSerializer
    lookup_field = 'pk'
    
    def get_queryset(self):
        return Property.objects.filter(is_published=True).select_related('user').prefetch_related(
            'images',
            'features',
            'property_agents__agent',
            'stats',
            'leads__source'
        )

class LeadSourceViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = LeadSource.objects.all()
    serializer_class = LeadSourceSerializer
    permission_classes = [IsAuthenticated]

class PropertyLeadViewSet(viewsets.ModelViewSet):
    serializer_class = PropertyLeadSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_fields = ['property', 'status', 'source']

    def get_queryset(self):
        user = self.request.user
        return PropertyLead.objects.filter(
            Q(agent=user) | 
            Q(property__agent__user=user)  # Traverse through Agent->User
        )
    
    def perform_create(self, serializer):
        serializer.save(agent=self.request.user)

    @action(detail=False, methods=['get'])
    def summary(self, request):
        user = request.user
        leads = PropertyLead.objects.filter(
            Q(agent=user) | 
            Q(property__agent__user=user)  # Traverse through Agent->User
        )
        
        total_leads = leads.count()
        leads_by_status = leads.values('status').annotate(
            count=Count('id')
        ).order_by('-count')
        
        leads_by_source = leads.values('source__name').annotate(
            count=Count('id')
        ).order_by('-count')
        
        recent_leads = leads.order_by('-created_at')[:5]
        
        return Response({
            'total_leads': total_leads,
            'leads_by_status': leads_by_status,
            'leads_by_source': leads_by_source,
            'recent_leads': PropertyLeadSerializer(recent_leads, many=True).data
        })        

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


class PropertyFilterOptionsView(APIView):
    """
    Returns available filter options for property searches.
    Cached for 1 hour to reduce database queries.
    """
    permission_classes = [AllowAny]

    def get(self, request):
        from django.core.cache import cache

        cache_key = 'property_filter_options'
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data)

        # Get unique locations
        locations = Property.objects.filter(
            is_published=True
        ).values_list('location', flat=True).distinct().order_by('location')

        # Get price range
        price_stats = Property.objects.filter(
            is_published=True
        ).aggregate(
            min_price=Min('price'),
            max_price=Max('price')
        )

        # Get property types with counts
        property_types = Property.objects.filter(
            is_published=True
        ).values('property_type').annotate(
            count=Count('id')
        ).order_by('property_type')

        # Get categories with counts
        categories = Property.objects.filter(
            is_published=True
        ).values('category').annotate(
            count=Count('id')
        ).order_by('category')

        # Get status options with counts
        statuses = Property.objects.filter(
            is_published=True
        ).values('status').annotate(
            count=Count('id')
        ).order_by('status')

        # Get bedroom range
        bed_stats = Property.objects.filter(
            is_published=True
        ).aggregate(
            min_beds=Min('beds'),
            max_beds=Max('beds')
        )

        # Get bathroom range
        bath_stats = Property.objects.filter(
            is_published=True
        ).aggregate(
            min_baths=Min('baths'),
            max_baths=Max('baths')
        )

        data = {
            'locations': list(locations),
            'price_range': {
                'min': price_stats['min_price'] or 0,
                'max': price_stats['max_price'] or 0,
            },
            'property_types': list(property_types),
            'categories': list(categories),
            'statuses': list(statuses),
            'bed_range': {
                'min': bed_stats['min_beds'] or 0,
                'max': bed_stats['max_beds'] or 10,
            },
            'bath_range': {
                'min': bath_stats['min_baths'] or 0,
                'max': bath_stats['max_baths'] or 10,
            },
        }

        # Cache for 1 hour
        cache.set(cache_key, data, 60 * 60)

        return Response(data)


class PropertyShareView(APIView):
    """
    Create shareable property links - works for both authenticated and anonymous users
    """
    permission_classes = [AllowAny]

    def post(self, request, pk):
        property_obj = get_object_or_404(Property, pk=pk, is_published=True)
        expiration = timezone.now() + timedelta(days=30)  # Extended to 30 days

        # Get user if authenticated, otherwise None
        user = request.user if request.user.is_authenticated else None
        session_key = request.session.session_key or ''

        # Ensure session exists for anonymous users
        if not request.session.session_key:
            request.session.create()
            session_key = request.session.session_key

        share = PropertyShare.objects.create(
            property=property_obj,
            user=user,
            expires_at=expiration,
            session_key=session_key
        )

        # Track share interaction
        PropertyInteraction.objects.create(
            property=property_obj,
            user=user,
            interaction_type='share',
            session_key=session_key
        )

        # Build share URL with token
        share_url = f"{settings.FRONTEND_URL}/shared/{share.share_token}"

        return Response({
            'share_link': share_url,
            'share_token': str(share.share_token),
            'expires_at': expiration.isoformat(),
            'property_url': f"{settings.FRONTEND_URL}/properties/{property_obj.id}/"
        })

class PropertyShareRedirect(APIView):
    def get(self, request, token):
        share = get_object_or_404(PropertyShare, share_token=token)
        if share.expires_at < timezone.now():
            return Response({'error': 'Link expired'}, status=410)

        serializer = PropertySerializer(share.property)
        return Response(serializer.data)


class PropertyInquiryView(APIView):
    """
    Create property inquiries - works for both authenticated and anonymous users
    Sends email notification to property agent
    """
    permission_classes = [AllowAny]

    def post(self, request, pk):
        from django.core.validators import validate_email
        from django.core.exceptions import ValidationError
        from .tasks import send_email_notification

        property_obj = get_object_or_404(Property, pk=pk, is_published=True)

        # Get data from request
        message = request.data.get('message', '').strip()
        name = request.data.get('name', '').strip()
        email = request.data.get('email', '').strip()
        phone = request.data.get('phone', '').strip()

        # Validation
        if not message:
            return Response({'error': 'Message is required'}, status=400)

        # For anonymous users, email is required
        user = request.user if request.user.is_authenticated else None
        if not user:
            if not email:
                return Response({'error': 'Email is required for inquiries'}, status=400)
            try:
                validate_email(email)
            except ValidationError:
                return Response({'error': 'Please provide a valid email address'}, status=400)
            if not name:
                return Response({'error': 'Name is required for inquiries'}, status=400)

        # Get or create session for anonymous users
        session_key = ''
        if hasattr(request, 'session'):
            if not request.session.session_key:
                request.session.create()
            session_key = request.session.session_key or ''

        # Create the inquiry
        inquiry = Inquiry.objects.create(
            property=property_obj,
            user=user,
            name=name if not user else (user.firstname or user.username),
            email=email if not user else user.email,
            phone=phone,
            message=message
        )

        # Track inquiry interaction
        PropertyInteraction.objects.create(
            property=property_obj,
            user=user,
            interaction_type='inquiry',
            session_key=session_key
        )

        # Send email notification to agent
        sender_name = name if not user else (user.firstname or user.username)
        sender_email = email if not user else user.email

        # Get agent email (property.agent or fallback to admin)
        agent_email = None
        if hasattr(property_obj, 'agent') and property_obj.agent:
            agent_email = property_obj.agent.email

        if not agent_email:
            agent_email = settings.DEFAULT_FROM_EMAIL

        # Prepare email content
        subject = f"New Inquiry for {property_obj.title}"
        email_message = f"""
New inquiry received for: {property_obj.title}

From: {sender_name}
Email: {sender_email}
Phone: {phone or 'Not provided'}

Message:
{message}

---
View property: {settings.FRONTEND_URL}/properties/{property_obj.id}/
Reply directly to: {sender_email}
        """

        # Send async email notification
        try:
            send_email_notification.delay(
                subject=subject,
                message=email_message,
                recipient_list=[agent_email],
            )
        except Exception as e:
            logger.error(f"Failed to queue inquiry email: {str(e)}")

        return Response({
            'success': True,
            'message': 'Your inquiry has been sent. The agent will contact you soon.',
            'inquiry_id': inquiry.id
        }, status=201)


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
        from django.db.models import Count, Sum
        from django.db.models.functions import TruncDate
        from datetime import date, timedelta

        # Date ranges for trend calculation
        today = date.today()
        seven_days_ago = today - timedelta(days=7)
        fourteen_days_ago = today - timedelta(days=14)
        thirty_days_ago = today - timedelta(days=30)

        # Get stats from PropertyStat for the last 7 days
        stats_last_7_days = PropertyStat.objects.filter(
            date__gte=seven_days_ago
        ).values('date').annotate(
            total_views=Sum('views'),
            total_inquiries=Sum('inquiries'),
            total_favorites=Sum('favorites'),
            total_shares=Sum('shares')
        ).order_by('-date')

        # Get stats for previous 7 days (for trend comparison)
        stats_prev_7_days = PropertyStat.objects.filter(
            date__gte=fourteen_days_ago,
            date__lt=seven_days_ago
        ).aggregate(
            views=Sum('views'),
            inquiries=Sum('inquiries'),
            favorites=Sum('favorites'),
            shares=Sum('shares')
        )

        # Current period totals
        current_totals = PropertyStat.objects.filter(
            date__gte=seven_days_ago
        ).aggregate(
            views=Sum('views'),
            inquiries=Sum('inquiries'),
            favorites=Sum('favorites'),
            shares=Sum('shares')
        )

        # Calculate trends (percentage change)
        def calc_trend(current, previous):
            current = current or 0
            previous = previous or 0
            if previous == 0:
                return 100 if current > 0 else 0
            return round(((current - previous) / previous) * 100, 1)

        trends = {
            'views': calc_trend(current_totals['views'], stats_prev_7_days['views']),
            'inquiries': calc_trend(current_totals['inquiries'], stats_prev_7_days['inquiries']),
            'favorites': calc_trend(current_totals['favorites'], stats_prev_7_days['favorites']),
            'shares': calc_trend(current_totals['shares'], stats_prev_7_days['shares']),
        }

        # Popular properties (from PropertyStat aggregated data)
        popular_properties = Property.objects.filter(
            stats__date__gte=thirty_days_ago
        ).annotate(
            total_views=Sum('stats__views'),
            total_inquiries=Sum('stats__inquiries'),
            total_favorites=Sum('stats__favorites'),
            total_shares=Sum('stats__shares')
        ).order_by('-total_views')[:10]

        # Recent admin actions
        recent_actions = AdminActionLog.objects.filter(
            admin=request.user
        ).select_related('admin', 'target_user').order_by('-timestamp')[:10]

        recent_actions_data = []
        for action in recent_actions:
            recent_actions_data.append({
                'id': action.id,
                'action_type': action.action_type,
                'admin_username': action.admin.username if action.admin else None,
                'target_user_username': action.target_user.username if action.target_user else None,
                'details': action.details,
                'ip_address': action.ip_address,
                'timestamp': action.timestamp.isoformat(),
            })

        # User growth over last 7 days
        user_growth = User.objects.filter(
            date_joined__date__gte=seven_days_ago
        ).annotate(
            date=TruncDate('date_joined')
        ).values('date').annotate(
            count=Count('id')
        ).order_by('-date')

        stats = {
            # Summary stats
            'total_views': PropertyStat.objects.aggregate(total=Sum('views'))['total'] or 0,
            'total_inquiries': PropertyStat.objects.aggregate(total=Sum('inquiries'))['total'] or 0,
            'total_favorites': PropertyStat.objects.aggregate(total=Sum('favorites'))['total'] or 0,
            'total_shares': PropertyStat.objects.aggregate(total=Sum('shares'))['total'] or 0,

            # Period stats with daily breakdown
            'stats_last_7_days': list(stats_last_7_days),

            # Trends
            'trends': trends,

            # Popular properties
            'popular_properties': [
                {
                    'id': p.id,
                    'title': p.title,
                    'location': p.location,
                    'views': p.total_views or 0,
                    'inquiries': p.total_inquiries or 0,
                    'favorites': p.total_favorites or 0,
                    'shares': p.total_shares or 0,
                } for p in popular_properties
            ],

            # Platform stats
            'total_users': User.objects.count(),
            'active_listings': Property.objects.filter(is_published=True).count(),
            'pending_listings': Property.objects.filter(is_published=False).count(),
            'active_admins': User.objects.filter(is_staff=True).count(),

            # Location breakdown
            'popular_locations': list(Property.objects.values('location')
                             .annotate(count=Count('id'))
                             .order_by('-count')[:5]),

            # Admin activity
            'recent_actions': recent_actions_data,
            'user_growth': list(user_growth),
            'admin_activity': list(AdminActionLog.objects.values('action_type')
                               .annotate(total=Count('id'))
                               .order_by('-total')),
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
        from django.db.models import Sum
        from datetime import date, timedelta

        property_obj = get_object_or_404(Property, pk=pk)

        # Verify ownership if not admin
        if not request.user.is_staff and property_obj.agent != request.user:
            return Response({"detail": "Not authorized"}, status=403)

        # Date range parameters
        days = int(request.query_params.get('days', 30))
        end_date = date.today()
        start_date = end_date - timedelta(days=days)

        # Get aggregated stats from PropertyStat
        property_stats = PropertyStat.objects.filter(
            property=property_obj,
            date__gte=start_date
        )

        # Daily breakdown for charts
        daily_stats = list(property_stats.values('date').order_by('date'))

        # Totals for the period
        totals = property_stats.aggregate(
            views=Sum('views'),
            inquiries=Sum('inquiries'),
            favorites=Sum('favorites'),
            shares=Sum('shares')
        )

        # All-time totals
        all_time = PropertyStat.objects.filter(property=property_obj).aggregate(
            views=Sum('views'),
            inquiries=Sum('inquiries'),
            favorites=Sum('favorites'),
            shares=Sum('shares')
        )

        # User type breakdown from raw interactions (for detailed analytics)
        user_types = PropertyInteraction.objects.filter(property=property_obj).annotate(
            is_authenticated=Case(
                When(user__isnull=False, then=Value('Registered')),
                default=Value('Anonymous'),
                output_field=CharField()
            )
        ).values('is_authenticated').annotate(count=Count('id'))

        stats = {
            'property_id': property_obj.id,
            'property_title': property_obj.title,
            'period': {
                'days': days,
                'start_date': str(start_date),
                'end_date': str(end_date),
            },
            'period_totals': {
                'views': totals['views'] or 0,
                'inquiries': totals['inquiries'] or 0,
                'favorites': totals['favorites'] or 0,
                'shares': totals['shares'] or 0,
            },
            'all_time_totals': {
                'views': all_time['views'] or 0,
                'inquiries': all_time['inquiries'] or 0,
                'favorites': all_time['favorites'] or 0,
                'shares': all_time['shares'] or 0,
            },
            'daily_breakdown': daily_stats,
            'user_types': list(user_types),
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


class NotificationViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing system notifications from CRUD operations.
    """
    serializer_class = NotificationSerializer
    permission_classes = [IsAdminUser]
    filter_backends = [DjangoFilterBackend, filters.OrderingFilter]
    filterset_fields = ['notification_type', 'read']
    ordering_fields = ['created_at']
    ordering = ['-created_at']
    pagination_class = None  # Return all notifications without pagination

    def get_queryset(self):
        # Return notifications for all admins (user is null) or specific user
        # Limit to 100 most recent in the list action
        return Notification.objects.filter(
            Q(user__isnull=True) | Q(user=self.request.user)
        )

    def list(self, request, *args, **kwargs):
        """Override list to limit results to 100 most recent"""
        queryset = self.filter_queryset(self.get_queryset())[:100]
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(detail=False, methods=['get'])
    def unread_count(self, request):
        """Get count of unread notifications"""
        count = self.get_queryset().filter(read=False).count()
        return Response({'count': count})

    @action(detail=False, methods=['post'])
    def mark_all_read(self, request):
        """Mark all notifications as read"""
        updated = self.get_queryset().filter(read=False).update(read=True)
        return Response({'updated': updated})

    @action(detail=True, methods=['patch'])
    def mark_read(self, request, pk=None):
        """Mark a specific notification as read"""
        notification = self.get_object()
        notification.read = True
        notification.save()
        return Response(self.get_serializer(notification).data)

    def destroy(self, request, *args, **kwargs):
        """Delete a notification"""
        return super().destroy(request, *args, **kwargs)

    @action(detail=False, methods=['delete'])
    def clear_all(self, request):
        """Clear all notifications"""
        deleted_count, _ = self.get_queryset().delete()
        return Response({'deleted': deleted_count})


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
        Create a new agent and link to existing user if possible
        """
        email = request.data.get('email')
        
        with transaction.atomic():
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            agent = serializer.save()
            
            # Try to link to existing user
            self.try_link_agent_to_user(agent, email)
            
            return Response(
                AgentSerializer(agent).data, 
                status=status.HTTP_201_CREATED
            )
    
    def update(self, request, *args, **kwargs):
        """
        Update an existing agent
        """
        instance = self.get_object()
        email = request.data.get('email', instance.email)
        
        with transaction.atomic():
            partial = kwargs.pop('partial', False)
            serializer = self.get_serializer(instance, data=request.data, partial=partial)
            serializer.is_valid(raise_exception=True)
            agent = serializer.save()
            
            # Try to link if not already linked
            if not agent.user:
                self.try_link_agent_to_user(agent, email)
                
            return Response(AgentSerializer(agent).data)
        
    def try_link_agent_to_user(self, agent, email):
        """
        Attempt to link agent to a user with matching email
        """
        try:
            user = User.objects.get(email=email)
            agent.user = user
            agent.save()
        except User.DoesNotExist:
            pass
        except User.MultipleObjectsReturned:
            # Handle case where multiple users have same email
            user = User.objects.filter(email=email).first()
            if user:
                agent.user = user
                agent.save()
    
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