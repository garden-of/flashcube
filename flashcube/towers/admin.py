from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportActionModelAdmin

from . import models

class CategoryResource(resources.ModelResource):
    class Meta:
        model = models.Category

class CategoryAdmin(ImportExportActionModelAdmin):
    resource_class = CategoryResource


class CubeResource(resources.ModelResource):
    class Meta:
        model = models.Cube

class CubeAdmin(ImportExportActionModelAdmin):
    resource_class = CubeResource


class FaceResource(resources.ModelResource):
    class Meta:
        model = models.Face

class FaceAdmin(ImportExportActionModelAdmin):
    resource_class = FaceResource


class ListResource(resources.ModelResource):
    class Meta:
        model = models.List

class ListAdmin(ImportExportActionModelAdmin):
    resource_class = ListResource


class TowerResource(resources.ModelResource):
    class Meta:
        model = models.Tower

class TowerAdmin(ImportExportActionModelAdmin):
    resource_class = TowerResource


admin.site.register(models.Category, CategoryAdmin)
admin.site.register(models.Cube, CubeAdmin)
admin.site.register(models.Face, FaceAdmin)
admin.site.register(models.List, ListAdmin)
admin.site.register(models.Tower, TowerAdmin)

# these dont need bulk actions
admin.site.register(models.UserLearnEvent)
admin.site.register(models.UserPreferences)
admin.site.register(models.UserSubscription)