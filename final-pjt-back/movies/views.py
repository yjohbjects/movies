from django.conf import settings
from django.http.response import JsonResponse
from .models import Movie, Genre, Actor, Review, Director, WatchedMovie
from .serializers import MovieListSerializers, MovieNameSerializer, ReviewSerializers, WatchedMovieSerializer
from .serializers import MovieSerializers, ReviewDetailSerializer, ReviewListMovieSerializers, ReviewListUserSerializers
from .serializers import GenreNameSerializer, DirectorSerializers, ActorListSerializers
from django.shortcuts import get_list_or_404, get_object_or_404
import random
import requests
# import os
# import dotenv

# from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

# permission Decorators
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated



# dotenv_file = os.path.join(settings.BASE_DIR, ".env")
# if os.path.isfile(dotenv_file):
#     dotenv.load_dotenv(dotenv_file)

# TMDB_API_KEY = os.environ['TMDB_API_KEY']


# 전체 영화 정보 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie(request):
    movies = get_list_or_404(Movie)
    serializer = MovieListSerializers(movies, many=True)
    return Response(serializer.data)


# 선택한 영화 정보 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def movie_detail(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    serializer = MovieNameSerializer(movie)
    return Response(serializer.data)


# 해당 영화의 모든 리뷰 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def review_movie_list(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    review = Review.objects.all().filter(movie=movie)
    serializer = ReviewListMovieSerializers(review, many=True)
    return Response(serializer.data)


# 해당 유저가 작성한 모든 리뷰 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def review_list(request):
    review = Review.objects.all().filter(review_user=request.user)
    serializer = ReviewListUserSerializers(review, many=True)
    return Response(serializer.data)


# 하나의 리뷰 조회, 수정, 삭제
@api_view(['GET', "PUT", "DELETE"])
@permission_classes([IsAuthenticated])
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
        return Response()



# 영화 북마킹
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def wish(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    if movie.wish_user.filter(pk=request.user.pk).exists():
        movie.wish_user.remove(request.user)
        is_wished = False
    else:
        movie.wish_user.add(request.user)
        is_wished = True
    context = {
        'is_wished': is_wished
    }
    return JsonResponse(context)



# 리뷰 작성하기
@api_view(['POST'])
@permission_classes([IsAuthenticated])
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
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, review_user=request.user)
    return Response(serializer.data)



# 장르 id에서 이름 받아오기
@api_view(['GET'])
def get_genre_name(request, genre_pk):
    genre = get_object_or_404(Genre, pk=genre_pk)
    serializer = GenreNameSerializer(genre)
    return Response(serializer.data)


# 배우 id에서 이름 받아오기
@api_view(['GET'])
def get_actor_name(request, actor_pk):
    actor = get_object_or_404(Actor, pk=actor_pk)
    serializer = ActorListSerializers(actor)
    return Response(serializer.data)



# 감독 id에서 이름 받아오기
@api_view(['GET'])
def get_director_name(request, director_pk):
    director = get_object_or_404(Director, pk=director_pk)
    serializer = DirectorSerializers(director)
    return Response(serializer.data)



# 해당 사용자에게 영화 추천
@api_view(['GET'])
@permission_classes([IsAuthenticated])
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



# 해당 유저가 북마크한 영화 전부 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_wish_movies(request):
    user = request.user
    movies = user.wish_movie.all()
    serializer = MovieListSerializers(movies, many=True)
    return Response(serializer.data)


# 영화 평점 주기
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def rate_movie(request, movie_pk):
    movie = get_object_or_404(Movie, pk=movie_pk)
    genres = movie.genres.all()
    user = request.user
    rate = request.data["rate"]
    if float(rate) >= 3.5:
        for genre in genres:
            user.like_genres.add(genre.pk)
    serializer = WatchedMovieSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        serializer.save(movie=movie, watched_user=request.user)
    return Response(serializer.data)



# 해당 영화의 별점 조회, 수정
@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def get_rate(request, movie_pk):
    target_movie = Movie.objects.get(pk=movie_pk)
    movies = WatchedMovie.objects.all().filter(movie=target_movie)
    for movie in movies:
        if movie.watched_user == request.user:
            rate = movie.rate
            movie_to_rate = movie
    if request.method == 'GET':
        context = {
            'rate': rate,
        }
        return JsonResponse(context)
    elif request.method == 'PUT':
        serializer = WatchedMovieSerializer(movie_to_rate, data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save(movie=target_movie, watched_user=request.user)
            return Response(serializer.data)



# 해당 영화가 북마크 되었는지 확인
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_wish(request, movie_pk):
    movie = Movie.objects.get(pk=movie_pk)
    if movie.wish_user.filter(pk=request.user.pk).exists():
        is_wished = True
    else:
        is_wished = False
    context = {
        'is_wished': is_wished,
    }
    return JsonResponse(context)


# 평점을 준 영화 조회
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_watched_movies(request):
    user = request.user
    watched_movies = user.watched_movie.all()
    serializer = WatchedMovieSerializer(watched_movies, many=True)
    return Response(serializer.data)


# DB에 아직 없는 영화를 조회했을때 DB에 영화 등록하기
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def new_movie(request, movie_pk):
    # 영화 디테일 정보
    TMDB_API_KEY = request.data["key"]
    request_url = f"https://api.themoviedb.org/3/movie/{movie_pk}?api_key={TMDB_API_KEY}&language=ko-KR"
    data = requests.get(request_url).json()
    # 영화 심의 정보
    request_certification = f"https://api.themoviedb.org/3/movie/{movie_pk}/release_dates?api_key={TMDB_API_KEY}"
    certifications = requests.get(request_certification).json()
    certification = ''
    for certi in certifications["results"]:
        if certi["iso_3166_1"] == 'US':
            targets = certi["release_dates"]
            for target in targets:
                if target["certification"]:
                    certification = target["certification"]
                    break
    # 출연진 및 감독 정보
    request_credits = f"https://api.themoviedb.org/3/movie/{movie_pk}/credits?api_key={TMDB_API_KEY}&language=ko-KR"
    credits = requests.get(request_credits).json()
    checker = 0
    for info in credits["crew"]:
        if info["job"] == "Director":
            director = Director(pk=info["id"], name=info["name"])
            director.save()
            checker = 1
            break
    # 감독없는 영화는 아웃
    if not checker:
        return Response()
    else:
        # 영화 저장 준비
        movie = Movie(pk=data["id"], title=data["title"], poster_path='https://image.tmdb.org/t/p/original'+data["poster_path"],\
            vote_average=data["vote_average"], popularity=data["popularity"], overview=data["overview"],\
                release_date=data["release_date"], original_title=data["original_title"],\
                    certification=certification, director=director)
        movie.save()
        # 해당 영화의 장르를 연결
        for genre in data["genres"]:
            movie.genres.add(genre["id"])
        serializer = MovieNameSerializer(movie)
        return Response(serializer.data)
