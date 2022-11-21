<template>
  <div class="container">
    <div class="card">
      <form>
      <h1 style="text-align: center">리뷰작성</h1><br>

      <h1>★★★★★</h1>

      <label for="title">Title</label><br>
      <input type="text" class="form-control" id="title" placeholder="제목을 입력해주세요."><br>

      <label for="content">내용</label>
      <input type="text" class="form-control" id="content" placeholder="내용을 입력해주세요."><br>

      <input type="submit" value="등록하기"><br>


      </form>

    <form @submit.prevent="createRrticle">
      <input type="text" v-model.trim="title"><br>
      <textarea v-model.trim="content"></textarea>
      <input type="submit">
    </form>


    </div>
  </div>
</template>

<script>
export default {
  name: 'CreateReview',
  data() {
    return {
      title: null,
      content: null,
    }
  },
  methods: {
    createReview() {
      const title = this.title
      const content = this.content
      const payload = {
        title, content
      }
      this.$store.dispatch('createReview', payload)
      // detail 페이지로 가게 해주기
      this.$router.push({ name: 'Home'})
    }
  }
}
</script>

<style>

</style>