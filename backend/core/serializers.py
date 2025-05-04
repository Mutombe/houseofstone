from rest_framework import serializers
from django.contrib.auth.models import User  
from .models import BlogPost, Profile, Property, Neighborhood, SavedSearch, FavoriteProperty, Inquiry, PropertyImage, PropertyAlert, AdminActionLog
from django.contrib.auth import authenticate
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from decimal import Decimal

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "is_active", "is_staff", "is_superuser")

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

class PropertySerializer(serializers.ModelSerializer):
    images = PropertyImageSerializer(many=True, read_only=True)
    agent = UserSerializer(read_only=True)
    
    class Meta:
        model = Property
        fields = '__all__'
        read_only_fields = ['created_at', 'updated_at']

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