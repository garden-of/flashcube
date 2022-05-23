from django.contrib import admin
from django.urls import include, path

from rest_framework import routers

from towers import views

router = routers.DefaultRouter()
router.register(r'category', views.CategoryViewSet, 'Category')
router.register(r'collection', views.CollectionViewSet, 'Collection')
router.register(r'cube', views.CubeViewSet, 'Cube')
router.register(r'face', views.FaceViewSet, 'Face')
router.register(r'tower', views.TowerViewSet, 'Tower')
router.register(r'list', views.ListViewSet, 'List')
router.register(r'locale', views.LocaleViewSet, 'Locale')
router.register(r'user_preferences', views.UserPreferencesViewSet, 'UserPreferences')
router.register(r'user_subscription', views.UserSubscriptionViewSet, 'UserSubscription')

urlpatterns = [

    # admin UI urls
    path('admin/', admin.site.urls),

    # authentication
    #path('auth/', include('rest_framework_social_oauth2.urls')),
    path('register/', views.CreateUser.as_view()),

    # REST api
    path('api/', include(router.urls)),
    path('api/user/', views.GetUser.as_view()),
    path('api/user_image/', views.UploadProfileImage.as_view()),
    path('api/editlist/', views.ListAddRemove.as_view())
]
