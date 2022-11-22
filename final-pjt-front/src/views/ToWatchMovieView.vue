<template>
  <div>
    <h1>나중에 볼 영화 페이지</h1>
    <ToWatchMovieCard/>
    <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>

  </div>
</template>

<script>
import ToWatchMovieCard from '@/components/ToWatchMovieCard'

export default {
  name: 'ToWatchMovieView',
  components: {
    ToWatchMovieCard,
  },
  created() {
    this.$store.dispatch('nowMypage')
  }
}
</script>

<style>

</style>