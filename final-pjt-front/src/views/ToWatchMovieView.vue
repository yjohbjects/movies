<template>
  <div>
    <h1>나중에 볼 영화 페이지</h1>
    <ToWatchMovieCard/>
  </div>
</template>

<script>
import ToWatchMovieCard from '@/components/ToWatchMovieCard'

export default {
  name: 'ToWatchMovieView',
  components: {
    ToWatchMovieCard,
  }
}
</script>

<style>

</style>