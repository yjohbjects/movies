<template>
  <div class="container">
    <div class="card">
      <form @submit.prevent="createReview">
        <h1 style="text-align: center">리뷰작성</h1><br>
        <h1>{{ movidId }}</h1>
        <h1>★★★★★</h1>

        <label for="title">Title</label><br>
        <input type="text" class="form-control" id="title" placeholder="제목을 입력해주세요." v-model="title"><br>

        <label for="content">내용</label>
        <textarea id="content" class="form-control" v-model.trim="content" v-model="content" placeholder="내용을 입력해주세요."></textarea>

        <input type="submit" value="등록하기"><br>


      </form>

    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateReview',
  data() {
    return {
      movieId: this.$route.params.movieId,
      title: null,
      content: null,
    }
  },
  methods: {
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
  }
}
</script>

<style>

</style>