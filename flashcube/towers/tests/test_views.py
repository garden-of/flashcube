from django.contrib.auth.models import User
from django.test import TestCase
from rest_framework.test import APIRequestFactory, force_authenticate

from towers import views

class AuthenticationTestCase(TestCase):
    '''
    The purpose of this test case is to make sure we that all protected routes are infact protected
    against unauthorized access.
    '''

    def setUp(self):
        User.objects.create(username='Testy Tester', email='test@tester.com', 
            password='SuperPasswordTest')
        User.objects.create(username='Testy Tester Admin', email='admin@tester.com',
            password='SuperPasswordTest', is_staff=True, is_superuser=True)
        User.objects.create(username='Testy Tester Staff', email='staff@tester.com',
            password='SuperPasswordTest', is_staff=True)

    def test_unauthed_views(self):

        factory = APIRequestFactory()

        # self registration is allowed
        payload = {
            'username': 'Testy Tester 1',
            'email': 'test1@tester.com',
            'password': 'SuperPasswordTest'
        }
        request = factory.post('/register/', payload, format='json')
        view = views.CreateUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 201)
    
    def test_get_authed_views(self):

        factory = APIRequestFactory()

        # get a common user for testing
        commoner = User.objects.get(email='test@tester.com')

        # must be authenticated to get user
        request = factory.get('/api/user/', format='json')
        view = views.GetUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 401)
        force_authenticate(request, user=commoner)
        response = view(request)
        self.assertEqual(response.status_code, 200)

        # must be authenticated to get categories
        request = factory.get('/api/category/', format='json')
        view = views.GetUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 401)
        force_authenticate(request, user=commoner)
        response = view(request)
        self.assertEqual(response.status_code, 200)

        # must be authenticated to get faces
        request = factory.get('/api/face/', format='json')
        view = views.GetUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 401)
        force_authenticate(request, user=commoner)
        response = view(request)
        self.assertEqual(response.status_code, 200)

        # must be authenticated to get cubes
        request = factory.get('/api/cube/', format='json')
        view = views.GetUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 401)
        force_authenticate(request, user=commoner)
        response = view(request)
        self.assertEqual(response.status_code, 200)

        # must be authenticated to get towers
        request = factory.get('/api/tower/', format='json')
        view = views.GetUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 401)
        force_authenticate(request, user=commoner)
        response = view(request)
        self.assertEqual(response.status_code, 200)

        # must be authenticated to get user preferences
        request = factory.get('/api/face/', format='json')
        view = views.GetUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 401)
        force_authenticate(request, user=commoner)
        response = view(request)
        self.assertEqual(response.status_code, 200)

        # must be authenticated to get user subscriptions
        request = factory.get('/api/face/', format='json')
        view = views.GetUser.as_view()
        response = view(request)
        self.assertEqual(response.status_code, 401)
        force_authenticate(request, user=commoner)
        response = view(request)
        self.assertEqual(response.status_code, 200)