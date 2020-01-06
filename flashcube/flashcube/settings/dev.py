from .base import *

INSTALLED_APPS = INSTALLED_APPS + [
    'storages'
]

ALLOWED_HOSTS = ['*']

AWS_S3_OBJECT_PARAMETERS = {
}

AWS_STORAGE_BUCKET_NAME = 'flashcube-dev'
AWS_S3_REGION_NAME = 'us-east-1'
AWS_ACCESS_KEY_ID=os.environ['STATIC_S3_KEY']
AWS_SECRET_ACCESS_KEY=os.environ['STATIC_S3_SECRET']
AWS_DEFAULT_ACL = None

AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

SECRET_KEY = os.environ['DJANGO_SECRET_KEY']