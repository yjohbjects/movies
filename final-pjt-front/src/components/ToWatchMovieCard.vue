<template>
  <div>
    <div class="container my-2">
      <div class="d-flex justify-content-between">
        <img :src="`${movie.poster_path}`" width="20%" height="20%" alt="">

        <div class="row container mx-3">
          <div class="d-flex justify-content-between">
            <div>
              <span>
                <span style="font-weight: bold; font-size: 45px">{{ movie.title }}</span>
                <span style="font-weight: bold; font-size: 35px">({{ release_year }})</span>
              </span>
              <p class="mx-2 my-0" style="font-weight: bold; font-size: 20px">{{ movie.original_title }}</p>
            </div>
          </div>
          <div class="mx-1">
            <span>{{ movie.overview }}</span>
          </div>
        </div>
        </div>
        
      <hr>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ToWatchMovieCard',
  props: {
    movie: Object,
  },
  computed: {
    release_year() {
      return this.movie.release_date.substring(0, 4)
    }
  }
}
</script>

<style>
  .genres {
    border: 1px solid;
    text-align: center;
    padding: 5px 5px;
    border-radius: 5px;
    margin: 20px auto;
  }
</style>