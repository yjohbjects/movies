<template>
    <div class="col">
    <div @mouseover="hover = true" @mouseleave="hover = false">

      <div v-if="hover" @click="toDetail" class="card" style="width: 14rem;">
        <img :src="poster_path" class="card-img" style="mix-blend-mode: darken;">
        <div class="card-img-overlay d-flex align-items-center">
          <div class="col">
            <div class="row"><h5 class="card-title" >{{ movie["title"] }}</h5></div>
            <div class="row"><p class="card-text">{{ movie["release_date"].slice(0,4)}}</p></div>
          </div>
        </div>
      </div>
      
      <div v-else @click="toDetail" class="card" style="width: 14rem;">
        <img :src="poster_path" class="card-img">
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