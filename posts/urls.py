from django.urls import path
from . import views


urlpatterns = [
    path('', views.PostsList.as_view()),
    path('<int:pk>/', views.PostDetail.as_view()),
    path('my/<str:username>/', views.get_user_posts),
    path('like/<int:pk>/', views.like),
    path('comments/<int:pk>/', views.CommentList.as_view()),
    path('comment/<int:pk>/', views.CommentDetail.as_view())
]
