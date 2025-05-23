from django.contrib import admin
from .models import Profile, Inquiry, Property, Neighborhood, SavedSearch, FavoriteProperty, PropertyImage, PropertyAlert, BlogPost, PropertyInteraction, AdminActionLog, Agent, PropertyAgent
from django.contrib.auth.models import User

class AdminProfileOverview(admin.ModelAdmin):
    list_display = (
        "user",
        "profile_picture"
    )
    search_fields = (
        "user__username",
        "user__email",
    )

class AdminInquiry(admin.ModelAdmin):
    list_display = (
        "property",
        "user",
        "message",
        "created_at",
    )
    search_fields = (
        "property__title",
        "user__username",
    )
    list_filter = (
        "created_at",
        "property",
    )

class AdminProperty(admin.ModelAdmin):
    list_display = (
        "title",
        "price",
        "location",
        "property_type",
        "is_published",
        "agent",
    )
    search_fields = (
        "title",
        "location",
        "agent__username",
    )
    list_filter = (
        "property_type",
        "is_published",
    )

    ordering = ("-created_at",)

class AdminNeighborhood(admin.ModelAdmin):
    list_display = (
        "name",
        "crime_rate",
        "average_price",
        "school_rating",
    )
    search_fields = (
        "name",
    )
    list_filter = (
        "crime_rate",
        "average_price",
        "school_rating",
    )

class AdminSavedSearch(admin.ModelAdmin):
    list_display = (
        "user",
        "filters",
        "created_at",
    )
    search_fields = (
        "user__username",
    )
    list_filter = (
        "created_at",
    )

class AdminFavoriteProperty(admin.ModelAdmin):
    list_display = (
        "user",
        "property",
        "created_at",
    )
    search_fields = (
        "user__username",
        "property__title",
    )
    list_filter = (
        "created_at",
    )

class AdminPropertyImage(admin.ModelAdmin):
    list_display = (
        "property",
        "image",
        "caption",
    )
    search_fields = (
        "property__title",
    )
    list_filter = (
        "property",
    )

class AdminPropertyAlert(admin.ModelAdmin):
    list_display = (
        "user",
        "search_parameters",
        "is_active",
        "created_at",
    )
    search_fields = (
        "user__username",
    )
    list_filter = (
        "is_active",
        "created_at",
    )

class AdminBlogPost(admin.ModelAdmin):
    list_display = (
        "title",
        "author",
        "created_at",
    )
    search_fields = (
        "title",
        "author__username",
    )
    list_filter = (
        "created_at",
    )

class AdminActionLogOverview(admin.ModelAdmin):
    list_display = (
        "admin",
        "action_type",
        "target_user",
        "timestamp",
    )
    search_fields = (
        "admin__username",
        "target_user__username",
    )
    list_filter = (
        "action_type",
        "timestamp",
    )

    ordering = ("-timestamp",)

class AdminAgent(admin.ModelAdmin):
    list_display = (
        "first_name",
        "surname",
        "email",
    )
    search_fields = (
        "first_name",
        "email",
    )

    ordering = ("first_name",)

class AdminPropertyAgent(admin.ModelAdmin):
    list_display = (
        "agent",
        "property",
        "assigned_date",
    )
    search_fields = (
        "agent__first_name",
        "property__title",
    )
    list_filter = (
        "assigned_date",
    )


admin.site.register(Profile, AdminProfileOverview)
admin.site.register(Inquiry, AdminInquiry)
admin.site.register(Property, AdminProperty)
admin.site.register(Neighborhood, AdminNeighborhood)
admin.site.register(SavedSearch, AdminSavedSearch)
admin.site.register(FavoriteProperty, AdminFavoriteProperty)
admin.site.register(PropertyImage, AdminPropertyImage)
admin.site.register(PropertyAlert, AdminPropertyAlert)
admin.site.register(BlogPost, AdminBlogPost)    
admin.site.register(Agent, AdminAgent)
admin.site.register(PropertyAgent, AdminPropertyAgent)
admin.site.register(PropertyInteraction)
admin.site.register(AdminActionLog, AdminActionLogOverview)