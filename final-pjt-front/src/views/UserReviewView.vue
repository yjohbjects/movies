<template>
  <div>
    <div class="container mt-4">
      <div class="d-flex justify-content-between align-items-center">
        <h1>내가 작성한 리뷰</h1>
        <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>
      </div>
      <hr>
      </div>
      
      <UserReviewDetailCard v-for="(review, id) in reviews" :key="id" :review="review"/>
      
  </div>
</template>

<script>
import UserReviewDetailCard from '@/components/UserReviewDetailCard'

export default {
  name: 'UserReviewView',
  components: {
    UserReviewDetailCard
  },
  computed: {
    reviews() {
      return this.$store.state.userReviews
    },
  },
  created() {
    this.$store.dispatch('nowMypage')
    this.$store.dispatch('getUserReviews')
    }
}

</script>

<style>

</style>