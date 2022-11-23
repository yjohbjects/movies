from rest_framework import serializers
# from ..accounts.serializers import UserSerializer
from django.contrib.auth import get_user_model
from .models import Movie, Genre, Actor, Director, Review, WatchedMovie

class MovieNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'


class GenreNameSerializer(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = ('name',)

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



class ReviewListMovieSerializers(serializers.ModelSerializer):
    
    class CustomUserSerializer(serializers.ModelSerializer):

        class Meta:
            model = get_user_model()
            fields = ('id', 'username', 'nickname',)
    
    review_user = CustomUserSerializer(read_only=True)
    movie = MovieNameSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class ReviewListUserSerializers(serializers.ModelSerializer):
    
    class CustomUserSerializer(serializers.ModelSerializer):

        class Meta:
            model = get_user_model()
            fields = ('id', 'username',)
    
    review_user = CustomUserSerializer(read_only=True)
    movie = MovieNameSerializer(read_only=True)

    class Meta:
        model = Review
        fields = '__all__'


class ReviewSerializers(serializers.ModelSerializer):

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


class ReviewDetailSerializer(serializers.ModelSerializer):

    movie = MovieNameSerializer(read_only=True)

    class Meta:
        model = Review
        exclude = ('review_user',)
        read_only_fields = ('movie',)


class WatchedMovieSerializer(serializers.ModelSerializer):

    movie = MovieNameSerializer(read_only=True)

    class Meta:
        model = WatchedMovie
        fields = '__all__'
