import requests
import json
from pprint import pprint

TMDB_API_KEY = '6fa74efa7caeaba5cad79e23dea452f2'


# people_url = f"https://api.themoviedb.org/3/search/person?api_key={TMDB_API_KEY}&language=en-US&page=1&include_adult=false"

# peoples = requests.get(people_url).json()
# print(peoples)
# print(peoples["results"])

total_data = []
request_url_gerne = f"https://api.themoviedb.org/3/genre/movie/list?api_key={TMDB_API_KEY}&language=ko-KR"


genres = requests.get(request_url_gerne).json()

for genre in genres["genres"]:
    data = {}
    data["pk"] = genre["id"]
    data["model"] = "movies.genre"
    fields = {}
    fields["name"] = genre["name"]
    data["fields"] = fields
    total_data.append(data)
# pprint(total_data)

for i in range(1, 2):
    request_url_up = f"https://api.themoviedb.org/3/movie/now_playing?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"

    movies = requests.get(request_url_up).json()

    for movie in movies["results"]:
        data = {}
        data["pk"] = movie["id"]
        data["model"] = "movies.movie"
        movie_key = movie["id"]
        fields = {}
        fields["popularity"] = movie["popularity"]
        if movie["overview"]:
            fields["overview"] = movie["overview"]
        if movie["poster_path"]:
            fields["poster_path"] = 'https://image.tmdb.org/t/p/original' + movie["poster_path"]
        fields["release_date"] = movie["release_date"]
        fields["title"] = movie["title"]
        fields["vote_average"] = movie["vote_average"]
        fields["genres"] = movie["genre_ids"]
        request_credits = f"https://api.themoviedb.org/3/movie/{movie_key}/credits?api_key={TMDB_API_KEY}&language=ko-KR"
        credits = requests.get(request_credits).json()
        actors = []
        request_certification = f"https://api.themoviedb.org/3/movie/{movie_key}/release_dates?api_key={TMDB_API_KEY}"
        certifications = requests.get(request_certification).json()
        for certi in certifications["results"]:
            if certi["iso_3166_1"] == 'US':
                targets = certi["release_dates"]
                for target in targets:
                    if target["certification"]:
                        fields["certification"] = target["certification"]
                        break
        for i in range(5):
            actors.append(credits["cast"][i]["id"])
            actor_data = {}
            actor_data["pk"] = credits["cast"][i]["id"]
            actor_data["model"] = "movies.actor"
            actor_data["fields"] = {"name": credits["cast"][i]["name"]}
            total_data.append(actor_data)
        fields["actors"] = actors
        for info in credits["crew"]:
            if info["job"] == "Director":
                fields["director"] = info["id"]
                actor_data = {}
                actor_data["pk"] = info["id"]
                actor_data["model"] = "movies.director"
                actor_data["fields"] = {"name": info["name"]}
                total_data.append(actor_data)
                break
        data["fields"] = fields
        if movie["overview"] and movie["poster_path"]:
            total_data.append(data)
        



# for keyword_id in range(1, 500):
#     keys = f'https://api.themoviedb.org/3/keyword/{keyword_id}?api_key={TMDB_API_KEY}'
#     key = requests.get(keys).json()
#     print(key)
# genres = requests.get(request_url_gerne).json()
# pprint(genres)


# url_keywords = f'https://api.themoviedb.org/3/movie/11395/keywords?api_key={TMDB_API_KEY}'

# keywords = requests.get(url_keywords).json()
# pprint(keywords)

# for keyword_id in range(1, 100):
#     request_url_keyword = f'https://api.themoviedb.org/3/keyword/{keyword_id}/movies?api_key={TMDB_API_KEY}&language=ko-KR&include_adult=false'
#     keyword_movies = requests.get(request_url_keyword).json()
#     if keyword_movies['status_code'] != 34:
#         pprint(keyword_movies)

# request_url_up = f"https://api.themoviedb.org/3/list/{1}?api_key={TMDB_API_KEY}&language=ko-KR"
# alls = []
# movies = requests.get(request_url_up).json()
# for movie in movies['items']:
#     alls.append(movie)
# pprint(movies)
# print(alls)
# print(len(alls))
# pprint(alls)

# for i in range(1):
# request_url_up = f"https://api.themoviedb.org/3/movie/top_rated?api_key={TMDB_API_KEY}&language=ko-KR&page={1}"
# movies = requests.get(request_url_up).json()

#     for movie in movies['results']:
#         data = {}
#         data["model"] = "movies.movie"
#         fields = {}
#         fields["popularity"] = movie["popularity"]
#         fields["overview"] = movie["overview"]
#         fields["poster_path"] = movie["poster_path"]
#         fields["release_date"] = movie["release_date"]
#         fields["title"] = movie["title"]
#         fields["vote_average"] = movie["vote_average"]
#         fields["genre_ids"] = movie["genre_ids"]
#         data["fields"] = fields
#         total_movies.append(data)
# wnt_gnr = total_movies[0]['fields']['genre_ids']
# wnt_gnr = wnt_gnr.rstrip(']')
# print(wnt_gnr)
# print(type(wnt_gnr))

# pprint(total_movies[0])
# print(total_movies[0]['fields']['title'])


# for movie in total_movies:
#     if 
    # for movie in movies["results"]:
    #     total_movies.add(movie["title"])
    # print(len(total_movies))
# print(total_movies)


# for movie in movies['results']:
#     movie_id = movie["id"]
#     print(movie["title"])
#     request_url_credits = f'https://api.themoviedb.org/3/movie/{movie_id}/credits?api_key={TMDB_API_KEY}&language=ko-KR'
#     credits_info = requests.get(request_url_credits).json()
#     pprint(credits_info)
#     break



# total_data = []
# movies_up = requests.get(request_url_up).json()
# pprint(movies_up)
# for i in range(1):


        






# genres = requests.get(request_url_gerne).json()

with open('test.json', 'w', encoding='utf-8') as w:
    json.dump(total_data, w, indent=2, ensure_ascii=False)


# pprint(total_movies)

