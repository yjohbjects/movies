<template>
  <div @click="toReviewDetail">
    <h4>{{ review.title }}</h4>
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
  }
}
</script>

<style>

</style>