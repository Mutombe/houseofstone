# dospace/storage.py
# Custom storage backends for DigitalOcean Spaces

from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings


class StaticStorage(S3Boto3Storage):
    """
    Storage backend for static files on DigitalOcean Spaces.
    """
    location = 'static'
    default_acl = 'public-read'
    file_overwrite = True
    custom_domain = settings.AWS_S3_CUSTOM_DOMAIN


class MediaStorage(S3Boto3Storage):
    """
    Storage backend for media files (user uploads) on DigitalOcean Spaces.
    """
    location = 'media'
    default_acl = 'public-read'
    file_overwrite = False
    custom_domain = settings.AWS_S3_CUSTOM_DOMAIN

    def get_accessed_time(self, name):
        # DigitalOcean Spaces doesn't support accessed time
        raise NotImplementedError("DigitalOcean Spaces doesn't support accessed time")

    def get_created_time(self, name):
        # DigitalOcean Spaces doesn't support created time
        raise NotImplementedError("DigitalOcean Spaces doesn't support created time")


class PublicMediaStorage(S3Boto3Storage):
    """
    Public media storage for files that should be publicly accessible.
    """
    location = 'media/public'
    default_acl = 'public-read'
    file_overwrite = False
    custom_domain = settings.AWS_S3_CUSTOM_DOMAIN


class PrivateMediaStorage(S3Boto3Storage):
    """
    Private media storage for files that require authentication.
    """
    location = 'media/private'
    default_acl = 'private'
    file_overwrite = False
    custom_domain = None  # Use signed URLs for private files
    querystring_auth = True
    querystring_expire = 3600  # URLs expire after 1 hour
