<template>
  <div>

    <UserReviewDetailCard v-for="review in reviews" :key="review.id" :review="review"/>
    <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>
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
      return this.$store.state.reviews
    },
  },
  created() {
    this.$store.dispatch('nowMypage')
    this.$store.dispatch('getUserReviews', this.userId)
    }
}

</script>

<style>

</style>