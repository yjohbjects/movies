<template>
  <div id="update-review" :style="`background: rgba(0, 0, 0, 0.75); background-image: url(${ reviewDetail.movie['poster_path'] }); background-size: cover; background-blend-mode: darken; background-repeat : no-repeat; width: 100%; height: 180vh`">
    <h1>⠀</h1>
   <div class="container my-5">
    <div class="card" style="background-color: rgba(255, 255, 255, 0.2); border-radius: 10px">

      <form @submit.prevent="updateReview">
        <!-- <div class="container"> -->
        <h1 style="text-align: center" class="mt-4">리뷰</h1><br>
        <div class="card-body">

        <label for="title">제목</label><br>
        <input type="text" class="form-control" id="title" v-model="title"><br>

        <label for="content">내용</label>
        <textarea id="content" class="form-control" v-model="content"></textarea>
        
        <div class="d-flex justify-content-end my-4">
          <input type="submit" class="btn mx-2" style="background-color: #5CB8E4; color: #F2F2F2;" value="수정"><br>
          <button class="btn mx-2" style="background-color: #5CB8E4; color: #F2F2F2;" @click="deleteReview">삭제</button>
        </div>

        </div>
      </form>


      </div>
    </div>
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
      title: null,
      content: null,
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
        this.title = response.data.title
        this.content = response.data.content
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