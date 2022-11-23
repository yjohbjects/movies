<template>
  <div>
    {{ movie.title }}
  </div>
</template>

<script>
export default {
  name: 'ToWatchMovieCard',
  props: {
    movie: Object,
  }
}
</script>

<style>

</style>