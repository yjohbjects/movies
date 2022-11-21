<template>
    <div class="col">
    <div @click="toDetail">
      <img :src="poster_path" width="218" height="327" style="border-radius: 5px">
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
      console.log(this.movie_id)
      this.$router.push({ name: 'Detail', params: { movieId: this.movie.id } })
    }
  }

}
</script>

<style>

</style>