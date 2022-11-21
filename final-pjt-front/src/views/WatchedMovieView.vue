<template>
  <div>
    <h1>평가한 영화 페이지</h1>
    <WatchedMovieCard/>
  </div>
</template>

<script>
import WatchedMovieCard from "@/components/WatchedMovieCard"
export default {
  name: 'WatchedMovieView.vue',
  components: {
    WatchedMovieCard
  },
  created() {
    this.$store.dispatch('nowMypage')
  }
}
</script>

<style>

</style>