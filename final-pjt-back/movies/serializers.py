from rest_framework import serializers
# from ..accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model
from .models import Movie, Genre, Actor, Director, Review

class MovieNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = ('title', 'poster_path')



class GenreListSerializers(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'


class ActorListSerializers(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = '__all__'



class DirectorSerializers(serializers.ModelSerializer):

    class Meta:
        model = Director
        fields = '__all__'




class MovieListSerializers(serializers.ModelSerializer):
    
    class Meta:
        model = Movie
        fields = '__all__'



class ReviewListSerializers(serializers.ModelSerializer):
    
    class CustomUserSerializer(serializers.ModelSerializer):

        class Meta:
            model = get_user_model()
            fields = ('id', 'username',)
    
    user = CustomUserSerializer(read_only=True)
    movie = MovieNameSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class ReviewSerializers(serializers.ModelSerializer):

    class CustomUserSerializer(serializers.ModelSerializer):

        class Meta:
            model = get_user_model()
            fields = ('id', 'username',)
    
    user = CustomUserSerializer(read_only=True)
    movie = MovieNameSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'
        read_only_fields = ('movie',)


class MovieSerializers(serializers.ModelSerializer):
    actors = ActorListSerializers(many=True, read_only=True)
    director = DirectorSerializers(read_only=True)
    genres= GenreListSerializers(many=True, read_only=True)

    class Meta:
        model = Movie
        fields = '__all__'