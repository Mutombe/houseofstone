from datetime import timedelta
from pathlib import Path
import os
from celery.schedules import crontab
from storages.backends.s3boto3 import S3Boto3Storage

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-5bqgh2slk^ptynj2!+b!-7q)^@^_-k*)n0h)86v@*7e67w$(cs"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'houseofstone-backend.onrender.com',
    'houseofstone.onrender.com',
    'localhost',
    '127.0.0.1'
]


# Application definition

INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",

    "rest_framework",
    "rest_framework_simplejwt",
    'django_plotly_dash.apps.DjangoPlotlyDashConfig',
    "corsheaders",
    'django_filters',
    'storages',
    'core'
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.middleware.security.SecurityMiddleware",
    "core.middleware.InteractionTrackingMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

CORS_ALLOWED_ORIGINS = [
    'https://houseofstone.onrender.com',  
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]

CORS_TRUSTED_ORIGINS = [
    'https://houseofstone.onrender.com/',
    'http://localhost:5173',
]

CORS_ALLOW_CREDENTIALS = True

CORS_ALLOW_METHODS = [
    'DELETE',
    'GET',
    'OPTIONS',
    'PATCH',
    'POST',
    'PUT',
]

CORS_ALLOW_HEADERS = [
    'accept',
    'accept-encoding',
    'authorization',
    'content-type',
    'dnt',
    'origin',
    'user-agent',
    'x-csrftoken',
    'x-requested-with',
]

CORS_EXPOSE_HEADERS = ['content-type', 'authorization']
CORS_ALLOW_ORIGINS = True
CORS_ALLOW_CREDENTIALS = True
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    
    # Ensure these are set correctly
    'AUTH_HEADER_TYPES': ('Bearer',),
    'AUTH_HEADER_NAME': 'HTTP_AUTHORIZATION',
    
    # Optional: Add more detailed token settings
    'USER_ID_FIELD': 'id',
    'USER_ID_CLAIM': 'user_id',
}

CELERY_BEAT_SCHEDULE = {
    'check-property-alerts': {
        'task': 'core.tasks.check_property_alerts',
        'schedule': crontab(hour=8, minute=0),  # Daily at 8 AM
    },
}

# For Celery
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_TIMEZONE = 'UTC'

# For sharing links
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://houseofstone.onrender.com')

AUTHENTICATION_BACKENDS = [
   'django.contrib.auth.backends.ModelBackend',
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/5.1/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'b40jo2oyltz8cfy1jcv4',
        'USER': 'uuel8zecfxqadadxdste',
        'PASSWORD': 'prd2ZjHCi5UQatnNZt0QkL2VCVWXUd',
        'HOST': 'b40jo2oyltz8cfy1jcv4-postgresql.services.clever-cloud.com',
        'PORT': '50013',
    }
}


# Password validation
# https://docs.djangoproject.com/en/5.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
        
    ],
    'DEFAULT_PARSER_CLASSES': [
        'rest_framework.parsers.JSONParser',
        'rest_framework.parsers.MultiPartParser',
    ],
    'DEFAULT_PERMISSION_CLASSES': (
        'rest_framework.permissions.AllowAny',
    ),
    'DEFAULT_FILTER_BACKENDS': [
        'django_filters.rest_framework.DjangoFilterBackend',
        'rest_framework.filters.SearchFilter',
    ],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 10
}

# Internationalization
# https://docs.djangoproject.com/en/5.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/5.1/howto/static-files/
import os

STATIC_URL = "static/"
STATIC_ROOT = os.path.join(BASE_DIR, 'static/')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')


AWS_ACCESS_KEY_ID = 'Y8RA26DFTZA0AZDY2GR5'
AWS_SECRET_ACCESS_KEY = '0ZCeRndoyvHbJy46GS9G2ZCgJluJDH1KhbNeDwS6'
AWS_STORAGE_BUCKET_NAME = 'hsp1'
AWS_S3_ENDPOINT_URL = 'https://cellar-c2.services.clever-cloud.com'
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.cellar-c2.services.clever-cloud.com'
AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
AWS_DEFAULT_ACL = 'public-read'
AWS_QUERYSTRING_AUTH = False

AWS_STORAGE_BUCKET_NAME = 'hsp1'  # Your actual bucket name
AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.cellar-c2.services.clever-cloud.com'
AWS_S3_ENDPOINT_URL = 'https://cellar-c2.services.clever-cloud.com'
AWS_S3_ADDRESSING_STYLE = 'virtual'  # Crucial for Clever Cloud

STATICFILES_LOCATION = 'static'
MEDIAFILES_LOCATION = 'media'

class StaticStorage(S3Boto3Storage):
    location = STATICFILES_LOCATION
    default_acl = 'public-read'
    file_overwrite = False
    bucket_name = AWS_STORAGE_BUCKET_NAME 


class MediaStorage(S3Boto3Storage):
    location = MEDIAFILES_LOCATION
    default_acl = 'public-read'
    file_overwrite = False
    bucket_name = AWS_STORAGE_BUCKET_NAME  


# Storage configurations
STATICFILES_STORAGE = 'core.settings.StaticStorage'
DEFAULT_FILE_STORAGE = 'core.settings.MediaStorage'

# URLs (automatically generated by django-storages)

STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/static/'
MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/media/'

# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
