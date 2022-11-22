<template>
  <div class="container">
    <div class="card">
      <form @submit.prevent="createReview">
        <h1 style="text-align: center">리뷰작성</h1><br>

        <h1>★★★★★</h1>

        <label for="title">Title</label><br>
        <input type="text" class="form-control" id="title" placeholder="제목을 입력해주세요." v-model="title"><br>

        <label for="content">내용</label>
        <input type="text" class="form-control" id="content" placeholder="내용을 입력해주세요." v-model="content"><br>

        <input type="submit" value="등록하기"><br>


      </form>

    <!-- <form @submit.prevent="createRrticle">
      <input type="text" v-model.trim="title"><br>
      <textarea v-model.trim="content"></textarea>
      <input type="submit">
    </form> -->


    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateReview',
  data() {
    return {
      movieId: this.$router.params.movieId,
      title: null,
      content: null,
    }
  },
  methods: {
    createReview() {
      const title = this.title
      const content = this.content
      const movieId = 49046
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