from rest_framework import viewsets

from towers.models import Category, Cube, Face, Tower
from towers import serializers

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = serializers.CategorySerializer

class CubeViewSet(viewsets.ModelViewSet):
    queryset = Cube.objects.all()
    serializer_class = serializers.CubeSerializer

class FaceViewSet(viewsets.ModelViewSet):
    queryset = Face.objects.all()
    serializer_class = serializers.FaceSerializer

class TowerViewSet(viewsets.ModelViewSet):
    queryset = Tower.objects.all()
    serializer_class = serializers.TowerSerializer