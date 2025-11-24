from celery import shared_task
from django.core.mail import send_mail
from .models import Property, PropertyAlert, PropertyImage
from django.conf import settings
from django.utils import timezone
from datetime import timedelta
import logging
from django.core.files.base import ContentFile
from io import BytesIO
import os
from PIL import Image, ImageEnhance

logger = logging.getLogger(__name__)

"""
Celery tasks for background processing
"""


@shared_task(bind=True, max_retries=3, default_retry_delay=60)
def apply_watermark_task(self, image_id):
    """
    Celery task to apply watermark to a PropertyImage.
    
    Args:
        image_id (int): ID of the PropertyImage to watermark
    
    Returns:
        str: Success message or error description
    """
    from .models import PropertyImage  # Import here to avoid circular imports
    from .utils import apply_watermark  # Import the utility function
    
    try:
        logger.info(f"Starting watermark task for image ID: {image_id}")
        
        # Get the image instance
        try:
            instance = PropertyImage.objects.get(id=image_id)
        except PropertyImage.DoesNotExist:
            logger.error(f"PropertyImage {image_id} not found")
            return f"Error: Image {image_id} not found"
        
        # Check if already watermarked
        if instance.is_watermarked:
            logger.info(f"Image {image_id} already watermarked, skipping")
            return f"Skipped: Image {image_id} already watermarked"
        
        # Check if image file exists
        if not instance.image or not os.path.exists(instance.image.path):
            logger.error(f"Image file not found at {instance.image.path}")
            return f"Error: Image file not found for {image_id}"
        
        # Get watermark path
        watermark_path = os.path.join(settings.MEDIA_ROOT, 'logo', 'logo2.webp')
        
        if not os.path.exists(watermark_path):
            logger.error(f"Watermark not found at: {watermark_path}")
            return f"Error: Watermark file not found"
        
        # Apply watermark
        watermarked_bytes = apply_watermark(
            image_path=instance.image.path,
            watermark_path=watermark_path,
            position='center',
            size_ratio=0.20,
            opacity=0.55
        )
        
        if watermarked_bytes:
            # Save the watermarked image
            original_name = instance.image.name
            
            # Delete old file
            old_file = instance.image
            old_file.delete(save=False)
            
            # Save new watermarked image
            instance.image.save(
                original_name,
                ContentFile(watermarked_bytes),
                save=False
            )
            
            # Mark as watermarked
            instance.is_watermarked = True
            instance.save(update_fields=['image', 'is_watermarked'])
            
            logger.info(f"✅ Successfully watermarked image {image_id}")
            return f"Success: Watermarked image {image_id}"
        else:
            raise Exception("Watermarking returned None - check logs for details")
            
    except PropertyImage.DoesNotExist:
        logger.error(f"PropertyImage {image_id} not found")
        return f"Error: Image {image_id} not found"
        
    except Exception as e:
        logger.error(f"Watermark task failed for image {image_id}: {str(e)}")
        
        # Retry with exponential backoff
        try:
            # Calculate retry delay: 60s, 120s, 240s
            retry_countdown = 2 ** self.request.retries * 60
            logger.info(f"Retrying watermark task for image {image_id} in {retry_countdown}s (attempt {self.request.retries + 1}/3)")
            
            self.retry(exc=e, countdown=retry_countdown)
        except self.MaxRetriesExceededError:
            logger.error(f"Max retries exceeded for image {image_id}")
            return f"Failed: Max retries exceeded for image {image_id}"

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