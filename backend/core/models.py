import uuid
from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.contrib.auth.models import User  
from decimal import Decimal
    
class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    first_name = models.CharField(max_length=100, blank=True)
    last_name = models.CharField(max_length=100, blank=True)
    profile_picture = models.ImageField(
        upload_to="profile_pictures/", null=True, blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.user.username}'s Profile"
    
# Property-related models

class Property(models.Model):
    PROPERTY_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('land', 'Land'),
        ('commercial', 'Commercial'),
        ('villa', 'Villa'),  # Added villa as it appears in the JS object
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('pending', 'Pending'),
        ('sold', 'Sold'),
        ('off-market', 'Off Market'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available', db_index=True)
    beds = models.PositiveIntegerField(null=True, blank=True)
    baths = models.PositiveIntegerField(null=True, blank=True)
    sqft = models.PositiveIntegerField(null=True, blank=True)
    year_built = models.PositiveIntegerField(null=True, blank=True)
    lot_size = models.CharField(max_length=100, blank=True)
    garage = models.CharField(max_length=100, blank=True)
    
    # Original fields
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    is_published = models.BooleanField(default=True)
    agent = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    virtual_tour_url = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Property'
        verbose_name_plural = 'Properties'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['location', 'property_type', 'price']),  # Common search combination
            models.Index(fields=['beds', 'baths', 'price']),  # Common filter combination
        ]

    def __str__(self):
        return self.title


class PropertyImage(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='images')
    image = models.ImageField(upload_to='property_images/')
    caption = models.CharField(max_length=200, blank=True)

    def __str__(self):
        return f"{self.property.title} - Image {self.id}"

class PropertyFeature(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='features')
    feature = models.CharField(max_length=200)
    
    def __str__(self):
        return self.feature

class SavedSearch(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    filters = models.JSONField()  # Stores search criteria
    created_at = models.DateTimeField(auto_now_add=True)

class FavoriteProperty(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

class Neighborhood(models.Model):
    name = models.CharField(max_length=200)
    crime_rate = models.FloatField()
    average_price = models.DecimalField(max_digits=12, decimal_places=2)
    school_rating = models.FloatField()

class Inquiry(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

class BlogPost(models.Model):
    title = models.CharField(max_length=200)
    content = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    featured_image = models.ImageField(upload_to='blog_images/')

class PropertyAlert(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    search_parameters = models.JSONField()  # Stores filters like price range, location
    frequency = models.CharField(max_length=20, choices=[
        ('instant', 'Instant'),
        ('daily', 'Daily'),
        ('weekly', 'Weekly')
    ])
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

class PropertyShare(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    share_token = models.UUIDField(default=uuid.uuid4, unique=True)
    created_at = models.DateTimeField(auto_now_add=True)
    expires_at = models.DateTimeField()

# models.py
class PropertyInteraction(models.Model):
    INTERACTION_TYPES = [
        ('view', 'View'),
        ('favorite', 'Favorite'),
        ('share', 'Share'),
        ('inquiry', 'Inquiry')
    ]
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)  # Null for anonymous
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    interaction_type = models.CharField(max_length=20, choices=INTERACTION_TYPES)
    timestamp = models.DateTimeField(auto_now_add=True)
    session_key = models.CharField(max_length=40, blank=True)  # For anonymous users

class AdminActionLog(models.Model):
    ACTION_TYPES = [
        ('user_modified', 'User Modified'),
        ('content_deleted', 'Content Deleted'),
        ('permission_changed', 'Permission Changed'),
        ('system_config', 'System Configuration Changed'),
    ]
    
    admin = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    action_type = models.CharField(max_length=50, choices=ACTION_TYPES)
    target_user = models.ForeignKey(User, null=True, blank=True, 
                                   on_delete=models.SET_NULL, related_name='admin_actions')
    details = models.JSONField(default=dict)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.admin} performed {self.action_type} at {self.timestamp}"