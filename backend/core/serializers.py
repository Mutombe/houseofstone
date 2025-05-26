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

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "is_staff", "is_superuser", 'is_active', 'date_joined', 'last_login')

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

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, required=False, read_only=True)
    features = PropertyFeatureSerializer(many=True, required=False)
    agents = serializers.SerializerMethodField()
    property_agents = PropertyAgentSerializer(many=True, required=False, read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'agent']

    def get_agents(self, obj):
        return PropertyAgentSerializer(
            obj.property_agents.all(),
            many=True
        ).data

    def create(self, validated_data):
        # Extract and remove features data (it's now a JSON string from frontend)
        features_data = []
        agents_data = []
        request = self.context.get('request')
            
        if request:
            # Handle features
            if 'features' in request.data:
                try:
                    features_data = json.loads(request.data.get('features', '[]'))
                    if 'features' in validated_data:
                        validated_data.pop('features')
                except json.JSONDecodeError:
                    raise serializers.ValidationError("Invalid features format")
            
            # Handle agents
            if 'agents' in request.data:
                try:
                    agents_data = json.loads(request.data.get('agents', '[]'))
                    if 'agents' in validated_data:
                        validated_data.pop('agents')
                except json.JSONDecodeError:
                    raise serializers.ValidationError("Invalid agents format")
        
        # Create property instance first
        property = Property.objects.create(**validated_data)
        
        # Process images
        images_data = request.FILES.getlist('images') if request else []
        
        # Get image captions if provided
        image_captions = []
        if request and 'image_captions' in request.data:
            try:
                image_captions = json.loads(request.data.get('image_captions', '[]'))
            except json.JSONDecodeError:
                pass
        
        # Create images with captions
        for index, image_data in enumerate(images_data):
            caption = ""
            # Find caption for this image if it exists
            for caption_data in image_captions:
                if caption_data.get('file') == image_data.name:
                    caption = caption_data.get('caption', '')
                    break
            
            PropertyImage.objects.create(
                property=property, 
                image=image_data,
                caption=caption
            )
        
        # Create features
        for feature in features_data:
            if isinstance(feature, dict) and 'feature' in feature:
                PropertyFeature.objects.create(property=property, feature=feature['feature'])


                # Create property-agent relationships
        for agent_data in agents_data:
            if isinstance(agent_data, dict) and 'agent_id' in agent_data:
                try:
                    agent = Agent.objects.get(id=agent_data['agent_id'])
                    PropertyAgent.objects.create(
                        property=property,
                        agent=agent,
                        is_primary=agent_data.get('is_primary', False)
                    )
                except Agent.DoesNotExist:
                    continue
        
        return property

    def update(self, instance, validated_data):
        # Handle features similar to create method
        features_data = []
        agents_data = []
        request = self.context.get('request')
        
        if request and 'features' in request.data:
            try:
                features_data = json.loads(request.data.get('features', '[]'))
                if 'features' in validated_data:
                    validated_data.pop('features')
            except json.JSONDecodeError:
                raise serializers.ValidationError("Invalid features format")
                
        if 'agents' in self.context['request'].data:
            agents_data = json.loads(self.context['request'].data['agents'])
        
        # Update instance
        instance = super().update(instance, validated_data)
        
        # Delete removed images
        if request and 'deleted_images' in request.data:
            try:
                deleted_images = json.loads(request.data.get('deleted_images', '[]'))
                PropertyImage.objects.filter(id__in=deleted_images).delete()
            except json.JSONDecodeError:
                pass
        
        # Add new images with captions
        images_data = request.FILES.getlist('images') if request else []
        image_captions = []
        
        if request and 'image_captions' in request.data:
            try:
                image_captions = json.loads(request.data.get('image_captions', '[]'))
            except json.JSONDecodeError:
                pass
        
        # Create new images with captions
        for image_data in images_data:
            caption = ""
            # Find caption for this image if it exists
            for caption_data in image_captions:
                if caption_data.get('file') == image_data.name:
                    caption = caption_data.get('caption', '')
                    break
            
            PropertyImage.objects.create(
                property=instance, 
                image=image_data,
                caption=caption
            )
        
        # Update existing image captions
        for caption_data in image_captions:
            if 'id' in caption_data and caption_data['id']:
                try:
                    image = PropertyImage.objects.get(id=caption_data['id'])
                    image.caption = caption_data.get('caption', '')
                    image.save()
                except PropertyImage.DoesNotExist:
                    pass
        
        # Replace features
        instance.features.all().delete()
        for feature in features_data:
            if isinstance(feature, dict) and 'feature' in feature:
                PropertyFeature.objects.create(property=instance, feature=feature['feature'])

        instance.property_agents.all().delete()
        for agent_data in agents_data:
            PropertyAgent.objects.create(
                property=instance,
                agent_id=agent_data['agent_id'],
                is_primary=agent_data.get('is_primary', False)
            )
        
        return instance
    
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a positive number.")
        return value
    
    def validate_features(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Features must be a list")
        return value
    
    def validate_area_measurement(self, value):
        if value is not None and value < 0:
            raise serializers.ValidationError("Area measurement must be a positive number.")
        return value
    
    def validate_agents(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Agents must be a list")
        for agent in value:
            if not isinstance(agent, dict) or 'agent_id' not in agent:
                raise serializers.ValidationError("Invalid agent format")
        return value
    

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