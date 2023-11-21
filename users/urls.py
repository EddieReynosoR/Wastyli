from django.urls import path
from . import views
from rest_framework_simplejwt.views import TokenRefreshView


urlpatterns = [
    # Registro usuarios
    path('register/', views.register),
    # Login
    path('login/', views.MyTokenObtainPairSerializer.as_view()),
    # Pedir nuevo token, refrescar token
    path('refresh/', TokenRefreshView.as_view()),
    path('<str:username>/', views.UserDetailView.as_view()),

    # Ver lista usuarios
    path('', views.UserViewSet.as_view({'get': 'list'})),
]
