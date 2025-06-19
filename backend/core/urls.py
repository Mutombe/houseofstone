from django.urls import path, include
from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenRefreshView
from .views import RegisterView,UserViewSet,PropertyLeadViewSet, LeadSourceViewSet , CustomTokenObtainPairView, ProfileView, PropertyViewSet, NeighborhoodViewSet, SavedSearchViewSet, FavoritePropertyViewSet, InquiryViewSet, MortgageCalculatorView, BlogPostViewSet, PropertyShareView, PropertyShareRedirect, AdminDashboardView, UserDashboardView, PropertyStatsView, AdminUserManagementViewSet, AdminActionLogViewSet, AgentViewSet

router = DefaultRouter()
router.register(r'properties', PropertyViewSet, basename='property')
router.register(r'neighborhoods', NeighborhoodViewSet, basename='neighborhood')
router.register(r'saved-searches', SavedSearchViewSet, basename='saved-search')
router.register(r'favorites', FavoritePropertyViewSet, basename='favorite-property')
router.register(r'admin/actions', AdminActionLogViewSet, basename='admin-actions')
router.register(r'admin/users', AdminUserManagementViewSet, basename='admin-users')
router.register(r'users', UserViewSet, basename='user')
router.register(r'blog', BlogPostViewSet, basename='blog-post')
router.register(r'inquiries', InquiryViewSet, basename='inquiry')
router.register(r'agents', AgentViewSet, basename='agent')
router.register(r'property-leads', PropertyLeadViewSet, basename='property-lead')
router.register(r'lead-sources', LeadSourceViewSet, basename='lead-source')


urlpatterns = [
    path('', include(router.urls)),
    # Existing auth endpoints
    path("auth/register/", RegisterView.as_view(), name="register"),
    path('profile/', ProfileView.as_view(), name='profile'),
    path("auth/login/", CustomTokenObtainPairView.as_view()),
    path("auth/refresh/", TokenRefreshView.as_view()),
    path('mortgage/', MortgageCalculatorView.as_view(), name='mortgage-calculator'),
    path('properties/<int:pk>/share/', PropertyShareView.as_view()),
    path('shared-properties/<uuid:token>/', PropertyShareRedirect.as_view()),
    path('properties/<int:pk>/stats/', PropertyViewSet.as_view({'get': 'stats'}), name='property-stats'),
    path('agent-properties/', PropertyViewSet.as_view({'get': 'list'}), name='agent-properties'),
    path('property-stats/<int:pk>/', PropertyStatsView.as_view()),
    path('dashboard/admin/', AdminDashboardView.as_view()),
    path('admin/actions/', AdminActionLogViewSet.as_view({'get': 'list'})),
    path('dashboard/user/', UserDashboardView.as_view()),
]