# core/utils.py
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import logging

logger = logging.getLogger(__name__)

class EmailNotificationService:
    """
    Service class to handle email notifications
    """
    
    @staticmethod
    def send_templated_email(template_name, context, subject, recipient_list, from_email=None):
        """
        Send templated email with HTML and text fallback
        """
        try:
            if not from_email:
                from_email = settings.DEFAULT_FROM_EMAIL
            
            # Add common context variables
            context.update({
                'site_name': getattr(settings, 'SITE_NAME', 'House of Stone Properties'),
                'site_url': getattr(settings, 'FRONTEND_URL', 'https://houseofstone.onrender.com'),
                'admin_url': f"https://{getattr(settings, 'ADMIN_BASE_URL', 'admin.hsp.co.zw')}",
            })
            
            # Render templates
            html_content = render_to_string(f'emails/{template_name}.html', context)
            text_content = strip_tags(html_content)
            
            # Create and send email
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
    
    @staticmethod
    def send_bulk_notification(template_name, context_list, subject_template, from_email=None):
        """
        Send bulk notifications with different contexts
        """
        success_count = 0
        for context in context_list:
            subject = subject_template.format(**context)
            recipient = context.get('recipient_email')
            
            if recipient:
                if EmailNotificationService.send_templated_email(
                    template_name, context, subject, [recipient], from_email
                ):
                    success_count += 1
        
        logger.info(f"Bulk notification sent: {success_count}/{len(context_list)} successful")
        return success_count
