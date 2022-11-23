<template>
  <div>
    <h1>리뷰 디테일 페이지</h1>

      <form @submit.prevent="updateReview">
        <!-- <div class="container"> -->
        <h1 style="text-align: center">리뷰작성</h1><br>
        <h1>{{ movidId }}</h1>

        <label for="title">Title</label><br>
        <input type="text" class="form-control" id="title" v-model="title"><br>

        <label for="content">내용</label>
        <textarea id="content" class="form-control" v-model="content"></textarea>

        <input type="submit" class="btn btn-outline-primary" value="수정"><br>
      </form>


    <h1>{{ reviewId }}</h1>
    <p>{{ reviewDetail }}</p>
    <h2>{{ reviewDetail.title }}</h2>
    <h3>{{ reviewDetail.content }}</h3>
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
      const reviewId = this.$route.params.reviewId
      const movieId = this.reviewDetail.movie["id"]
      const payload = {
        reviewId: reviewId,
        movieId: movieId,
      }
      console.log(reviewId)
      console.log(movieId)
      this.$store.dispatch('deleteReview', payload)
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
    },
    updateReview() {
      const title = this.title
      const content = this.content
      const user = this.reviewDetail.review_user["id"]
      const movieId = this.reviewDetail.movie["id"]
      const reviewId = this.$route.params.reviewId
      const payload = {
        title: title,
        content: content,
        movieId: movieId,
        user: user,
        reviewId: reviewId,
      }
      this.$store.dispatch('updateReview', payload)
    }
  },
  created() {
    this.getReviewDetail()
  }
}
</script>

<style>

</style>