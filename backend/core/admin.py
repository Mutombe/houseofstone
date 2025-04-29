from django.contrib import admin
from .models import Profile

class AdminProfileOverview(admin.ModelAdmin):
    list_display = (
        "user",
        "profile_picture"
    )
    search_fields = (
        "user__username",
        "user__email",
    )


admin.site.register(Profile, AdminProfileOverview)