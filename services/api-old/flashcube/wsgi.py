"""
WSGI config for flashcube project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/howto/deployment/wsgi/
"""

import os

from django.core.wsgi import get_wsgi_application

<<<<<<< HEAD:services/api-old/flashcube/wsgi.py
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flashcube.settings.base')
=======
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'flashcube.settings.local')
>>>>>>> 42d03479639db545cb8a5ad1e4d410abc5abf137:flashcube/flashcube/wsgi.py

application = get_wsgi_application()
