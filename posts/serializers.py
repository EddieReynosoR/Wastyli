from rest_framework import serializers
from . models import Posts, Comment

class CommentSerializer(serializers.ModelSerializer):
    
    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')
    
    class Meta:
        model = Comment
        fields = '__all__'

class MyPostSerializer(serializers.ModelSerializer):

    likes_count = serializers.SerializerMethodField(read_only=True)
    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')
    


    class Meta:
        model = Posts
        fields = '__all__'


    def get_avatar(self, obj):
        return obj.user.avatar.url
    
    def get_likes_count(self, obj):
        return obj.likes.all().count()
    
    
class PostSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')
    avatar = serializers.ReadOnlyField(source='user.avatar.url')
    
    likes_count = serializers.SerializerMethodField(read_only=True)

    iliked = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Posts
        fields = '__all__'

    def get_avatar(self, obj):
        return obj.user.avatar.url
    
    def get_likes_count(self, obj):
        return obj.likes.all().count()
    
    def get_iliked(self, obj):
        return True if self.context['request'].user in obj.likes.all() else False