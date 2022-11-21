<template>
    <div class="col">
    <div @click="toDetail">
      <img :src="poster_path" height="280" width="180"/>
      <h6>{{ movie?.title }}</h6>
      <h6>{{ movie?.movie_id }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'RecommendedMovieCard',
  props: {
    movie: Object,
  },
  data() {
    return {
      default_path: 'https://image.tmdb.org/t/p/original',
    }
  },
  computed: {
    poster_path() {
      return this.movie.poster_path
    },
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'Detail', params: { movie_id: this.movie.movie_id } })
    }
  }

}
</script>

<style>

</style>