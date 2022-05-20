from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportModelAdmin

from . import models

class CategoryResource(resources.ModelResource):

  class Meta:
    model = models.Category

class CategoryAdmin(ImportExportModelAdmin):
  resource_class = CategoryResource

admin.site.register(models.Category, CategoryAdmin)


class CollectionResource(resources.ModelResource):

  class Meta:
    model = models.Collection

class CollectionAdmin(ImportExportModelAdmin):
  resource_class = CollectionResource

admin.site.register(models.Collection, CollectionAdmin)


class CubeResource(resources.ModelResource):

  class Meta:
    model = models.Cube

class CubeAdmin(ImportExportModelAdmin):
  resource_class = CubeResource

admin.site.register(models.Cube, CubeAdmin)


class FaceResource(resources.ModelResource):

  class Meta:
    model = models.Face

class FaceAdmin(ImportExportModelAdmin):
  resource_class = FaceResource

admin.site.register(models.Face, FaceAdmin)


class TowerResource(resources.ModelResource):

  class Meta:
    model = models.Tower

class TowerAdmin(ImportExportModelAdmin):
  resource_class = TowerResource

admin.site.register(models.Tower, TowerAdmin)

admin.site.register(models.List)
admin.site.register(models.Locale)
admin.site.register(models.UserLearnEvent)
admin.site.register(models.UserPreferences)
admin.site.register(models.UserSubscription)