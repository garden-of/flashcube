from rest_framework import serializers

from towers.models import Category, Cube, Face, Tower

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
        fields = ['id', 'name', 'categories', 'primary_category', 'num_cubes']