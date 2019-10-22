from django.db import models

class Category(models.Model):
    category = models.CharField(max_length=200)

    class Meta:
        ordering = ('category', )

    def __str__(self):
        return self.category

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
    categories = models.ManyToManyField('Category', related_name='categories')
    primary_category = models.ForeignKey('Category', on_delete=models.CASCADE)

    @property
    def num_cubes(self):
        return len(Cube.objects.filter(tower__exact=self.pk))

    class Meta:
        ordering = ('name',)

    def __str__(self):
        return self.name
