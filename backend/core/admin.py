from django.contrib import admin
from .models import Profile, Inquiry, Property, Neighborhood, SavedSearch, FavoriteProperty, PropertyImage

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
    prepopulated_fields = {"id": ("title",)}

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



admin.site.register(Profile, AdminProfileOverview)
admin.site.register(Inquiry, AdminInquiry)
admin.site.register(Property, AdminProperty)
admin.site.register(Neighborhood, AdminNeighborhood)
admin.site.register(SavedSearch, AdminSavedSearch)
admin.site.register(FavoriteProperty, AdminFavoriteProperty)
admin.site.register(PropertyImage, AdminPropertyImage)