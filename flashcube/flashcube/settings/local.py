from .base import *

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