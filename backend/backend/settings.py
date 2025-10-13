from datetime import timedelta
from pathlib import Path
import os
from celery.schedules import crontab

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/5.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = "django-insecure-5bqgh2slk^ptynj2!+b!-7q)^@^_-k*)n0h)86v@*7e67w$(cs"

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = [
    'hsp.co.zw',
    'houseofstone-backend.onrender.com',
    'houseofstone.onrender.com',
    'localhost',
    '127.0.0.1'
]

CORS_ALLOWED_ORIGINS = [
    'https://hsp.co.zw',
    'https://houseofstone.onrender.com',
    'https://houseofstone-backend.onrender.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
]

CORS_TRUSTED_ORIGINS = [
    'https://hsp.co.zw',
    'https://houseofstone.onrender.com',
    'https://houseofstone-backend.onrender.com',
    'http://localhost:5173',
    'http://127.0.0.1:5173'
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

# Security settings for production
CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True
CSRF_TRUSTED_ORIGINS = [
    'https://hsp.co.zw',
    'https://houseofstone.onrender.com',
    'https://houseofstone-backend.onrender.com',
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
    'core.middleware.AdminActionLoggingMiddleware',
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
]

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
# For Celery
CELERY_BROKER_URL = 'redis://localhost:6379/0'
CELERY_RESULT_BACKEND = 'redis://localhost:6379/0'
CELERY_TIMEZONE = 'UTC'

# For sharing links
FRONTEND_URL = os.environ.get('FRONTEND_URL', 'https://houseofstone.onrender.com')

ADMIN_BASE_URL = 'hsp.co.zw'
ADMINS = [('HSP Admin', 'simbamtombe@gmail.com'), ('HSP Admin', 'sales@hsp.co.zw'), ('HSP Admin', 'info@hsp.co.zw'),('HSP Admin', 'leonita@hsp.co.zw',)]
APP_NAME = 'House of Stone Properties'

# settings.py
# Email Configuration (Development)
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'mail.hsp.co.zw'  # Hostinger's SMTP server
EMAIL_PORT = 587  # 465 for SSL
EMAIL_USE_TLS = True  # Use False if using port 465
EMAIL_USE_SSL = False  # Use True if using port 465
EMAIL_HOST_USER = 'sales@hsp.co.zw'
EMAIL_HOST_PASSWORD = 'saleshsp2025!'  # Password you set in Hostinger email account
DEFAULT_FROM_EMAIL = 'HSP <sales@hsp.co.zw>'
SERVER_EMAIL = 'sales@hsp.co.zw'  # For error notifications
SITE_NAME = "House of Stone Properties"

# Celery settings for async email sending (optional but recommended)
CELERY_BEAT_SCHEDULE = {
    'check-property-alerts': {
        'task': 'core.tasks.check_property_alerts',
        'schedule': crontab(hour=8, minute=0),  # Daily at 8 AM
    },
    'weekly-summary': {
        'task': 'core.tasks.send_weekly_summary',
        'schedule': crontab(hour=9, minute=0, day_of_week=1),  # Monday at 9 AM
    },
    'cleanup-expired-shares': {
        'task': 'core.tasks.cleanup_old_shares',
        'schedule': crontab(minute=0, hour=2),  # Daily at 2 AM
    },
}

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'email_notifications.log'),
        },
        'console': {
            'level': 'INFO',
            'class': 'logging.StreamHandler',
        },
    },
    'loggers': {
        'core.signals': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
        'core.tasks': {
            'handlers': ['file', 'console'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

AUTHENTICATION_BACKENDS = [
   'django.contrib.auth.backends.ModelBackend',
]

ROOT_URLCONF = "backend.urls"

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [BASE_DIR / "core/templates"],
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
        'NAME': 'hsp_happenedas',
        'USER': 'hsp_happenedas',
        'PASSWORD': '1ded449b4cd79a95dc08aa352f8da2b1bb705c60',
        'HOST': '10f9ml.h.filess.io',
        'PORT': '5434',
        'CONN_MAX_AGE': 0,
        'OPTIONS': {
            'options': '-c search_path=django_schema,public',
            'connect_timeout': 5,
        },
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


# Default primary key field type
# https://docs.djangoproject.com/en/5.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"
