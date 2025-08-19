# core/utils.py
from PIL import Image, ImageEnhance
import os
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

def apply_watermark(image_path, watermark_path, output_path, position='center', size_ratio=0.15, opacity=0.7):
    """
    Applies a watermark to an image with specified parameters.
    """
    try:
        print(f"DEBUG: Opening base image from {image_path}")
        print(f"DEBUG: Opening watermark from {watermark_path}")
        
        # Check file existence first
        if not os.path.exists(image_path):
            print(f"ERROR: Base image not found at {image_path}")
            return False
            
        if not os.path.exists(watermark_path):
            print(f"ERROR: Watermark not found at {watermark_path}")
            return False
        
        # Open the source image and watermark
        base_image = Image.open(image_path).convert('RGBA')
        watermark = Image.open(watermark_path).convert('RGBA')
        
        print(f"DEBUG: Base image size: {base_image.size}")
        print(f"DEBUG: Watermark original size: {watermark.size}")

        # --- Opacity Control ---
        if opacity < 1.0:
            alpha = watermark.split()[3]
            alpha = ImageEnhance.Brightness(alpha).enhance(opacity)
            watermark.putalpha(alpha)
            print(f"DEBUG: Applied opacity {opacity}")

        # --- Sizing ---
        img_width, img_height = base_image.size
        wm_original_width, wm_original_height = watermark.size

        # Calculate new watermark width based on the ratio, and height to maintain aspect ratio
        new_wm_width = int(img_width * size_ratio)
        new_wm_height = int(wm_original_height * (new_wm_width / wm_original_width))
        
        print(f"DEBUG: Resizing watermark to {new_wm_width}x{new_wm_height}")
        
        # Resize the watermark
        watermark = watermark.resize((new_wm_width, new_wm_height), Image.Resampling.LANCZOS)

        # --- Positioning ---
        margin = int(img_width * 0.02) # 2% margin
        
        if position == 'bottom_right':
            pos = (img_width - new_wm_width - margin, img_height - new_wm_height - margin)
        elif position == 'bottom_left':
            pos = (margin, img_height - new_wm_height - margin)
        elif position == 'top_right':
            pos = (img_width - new_wm_width - margin, margin)
        elif position == 'top_left':
            pos = (margin, margin)
        elif position == 'center':
            pos = (int((img_width - new_wm_width) / 2), int((img_height - new_wm_height) / 2))
        else:
            raise ValueError("Invalid position specified.")
            
        print(f"DEBUG: Watermark position: {pos}")

        # Create a transparent layer for the watermark
        transparent_layer = Image.new('RGBA', base_image.size, (0, 0, 0, 0))
        transparent_layer.paste(watermark, pos)

        # Composite the watermark layer onto the base image
        watermarked_image = Image.alpha_composite(base_image, transparent_layer)
        
        # Convert back to RGB for saving as JPEG
        final_image = watermarked_image.convert('RGB')
        
        # Save the final image
        final_image.save(output_path, 'JPEG', quality=95)
        
        print(f"SUCCESS: Watermark applied and saved to {output_path}")
        return True

    except FileNotFoundError as e:
        print(f"ERROR: Could not find a file. Details: {e}")
        return False
    except Exception as e:
        print(f"ERROR: An unexpected error occurred: {e}")
        import traceback
        traceback.print_exc()
        return False
