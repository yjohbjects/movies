<template>
<div id="create-review" :style="`background: rgba(0, 0, 0, 0.75); background-image: url(${ movieDetail?.poster_path }); background-size: cover; background-blend-mode: darken; background-repeat : no-repeat; width: 100%; height: 180vh`">
    <h1>⠀</h1>
    <div class="container my-5">
  <div class="card" style="background-color: rgba(255, 255, 255, 0.2); border-radius: 10px">

      <form @submit.prevent="createReview">
        <!-- <div class="container"> -->
        <h1 style="text-align: center">리뷰작성</h1><br>
        <h1>{{ movidId }}</h1>

        <label for="title">Title</label><br>
        <input type="text" class="form-control" id="title" placeholder="제목을 입력해주세요." v-model="title"><br>

        <label for="content">내용</label>
        <textarea id="content" class="form-control" v-model.trim="content" v-model="content" placeholder="내용을 입력해주세요."></textarea>

        <input type="submit" value="등록하기"><br>
        <!-- </div>  -->
      </form>

    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  
  name: 'CreateReview',
  data() {
    return {
      movieId: this.$route.params.movieId,
      title: null,
      content: null,
      movieDetail: null,
    }
  },
  methods: {
      getMovieDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.movieId}`,
        headers: {
          Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((response) => {
        this.movieDetail = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    createReview() {
      const title = this.title
      const content = this.content
      const movieId = this.movieId
      const user = this.$store.state.user
      const payload = {
        title: title,
        content: content,
        movieId: movieId,
        user: user,
      }

      this.$store.dispatch('createReview', payload)
      console.log(this.movieId)
      this.$router.push({ name: "Detail", params: { movieId: this.movieId } })
    }
  },
  created() {
    this.getMovieDetail()

    // console.log(this.movieId)
  }
}
</script>

<style>
</style>
