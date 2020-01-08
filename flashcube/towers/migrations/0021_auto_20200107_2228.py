# Generated by Django 2.2.3 on 2020-01-07 22:28

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('towers', '0020_tower_difficulty'),
    ]

    operations = [
        migrations.AlterField(
            model_name='tower',
            name='difficulty',
            field=models.CharField(choices=[('B', 'Beginner'), ('I', 'Intermediate'), ('E', 'Expert')], default='B', max_length=1),
        ),
        migrations.CreateModel(
            name='UserSubscription',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('categories', models.ManyToManyField(to='towers.Category')),
                ('tower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='towers.Tower')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('user', 'tower')},
            },
        ),
    ]