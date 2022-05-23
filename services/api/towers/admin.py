from django.contrib import admin

from import_export import resources
from import_export.admin import ImportExportModelAdmin

from . import models

class CategoryResource(resources.ModelResource):

  class Meta:
    model = models.Category

class CategoryAdmin(ImportExportModelAdmin):
  resource_class = CategoryResource
  list_display = ('id', 'abbreviation', 'category')
  search_fields = ('abbreviation', 'category')


admin.site.register(models.Category, CategoryAdmin)


class CollectionResource(resources.ModelResource):

  class Meta:
    model = models.Collection

class CollectionAdmin(ImportExportModelAdmin):
  resource_class = CollectionResource
  list_display = ('id', 'name')
  search_fields = ('name',)

admin.site.register(models.Collection, CollectionAdmin)


class CubeResource(resources.ModelResource):

  class Meta:
    model = models.Cube

class CubeAdmin(ImportExportModelAdmin):
  resource_class = CubeResource
  list_display = ('id', 'name', 'part_of_speech', 'gender')
  search_fields = ('name', 'part_of_speech')
  list_filter = ('part_of_speech', 'gender')

  choices_part_of_speech = models.Cube.PART_OF_SPEECH
  choices_gender = models.Cube.GENDERS

admin.site.register(models.Cube, CubeAdmin)


class FaceResource(resources.ModelResource):

  class Meta:
    model = models.Face

class FaceAdmin(ImportExportModelAdmin):
  resource_class = FaceResource
  list_display = ('id', 'value', 'cube', 'category', 'gender', 'phonetic_spelling')
  search_fields = ('name', 'value', 'phonetic_spelling')
  list_filter = ('gender', 'category')

  choices_gender = models.Face.GENDERS

admin.site.register(models.Face, FaceAdmin)


class TowerResource(resources.ModelResource):

  class Meta:
    model = models.Tower

class TowerAdmin(ImportExportModelAdmin):
  resource_class = TowerResource
  list_display = ('id', 'name', 'primary_category', 'difficulty')
  search_fields = ('name',)
  list_filter = ('primary_category', 'difficulty')

  choices_difficulty = models.Tower.DIFFICULTIES

admin.site.register(models.Tower, TowerAdmin)

admin.site.register(models.List)
admin.site.register(models.Locale)
admin.site.register(models.UserLearnEvent)
admin.site.register(models.UserPreferences)
admin.site.register(models.UserSubscription)