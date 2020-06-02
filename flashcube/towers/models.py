from django.db import models
from django.contrib.auth.models import User


class Category(models.Model):
    '''
    A category equates to a language.  We call it a category for arbitrary reasons.
    '''
    category = models.CharField(max_length=200)
    abbreviation = models.CharField(max_length=2, blank=True, null=True)

    class Meta:
        ordering = ('category', )

    def __str__(self):
        return self.category


class CategoryStatus(models.Model):
    '''
    DEPRECATED
    '''
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
    '''
    A Cube makes up one entry in a tower.  A cube should be able to exist
    in the context of multiple towers.
    '''

    PART_OF_SPEECH = (
        ('NN', 'NOUN'),
        ('PN', 'PRONOUN'),
        ('VB', 'VERB'),
        ('AJ', 'ADJECTIVE'),
        ('AD', 'ADVERB'),
        ('PR', 'PREPOSITION'),
        ('CJ', 'CONJUNCTION'),
        ('IJ', 'INTERJECTION'),
    )

    name = models.CharField(max_length=200)
    tower = models.ForeignKey('Tower', on_delete=models.CASCADE)
    part_of_speech = models.CharField(max_length=2, choices=PART_OF_SPEECH)
    image = models.ImageField(blank=True, null=True, upload_to='cubes')

    class Meta:
        ordering = ('tower', 'pk')

    def __str__(self):
        return '{tower} -> {id}'.format(tower=self.tower, id=self.name)


class Collection(models.Model):
    '''
    A collection is a set of towers that share some common characteristic.
    This is mostly used for curation
    '''

    name = models.CharField(max_length=255)
    towers = models.ManyToManyField(to='Tower', blank=True, related_name='collection_towers')


class Face(models.Model):
    '''
    A face makes up one entry in a cube.
    '''

    GENDERS = (
        ('M', 'MALE'),
        ('F', 'FEMALE'),
    )

    value = models.CharField(max_length=200)
    cube = models.ForeignKey('Cube', on_delete=models.CASCADE)
    category = models.ForeignKey('Category', on_delete=models.CASCADE)
    gender = models.CharField(max_length=2, choices=GENDERS, blank=True, null=True)
    audio = models.FileField(upload_to='face_audio', null=True)
    phonetic_spelling = models.CharField(max_length=200, blank=True, null=True)

    class Meta:
        ordering = ('cube', 'value')

    def __str__(self):
        return self.value


class List(models.Model):
    '''
    A list is similar to a tower, but is owned by a specific user.  Every
    user has a default list.
    '''

    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    name = models.CharField(max_length=200, null=True, blank=True)
    cubes = models.ManyToManyField('Cube', related_name='list_cubes')
    is_default = models.BooleanField(default=False)

    class Meta:
        unique_together = ['user', 'is_default']

    def __str__(self):
        return '{} -> {}'.format(self.user, self.name)


class Locale(models.Model):
    language = models.ForeignKey(to=Category, on_delete=models.CASCADE)
    locale = models.CharField(max_length=5)

    def __str__(self):
        return self.locale


class Tower(models.Model):
    CHOICES = (
        ('B', 'Beginner'),
        ('I', 'Intermediate'),
        ('E', 'Expert'),
    )

    name = models.CharField(max_length=200)
    categories = models.ManyToManyField('Category', related_name='tower_categories')
    image = models.ImageField(blank=True, null=True, upload_to='towers')
    primary_category = models.ForeignKey('Category', on_delete=models.CASCADE)
    difficulty = models.CharField(max_length=1, choices=CHOICES, default='B')

    @property
    def num_cubes(self):
        return len(Cube.objects.filter(tower__exact=self.pk))

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name


class UserFaceStatus(models.Model):

    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    face = models.ForeignKey(to=Face, on_delete=models.CASCADE)
    level = models.IntegerField(default=0)

    def __str__(self):
        return '{user} -> {face}'.format(user=str(self.user), face=self.face)


class UserLearnEvent(models.Model):

    user = models.OneToOneField(to=User, on_delete=models.CASCADE)
    face = models.ForeignKey(to=Face, on_delete=models.CASCADE)
    event_time = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return '{user} -> {face}'.format(user=str(self.user), face=self.face)


class UserPreferences(models.Model):
    
    user = models.OneToOneField(to=User, on_delete=models.CASCADE)

    push_notifications = models.BooleanField(default=True)
    analytics = models.BooleanField(default=True)

    categoriesOnboarded = models.BooleanField(default=False)
    setsOnboarded = models.BooleanField(default=False)
    onboardingSkipped = models.BooleanField(default=False)

    baseCategory = models.ForeignKey(to='Category', on_delete=models.CASCADE, blank=True, null=True, related_name='base_category')
    learningCategories = models.ManyToManyField(to='Category', related_name='learning_categories', blank=True)
    fluentCategories = models.ManyToManyField(to='Category', related_name='fluent_categories', blank=True)

    def __str__(self):
        return str(self.user)


class UserSubscription(models.Model):

    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    tower = models.ForeignKey(to=Tower, on_delete=models.CASCADE)

    categories = models.ManyToManyField(to=Category)

    class Meta:
        unique_together = ['user', 'tower']
    
    def __str__(self):
        return '{user} -> {tower}'.format(user=str(self.user), tower=self.tower)