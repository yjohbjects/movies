<template>
    <div class="col">
    <div @mouseover="hover = true" @mouseleave="hover = false">

      <div v-if="hover" @click="toDetail" style="overflow: hidden;">
        <img :src="poster_path" width="218" height="327" style="mix-blend-mode: luminosity; opacity: 0.3; transform:scale(1.2); border-radius: 5px
        " class="poster">
      </div>

      <div v-else @click="toDetail">
        <img :src="poster_path" width="218" height="327" style="border-radius: 5px" class="poster">
      </div>
      
    </div> <!-- hover -->
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
      hover: false,
    }
  },
  computed: {
    poster_path() {
      return this.movie.poster_path
    },
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