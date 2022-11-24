<template>
<!-- reviews by movie -->
  <div @click="toReviewDetail">
    <h2>{{ review.title }}</h2>
    <p>작성자: {{ review.review_user["nickname"] }}</p>
    <p class="lead">{{ review.content }}</p>
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
      if(this.$store.state.user === this.review.review_user["id"]) {
        this.$router.push({ name: 'ReviewDetail', params: { reviewId: this.review.id } })
      } else {
        alert('작성한 유저만 수정이 가능합니다.')
      }
    }
  }
}
</script>

<style>

</style>