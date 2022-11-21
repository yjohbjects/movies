<template>
  <div class="col">
    <div @click="toDetail">
      <img :src="poster_path" width="218" height="327" style="border-radius: 5px">
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
      if (this.movie.poster_path) {
        return this.default_path + this.movie.poster_path
      } else {
        return 'https://i.ibb.co/F7gXSF0/no-image-available.png'
      }
    }
  },
  methods: {
    toDetail() {
      this.$router.push({ name: 'Detail', params: { movieId: this.movie.id } })
    }
  }
}
</script>

<style>

</style>