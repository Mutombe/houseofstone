# middleware.py
from .models import PropertyInteraction, AdminActionLog

class InteractionTrackingMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        if request.path.startswith('/api/properties/') and request.method == 'GET':
            property_id = request.path.split('/')[-2]
            if property_id.isdigit():
                self.record_interaction(request, int(property_id))
                
        return response

    def record_interaction(self, request, property_id):
        PropertyInteraction.objects.create(
            user=request.user if request.user.is_authenticated else None,
            property_id=property_id,
            interaction_type='view',
            session_key=request.session.session_key
        )

class AdminActionLoggerMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        
        if request.user.is_authenticated and request.user.is_staff:
            self.log_admin_action(request, response)
            
        return response

    def log_admin_action(self, request, response):
        action_type = self.determine_action_type(request)
        if action_type:
            AdminActionLog.objects.create(
                admin=request.user,
                action_type=action_type,
                details={
                    'method': request.method,
                    'path': request.path,
                    'status_code': response.status_code,
                    'params': dict(request.GET),
                    'data': request.data if request.method in ['POST', 'PUT'] else None
                },
                ip_address=request.META.get('REMOTE_ADDR')
            )

    def determine_action_type(self, request):
        action_map = {
            'DELETE': 'content_deleted',
            'POST': 'user_modified' if '/users/' in request.path else None,
            'PUT': 'permission_changed' if '/roles/' in request.path else 'user_modified'
        }
        return action_map.get(request.method)
    

import logging
from django.utils.deprecation import MiddlewareMixin
from django.contrib.auth.models import User
from .models import AdminActionLog

logger = logging.getLogger(__name__)

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