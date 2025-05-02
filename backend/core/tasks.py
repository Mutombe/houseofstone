from celery import shared_task
from django.core.mail import send_mail
from .models import Property, PropertyAlert

@shared_task
def check_property_alerts():
    from django.utils import timezone
    from datetime import timedelta
    
    # Get all active alerts
    alerts = PropertyAlert.objects.filter(is_active=True)
    
    for alert in alerts:
        # Find matching properties from last 24 hours
        new_properties = Property.objects.filter(
            created_at__gte=timezone.now() - timedelta(hours=24),
            **alert.search_parameters
        )
        
        if new_properties.exists():
            send_mail(
                'New Properties Matching Your Search',
                f'Found {new_properties.count()} new properties. Visit our site to view them!',
                'noreply@yourdomain.com',
                [alert.user.email],
                fail_silently=False,
            )