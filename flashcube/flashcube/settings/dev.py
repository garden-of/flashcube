from .base import *

INSTALLED_APPS = INSTALLED_APPS + [
    'storages'
]

ALLOWED_HOSTS = ['flashcube-dev.us-east-1.elasticbeanstalk.com']

AWS_S3_OBJECT_PARAMETERS = {
}

AWS_STORAGE_BUCKET_NAME = 'flashcube-dev'
AWS_S3_REGION_NAME = 'us-east-1'

AWS_S3_CUSTOM_DOMAIN = '%s.s3.amazonaws.com' % AWS_STORAGE_BUCKET_NAME
STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'