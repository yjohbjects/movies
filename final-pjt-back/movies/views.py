from django.shortcuts import render
from django.http.response import JsonResponse
from .models import Movie, Genre, Actor
from .serializers import MovieListSerializers
from django.shortcuts import get_list_or_404

from rest_framework.response import Response
from rest_framework.decorators import api_view

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def test(request):
    movies = get_list_or_404(Movie)
    movie_info = []
    genres = get_list_or_404(Genre)
    actors = get_list_or_404(Actor)
    for movie in movies:
        movie_genre = []
        for genre in genres:
            if movie.genres.filter(pk=genre.pk).exists():
                movie_genre.append(genre.name)
        movie_actors = []
        for actor in actors:
            if movie.actors.filter(pk=actor.pk).exists():
                movie_actors.append(actor.name)
        movie_info.append(
            {
                'title': movie.title,
                'genre': movie_genre,
                'overview': movie.overview,
                'release_date': movie.release_date,
                'actors': movie_actors,
                'poster_path': movie.poster_path
            }
        )
    # print(movie_info)
    # movies = Movie.objects.all()
    # serializers = MovieListSerializers(movies, many=True)
    return JsonResponse(movie_info, safe=False)
    # return render(request, 'movies/test.html', context)