<template>
  <div class="col" @click="toDetail">
    <div class="card" style="width: 14rem;">
      <img :src="`${ movie.poster_path }`" class="card-img">
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToWatchMoviePosterCard',
  props: {
    movie: Object,
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