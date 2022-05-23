from .base import *

INSTALLED_APPS = INSTALLED_APPS + [
    'storages'
]

MEDIA_URL = '{}/media/'.format(BASE_DIR)
MEDIA_ROOT = '{}/media'.format(BASE_DIR)

STATIC_URL = '{}/static/'.format(BASE_DIR)
STATIC_ROOT = '{}/static'.format(BASE_DIR)

ALLOWED_HOSTS = ['*']

AWS_S3_OBJECT_PARAMETERS = {
}

AWS_ACCESS_KEY_ID=os.environ['STATIC_S3_KEY']
AWS_DEFAULT_ACL = None
AWS_S3_REGION_NAME = 'us-east-1'
AWS_STORAGE_BUCKET_NAME = 'flashcube-stage'
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

STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

STATICFILES_STORAGE = 'flashcube.storage.StaticStorage'
STATICFILES_LOCATION = 'static'
DEFAULT_FILE_STORAGE = 'flashcube.storage.StaticStorage'
MEDIAFILES_LOCATION = 'media'

SOCIAL_AUTH_FACEBOOK_KEY = '693470401458341'
SOCIAL_AUTH_FACEBOOK_SECRET = '62bfefc6640c67e31c17cf97ada7155f'

SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '498982492232-concrlp90dbh6bcube18cilhs6c9mj54.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'sRgV51YwVu7RHjOgBPEwr7Wh'