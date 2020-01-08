from django.contrib import admin

from . import models

admin.site.register(models.Category)
admin.site.register(models.Cube)
admin.site.register(models.Face)
admin.site.register(models.Tower)
admin.site.register(models.UserPreferences)
admin.site.register(models.UserSubscription)
