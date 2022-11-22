from django.urls import path
from . import views


app_name = 'movies'
urlpatterns = [
    path('movies/', views.movie),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('review_list/<int:movie_pk>/', views.review_movie_list),
    path('review_list/', views.review_list),
    path('review/<int:review_pk>/', views.review),
    path('<int:movie_pk>/wish/', views.wish),
    path('createreview/<int:movie_pk>/', views.create_review)
]
