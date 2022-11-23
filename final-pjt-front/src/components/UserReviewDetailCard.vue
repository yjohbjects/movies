<template>
<!-- reviews by user -->
  <div @click="toReviewDetail">
    <h2>{{ review.title }}</h2>
    <h5>{{ review.movie.title }}</h5>
    <p>{{ review.content }}</p>
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
  created() {
    console.log(this.review)
  }
}
</script>

<style>

</style>