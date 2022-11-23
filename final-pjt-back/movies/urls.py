from django.urls import path
from . import views


app_name = 'movies'
urlpatterns = [
    path('movies/', views.movie),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('review_list/<int:movie_pk>/', views.review_movie_list),
    path('review_list/', views.review_list),
    path('review/<int:review_pk>/', views.review),
    path('wish/<int:movie_pk>/', views.wish),
    path('createreview/<int:movie_pk>/', views.create_review),
    path('rate_movie/<int:movie_pk>/', views.rate_movie),
    path('get_genre_name/<int:genre_pk>/', views.get_genre_name),
    path('get_actor_name/<int:actor_pk>/', views.get_actor_name),
    path('get_director_name/<int:director_pk>/', views.get_director_name),
    path('recommend_movies/', views.recommend_movies),
    path('get_wish_movies/', views.get_wish_movies),
]
