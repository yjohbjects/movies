<template>
  <div>
    <div class="container mt-4">
      <div class="d-flex justify-content-between">
        <h1>나중에 볼 영화</h1>
      </div>
      <hr>
    </div>
    <ToWatchMovieCard
    v-for="(movie, id) in toWatchMovies" :key="id" :movie="movie"
    />
    <div class="container">
      <div class="d-flex justify-content-between">
        <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>
      </div>  
    </div>

  </div>
</template>

<script>
import ToWatchMovieCard from '@/components/ToWatchMovieCard'
import axios from 'axios'

export default {
  name: 'ToWatchMovieView',
  components: {
    ToWatchMovieCard,
  },
  computed: {
    toWatchMovies() {
      return this.$store.state.toWatchMovies
    }
  },
  methods: {
    getToWatchMovies() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/get_wish_movies/`,
        headers: {
          Authorization: `Token ${this.$store.state.token}`
        }
      })
        .then((response) => {
          console.log(response)
          this.$store.commit('GET_TO_WATCH_MOVIE', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.$store.dispatch('nowMypage')
    this.getToWatchMovies()
  }
}
</script>

<style>

</style>