<template>
  <div>
    <h1>리뷰 디테일 페이지</h1>
    <h1>{{ reviewId }}</h1>
    <p>{{ reviewDetail }}</p>
    <h2>{{ reviewDetail.title }}</h2>
    <h3>{{ reviewDetail.content }}</h3>
    <button class="btn btn-outline-primary">수정</button>
    <button class="btn btn-outline-primary" @click="deleteReview">삭제</button>
  </div>
</template>

<script>
import axios from 'axios'


export default {
  name: 'ReviewDetailView',
  components: {
  },
  data() {
    return {
      reviewId: this.$route.params.reviewId,
      reviewDetail: null,
    }
  },
  methods: {
    deleteReview() {
      this.$store.commit('DELETE_REVIEW', this.reviewId)
      this.$router.push({ name: 'Home' })
    },
    getReviewDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/review/${this.reviewId}`,
        headers: {
          Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((response) => {
        this.reviewDetail = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  created() {
    this.getReviewDetail()
  }
}
</script>

<style>

</style>