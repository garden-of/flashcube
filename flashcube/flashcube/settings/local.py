from .base import *

MEDIA_URL = '{}/media/'.format(BASE_DIR)
MEDIA_ROOT = '{}/media'.format(BASE_DIR)

SOCIAL_AUTH_FACEBOOK_KEY = '468157980709865'
SOCIAL_AUTH_FACEBOOK_SECRET = '768569f75055b9375cdf36035e896155'
SOCIAL_AUTH_FACEBOOK_SCOPE = ['email']
SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '498982492232-14fjiq7gc2rjaq4668q8jnnqncpqht98.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'vLALpmtKcH0HN91aMD9c3HLj'

# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'flashcube',
        'USER': 'flashcube',
        'PASSWORD': 'flashcube',
        'HOST': 'localhost',
        'PORT': '',
    }
}

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'oauth2_provider.contrib.rest_framework.OAuth2Authentication',
        'rest_framework_social_oauth2.authentication.SocialAuthentication',
        'rest_framework.authentication.BasicAuthentication',
        'rest_framework.authentication.SessionAuthentication',
    ),
    'DEFAULT_FILTERING_BACKEND': 'flashcube.filters.AllDjangoFilterBackend',
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.PageNumberPagination',
    'PAGE_SIZE': 100
}