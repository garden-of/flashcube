from rest_framework import viewsets, views, status
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated

from django.core.exceptions import ObjectDoesNotExist
from django.contrib.auth.models import User

from towers import models, serializers


class CreateUser(views.APIView):
    permission_classes = [AllowAny]

    def post(self, request, format='json'):
        serializer = serializers.UserSerializer(data=request.data)
        
        if serializer.is_valid():
            user = serializer.save()
            if user:

                # create a default list for the user
                default_list = models.List(user=user, is_default=True)
                default_list.save()

                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class GetUser(views.APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, format='json'):
        serializer = serializers.UserSerializer(request.user)
        return Response(serializer.data)
    
    def patch(self, request):
        serializer = serializers.UserSerializer(request.user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class ListAddRemove(views.APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):

        # get the list that needs to be edited
        listId = request.data.get('list', None)
        try:
            requestedList = models.List.objects.get(pk=listId)
        except ObjectDoesNotExist as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, exception=e)
        
        # get the action that needs to be taken
        action = request.data.get('action', None)
        if not action or action not in ('add', 'remove'):
            return Response(status=status.HTTP_400_BAD_REQUEST)

        # get the cube id that needs to be modified
        cubeId = request.data.get('cube', None)
        if not cubeId:
            return Response(status=status.HTTP_400_BAD_REQUEST)
        try:
            cube = models.Cube.objects.get(pk=cubeId)
        except ObjectDoesNotExist as e:
            return Response(status=status.HTTP_400_BAD_REQUEST, exception=e)

        if action == 'add':
            requestedList.cubes.add(cube)
        elif action == 'remove':
            requestedList.cubes.remove(cube)

        serializer = serializers.ListSerializer(requestedList)

        return Response(data=serializer.data, status=status.HTTP_200_OK)


class UploadProfileImage(views.APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        print(request.data)



class CategoryViewSet(viewsets.ModelViewSet):
    queryset = models.Category.objects.all()
    serializer_class = serializers.CategorySerializer
    permission_classes = [IsAuthenticated]


class CollectionViewSet(viewsets.ModelViewSet):
    queryset = models.Collection.objects.all()
    serializer_class = serializers.CollectionSerializer
    permission_classes = [IsAuthenticated]


class CubeViewSet(viewsets.ModelViewSet):
    
    serializer_class = serializers.CubeSerializer
    permission_classes = [IsAuthenticated]
    queryset = models.Cube.objects.all()


class FaceViewSet(viewsets.ModelViewSet):
    queryset = models.Face.objects.all()
    serializer_class = serializers.FaceSerializer
    permission_classes = [IsAuthenticated]


class TowerViewSet(viewsets.ModelViewSet):
    queryset = models.Tower.objects.all()
    serializer_class = serializers.TowerSerializer
    permission_classes = [IsAuthenticated]


class ListViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.ListSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return models.List.objects.filter(user=self.request.user, is_default=True)


class LocaleViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.LocaleSerializer
    queryset = models.Locale.objects.all()
    permission_classes = [IsAuthenticated]


class UserFaceStatusViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserFaceStatusSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return models.UserFaceStatus.objects.filter(user__exact=self.request.user)


class UserPreferencesViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserPreferenceSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # this will lazy create the preferences object if it doesnt exist
        # every user needs a preference object for the app to function
        user_preference, created = models.UserPreferences.objects.get_or_create(user=self.request.user)

        # this will make sure the user has a default list
        # doing it here makes sure that it exists before the user is done onboarding
        default_list, created = models.List.objects.get_or_create(user=self.request.user, is_default=True)

        # this creates another query, but is an easy way to return a queryset
        return models.UserPreferences.objects.filter(user__exact=self.request.user)


class UserSubscriptionViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.UserSubscriptionSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self, *args, **kwargs):
        return models.UserSubscription.objects.filter(user__exact=self.request.user)
    
    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
    
        # whenever a user subscribes to a tower, automatically add those cubes to their default list
        cubes = models.Cube.objects.filter(tower=response.data['tower'])
        default_list, created = List.objects.get_or_create(user=self.request.user, is_default=True)
        for cube in cubes:
            default_list.cubes.add(cube)

        return response
    
    def destroy(self, request, *args, **kwargs):

        # we need the tower later, but it must be
        # retreived before the delete happens
        subscription = self.get_object()
        tower = subscription.tower

        response = super().destroy(request, *args, **kwargs)

        # whenever a user unsubscribes from a tower, automatically remove those 
        # cubes from their default list
        if response.status_code == 204:
            cubes = models.Cube.objects.filter(tower=tower)
            default_list, created = List.objects.get_or_create(user=self.request.user, is_default=True)
            for cube in cubes:
                default_list.cubes.remove(cube)

        return response
