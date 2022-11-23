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

cnt = 0

for genre in genres["genres"]:
    data = {}
    data["pk"] = genre["id"]
    data["model"] = "movies.genre"
    fields = {}
    fields["name"] = genre["name"]
    data["fields"] = fields
    total_data.append(data)

for i in range(1, 51):
    request_url_movies = f"https://api.themoviedb.org/3/movie/top_rated?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"

    movies = requests.get(request_url_movies).json()
    
    for movie in movies["results"]:
        data = {}
        data["pk"] = movie["id"]
        data["model"] = "movies.movie"
        movie_key = movie["id"]
        fields = {}
        fields["popularity"] = movie["popularity"]
        fields["original_title"] = movie["original_title"]
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
        if len(credits["cast"]) >= 3:
            for i in range(3):
                actors.append(credits["cast"][i]["id"])
                actor_data = {}
                actor_data["pk"] = credits["cast"][i]["id"]
                actor_data["model"] = "movies.actor"
                actor_data["fields"] = {"name": credits["cast"][i]["name"]}
                total_data.append(actor_data)
            fields["actors"] = actors
        else:
            print('배우가 없는뎁쇼?')
        checker = 0
        for info in credits["crew"]:
            if info["job"] == "Director":
                fields["director"] = info["id"]
                actor_data = {}
                actor_data["pk"] = info["id"]
                actor_data["model"] = "movies.director"
                actor_data["fields"] = {"name": info["name"]}
                total_data.append(actor_data)
                checker = 1
                break
        data["fields"] = fields
        if movie["overview"] and movie["poster_path"] and checker:
            total_data.append(data)
        elif not checker:
            print('감독 없음!')
            print(movie_key)

        # data = {}
        # request_url_related = f'https://api.themoviedb.org/3/movie/{movie_key}/recommendations?api_key={TMDB_API_KEY}&language=ko-KR&page=1'
        # related_movies = requests.get(request_url_related).json()
        # for movie in related_movies["results"]:
        #     data["pk"] = movie["id"]
        #     data["model"] = "movies.movie"
        #     movie_key = movie["id"]
        #     fields = {}
        #     fields["popularity"] = movie["popularity"]
        #     fields["original_title"] = movie["original_title"]
        #     if movie["overview"]:
        #         fields["overview"] = movie["overview"]
        #     if movie["poster_path"]:
        #         fields["poster_path"] = 'https://image.tmdb.org/t/p/original' + movie["poster_path"]
        #     fields["release_date"] = movie["release_date"]
        #     fields["title"] = movie["title"]
        #     fields["vote_average"] = movie["vote_average"]
        #     fields["genres"] = movie["genre_ids"]
        #     request_credits = f"https://api.themoviedb.org/3/movie/{movie_key}/credits?api_key={TMDB_API_KEY}&language=en-US"
        #     credits = requests.get(request_credits).json()
        #     actors = []
        #     request_certification = f"https://api.themoviedb.org/3/movie/{movie_key}/release_dates?api_key={TMDB_API_KEY}"
        #     certifications = requests.get(request_certification).json()
        #     for certi in certifications["results"]:
        #         if certi["iso_3166_1"] == 'US':
        #             targets = certi["release_dates"]
        #             for target in targets:
        #                 if target["certification"]:
        #                     fields["certification"] = target["certification"]
        #                     break
        #     if len(credits["cast"]) >= 3:
        #         for i in range(3):
        #             actors.append(credits["cast"][i]["id"])
        #             actor_data = {}
        #             actor_data["pk"] = credits["cast"][i]["id"]
        #             actor_data["model"] = "movies.actor"
        #             actor_data["fields"] = {"name": credits["cast"][i]["name"]}
        #             total_data.append(actor_data)
        #         fields["actors"] = actors
        #     else:
        #         print('배우가 없는뎁쇼?')
        #     checker = 0
        #     for info in credits["crew"]:
        #         if info["job"] == "Director":
        #             fields["director"] = info["id"]
        #             actor_data = {}
        #             actor_data["pk"] = info["id"]
        #             actor_data["model"] = "movies.director"
        #             actor_data["fields"] = {"name": info["name"]}
        #             total_data.append(actor_data)
        #             checker = 1
        #             break
        #     data["fields"] = fields
        #     if movie["overview"] and movie["poster_path"] and checker:
        #         total_data.append(data)
        #         cnt += 1
        #         print(cnt)
        #     elif not checker:
        #         print('감독 없음!')
        #         print(cnt)

print('@@@@')
print(len(total_data))
print('@@@@')

for i in range(1, 51):
    request_url_movies = f"https://api.themoviedb.org/3/movie/popular?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"

    movies = requests.get(request_url_movies).json()
    
    for movie in movies["results"]:
        data = {}
        data["pk"] = movie["id"]
        data["model"] = "movies.movie"
        movie_key = movie["id"]
        fields = {}
        fields["popularity"] = movie["popularity"]
        fields["original_title"] = movie["original_title"]
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
        if len(credits["cast"]) >= 3:
            for i in range(3):
                actors.append(credits["cast"][i]["id"])
                actor_data = {}
                actor_data["pk"] = credits["cast"][i]["id"]
                actor_data["model"] = "movies.actor"
                actor_data["fields"] = {"name": credits["cast"][i]["name"]}
                total_data.append(actor_data)
            fields["actors"] = actors
        else:
            print('배우가 없는뎁쇼?')
        checker = 0
        for info in credits["crew"]:
            if info["job"] == "Director":
                fields["director"] = info["id"]
                actor_data = {}
                actor_data["pk"] = info["id"]
                actor_data["model"] = "movies.director"
                actor_data["fields"] = {"name": info["name"]}
                total_data.append(actor_data)
                checker = 1
                break
        data["fields"] = fields
        if movie["overview"] and movie["poster_path"] and checker:
            total_data.append(data)
        # data = {}
        # request_url_related = f'https://api.themoviedb.org/3/movie/{movie_key}/recommendations?api_key={TMDB_API_KEY}&language=ko-KR&page=1'
        # related_movies = requests.get(request_url_related).json()
        # for movie in related_movies["results"]:
        #     data["pk"] = movie["id"]
        #     data["model"] = "movies.movie"
        #     movie_key = movie["id"]
        #     fields = {}
        #     fields["popularity"] = movie["popularity"]
        #     fields["original_title"] = movie["original_title"]
        #     if movie["overview"]:
        #         fields["overview"] = movie["overview"]
        #     if movie["poster_path"]:
        #         fields["poster_path"] = 'https://image.tmdb.org/t/p/original' + movie["poster_path"]
        #     fields["release_date"] = movie["release_date"]
        #     fields["title"] = movie["title"]
        #     fields["vote_average"] = movie["vote_average"]
        #     fields["genres"] = movie["genre_ids"]
        #     request_credits = f"https://api.themoviedb.org/3/movie/{movie_key}/credits?api_key={TMDB_API_KEY}&language=en-US"
        #     credits = requests.get(request_credits).json()
        #     actors = []
        #     request_certification = f"https://api.themoviedb.org/3/movie/{movie_key}/release_dates?api_key={TMDB_API_KEY}"
        #     certifications = requests.get(request_certification).json()
        #     for certi in certifications["results"]:
        #         if certi["iso_3166_1"] == 'US':
        #             targets = certi["release_dates"]
        #             for target in targets:
        #                 if target["certification"]:
        #                     fields["certification"] = target["certification"]
        #                     break
        #     if len(credits["cast"]) >= 3:
        #         for i in range(3):
        #             actors.append(credits["cast"][i]["id"])
        #             actor_data = {}
        #             actor_data["pk"] = credits["cast"][i]["id"]
        #             actor_data["model"] = "movies.actor"
        #             actor_data["fields"] = {"name": credits["cast"][i]["name"]}
        #             total_data.append(actor_data)
        #         fields["actors"] = actors
        #     else:
        #         print('배우가 없는뎁쇼?')
        #     checker = 0
        #     for info in credits["crew"]:
        #         if info["job"] == "Director":
        #             fields["director"] = info["id"]
        #             actor_data = {}
        #             actor_data["pk"] = info["id"]
        #             actor_data["model"] = "movies.director"
        #             actor_data["fields"] = {"name": info["name"]}
        #             total_data.append(actor_data)
        #             checker = 1
        #             break
        #     data["fields"] = fields
        #     if movie["overview"] and movie["poster_path"] and checker:
        #         total_data.append(data)


print(len(total_data))


# for i in range(1, 11):
#     request_url_movies = f"https://api.themoviedb.org/3/movie/latest?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"

#     movies = requests.get(request_url_movies).json()
    
#     for movie in movies["results"]:
#         data = {}
#         data["pk"] = movie["id"]
#         data["model"] = "movies.movie"
#         movie_key = movie["id"]
#         fields = {}
#         fields["popularity"] = movie["popularity"]
#         fields["original_title"] = movie["original_title"]
#         if movie["overview"]:
#             fields["overview"] = movie["overview"]
#         if movie["poster_path"]:
#             fields["poster_path"] = 'https://image.tmdb.org/t/p/original' + movie["poster_path"]
#         fields["release_date"] = movie["release_date"]
#         fields["title"] = movie["title"]
#         fields["vote_average"] = movie["vote_average"]
#         fields["genres"] = movie["genre_ids"]
#         request_credits = f"https://api.themoviedb.org/3/movie/{movie_key}/credits?api_key={TMDB_API_KEY}&language=ko-KR"
#         credits = requests.get(request_credits).json()
#         actors = []
#         request_certification = f"https://api.themoviedb.org/3/movie/{movie_key}/release_dates?api_key={TMDB_API_KEY}"
#         certifications = requests.get(request_certification).json()
#         for certi in certifications["results"]:
#             if certi["iso_3166_1"] == 'US':
#                 targets = certi["release_dates"]
#                 for target in targets:
#                     if target["certification"]:
#                         fields["certification"] = target["certification"]
#                         break
#         if len(credits["cast"]) >= 3:
#             for i in range(3):
#                 actors.append(credits["cast"][i]["id"])
#                 actor_data = {}
#                 actor_data["pk"] = credits["cast"][i]["id"]
#                 actor_data["model"] = "movies.actor"
#                 actor_data["fields"] = {"name": credits["cast"][i]["name"]}
#                 total_data.append(actor_data)
#             fields["actors"] = actors
#         else:
#             print('배우가 없는뎁쇼?')
#         for info in credits["crew"]:
#             if info["job"] == "Director":
#                 fields["director"] = info["id"]
#                 actor_data = {}
#                 actor_data["pk"] = info["id"]
#                 actor_data["model"] = "movies.director"
#                 actor_data["fields"] = {"name": info["name"]}
#                 total_data.append(actor_data)
#                 break
#         data["fields"] = fields
#         if movie["overview"] and movie["poster_path"]:
#             total_data.append(data)
#         data = {}
#         request_url_related = f'https://api.themoviedb.org/3/movie/{movie_key}/recommendations?api_key={TMDB_API_KEY}&language=ko-KR&page=1'
#         related_movies = requests.get(request_url_related).json()
#         for movie in related_movies["results"]:
#             data["pk"] = movie["id"]
#             data["model"] = "movies.movie"
#             movie_key = movie["id"]
#             fields = {}
#             fields["popularity"] = movie["popularity"]
#             fields["original_title"] = movie["original_title"]
#             if movie["overview"]:
#                 fields["overview"] = movie["overview"]
#             if movie["poster_path"]:
#                 fields["poster_path"] = 'https://image.tmdb.org/t/p/original' + movie["poster_path"]
#             fields["release_date"] = movie["release_date"]
#             fields["title"] = movie["title"]
#             fields["vote_average"] = movie["vote_average"]
#             fields["genres"] = movie["genre_ids"]
#             request_credits = f"https://api.themoviedb.org/3/movie/{movie_key}/credits?api_key={TMDB_API_KEY}&language=en-US"
#             credits = requests.get(request_credits).json()
#             actors = []
#             request_certification = f"https://api.themoviedb.org/3/movie/{movie_key}/release_dates?api_key={TMDB_API_KEY}"
#             certifications = requests.get(request_certification).json()
#             for certi in certifications["results"]:
#                 if certi["iso_3166_1"] == 'US':
#                     targets = certi["release_dates"]
#                     for target in targets:
#                         if target["certification"]:
#                             fields["certification"] = target["certification"]
#                             break
#             if len(credits["cast"]) >= 3:
#                 for i in range(3):
#                     actors.append(credits["cast"][i]["id"])
#                     actor_data = {}
#                     actor_data["pk"] = credits["cast"][i]["id"]
#                     actor_data["model"] = "movies.actor"
#                     actor_data["fields"] = {"name": credits["cast"][i]["name"]}
#                     total_data.append(actor_data)
#                 fields["actors"] = actors
#             else:
#                 print('배우가 없는뎁쇼?')
#             for info in credits["crew"]:
#                 if info["job"] == "Director":
#                     fields["director"] = info["id"]
#                     actor_data = {}
#                     actor_data["pk"] = info["id"]
#                     actor_data["model"] = "movies.director"
#                     actor_data["fields"] = {"name": info["name"]}
#                     total_data.append(actor_data)
#                     break
#             data["fields"] = fields
#             if movie["overview"] and movie["poster_path"]:
#                 total_data.append(data)


# print(len(total_data))



for i in range(1, 51):
    request_url_movies = f"https://api.themoviedb.org/3/movie/now_playing?api_key={TMDB_API_KEY}&language=ko-KR&page={i}"

    movies = requests.get(request_url_movies).json()
    
    for movie in movies["results"]:
        data = {}
        data["pk"] = movie["id"]
        data["model"] = "movies.movie"
        movie_key = movie["id"]
        fields = {}
        fields["popularity"] = movie["popularity"]
        fields["original_title"] = movie["original_title"]
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
        if len(credits["cast"]) >= 3:
            for i in range(3):
                actors.append(credits["cast"][i]["id"])
                actor_data = {}
                actor_data["pk"] = credits["cast"][i]["id"]
                actor_data["model"] = "movies.actor"
                actor_data["fields"] = {"name": credits["cast"][i]["name"]}
                total_data.append(actor_data)
            fields["actors"] = actors
        else:
            print('배우가 없는뎁쇼?')
        checker = 0
        for info in credits["crew"]:
            if info["job"] == "Director":
                fields["director"] = info["id"]
                actor_data = {}
                actor_data["pk"] = info["id"]
                actor_data["model"] = "movies.director"
                actor_data["fields"] = {"name": info["name"]}
                total_data.append(actor_data)
                checker = 1
                break
        data["fields"] = fields
        if movie["overview"] and movie["poster_path"] and checker:
            total_data.append(data)
        # data = {}
        # request_url_related = f'https://api.themoviedb.org/3/movie/{movie_key}/recommendations?api_key={TMDB_API_KEY}&language=ko-KR&page=1'
        # related_movies = requests.get(request_url_related).json()
        # for movie in related_movies["results"]:
        #     data["pk"] = movie["id"]
        #     data["model"] = "movies.movie"
        #     movie_key = movie["id"]
        #     fields = {}
        #     fields["popularity"] = movie["popularity"]
        #     fields["original_title"] = movie["original_title"]
        #     if movie["overview"]:
        #         fields["overview"] = movie["overview"]
        #     if movie["poster_path"]:
        #         fields["poster_path"] = 'https://image.tmdb.org/t/p/original' + movie["poster_path"]
        #     fields["release_date"] = movie["release_date"]
        #     fields["title"] = movie["title"]
        #     fields["vote_average"] = movie["vote_average"]
        #     fields["genres"] = movie["genre_ids"]
        #     request_credits = f"https://api.themoviedb.org/3/movie/{movie_key}/credits?api_key={TMDB_API_KEY}&language=en-US"
        #     credits = requests.get(request_credits).json()
        #     actors = []
        #     request_certification = f"https://api.themoviedb.org/3/movie/{movie_key}/release_dates?api_key={TMDB_API_KEY}"
        #     certifications = requests.get(request_certification).json()
        #     for certi in certifications["results"]:
        #         if certi["iso_3166_1"] == 'US':
        #             targets = certi["release_dates"]
        #             for target in targets:
        #                 if target["certification"]:
        #                     fields["certification"] = target["certification"]
        #                     break
        #     if len(credits["cast"]) >= 3:
        #         for i in range(3):
        #             actors.append(credits["cast"][i]["id"])
        #             actor_data = {}
        #             actor_data["pk"] = credits["cast"][i]["id"]
        #             actor_data["model"] = "movies.actor"
        #             actor_data["fields"] = {"name": credits["cast"][i]["name"]}
        #             total_data.append(actor_data)
        #         fields["actors"] = actors
        #     else:
        #         print('배우가 없는뎁쇼?')
        #     checker = 0
        #     for info in credits["crew"]:
        #         if info["job"] == "Director":
        #             fields["director"] = info["id"]
        #             actor_data = {}
        #             actor_data["pk"] = info["id"]
        #             actor_data["model"] = "movies.director"
        #             actor_data["fields"] = {"name": info["name"]}
        #             total_data.append(actor_data)
        #             checker = 1
        #             break
        #     data["fields"] = fields
        #     if movie["overview"] and movie["poster_path"] and checker:
        #         total_data.append(data)
            


print(len(total_data))

 


with open('movies.json', 'w', encoding='utf-8') as w:
    json.dump(total_data, w, indent=2, ensure_ascii=False)



