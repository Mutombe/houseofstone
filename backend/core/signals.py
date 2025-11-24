from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import Profile
from django.db import transaction
from django.contrib.auth.models import User  
from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from django.contrib.auth.models import User
from django.core.mail import send_mail, EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
from django.urls import reverse
from django.utils import timezone
from datetime import datetime
from .models import (
    Property, Agent, PropertyShare, Profile, 
    PropertyAgent, Inquiry, AdminActionLog
)
import logging
logger = logging.getLogger(__name__)
from PIL import Image, ImageEnhance
import os
from django.conf import settings
from .models import PropertyImage

ADMIN_EMAILS = ['admin@zim-rec.co.zw','simbamtombe@gmail.com']

# Email template rendering helper
def send_notification_email(subject, template_name, context, recipient_list, from_email=None):
    """
    Send HTML email with fallback to plain text
    """
    try:
        if not from_email:
            from_email = settings.DEFAULT_FROM_EMAIL
        
        # Render HTML template
        html_content = render_to_string(f'emails/{template_name}.html', context)
        text_content = strip_tags(html_content)
        
        # Create email message
        msg = EmailMultiAlternatives(
            subject=subject,
            body=text_content,
            from_email=from_email,
            to=recipient_list
        )
        msg.attach_alternative(html_content, "text/html")
        msg.send()
        
        logger.info(f"Email sent successfully: {subject} to {recipient_list}")
        return True
        
    except Exception as e:
        logger.error(f"Failed to send email: {subject} - Error: {str(e)}")
        return False

# Get admin emails for notifications
def get_admin_emails():
    """Get list of admin email addresses"""
    admin_emails = []
    for name, email in settings.ADMINS:
        admin_emails.append(email)
    
    # Also get superuser emails
    superusers = User.objects.filter(is_superuser=True, is_active=True)
    for user in superusers:
        if user.email and user.email not in admin_emails:
            admin_emails.append(user.email)
    
    return admin_emails

# PROPERTY SIGNALS

@receiver(post_save, sender=Property)
def property_created_notification(sender, instance, created, **kwargs):
    """Send notification when a new property is created"""
    if created:
        context = {
            'property': instance,
            'site_name': settings.SITE_NAME,
            'admin_url': f"https://{settings.ADMIN_BASE_URL}",
            'property_url': f"{settings.FRONTEND_URL}/properties/{instance.id}",
            'timestamp': timezone.now()
        }
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"New Property Created: {instance.title}",
                template_name='property_created',
                context=context,
                recipient_list=admin_emails
            )
        
        # Notify assigned agent if exists
        if instance.user and instance.user.email:
            agent_context = context.copy()
            agent_context['agent_name'] = instance.user.get_full_name()
            
            send_notification_email(
                subject=f"Property Assigned to You: {instance.title}",
                template_name='property_assigned_agent',
                context=agent_context,
                recipient_list=[instance.user.email]
            )

@receiver(pre_save, sender=Property)
def property_status_change_notification(sender, instance, **kwargs):
    """Send notification when property status changes"""
    if instance.pk:  # Only for existing properties
        try:
            old_instance = Property.objects.get(pk=instance.pk)
            if old_instance.status != instance.status:
                context = {
                    'property': instance,
                    'old_status': old_instance.get_status_display(),
                    'new_status': instance.get_status_display(),
                    'site_name': settings.SITE_NAME,
                    'property_url': f"{settings.FRONTEND_URL}/properties/{instance.id}",
                    'timestamp': timezone.now()
                }
                
                # Notify admins
                admin_emails = get_admin_emails()
                if admin_emails:
                    send_notification_email(
                        subject=f"Property Status Changed: {instance.title}",
                        template_name='property_status_changed',
                        context=context,
                        recipient_list=admin_emails
                    )
                
                # Notify agent
                if instance.user and instance.user.email:
                    send_notification_email(
                        subject=f"Your Property Status Updated: {instance.title}",
                        template_name='property_status_changed_agent',
                        context=context,
                        recipient_list=[instance.user.email]
                    )
        except Property.DoesNotExist:
            pass

@receiver(post_save, sender=Property)
def property_updated_notification(sender, instance, created, **kwargs):
    """Send notification when property details are updated"""
    if not created:  # Only for updates, not creation
        context = {
            'property': instance,
            'site_name': settings.SITE_NAME,
            'property_url': f"{settings.FRONTEND_URL}/properties/{instance.id}",
            'updated_by': getattr(instance, '_updated_by', 'System'),
            'timestamp': timezone.now()
        }
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"Property Updated: {instance.title}",
                template_name='property_updated',
                context=context,
                recipient_list=admin_emails
            )

# USER REGISTRATION SIGNALS

@receiver(post_save, sender=User)
def user_registration_notification(sender, instance, created, **kwargs):
    """Send notification when a new user registers"""
    if created:
        context = {
            'user': instance,
            'site_name': settings.SITE_NAME,
            'admin_url': f"https://{settings.ADMIN_BASE_URL}",
            'timestamp': timezone.now()
        }
        
        # Welcome email to user
        if instance.email:
            send_notification_email(
                subject=f"Welcome to {settings.SITE_NAME}!",
                template_name='user_welcome',
                context=context,
                recipient_list=[instance.email]
            )
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"New User Registration: {instance.username}",
                template_name='new_user_admin',
                context=context,
                recipient_list=admin_emails
            )

# AGENT SIGNALS

@receiver(post_save, sender=Agent)
def agent_created_notification(sender, instance, created, **kwargs):
    """Send notification when a new agent is created"""
    if created:
        context = {
            'agent': instance,
            'site_name': settings.SITE_NAME,
            'admin_url': f"https://{settings.ADMIN_BASE_URL}",
            'timestamp': timezone.now()
        }
        
        # Welcome email to agent
        if instance.email:
            send_notification_email(
                subject=f"Welcome to {settings.SITE_NAME} Team!",
                template_name='agent_welcome',
                context=context,
                recipient_list=[instance.email]
            )
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"New Agent Created: {instance.full_name}",
                template_name='agent_created_admin',
                context=context,
                recipient_list=admin_emails
            )

@receiver(post_delete, sender=Agent)
def agent_deleted_notification(sender, instance, **kwargs):
    """Send notification when an agent is deleted"""
    context = {
        'agent_name': instance.full_name,
        'agent_email': instance.email,
        'site_name': settings.SITE_NAME,
        'timestamp': timezone.now()
    }
    
    # Notify admins
    admin_emails = get_admin_emails()
    if admin_emails:
        send_notification_email(
            subject=f"Agent Deleted: {instance.full_name}",
            template_name='agent_deleted',
            context=context,
            recipient_list=admin_emails
        )

@receiver(post_save, sender=Agent)
def agent_updated_notification(sender, instance, created, **kwargs):
    """Send notification when agent details are updated"""
    if not created:  # Only for updates
        context = {
            'agent': instance,
            'site_name': settings.SITE_NAME,
            'timestamp': timezone.now()
        }
        
        # Notify agent of their profile update
        if instance.email:
            send_notification_email(
                subject="Your Agent Profile Has Been Updated",
                template_name='agent_profile_updated',
                context=context,
                recipient_list=[instance.email]
            )
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"Agent Profile Updated: {instance.full_name}",
                template_name='agent_updated_admin',
                context=context,
                recipient_list=admin_emails
            )

# PROPERTY SHARING SIGNALS

@receiver(post_save, sender=PropertyShare)
def property_shared_notification(sender, instance, created, **kwargs):
    """Send notification when a property is shared"""
    if created:
        context = {
            'property': instance.property,
            'shared_by': instance.user,
            'share_url': f"{settings.FRONTEND_URL}/shared/{instance.share_token}",
            'site_name': settings.SITE_NAME,
            'timestamp': timezone.now()
        }
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"Property Shared: {instance.property.title}",
                template_name='property_shared',
                context=context,
                recipient_list=admin_emails
            )
        
        # Notify property agent
        if instance.property.agent and instance.property.agent.email:
            send_notification_email(
                subject=f"Your Property Was Shared: {instance.property.title}",
                template_name='property_shared_agent',
                context=context,
                recipient_list=[instance.property.agent.email]
            )

# INQUIRY SIGNALS

@receiver(post_save, sender=Inquiry)
def property_inquiry_notification(sender, instance, created, **kwargs):
    """Send notification when someone inquires about a property"""
    if created:
        context = {
            'inquiry': instance,
            'property': instance.property,
            'user': instance.user,
            'site_name': settings.SITE_NAME,
            'admin_url': f"https://{settings.ADMIN_BASE_URL}",
            'timestamp': timezone.now()
        }
        
        # Notify property agent
        if instance.property.agent and instance.property.agent.email:
            send_notification_email(
                subject=f"New Inquiry: {instance.property.title}",
                template_name='property_inquiry_agent',
                context=context,
                recipient_list=[instance.property.agent.email]
            )
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"New Property Inquiry: {instance.property.title}",
                template_name='property_inquiry_admin',
                context=context,
                recipient_list=admin_emails
            )
        
        # Send confirmation to inquirer
        if instance.user.email:
            send_notification_email(
                subject=f"Your Inquiry About {instance.property.title}",
                template_name='inquiry_confirmation',
                context=context,
                recipient_list=[instance.user.email]
            )

# PROPERTY AGENT ASSIGNMENT SIGNALS

@receiver(post_save, sender=PropertyAgent)
def property_agent_assigned_notification(sender, instance, created, **kwargs):
    """Send notification when an agent is assigned to a property"""
    if created:
        context = {
            'property': instance.property,
            'agent': instance.agent,
            'is_primary': instance.is_primary,
            'site_name': settings.SITE_NAME,
            'property_url': f"{settings.FRONTEND_URL}/properties/{instance.property.id}",
            'timestamp': timezone.now()
        }
        
        # Notify the assigned agent
        if instance.agent.email:
            send_notification_email(
                subject=f"Property Assigned: {instance.property.title}",
                template_name='property_agent_assigned',
                context=context,
                recipient_list=[instance.agent.email]
            )
        
        # Notify admins
        admin_emails = get_admin_emails()
        if admin_emails:
            send_notification_email(
                subject=f"Agent Assigned to Property: {instance.property.title}",
                template_name='property_agent_assigned_admin',
                context=context,
                recipient_list=admin_emails
            )

@receiver(post_delete, sender=PropertyAgent)
def property_agent_unassigned_notification(sender, instance, **kwargs):
    """Send notification when an agent is unassigned from a property"""
    context = {
        'property_title': instance.property.title,
        'agent_name': instance.agent.full_name,
        'agent_email': instance.agent.email,
        'site_name': settings.SITE_NAME,
        'timestamp': timezone.now()
    }
    
    # Notify the unassigned agent
    if instance.agent.email:
        send_notification_email(
            subject=f"Property Unassigned: {instance.property.title}",
            template_name='property_agent_unassigned',
            context=context,
            recipient_list=[instance.agent.email]
        )
    
    # Notify admins
    admin_emails = get_admin_emails()
    if admin_emails:
        send_notification_email(
            subject=f"Agent Unassigned from Property: {instance.property.title}",
            template_name='property_agent_unassigned_admin',
            context=context,
            recipient_list=admin_emails
        )

# ADMIN ACTION LOG SIGNALS

@receiver(post_save, sender=AdminActionLog)
def admin_action_notification(sender, instance, created, **kwargs):
    """Send notification for important admin actions"""
    if created and instance.action_type in ['user_modified', 'permission_changed']:
        context = {
            'action': instance,
            'admin': instance.admin,
            'target_user': instance.target_user,
            'site_name': settings.SITE_NAME,
            'timestamp': timezone.now()
        }
        
        # Notify other admins (excluding the one who performed the action)
        admin_emails = get_admin_emails()
        if instance.admin and instance.admin.email in admin_emails:
            admin_emails.remove(instance.admin.email)
        
        if admin_emails:
            send_notification_email(
                subject=f"Admin Action Performed: {instance.get_action_type_display()}",
                template_name='admin_action_log',
                context=context,
                recipient_list=admin_emails
            )

# BULK NOTIFICATION HELPERS

def send_property_alerts():
    """
    Function to send property alerts to users (can be called by Celery task)
    """
    from .models import PropertyAlert
    
    active_alerts = PropertyAlert.objects.filter(is_active=True)
    
    for alert in active_alerts:
        # Get matching properties based on search parameters
        # This would need to be implemented based on your search logic
        matching_properties = get_matching_properties(alert.search_parameters)
        
        if matching_properties.exists():
            context = {
                'user': alert.user,
                'properties': matching_properties[:5],  # Limit to 5 properties
                'alert': alert,
                'site_name': settings.SITE_NAME,
                'timestamp': timezone.now()
            }
            
            send_notification_email(
                subject=f"New Properties Match Your Alert",
                template_name='property_alert',
                context=context,
                recipient_list=[alert.user.email]
            )

def get_matching_properties(search_parameters):
    """
    Helper function to get properties matching alert parameters
    This should be implemented based on your search logic
    """
    # Placeholder implementation
    from .models import Property
    queryset = Property.objects.filter(is_published=True, status='available')
    
    # Add your filtering logic based on search_parameters
    # Example:
    if 'price_min' in search_parameters:
        queryset = queryset.filter(price__gte=search_parameters['price_min'])
    if 'price_max' in search_parameters:
        queryset = queryset.filter(price__lte=search_parameters['price_max'])
    if 'location' in search_parameters:
        queryset = queryset.filter(location__icontains=search_parameters['location'])
    
    return queryset

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Use transaction to ensure User is committed first
        transaction.on_commit(lambda: Profile.objects.create(user=instance))

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()


"""
Django signals for automatic processing
"""

print("!!! Signals module loaded !!!")

@receiver(post_save, sender=PropertyImage)
def add_watermark_to_image(sender, instance, created, **kwargs):
    """
    Signal to queue watermark task for newly uploaded property images.
    """
    # Only process newly created images that haven't been watermarked
    if not created or not instance.image:
        return
    
    # Check if already watermarked (safety check)
    if hasattr(instance, 'is_watermarked') and instance.is_watermarked:
        logger.info(f"Image {instance.id} already watermarked, skipping")
        return
    
    try:
        # Import here to avoid circular imports
        from .tasks import apply_watermark_task
        
        # Queue the watermark task
        task = apply_watermark_task.delay(instance.id)
        
        logger.info(f"✅ Watermark task queued for PropertyImage {instance.id} (Task ID: {task.id})")
        print(f"DEBUG: Watermark task queued for PropertyImage ID: {instance.id}")
        
    except Exception as e:
        logger.error(f"Failed to queue watermark task for image {instance.id}: {str(e)}")
        print(f"ERROR: Failed to queue watermark task: {e}")