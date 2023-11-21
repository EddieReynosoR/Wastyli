from rest_framework import generics
from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response

from . models import Posts, Comment
from users.models import User
from . serializers import PostSerializer, MyPostSerializer, CommentSerializer
from .permissions import IsUserOrReadOnly
from backend.pagination import CustomPagination

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]


class CommentList(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [IsAuthenticated]

    def get_object(self, pk):
        post = Posts.objects.get(pk=pk)
        return post
    
    # def create(self, request, pk):
    #     post = self.get_object(pk)
    #     serializer = CommentSerializer(data=request.data)
    #     if serializer.is_valid():
    #         serializer.save(user=request.user, post=post)
    #         return Response(serializer.data)
    #     return Response(serializer.errors)

    def create(self, request, pk):
        post = self.get_object(pk)
        data = request.data
        comment = Comment(
            user = request.user,
            body = data['body'],
            post=post
        )

        comment.save()
        serializer = CommentSerializer(comment, many=False)
        return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def like(request, pk):
    post = Posts.objects.get(pk=pk)
    if request.user in post.likes.all():
        post.likes.remove(request.user)
    else:
        post.likes.add(request.user) 
        
    return Response({'status': 'ok'})

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_posts(request, username):
    user = User.objects.get(username=username)
    posts = Posts.objects.filter(user=user)
    serializer = MyPostSerializer(posts, many=True)
    return Response(serializer.data)

class PostsList(generics.ListCreateAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    pagination_class = CustomPagination

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Posts.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated, IsUserOrReadOnly]