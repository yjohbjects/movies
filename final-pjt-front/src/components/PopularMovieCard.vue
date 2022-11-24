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
  name: 'PopularMovieCard',
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
      if (this.movie.poster_path) {
        return this.default_path + this.movie.poster_path
      } else {
        return 'https://ualr.edu/elearning/files/2020/10/No-Photo-Available.jpg'
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