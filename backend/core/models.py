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
    
class Agent(models.Model):
    POSITION_CHOICES = [
        ('agency_admin', 'Agency Admin'),
        ('agent', 'Agent'),
    ]
    
    PERMISSION_CHOICES = [
        ('upload', 'Upload'),
        ('edit', 'Edit'),
        ('delete', 'Delete'),
        ('view_only', 'View Only'),
    ]
    
    user = models.OneToOneField(
        User, 
        on_delete=models.CASCADE, 
        related_name='agent_profile',
        null=True,
        blank=True
    )
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True)
    surname = models.CharField(max_length=100)
    cell_number = models.CharField(max_length=20)
    email = models.EmailField()
    position = models.CharField(max_length=20, choices=POSITION_CHOICES)
    permissions = models.CharField(max_length=20, choices=PERMISSION_CHOICES, default='view_only')
    
    # Agency information
    agency_name = models.CharField(max_length=200, default='House of Stone Properties')
    branch = models.CharField(max_length=100, default='Borrowdale')
    address = models.TextField(default='21 Harare Drive Borrowdale, Harare')
    
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        verbose_name = 'Agent'
        verbose_name_plural = 'Agents'
        ordering = ['first_name', 'surname']
    
    def __str__(self):
        return f"{self.first_name} {self.surname}"
    
    @property
    def full_name(self):
        if self.middle_name:
            return f"{self.first_name} {self.middle_name} {self.surname}"
        return f"{self.first_name} {self.surname}"

class Property(models.Model):
    AREA_UNIT_CHOICES = [
        ('sqm', 'Square Meters'),
        ('sqft', 'Square Feet'),
        ('hectares', 'Hectares'),
        ('acres', 'Acres'),
    ]
    PROPERTY_TYPES = [
        ('house', 'House'),
        ('apartment', 'Apartment'),
        ('land', 'Land'),
        ('commercial', 'Commercial'),
        ('villa', 'Villa'),  
    ]
    CATEGORY_TYPES = [
        ('rental', 'Rental'),
        ('sale', 'Sale'), 
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    price = models.DecimalField(max_digits=12, decimal_places=2)
    location = models.CharField(max_length=200)
    property_type = models.CharField(max_length=20, choices=PROPERTY_TYPES)
    category = models.CharField(max_length=20, choices=CATEGORY_TYPES, default='sale')
    
    STATUS_CHOICES = [
        ('available', 'Available'),
        ('pending', 'Pending'),
        ('sold', 'Sold'),
        ('off-market', 'Off Market'),
    ]
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='available', db_index=True)
    beds = models.PositiveIntegerField(null=True, blank=True)
    baths = models.PositiveIntegerField(null=True, blank=True)
    kitchens = models.PositiveIntegerField(null=True, blank=True)
    lounges = models.PositiveIntegerField(null=True, blank=True)
    dining_rooms = models.PositiveIntegerField(null=True, blank=True)
    sqft = models.PositiveIntegerField(null=True, blank=True)
    area_measurement = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True, help_text="Total area of the property")
    area_unit = models.CharField(max_length=20, choices=AREA_UNIT_CHOICES, default='sqm')
    year_built = models.PositiveIntegerField(null=True, blank=True)
    floor_size = models.CharField(max_length=100, blank=True)
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
            # Composite indexes for common query patterns
            models.Index(fields=['is_published', 'status', 'property_type']),
            models.Index(fields=['location', 'property_type', 'price']),
            models.Index(fields=['beds', 'baths', 'price']),
            models.Index(fields=['category', 'status', 'created_at']),
            models.Index(fields=['agent', 'is_published', 'status']),
            # Price range queries
            models.Index(fields=['price', 'property_type']),
            # Location-based queries
            models.Index(fields=['location', 'category']),
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
    
class PropertyAgent(models.Model):
    property = models.ForeignKey(Property, on_delete=models.CASCADE, related_name='property_agents')
    agent = models.ForeignKey(Agent, on_delete=models.CASCADE, related_name='agent_properties')
    is_primary = models.BooleanField(default=False, help_text="Primary agent responsible for this property")
    assigned_date = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        verbose_name = 'Property Agent'
        verbose_name_plural = 'Property Agents'
        unique_together = ('property', 'agent')
    
    def __str__(self):
        return f"{self.property.title} - {self.agent.full_name}"

class LeadSource(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)
    
    def __str__(self):
        return self.name

class PropertyLead(models.Model):
    property = models.ForeignKey(
        Property, 
        on_delete=models.SET_NULL, 
        null=True, 
        blank=True,
        related_name='leads'
    )
    agent = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='property_leads'
    )
    source = models.ForeignKey(
        LeadSource,
        on_delete=models.SET_NULL,
        null=True,
        related_name='leads'
    )
    contact_name = models.CharField(max_length=200)
    contact_email = models.EmailField()
    contact_phone = models.CharField(max_length=20)
    notes = models.TextField(blank=True)
    status = models.CharField(
        max_length=20,
        choices=[
            ('new', 'New'),
            ('contacted', 'Contacted'),
            ('qualified', 'Qualified'),
            ('lost', 'Lost'),
            ('converted', 'Converted')
        ],
        default='new'
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"Lead for {self.property.title if self.property else 'Deleted Property'}"

class PropertyStat(models.Model):
    property = models.ForeignKey(
        Property,
        on_delete=models.CASCADE,
        related_name='stats'
    )
    date = models.DateField()
    views = models.PositiveIntegerField(default=0)
    inquiries = models.PositiveIntegerField(default=0)
    favorites = models.PositiveIntegerField(default=0)
    shares = models.PositiveIntegerField(default=0)

    class Meta:
        unique_together = ('property', 'date')
        ordering = ['-date']

    def __str__(self):
        return f"Stats for {self.property.title} on {self.date}"

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