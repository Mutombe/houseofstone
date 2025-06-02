from celery import shared_task
from django.core.mail import send_mail
from .models import Property, PropertyAlert
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import logging

logger = logging.getLogger(__name__)
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
                'sales@hsp.co.zw',
                [alert.user.email],
                fail_silently=False,
            )

@shared_task
def send_email_notification(subject, message, recipient_list, from_email=None):
    """
    Celery task to send email notifications asynchronously
    """
    try:
        if not from_email:
            from_email = settings.DEFAULT_FROM_EMAIL
            
        send_mail(
            subject=subject,
            message=message,
            from_email=from_email,
            recipient_list=recipient_list,
            fail_silently=False
        )
        logger.info(f"Email sent successfully: {subject}")
        return True
    except Exception as e:
        logger.error(f"Failed to send email: {subject} - Error: {str(e)}")
        return False

@shared_task
def check_property_alerts():
    """
    Celery task to check and send property alerts
    This should be scheduled to run daily or weekly
    """
    from .signals import send_property_alerts
    try:
        send_property_alerts()
        logger.info("Property alerts check completed successfully")
    except Exception as e:
        logger.error(f"Error checking property alerts: {str(e)}")

@shared_task
def cleanup_old_shares():
    """
    Clean up expired property shares
    """
    from .models import PropertyShare
    try:
        expired_shares = PropertyShare.objects.filter(expires_at__lt=timezone.now())
        count = expired_shares.count()
        expired_shares.delete()
        logger.info(f"Cleaned up {count} expired property shares")
    except Exception as e:
        logger.error(f"Error cleaning up expired shares: {str(e)}")

@shared_task
def send_weekly_summary():
    """
    Send weekly summary to admins
    """
    from .models import Property, Agent, User, Inquiry
    from django.core.mail import EmailMultiAlternatives
    from django.template.loader import render_to_string
    
    try:
        # Get statistics for the past week
        one_week_ago = timezone.now() - timedelta(days=7)
        
        stats = {
            'new_properties': Property.objects.filter(created_at__gte=one_week_ago).count(),
            'new_users': User.objects.filter(date_joined__gte=one_week_ago).count(),
            'new_agents': Agent.objects.filter(created_at__gte=one_week_ago).count(),
            'new_inquiries': Inquiry.objects.filter(created_at__gte=one_week_ago).count(),
            'total_properties': Property.objects.count(),
            'total_users': User.objects.count(),
            'total_agents': Agent.objects.count(),
        }
        
        # Get admin emails
        admin_emails = []
        for name, email in settings.ADMINS:
            admin_emails.append(email)
        
        if admin_emails:
            context = {
                'stats': stats,
                'site_name': settings.SITE_NAME,
                'week_start': one_week_ago.strftime('%B %d, %Y'),
                'week_end': timezone.now().strftime('%B %d, %Y')
            }
            
            html_content = render_to_string('emails/weekly_summary.html', context)
            text_content = f"""
            Weekly Summary for {settings.SITE_NAME}
            
            Statistics for {context['week_start']} - {context['week_end']}:
            - New Properties: {stats['new_properties']}
            - New Users: {stats['new_users']}
            - New Agents: {stats['new_agents']}
            - New Inquiries: {stats['new_inquiries']}
            
            Total Counts:
            - Total Properties: {stats['total_properties']}
            - Total Users: {stats['total_users']}
            - Total Agents: {stats['total_agents']}
            """
            
            msg = EmailMultiAlternatives(
                subject=f"Weekly Summary - {settings.SITE_NAME}",
                body=text_content,
                from_email=settings.DEFAULT_FROM_EMAIL,
                to=admin_emails
            )
            msg.attach_alternative(html_content, "text/html")
            msg.send()
            
            logger.info("Weekly summary sent successfully")
    except Exception as e:
        logger.error(f"Error sending weekly summary: {str(e)}")