<template>
  <div>
    <h1>평가한 영화 페이지</h1>
    <WatchedMovieCard/>
    <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>

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