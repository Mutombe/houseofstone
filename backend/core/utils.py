# core/utils.py
from PIL import Image, ImageEnhance
import os
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags
from django.conf import settings
import logging
import os
from io import BytesIO

logger = logging.getLogger(__name__)
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
    

"""
Utility functions for image processing
"""

def apply_watermark(image_path, watermark_path, position='center', size_ratio=0.15, opacity=0.7):
    """
    Applies a watermark to an image and returns the watermarked image as bytes.
    
    Args:
        image_path (str): Path to the base image
        watermark_path (str): Path to the watermark image
        position (str): Position of watermark ('center', 'bottom_right', 'bottom_left', 'top_right', 'top_left')
        size_ratio (float): Size of watermark relative to base image (0.0 to 1.0)
        opacity (float): Opacity of watermark (0.0 to 1.0)
    
    Returns:
        bytes: Watermarked image as JPEG bytes, or None if error occurs
    """
    try:
        logger.info(f"Starting watermark process for {image_path}")
        print(f"DEBUG: Opening base image from {image_path}")
        print(f"DEBUG: Opening watermark from {watermark_path}")
        
        # Check file existence
        if not os.path.exists(image_path):
            print(f"ERROR: Base image not found at {image_path}")
            logger.error(f"Base image not found: {image_path}")
            return None
            
        if not os.path.exists(watermark_path):
            print(f"ERROR: Watermark not found at {watermark_path}")
            logger.error(f"Watermark not found: {watermark_path}")
            return None
        
        # Open images
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

        # Calculate new watermark dimensions
        new_wm_width = int(img_width * size_ratio)
        new_wm_height = int(wm_original_height * (new_wm_width / wm_original_width))
        
        print(f"DEBUG: Resizing watermark to {new_wm_width}x{new_wm_height}")
        watermark = watermark.resize((new_wm_width, new_wm_height), Image.Resampling.LANCZOS)

        # --- Positioning ---
        margin = int(img_width * 0.02)  # 2% margin
        
        position_map = {
            'bottom_right': (img_width - new_wm_width - margin, img_height - new_wm_height - margin),
            'bottom_left': (margin, img_height - new_wm_height - margin),
            'top_right': (img_width - new_wm_width - margin, margin),
            'top_left': (margin, margin),
            'center': (int((img_width - new_wm_width) / 2), int((img_height - new_wm_height) / 2))
        }
        
        pos = position_map.get(position)
        if pos is None:
            raise ValueError(f"Invalid position '{position}'. Must be one of: {list(position_map.keys())}")
            
        print(f"DEBUG: Watermark position: {pos}")

        # --- Apply Watermark ---
        # Create transparent layer
        transparent_layer = Image.new('RGBA', base_image.size, (0, 0, 0, 0))
        transparent_layer.paste(watermark, pos)

        # Composite the watermark
        watermarked_image = Image.alpha_composite(base_image, transparent_layer)
        
        # Convert to RGB for JPEG
        final_image = watermarked_image.convert('RGB')
        
        # Save to BytesIO
        output = BytesIO()
        final_image.save(output, format='JPEG', quality=95, optimize=True)
        output.seek(0)
        
        print(f"SUCCESS: Watermark applied successfully")
        logger.info(f"Watermark applied successfully to {image_path}")
        return output.read()

    except Exception as e:
        logger.exception(f"Watermark failed for {image_path}: {str(e)}")
        print(f"ERROR: An unexpected error occurred: {e}")
        import traceback
        traceback.print_exc()
        return None