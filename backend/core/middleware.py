# middleware.py
from .models import PropertyInteraction, AdminActionLog
import logging
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.models import User
from django.db import connection, reset_queries
from .db_utils import close_old_connections

logger = logging.getLogger(__name__)

class DatabaseOptimizationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Close old connections before processing
        close_old_connections()
        
        # Reset queries to prevent memory buildup
        reset_queries()
        
        response = self.get_response(request)
        
        # Close connection if it's not being reused
        if hasattr(connection, 'close'):
            connection.close()
            
        return response

class InteractionTrackingMiddleware:
    """
    Enhanced middleware to track property interactions:
    - Views (GET /properties/{id}/)
    - Shares (POST /properties/{id}/share/)
    - Inquiries (POST /properties/{id}/inquiry/)
    - Favorites (POST /favorites/)
    """

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)

        try:
            # Track property views
            if self._is_property_detail_view(request):
                property_id = self._extract_property_id(request.path)
                if property_id:
                    self._record_interaction(request, property_id, 'view')

            # Track favorites (only successful creates)
            elif self._is_favorite_create(request, response):
                property_id = self._get_property_from_request_body(request)
                if property_id:
                    self._record_interaction(request, property_id, 'favorite')

        except Exception as e:
            logger.error(f"Error tracking interaction: {str(e)}")

        return response

    def _is_property_detail_view(self, request):
        """Check if this is a property detail view request"""
        import re
        # Match /properties/{id}/ or /public/properties/{id}/
        pattern = r'^/(properties|public/properties)/\d+/?$'
        return request.method == 'GET' and re.match(pattern, request.path)

    def _is_favorite_create(self, request, response):
        """Check if this is a successful favorite creation"""
        return (
            request.method == 'POST' and
            request.path.rstrip('/') == '/favorites' and
            response.status_code in [200, 201]
        )

    def _extract_property_id(self, path):
        """Extract property ID from URL path"""
        import re
        match = re.search(r'/properties/(\d+)', path)
        if match:
            return int(match.group(1))
        return None

    def _get_property_from_request_body(self, request):
        """Extract property ID from request body"""
        try:
            import json
            if hasattr(request, 'body'):
                data = json.loads(request.body.decode('utf-8'))
                return data.get('property')
        except (json.JSONDecodeError, AttributeError):
            pass
        return None

    def _record_interaction(self, request, property_id, interaction_type):
        """Record the interaction in the database"""
        from .models import Property

        # Verify property exists
        if not Property.objects.filter(id=property_id).exists():
            return

        # Get session key, create session if needed
        session_key = ''
        if hasattr(request, 'session'):
            if not request.session.session_key:
                request.session.create()
            session_key = request.session.session_key or ''

        PropertyInteraction.objects.create(
            user=request.user if request.user.is_authenticated else None,
            property_id=property_id,
            interaction_type=interaction_type,
            session_key=session_key
        )
        logger.debug(f"Recorded {interaction_type} interaction for property {property_id}")

class AdminActionLoggingMiddleware(MiddlewareMixin):
    """
    Middleware to log admin actions for audit trail
    """
    
    def process_response(self, request, response):
        # Log admin actions in Django admin
        if (hasattr(request, 'user') and 
            request.user.is_authenticated and 
            request.user.is_staff and
            request.path.startswith('/admin/') and
            request.method in ['POST', 'PUT', 'PATCH', 'DELETE']):
            
            try:
                # Determine action type based on URL and method
                action_type = self.determine_action_type(request)
                
                if action_type:
                    AdminActionLog.objects.create(
                        admin=request.user,
                        action_type=action_type,
                        details={
                            'path': request.path,
                            'method': request.method,
                            'status_code': response.status_code,
                        },
                        ip_address=self.get_client_ip(request)
                    )
            except Exception as e:
                logger.error(f"Error logging admin action: {str(e)}")
        
        return response
    
    def determine_action_type(self, request):
        """
        Determine the type of admin action based on the request
        """
        path = request.path.lower()
        method = request.method
        
        if '/auth/user/' in path:
            if method == 'POST' and 'add' in path:
                return 'user_created'
            elif method in ['POST', 'PUT', 'PATCH']:
                return 'user_modified'
            elif method == 'DELETE':
                return 'user_deleted'
        
        elif '/change/' in path and method in ['POST', 'PUT', 'PATCH']:
            return 'content_modified'
        elif '/delete/' in path and method == 'POST':
            return 'content_deleted'
        
        return None
    
    def get_client_ip(self, request):
        """
        Get the client's IP address
        """
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0]
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip