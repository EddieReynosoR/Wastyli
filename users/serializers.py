from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from . models import User

# Usar JSON 


class UserSerializer(serializers.ModelSerializer):
    email = serializers.ReadOnlyField()
    username = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = ['username', 'email', 'avatar', 'date_joined', 'name']

    

# Obtener token con la informacion que queremos mandar
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Lo que queramos mandar 
        token['username'] = user.username
        token['avatar'] = user.avatar.url

        return token

# Serializer para registrar usuarios
class MyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'email', 'password']