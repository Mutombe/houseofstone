from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.conf import settings
from .models import Profile
from django.db import transaction
from django.contrib.auth.models import User  

ADMIN_EMAILS = ['admin@zim-rec.co.zw','simbamtombe@gmail.com']

@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        # Use transaction to ensure User is committed first
        transaction.on_commit(lambda: Profile.objects.create(user=instance))

@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()