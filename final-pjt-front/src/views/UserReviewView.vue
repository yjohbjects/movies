<template>
  <div>

    <ReviewDetailCard/>
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