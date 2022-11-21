from django.urls import path
from . import views


app_name = 'movies'
urlpatterns = [
    path('movies/', views.movie),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('review_list/', views.review_list),
    path('review/<int:review_pk>/', views.review),
    path('<int:movie_pk>/wish/', views.wish),
]
