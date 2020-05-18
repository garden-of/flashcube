from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    category = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length=2, blank=True, null=True)

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

    def __str__(self):
        return '{user} -> {category}'.format(user=self.user, category=self.category)


class Cube(models.Model):
    name = models.CharField(max_length=200)
    tower = models.ForeignKey('Tower', on_delete=models.CASCADE)

    class Meta:
        ordering = ('tower', 'pk')

    def __str__(self):
        return '{tower} -> {id}'.format(tower=self.tower, id=self.name)


class Face(models.Model):
    value = models.CharField(max_length=200)
    cube = models.ForeignKey('Cube', on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)

    class Meta:
        ordering = ('cube', 'value')

    def __str__(self):
        return self.value


class List(models.Model):

    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    name = models.TextField(max_length=200, null=True, blank=True)
    cubes = models.ManyToManyField('Cube', related_name='list_cubes')

    def __str__(self):
        return '{} -> {}'.format(self.user, self.name)


class Tower(models.Model):
    CHOICES = (
        ('B', 'Beginner'),
        ('I', 'Intermediate'),
        ('E', 'Expert'),
    )
    
    name = models.CharField(max_length=200)
    categories = models.ManyToManyField('Category', related_name='tower_categories')
    image = models.ImageField(blank=True, null=True)
    primary_category = models.ForeignKey('Category', on_delete=models.CASCADE)
    difficulty = models.CharField(max_length=1, choices=CHOICES, default='B')

    @property
    def num_cubes(self):
        return len(Cube.objects.filter(tower__exact=self.pk))

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class UserLearnEvent(models.Model):

    user = models.OneToOneField(to=User, on_delete=models.CASCADE)


class UserPreferences(models.Model):
    
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)

    categoriesOnboarded = models.BooleanField(default=False)
    setsOnboarded = models.BooleanField(default=False)
    onboardingSkipped = models.BooleanField(default=False)

    baseCategory = models.ForeignKey(to='Category', on_delete=models.CASCADE, blank=True, null=True, related_name='base_category')
    learningCategories = models.ManyToManyField(to='Category', related_name='learning_categories', blank=True)
    fluentCategories = models.ManyToManyField(to='Category', related_name='fluent_categories', blank=True)

    def __str__(self):
        return self.user


class UserSubscription(models.Model):

    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    tower = models.ForeignKey(to=Tower, on_delete=models.CASCADE)

    categories = models.ManyToManyField(to=Category)

    class Meta:
        unique_together = ['user', 'tower']
    
    def __str__(self):
        return '{user} -> {tower}'.format(user=self.user, tower=self.tower)