from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.generics import get_object_or_404

from django.contrib.auth.models import User

from towers.models import Category, Cube, Face, Tower, UserPreferences, UserSubscription
from towers import serializers

class CreateUser(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = serializers.UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class GetUser(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format='json'):
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data)

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

class UserPreferencesViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserPreferenceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # this will lazy create the preferences object if it doesnt exist
        # every user needs a preference object for the app to function
        print(self.request.user)
        userPreference, created = UserPreferences.objects.get_or_create(user=self.request.user)

        # this creates another query, but is an easy way to return a queryset
        return UserPreferences.objects.filter(user__exact=self.request.user)

class UserSubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return UserSubscription.objects.filter(user__exact=self.request.user)