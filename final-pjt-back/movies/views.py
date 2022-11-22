from django.http.response import JsonResponse
from .models import Movie, Genre, Actor, Review
from .serializers import MovieListSerializers, MovieNameSerializer, ReviewSerializers, WatchedMovieSerializer
from .serializers import MovieSerializers, ReviewDetailSerializer, ReviewListMovieSerializers, ReviewListUserSerializers
from .serializers import GenreNameSerializer
from django.shortcuts import get_list_or_404, get_object_or_404

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
    # print(movie)
    genres = movie.genres.all()
    # from pprint import pprint
    print(genres)
    print(movie.genres.filter(pk=request.data["genre"]))
    # # user = request.user
    # rate = request.data["rate"]
    # print(type(rate))
    # print(type(int(rate)))
    # if int(rate) >= 3.5:
    #     print(1)
    # #     user.like_genres.add(genres)
    # # serializer = WatchedMovieSerializer(data=request.data)
    # # if serializer.is_valid(raise_exception=True):
    # #     serializer.save(movie=movie)
    # # return Response(serializer.data)
    # movie = Movie.objects.get(pk=movie_pk)
    if movie.genres.filter(pk=request.data["genre"]).exists():
        movie.genres.remove(request.data["genre"])
    else:
        movie.genres.add(request.data["genre"])

    return Response()


@api_view(['GET'])
def get_genre_name(request, genre_pk):
    print(1)
    genre = get_object_or_404(Genre, pk=genre_pk)
    serializer = GenreNameSerializer(genre)
    return Response(serializer.data)