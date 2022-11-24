<template>
  <div class="container-fluid mt-5" :style="`background: rgba(0, 0, 0, 0.75); background-image: url(${ randomBackground }); background-size: cover; background-blend-mode: darken; background-repeat: repeat-y; background-size: 100%;`">
    <h1>⠀</h1>
    <h1>{{ userId }}</h1>
    <!-- <h1>mypage view</h1> -->
    <div class="container my-3">
        <div class="d-flex align-items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="user" width="150">
        <div class="mx-5">
          <h2 class="my-0" style="font-weight: bold;">{{ nickname }}님,</h2>
          <p class="lead">@ {{ username }}</p>
          <p>평가한 영화:⠀{{ watchedMovies.length }} ⠀⠀|⠀⠀ 나중에 볼 영화:⠀{{ toWatchMovies.length }}</p>
        </div>
        </div>
    </div>

    <div class="container my-5">
      <div class="d-flex justify-content-between">
        <h3 style="font-weight: bold;">평가한 영화</h3>
        <router-link :to="{ name: 'WatchedMovie' }">더보기</router-link>
      </div>
      <hr>
      
      <div class="horizontal-scrollable">
        <div class="row flex-nowrap movie-list">
          <WatchedMoviePosterCard v-for="(movie, id) in watchedMovies" :key="id" :movie="movie" class="for-cursor"/>
        </div>
      </div>
    </div>

    <div class="container my-5">
      <div class="d-flex justify-content-between">
        <h3 style="font-weight: bold;">나중에 볼 영화</h3>
        <router-link :to="{ name: 'ToWatchMovie' }">더보기</router-link>
      </div>
      <hr>

      <div class="horizontal-scrollable">
        <div class="row flex-nowrap movie-list">
          <ToWatchMoviePosterCard v-for="(movie, id) in toWatchMovies" :key="id" :movie="movie" class="for-cursor"/>
        </div>
      </div>   
    </div>
    
    <div class="container my-5">

    <div class="d-flex justify-content-between">
        <h3 style="font-weight: bold;">내가 작성한 리뷰</h3>
        <router-link :to="{ name: 'UserReview' }">더보기</router-link>
      </div>
      <hr>
      <UserReviewDetailCard v-for="review in reviews" :key="review.id" :review="review"/>
    </div>

  </div>
</template>

<script>
import ToWatchMoviePosterCard from '@/components/ToWatchMoviePosterCard'
import WatchedMoviePosterCard from '@/components/WatchedMoviePosterCard'
import UserReviewDetailCard from '@/components/UserReviewDetailCard'
import axios from 'axios'

export default {
  name: 'MyPageView',
  components: {
    WatchedMoviePosterCard,
    ToWatchMoviePosterCard,
    UserReviewDetailCard,
  },
  data() {
    return {
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    username() {
      return this.$store.state.username
    },
    nickname() {
      return this.$store.state.nickname
    },
    toWatchMovies() {
      return this.$store.state.toWatchMovies
    },
    watchedMovies() {
      return this.$store.state.watchedMovies
    },
    reviews() {
      return this.$store.state.userReviews
    },
    randomBackground() {
      return this.$store.state.randomBackground
    },
  },
  methods: {
    getMypage() {
      if (this.isLogin === true) {
        return this.$store.dispatch('nowMypage')
      } else {
        alert('로그인이 필요한 페이지입니다 :-D')
        this.$router.push({ name : "Login" })
      }
    },

    getWatchedMovies() {
        axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/get_watched_movies/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((response) => {
          console.log(response)
          this.$store.commit('GET_WATCHED_MOVIE', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.getMypage()
    this.$store.dispatch('getUsername')
    this.$store.dispatch('getUserReviews')
    this.$store.dispatch('nowMypage')
    this.$store.dispatch('getToWatchMovies')
    this.getWatchedMovies()
    this.$store.dispatch('getRandomBackground')
  }
}
</script>

<style>
a {
  color: #5CB8E4; 
  text-decoration: none;
}

.for-cursor {
  cursor: pointer;
}
</style>