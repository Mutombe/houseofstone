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