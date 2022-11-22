<template>
  <div>

    <ReviewDetailCard/>
    <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>
  </div>
</template>

<script>
import ReviewDetailCard from '@/components/ReviewDetailCard'

export default {
  name: 'UserReviewView',
  components: {
    ReviewDetailCard
  },
  created() {
    this.$store.dispatch('nowMypage')
  }
}
</script>

<style>

</style>