import json
from rest_framework import serializers
from django.contrib.auth.models import User  
from .models import BlogPost, Profile, Property, PropertyFeature, Neighborhood, SavedSearch, FavoriteProperty, Inquiry, PropertyImage, PropertyAlert, AdminActionLog, Agent, PropertyAgent
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from decimal import Decimal

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    is_agent = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "is_staff", 
                 "is_superuser", "is_active", "date_joined", "last_login", "is_agent")
        
    def get_is_agent(self, obj):
        return hasattr(obj, 'agent_profile')

    def validate_username(self, value):
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("Username already exists")
        return value

    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("Email already exists")
        return value

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    

class ProfileSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source="user.username", required=False)
    email = serializers.EmailField(source="user.email", read_only=True)

    class Meta:
        model = Profile
        fields = [
            "id",
            "username",
            "email",
            "first_name",
            "last_name",
            "profile_picture",
            "created_at",
            "updated_at",
        ]
        read_only_fields = ["email", "created_at", "updated_at"]

    def update(self, instance, validated_data):
        # Handle nested user data
        user_data = validated_data.pop("user", None)
        if user_data and "username" in user_data:
            instance.user.username = user_data["username"]
            instance.user.save()

        # Update profile fields
        instance.first_name = validated_data.get("first_name", instance.first_name)
        instance.last_name = validated_data.get("last_name", instance.last_name)
        instance.profile_picture = validated_data.get(
            "profile_picture", instance.profile_picture
        )
        instance.save()

        return instance
    
    
class PropertyImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyImage
        fields = ['image', 'caption']

class PropertyFeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyFeature
        fields = ['feature']

class AgentSerializer(serializers.ModelSerializer):
    full_name = serializers.ReadOnlyField()
    
    class Meta:
        model = Agent
        fields = ['id', 'first_name', 'middle_name', 'surname', 'full_name', 
                 'cell_number', 'email', 'position', 'permissions', 
                 'agency_name', 'branch', 'address', 'is_active']


class PropertyAgentSerializer(serializers.ModelSerializer):
    agent = AgentSerializer(read_only=True)
    agent_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = PropertyAgent
        fields = ['id', 'agent', 'agent_id', 'is_primary', 'assigned_date']

class PropertyListSerializer(serializers.ModelSerializer):
    """Lightweight serializer for list views"""
    primary_image = serializers.SerializerMethodField()
    agent_name = serializers.CharField(source='agent.get_full_name', read_only=True)
    
    class Meta:
        model = Property
        fields = [
            'id', 'title', 'price', 'location', 'property_type', 'category',
            'status', 'beds', 'baths', 'area_measurement', 'area_unit',
            'primary_image', 'agent_name', 'created_at'
        ]
    
    def get_primary_image(self, obj):
        # Get first image efficiently
        first_image = obj.images.first()
        return first_image.image.url if first_image else None


class PropertyDetailSerializer(serializers.ModelSerializer):
    """Full serializer for detail views"""
    images = PropertyImageSerializer(many=True, read_only=True)
    features = PropertyFeatureSerializer(many=True, read_only=True)
    property_agents = PropertyAgentSerializer(many=True, read_only=True)
    agent_info = serializers.SerializerMethodField()
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'agent']
    
    def get_agent_info(self, obj):
        if obj.agent:
            return {
                'id': obj.agent.id,
                'name': obj.agent.get_full_name(),
                'email': obj.agent.email
            }
        return None


class PropertySerializer(serializers.ModelSerializer):
    """Standard serializer for create/update operations"""
    images = PropertyImageSerializer(many=True, required=False, read_only=True)
    features = PropertyFeatureSerializer(many=True, required=False, read_only=True)
    property_agents = PropertyAgentSerializer(many=True, required=False, read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'agent']

    def create(self, validated_data):
        # Extract and process related data
        features_data = []
        agents_data = []
        request = self.context.get('request')
        
        # Use transaction for data consistency and performance
        from django.db import transaction
        
        with transaction.atomic():
            if request:
                # Handle features
                if 'features' in request.data:
                    try:
                        features_data = json.loads(request.data.get('features', '[]'))
                        validated_data.pop('features', None)
                    except json.JSONDecodeError:
                        raise serializers.ValidationError("Invalid features format")
                
                # Handle agents
                if 'agents' in request.data:
                    try:
                        agents_data = json.loads(request.data.get('agents', '[]'))
                        validated_data.pop('agents', None)
                    except json.JSONDecodeError:
                        raise serializers.ValidationError("Invalid agents format")
            
            # Create property instance
            property_instance = Property.objects.create(**validated_data)
            
            # Bulk create features for better performance
            if features_data:
                features_to_create = []
                for feature in features_data:
                    if isinstance(feature, dict) and 'feature' in feature:
                        features_to_create.append(
                            PropertyFeature(property=property_instance, feature=feature['feature'])
                        )
                if features_to_create:
                    PropertyFeature.objects.bulk_create(features_to_create)
            
            # Bulk create property agents
            if agents_data:
                agents_to_create = []
                for agent_data in agents_data:
                    if isinstance(agent_data, dict) and 'agent_id' in agent_data:
                        try:
                            agent = Agent.objects.get(id=agent_data['agent_id'])
                            agents_to_create.append(
                                PropertyAgent(
                                    property=property_instance,
                                    agent=agent,
                                    is_primary=agent_data.get('is_primary', False)
                                )
                            )
                        except Agent.DoesNotExist:
                            continue
                if agents_to_create:
                    PropertyAgent.objects.bulk_create(agents_to_create)
            
            # Process images
            self._process_images(request, property_instance)
            
        return property_instance

    def update(self, instance, validated_data):
        from django.db import transaction
        
        with transaction.atomic():
            features_data = []
            agents_data = []
            request = self.context.get('request')
            
            if request:
                if 'features' in request.data:
                    try:
                        features_data = json.loads(request.data.get('features', '[]'))
                        validated_data.pop('features', None)
                    except json.JSONDecodeError:
                        raise serializers.ValidationError("Invalid features format")
                        
                if 'agents' in request.data:
                    try:
                        agents_data = json.loads(request.data.get('agents', '[]'))
                        validated_data.pop('agents', None)
                    except json.JSONDecodeError:
                        raise serializers.ValidationError("Invalid agents format")
            
            # Update instance
            for attr, value in validated_data.items():
                setattr(instance, attr, value)
            instance.save()
            
            # Handle deleted images
            if request and 'deleted_images' in request.data:
                try:
                    deleted_images = json.loads(request.data.get('deleted_images', '[]'))
                    if deleted_images:
                        PropertyImage.objects.filter(id__in=deleted_images).delete()
                except json.JSONDecodeError:
                    pass
            
            # Process new images
            self._process_images(request, instance)
            
            # Update features (bulk operations)
            if features_data is not None:  # Allow empty list to clear features
                instance.features.all().delete()
                if features_data:
                    features_to_create = []
                    for feature in features_data:
                        if isinstance(feature, dict) and 'feature' in feature:
                            features_to_create.append(
                                PropertyFeature(property=instance, feature=feature['feature'])
                            )
                    if features_to_create:
                        PropertyFeature.objects.bulk_create(features_to_create)
            
            # Update agents (bulk operations)
            if agents_data is not None:
                instance.property_agents.all().delete()
                if agents_data:
                    agents_to_create = []
                    for agent_data in agents_data:
                        if isinstance(agent_data, dict) and 'agent_id' in agent_data:
                            try:
                                agent = Agent.objects.get(id=agent_data['agent_id'])
                                agents_to_create.append(
                                    PropertyAgent(
                                        property=instance,
                                        agent=agent,
                                        is_primary=agent_data.get('is_primary', False)
                                    )
                                )
                            except Agent.DoesNotExist:
                                continue
                    if agents_to_create:
                        PropertyAgent.objects.bulk_create(agents_to_create)
        
        return instance
    
    def _process_images(self, request, property_instance):
        """Helper method to process images efficiently"""
        if not request:
            return
            
        images_data = request.FILES.getlist('images')
        if not images_data:
            return
            
        # Get image captions
        image_captions = []
        if 'image_captions' in request.data:
            try:
                image_captions = json.loads(request.data.get('image_captions', '[]'))
            except json.JSONDecodeError:
                pass
        
        # Create images in bulk
        images_to_create = []
        for image_data in images_data:
            caption = ""
            # Find caption for this image
            for caption_data in image_captions:
                if caption_data.get('file') == image_data.name:
                    caption = caption_data.get('caption', '')
                    break
            
            images_to_create.append(
                PropertyImage(
                    property=property_instance,
                    image=image_data,
                    caption=caption
                )
            )
        
        if images_to_create:
            for img in images_to_create:
                img.save()
        
        # Update existing image captions
        for caption_data in image_captions:
            if 'id' in caption_data and caption_data['id']:
                try:
                    PropertyImage.objects.filter(
                        id=caption_data['id']
                    ).update(caption=caption_data.get('caption', ''))
                except Exception:
                    pass

    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a positive number.")
        return value
    
    def validate_area_measurement(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Area measurement must be a positive number.")
        return value

from .models import PropertyLead, LeadSource, PropertyStat

class LeadSourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeadSource
        fields = '__all__'

class PropertyLeadSerializer(serializers.ModelSerializer):
    source = LeadSourceSerializer(read_only=True)
    source_id = serializers.PrimaryKeyRelatedField(
        queryset=LeadSource.objects.all(),
        source='source',
        write_only=True
    )
    property_title = serializers.CharField(source='property.title', read_only=True)
    agent_name = serializers.CharField(source='agent.get_full_name', read_only=True)

    class Meta:
        model = PropertyLead
        fields = '__all__'
        read_only_fields = ('created_at', 'updated_at', 'agent')

class PropertyStatSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyStat
        fields = '__all__'

class PropertyWithStatsSerializer(PropertySerializer):
    leads_count = serializers.SerializerMethodField()
    stats = serializers.SerializerMethodField()

    def get_leads_count(self, obj):
        return obj.leads.count()

    def get_stats(self, obj):
        request = self.context.get('request')
        if request and 'stats' in request.query_params:
            stats = obj.stats.all().order_by('-date')[:30]  # Last 30 days
            return PropertyStatSerializer(stats, many=True).data
        return None

class NeighborhoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Neighborhood
        fields = '__all__'

class SavedSearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavedSearch
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class FavoritePropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = FavoriteProperty
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class InquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = Inquiry
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class BlogPostSerializer(serializers.ModelSerializer):
    author = UserSerializer(read_only=True)

    class Meta:
        model = BlogPost
        fields = '__all__'
        read_only_fields = ['created_at']

class PropertyAlertSerializer(serializers.ModelSerializer):
    class Meta:
        model = PropertyAlert
        fields = '__all__'
        read_only_fields = ['user', 'created_at']

class AdminActionLogSerializer(serializers.ModelSerializer):
    admin = UserSerializer(read_only=True)
    target_user = UserSerializer(read_only=True)

    class Meta:
        model = AdminActionLog
        fields = '__all__'