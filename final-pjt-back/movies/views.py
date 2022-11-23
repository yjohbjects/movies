from django.http.response import JsonResponse
from .models import Movie, Genre, Actor, Review, Director
from .serializers import MovieListSerializers, MovieNameSerializer, ReviewSerializers, WatchedMovieSerializer
from .serializers import MovieSerializers, ReviewDetailSerializer, ReviewListMovieSerializers, ReviewListUserSerializers
from .serializers import GenreNameSerializer, DirectorSerializers, ActorListSerializers
from django.shortcuts import get_list_or_404, get_object_or_404
import random


# from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

# Create your views here.

# 전체 영화 정보 조회
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def movie(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializers(movies, many=True)
    return Response(serializer.data)


# 선택한 영화 정보 조회
@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieNameSerializer(movie)
    return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def review_movie_list(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    review = Review.objects.all().filter(movie=movie)
    serializer = ReviewListMovieSerializers(review, many=True)
    return Response(serializer.data)

@api_view(['GET'])
def review_list(request):
    review = Review.objects.all().filter(review_user=request.user)
    serializer = ReviewListUserSerializers(review, many=True)
    return Response(serializer.data)


@api_view(['GET', "PUT", "DELETE"])
# @permission_classes([IsAuthenticated])
def review(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    if request.method == "GET":
        serializer = ReviewSerializers(review)
        return Response(serializer.data)
    elif request.method == "PUT":
        serializer = ReviewDetailSerializer(review, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data)
    elif request.method == "DELETE":
        review.delete()
        context = {
            "delete": f"리뷰가 삭제되었소"
        }
        return Response(context)



@api_view(['POST'])
def wish(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.wish_user.filter(pk=request.user.pk).exists():
        movie.wish_user.remove(request.user)
    else:
        movie.wish_user.add(request.user)
    serializer = MovieSerializers(movie)
    print(serializer)
    return Response(serializer.data)



@api_view(['POST'])
def create_review(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    reviews = Review.objects.all()
    for review in reviews:
        if review.movie.pk == movie_pk and review.review_user == request.user:
            context = {
                'error': "이미 리뷰를 작성한 게시글입니다."
            }
            return Response(context)
    serializer = ReviewSerializers(data=request.data)
    print(serializer)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, review_user=request.user)
    return Response(serializer.data)


@api_view(['POST'])
def rate_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    genres = movie.genres.all()
    user = request.user
    rate = request.data["rate"]
    if int(rate) >= 3.5:
        for genre in genres:
            user.like_genres.add(genre.pk)
    serializer = WatchedMovieSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie)
    return Response(serializer.data)
    # movie = Movie.objects.get(pk=movie_pk)
    # if movie.genres.filter(pk=request.data["genre"]).exists():
    #     movie.genres.remove(request.data["genre"])
    # else:
    #     movie.genres.add(request.data["genre"])


@api_view(['GET'])
def get_genre_name(request, genre_pk):
    genre = get_object_or_404(Genre, pk=genre_pk)
    serializer = GenreNameSerializer(genre)
    return Response(serializer.data)


@api_view(['GET'])
def get_actor_name(request, actor_pk):
    actor = get_object_or_404(Actor, pk=actor_pk)
    serializer = ActorListSerializers(actor)
    return Response(serializer.data)



@api_view(['GET'])
def get_director_name(request, director_pk):
    director = get_object_or_404(Director, pk=director_pk)
    serializer = DirectorSerializers(director)
    return Response(serializer.data)




@api_view(['GET'])
def recommend_movies(request):
    user = request.user
    recommend_genres = set()
    if len(user.like_genres.all()) >= 3:
        while len(recommend_genres) < 3:
            recommend_genres.add(random.choice(user.like_genres.all()))
        recommend_genres = list(recommend_genres)
    else:
        genres = Genre.objects.all()
        while len(recommend_genres) < 3:
            recommend_genres.add(random.choice(genres))
    genre_pks = []
    for genre in recommend_genres:
        genre_pks.append(genre.pk)
    movies = Movie.objects.filter(genres__in=genre_pks).order_by('?')[:20]
    serializer = MovieListSerializers(movies, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_wish_movies(request):
    user = request.user
    movies = user.wish_movie.all()
    serializer = MovieListSerializers(movies, many=True)
    # print(serializer)
    return Response(serializer.data)