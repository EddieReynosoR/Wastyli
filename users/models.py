from django.db import models

# Importar fecha
from django.utils import timezone

# Sobreescribir el usuario de Django
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, UserManager

# Create your models here.


# Necesario para sobreescribir el modelo
class CustomUserManager(UserManager):

    # Funcion donde se inicia la creacion de un nuevo usuario
    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('You must provided a valid email address')

        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    # Crear usuario normal
    def create_user(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', False)
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)
    
    # Crear usuario adminsitrador
    def create_superuser(self, email=None, password=None, **extra_fields):
        extra_fields.setdefault('is_staff', True)
        extra_fields.setdefault('is_superuser', True)
        return self._create_user(email, password, **extra_fields)

# Modelo Usuario
class User(AbstractBaseUser, PermissionsMixin):
    # Campos
    username = models.CharField(max_length=200, unique=True)
    email = models.CharField(max_length=200, unique=True)
    name = models.CharField(max_length=255, blank=True)

    # ManyToMany es usado para especificar un campo con una relacion de muchos a muchos
    groups = models.ManyToManyField("self", symmetrical=False, related_name="group", blank=True)
    publications = models.ManyToManyField("self", symmetrical=False, related_name="publication", blank=True)

    bio = models.CharField(max_length=255, blank=True)

    avatar = models.ImageField(default='user.png')
    date_joined = models.DateTimeField(default=timezone.now)

    is_staff = models.BooleanField(default=False)

    objects = CustomUserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    # Ordenar usuarios a base de la fecha en la que se unieron
    class Meta:
        ordering = ['-date_joined']