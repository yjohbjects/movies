<template>
  <div>
    <div class="container mt-4">
        <div class="d-flex justify-content-between align-items-center">
          <h1>평가한 영화</h1>
          <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>
        </div>
        <hr>

        <WatchedMovieCard
        v-for="(movie, id) in watchedMovies" :key="id" :movie="movie"
        />


    </div>
  </div>
</template>

<script>
import WatchedMovieCard from "@/components/WatchedMovieCard"
import axios from 'axios'

export default {
  name: 'WatchedMovieView.vue',
  components: {
    WatchedMovieCard
  },
  computed: {
    watchedMovies() {
      return this.$store.state.watchedMovies
    }
  },
  methods: {
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
    this.$store.dispatch('nowMypage')
    this.getWatchedMovies()
  }
}

</script>

<style>

</style>