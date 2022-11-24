<template>
  <div class="col" @click="toDetail">
    <div class="card" style="width: 14rem;">
      <img :src="poster_path" class="card-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'WatchedMoviePosterCard',
  props: {
    movie: Object,
  },
  computed: {
    poster_path() {
      return this.movie.movie["poster_path"]
    },
    movieId() {
      return this.movie.movie["id"]
    }

  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'Detail', params: { movieId: this.movieId } })
    }
  }
}
</script>

<style>

</style>