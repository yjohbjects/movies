<template>
<!-- reviews by movie -->
  <div @click="toReviewDetail">
    <h2>{{ review.title }}</h2>
    <h5>작성자: {{ review.review_user["nickname"] }}</h5>
    <p>{{ review.content }}</p>
    <hr>

  </div>
</template>

<script>

export default {
  name: 'ReviewDetailCard',
  props: {
    review: Object,
  },
  methods: {
    toReviewDetail() {
      this.$router.push({ name: 'ReviewDetail', params: { reviewId: this.review.id } })
    }
  }
}
</script>

<style>

</style>