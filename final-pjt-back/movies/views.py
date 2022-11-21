from django.http.response import JsonResponse
from .models import Movie, Genre, Actor, Review
from .serializers import MovieListSerializers, MovieNameSerializer, ReviewSerializers, ReviewListSerializers
from .serializers import MovieSerializers
from django.shortcuts import get_list_or_404, get_object_or_404

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
def review_list(request):
    review = Review.objects.all().filter(reviewed_user_id=2)
    serializer = ReviewListSerializers(review, many=True)
    return Response(serializer.data)


@api_view(['GET'])
# @permission_classes([IsAuthenticated])
def review(request, review_pk):
    review = get_object_or_404(Review, pk=review_pk)
    serializer = ReviewSerializers(review)
    return Response(serializer.data)


@api_view(['POST'])
def wish(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.wish_user.filter(pk=request.user.pk).exists():
        movie.wish_user.remove(request.user)
    else:
        movie.wish_user.add(request.user)
    serializer = MovieSerializers(movie)
    return Response(serializer.data)