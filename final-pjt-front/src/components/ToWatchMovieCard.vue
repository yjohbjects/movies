<template>
  <div>
    <router-link :to="{ name: 'Detail', params: { movieId: movie.id} }" style="color: #F2F2F2">
    <div class="container my-2">
      <div class="d-flex justify-content-between">
        <img :src="`${movie.poster_path}`" width="20%" height="20%" style="border-radius: 5px">

        <div class="row container d-flex align-items-start">
          <!-- <div class=""> -->
            <div>
              <!-- <span> -->
                <span style="font-weight: bold; font-size: 45px">{{ movie.title }}</span>
                <span style="font-weight: bold; font-size: 35px">({{ release_year }})</span>
                <p class="mx-2 my-0" style="font-weight: bold; font-size: 20px">{{ movie.original_title }}</p>
              <!-- </span> -->
            </div>
          <!-- </div>  -->
          
          <div class="mx-1">
            <span class="mx-1">{{ movie.overview }}</span>
          </div>
        </div>
        </div>

      <hr>
    </div>
    </router-link>
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
  },
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