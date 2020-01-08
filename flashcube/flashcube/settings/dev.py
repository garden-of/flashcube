from .base import *

INSTALLED_APPS = INSTALLED_APPS + [
    'storages'
]

ALLOWED_HOSTS = ['*']

AWS_S3_OBJECT_PARAMETERS = {
}

AWS_ACCESS_KEY_ID=os.environ['STATIC_S3_KEY']
AWS_DEFAULT_ACL = None
AWS_S3_REGION_NAME = 'us-east-1'
AWS_STORAGE_BUCKET_NAME = 'flashcube-dev'
AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
AWS_SECRET_ACCESS_KEY=os.environ['STATIC_S3_SECRET']

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'file': {
            'level': 'DEBUG',
            'class': 'logging.FileHandler',
            'filename': '/var/log/flashcube/django.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'DEBUG',
            'propagate': True,
        },
    },
}

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']

STATICFILES_STORAGE = 'flashcube.storage.StaticStorage'
STATICFILES_LOCATION = 'static'
DEFAULT_FILE_STORAGE = 'flashcube.storage.StaticStorage'
MEDIAFILES_LOCATION = 'media'