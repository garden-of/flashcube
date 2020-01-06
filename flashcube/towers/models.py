from django.db import models
from django.contrib.auth.models import User

class Category(models.Model):
    category = models.CharField(max_length=200)

    class Meta:
        ordering = ('category', )

    def __str__(self):
        return self.category

class CategoryStatus(models.Model):
    CHOICES = (
        ('DL', 'Don\'t Learn'),
        ('LN', 'Learn Now'),
        ('AL', 'Already Learned')
    )

    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    category = models.ForeignKey(to='Category', on_delete=models.CASCADE)
    status = models.CharField(max_length=2, choices=CHOICES, default='DL')


class Cube(models.Model):
    name = models.CharField(max_length=200)
    tower = models.ForeignKey('Tower', on_delete=models.CASCADE)

    class Meta:
        ordering = ('tower', 'pk')

    def __str__(self):
        return '{tower}-{id}'.format(tower=self.tower, id=self.pk)

class Face(models.Model):
    value = models.CharField(max_length=200)
    cube = models.ForeignKey('Cube', on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    class Meta:
        ordering = ('cube', 'value')

    def __str__(self):
        return self.value

class Tower(models.Model):
    name = models.CharField(max_length=200)
    categories = models.ManyToManyField('Category', related_name='tower_categories')
    primary_category = models.ForeignKey('Category', on_delete=models.CASCADE)

    @property
    def num_cubes(self):
        return len(Cube.objects.filter(tower__exact=self.pk))

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name

class UserPreferences(models.Model):
    
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)

    onboarded = models.BooleanField(default=False)
    onboardingSkipped = models.BooleanField(default=False)

    baseCategory = models.ForeignKey(to='Category', on_delete=models.CASCADE, blank=True, null=True, related_name='base_category')
    learningCategories = models.ManyToManyField(to='Category', related_name='learning_categories', blank=True)
    fluentCategories = models.ManyToManyField(to='Category', related_name='fluent_categories', blank=True)
