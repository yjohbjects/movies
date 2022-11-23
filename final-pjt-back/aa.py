import requests
import json
from pprint import pprint

TMDB_API_KEY = '6fa74efa7caeaba5cad79e23dea452f2'

request_url_movies = f"https://api.themoviedb.org/3/movie/598?api_key={TMDB_API_KEY}&language=en-US"

movies = requests.get(request_url_movies).json()

pprint(movies)