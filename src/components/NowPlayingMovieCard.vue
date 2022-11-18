<template>
  <div class="col">

    <div @click="toDetail">
      <img :src="poster_path" height="280" width="180"/>
      <h6>{{ movie.title }}</h6>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NowPlayingMovieCard',
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
      return this.default_path + this.movie.poster_path
    }
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'detail', params: { movieId: this.movie.id } })
    }
  }
}
</script>

<style>

</style>