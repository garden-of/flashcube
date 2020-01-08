from django.core.validators import EmailValidator

from rest_framework import serializers
from rest_framework.validators import UniqueValidator

from towers.models import Category, Cube, Face, Tower, UserPreferences, UserSubscription
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    
    email = serializers.EmailField(required=True, 
        validators=[UniqueValidator(queryset=User.objects.all()), EmailValidator()])
    password = serializers.CharField(min_length=8, write_only=True)
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('id', 'email', 'password', 'username')
    
    def create(self, validated_data):
        user = User.objects.create_user(validated_data['email'], validated_data['email'], validated_data['password'])
        return user

class UserPreferenceSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserPreferences
        fields = '__all__'

class UserSubscriptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = UserSubscription
        fields = '__all__'

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

class CubeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cube
        fields = '__all__'

class FaceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Face
        fields = '__all__'

class TowerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tower
        fields = ['id', 'name', 'categories', 'primary_category', 'num_cubes', 'image', 'difficulty']