<template>
<!-- reviews by user -->
  <div @click="toReviewDetail" class="container my-2">
    <div class="d-flex justify-content-between">
      <img :src="`${review.movie.poster_path}`" width="20%" height="20%" alt="">

      <div class="row container d-flex align-items-start">
        <div>
            <p style="font-weight: bold; font-size: 40px; font-family: system-ui;" class="mx-2 my-0">{{ review.title }}</p><br>
            <p style="font-weight: bold; font-size: 25px; font-family: monospace" class="mx-2 my-0">{{ review.movie.title }}</p>
            <p class="mx-2 mb-5">{{ review.movie.original_title }}</p>
            <p style="font-size: 20px; font-family: monospace" class="mx-2 my-0">{{ review.content }}</p>
            

          </div>
        </div>
        <!-- <span style="font-weight: bold; font-size: 35px">({{ release_year }})</span>
        <p class="mx-2 my-0" style="font-weight: bold; font-size: 20px">{{ movie.original_title }}</p> -->
      <!-- <p>{{ review }}</p> -->
    </div>
    <hr>
  </div>
</template>

<script>

export default {
  name: 'UserReviewDetailCard',
  props: {
    review: Object,
  },
  methods: {
    toReviewDetail() {
      this.$router.push({ name: 'ReviewDetail', params: { reviewId: this.review.id } })
    }
  },
  computed: {
    release_year() {
      return this.review.movie.release_date.substring(0, 4)
    }
  },
}
</script>

<style>

</style>