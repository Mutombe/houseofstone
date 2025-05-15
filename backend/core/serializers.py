import json
from rest_framework import serializers
from django.contrib.auth.models import User  
from .models import BlogPost, Profile, Property, PropertyFeature, Neighborhood, SavedSearch, FavoriteProperty, Inquiry, PropertyImage, PropertyAlert, AdminActionLog
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

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, required=False)
    features = PropertyFeatureSerializer(many=True, required=False)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at', 'agent']

    def create(self, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        features_data = validated_data.pop('features', [])
        property = super().create(validated_data)
        
        # Create images
        for image_data in images_data:
            PropertyImage.objects.create(property=property, image=image_data)
        
        # Create features
        for feature in features_data:
            PropertyFeature.objects.create(property=property, **feature)
        
        return property

    def update(self, instance, validated_data):
        images_data = self.context['request'].FILES.getlist('images')
        features_data = validated_data.pop('features', [])
        deleted_images = json.loads(self.context['request'].data.get('deleted_images', '[]'))
        
        # Update instance
        instance = super().update(instance, validated_data)
        
        # Delete removed images
        PropertyImage.objects.filter(id__in=deleted_images).delete()
        
        # Add new images with captions
        image_captions = json.loads(self.context['request'].data.get('image_captions', '[]'))
        for idx, image_data in enumerate(images_data):
            caption = image_captions[idx]['caption'] if idx < len(image_captions) else ''
            PropertyImage.objects.create(property=instance, image=image_data, caption=caption)
        
        # Update existing image captions
        for caption_data in image_captions:
            if 'id' in caption_data:
                image = PropertyImage.objects.get(id=caption_data['id'])
                image.caption = caption_data.get('caption', '')
                image.save()
        
        # Replace features
        instance.features.all().delete()
        for feature in features_data:
            PropertyFeature.objects.create(property=instance, **feature)
        
        return instance
    
    def validate_price(self, value):
        if value < 0:
            raise serializers.ValidationError("Price must be a positive number.")
        return value
    
    def validate_features(self, value):
        if not isinstance(value, list):
            raise serializers.ValidationError("Features must be a list")
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