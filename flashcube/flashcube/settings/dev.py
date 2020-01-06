from .base import *

ALLOWED_HOSTS = ['flashcube-dev.us-east-1.elasticbeanstalk.com']

STATIC_ROOT = os.path.join(BASE_DIR, "..", "www", "static")
STATIC_URL = '/static/'