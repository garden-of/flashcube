from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from django.contrib.auth.models import User
from django.core.validators import EmailValidator
from towers import models

class UserFaceStatusSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserFaceStatus
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True, 
        validators=[UniqueValidator(queryset=User.objects.all()), EmailValidator()])
    password = serializers.CharField(min_length=8, write_only=True)
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'username', 'first_name', 'last_name')
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'], validated_data['email'], validated_data['password'])
        return user


class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserPreferences
        fields = '__all__'


class UserSubscriptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.UserSubscription
        fields = '__all__'


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Category
        fields = '__all__'


class CollectionSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Collection
        fields = '__all__'


class FaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Face
        fields = '__all__'


class ListSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.List
        fields = '__all__'


class LocaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Locale
        fields = '__all__'


class CubeSerializer(serializers.ModelSerializer):
    face_set = FaceSerializer(many=True, read_only=True)

    class Meta:
        model = models.Cube
        fields = ['id', 'name', 'tower', 'face_set']


class TowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Tower
        fields = ['id', 'name', 'categories', 'primary_category', 'num_cubes', 'image', 'difficulty']