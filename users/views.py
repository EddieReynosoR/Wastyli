from rest_framework import status, generics, viewsets
from django.contrib.auth.hashers import make_password
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.permissions import IsAuthenticated

from allauth.socialaccount.providers.google.views import GoogleOAuth2Adapter
from allauth.socialaccount.providers.oauth2.client import OAuth2Client
from dj_rest_auth.registration.views import SocialLoginView
from django.contrib.auth import get_user_model


from . models import User
from . serializers import MyTokenObtainPairSerializer, MyUserSerializer, UserSerializer
from backend.permissions import IsUserOrReadOnly

# Clase para permisos cuando se inice sesion
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]
    lookup_field = 'username'
    lookup_url_kwarg = 'username'

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]


# Clase para autenticar usuario
class MyTokenObtainPairSerializer(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer

# Funcion para registrar usuarios
@api_view(['POST'])
def register(request):
    data = request.data
    user = User.objects.create(
        username=data['username'],
        email=data['email'],
        password=make_password(data['password'])
    )
    serializer = MyUserSerializer(user, many=False)
    return Response(serializer.data)



class GoogleLogin(SocialLoginView):
    adapter_class = GoogleOAuth2Adapter
    callback_url = 'http://localhost:5173/'
    client_class = OAuth2Client