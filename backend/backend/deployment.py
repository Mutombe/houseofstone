# deployment_Settings.py
from datetime import timedelta
import os
from .settings import *
from .settings import BASE_DIR

# SECURITY SETTINGS
ALLOWED_HOSTS = [
    os.environ.get('RENDER_EXTERNAL_HOSTNAME'),
    'houseofstone-backend.onrender.com',
    'houseofstone-frontend.onrender.com',
    'houseofstone-backend1.onrender.com',
    'houseofstone.onrender.com',
    'hsp.co.zw/'
]

DEBUG = True
SECRET_KEY = SECRET_KEY

# CORS SETTINGS
CORS_ALLOWED_ORIGINS = [
    'https://hsp.co.zw',
    'https://houseofstone.onrender.com',
     'https://houseofstone-frontend.onrender.com',
    'https://houseofstone-backend.onrender.com',
    'https://houseofstone-backend1.onrender.com',
    'http://localhost:5177',
    'http://127.0.0.1:5177'
]

CORS_TRUSTED_ORIGINS = [
    'https://hsp.co.zw',
    'https://houseofstone.onrender.com',
     'https://houseofstone-frontend.onrender.com',
    'https://houseofstone-backend.onrender.com',
    'https://houseofstone-backend1.onrender.com',
    'http://localhost:5177',
    'http://127.0.0.1:5177'
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

# MIDDLEWARE CONFIGURATION
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'core.middleware.InteractionTrackingMiddleware',
    'core.middleware.AdminActionLoggingMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

# STATIC FILES CONFIGURATION
STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'static')

# MEDIA FILES CONFIGURATION
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# DATABASE CONFIGURATION
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'hsp_happenedas',
        'USER': 'hsp_happenedas',
        'PASSWORD': '1ded449b4cd79a95dc08aa352f8da2b1bb705c60',
        'HOST': '10f9ml.h.filess.io',
        'PORT': '5434',
        'CONN_MAX_AGE': 600,  # ✅ Persistent connections
        'OPTIONS': {
            'options': '-c search_path=django_schema,public',
            'connect_timeout': 5,
        },
    }
}

# SECURITY MIDDLEWARE SETTINGS
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')
SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
SECURE_HSTS_SECONDS = 31536000  # 1 year
SECURE_HSTS_INCLUDE_SUBDOMAINS = True
SECURE_HSTS_PRELOAD = True

# REST FRAMEWORK SETTINGS
REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': [ 
        'rest_framework.authentication.SessionAuthentication',
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    ],
    'DEFAULT_PERMISSION_CLASSES': [
       'rest_framework.permissions.AllowAny',
    ],
    'DEFAULT_RENDERER_CLASSES': [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.parsers.MultiPartParser',
    ] if not DEBUG else [
        'rest_framework.renderers.JSONRenderer',
        'rest_framework.renderers.BrowsableAPIRenderer',
    ],
}

# settings.py
CACHES = {
    'default': {
        'BACKEND': 'django_redis.cache.RedisCache',
        'LOCATION': 'redis://127.0.0.1:6379/1',
        'OPTIONS': {
            'CLIENT_CLASS': 'django_redis.client.DefaultClient',
            'PARSER_CLASS': 'redis.connection.HiredisParser',
            'CONNECTION_POOL_CLASS_KWARGS': {
                'max_connections': 50
            }
        }
    }
}

# deployment_Settings.py
SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': timedelta(minutes=60),
    'REFRESH_TOKEN_LIFETIME': timedelta(days=1),
    'ROTATE_REFRESH_TOKENS': False,
    'BLACKLIST_AFTER_ROTATION': True,
    'AUTH_HEADER_TYPES': ('Bearer',),
}

# SESSION SETTINGS
SESSION_ENGINE = 'django.contrib.sessions.backends.db'
SESSION_COOKIE_AGE = 1209600  # 2 weeks in seconds
SESSION_COOKIE_HTTPONLY = True
SESSION_COOKIE_NAME = 'sessionid'
SESSION_COOKIE_SAMESITE = 'Lax'

# Logging configuration
LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'console': {
            'class': 'logging.StreamHandler',
        },
    },
    'root': {
        'handlers': ['console'],
        'level': 'INFO',
    },
    'loggers': {
        'django': {
            'handlers': ['console'],
            'level': os.getenv('DJANGO_LOG_LEVEL', 'INFO'),
            'propagate': False,
        },
    },
}

# File Upload Settings
FILE_UPLOAD_MAX_MEMORY_SIZE = 5242880  
DATA_UPLOAD_MAX_MEMORY_SIZE = 5242880  