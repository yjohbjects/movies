from django.shortcuts import render
from django.http.response import JsonResponse
from .models import Movie, Genre, Actor
from django.shortcuts import get_list_or_404

# Create your views here.

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
    return JsonResponse(movie_info, safe=False)
    # return render(request, 'movies/test.html', context)