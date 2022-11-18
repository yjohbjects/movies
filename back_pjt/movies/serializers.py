from rest_framework import serializers
from .models import Movie, Genre, Actor, Director


class MovieListSerializers(serializers.ModelSerializer):

    class Meta:
        model = Movie
        fields = '__all__'


class GenreListSerializers(serializers.ModelSerializer):

    class Meta:
        model = Genre
        fields = '__all__'



class ActorListSerializers(serializers.ModelSerializer):

    class Meta:
        model = Actor
        fields = '__all__'



class DirectorListSerializers(serializers.ModelSerializer):

    class Meta:
        model = Director
        fields = '__all__'