<template>
  <div class="container my-5">
    <div class="card my-5" style="background-color: rgba(255, 255, 255, 0.2); border-radius: 10px">

    <form @submit.prevent="signUp">
      
      <h1 style="text-align: center" class="mt-4">회원가입</h1><br>
      <div class="card-body">

      <label for="username">아이디</label><br>
      <input type="text" class="form-control" id="username" placeholder="아이디를 입력하세요." v-model="username"><br>

      <label for="nickname">닉네임</label><br>
      <input type="text" class="form-control" id="nickname" placeholder="닉네임을 입력하세요." v-model="nickname"><br>

      <label for="password1">비밀번호</label><br>
      <input type="password" class="form-control" id="password1" placeholder="비밀번호를 입력하세요." v-model="password1"><br>
      <label for="password2">비밀번호 확인</label><br>
      <input type="password" class="form-control" id="password2" placeholder="비밀번호를 한번 더 입력하세요." v-model="password2"><br>
      
      <div class="d-flex justify-content-end my-2">
        <input type="submit" class="btn" style="background-color: #5CB8E4; color: #F2F2F2;" value="다음">
      </div>
      
      </div>
    </form>

    </div>
  </div>
  
</template>

<script>
export default {
  name: 'SignUpView',
  data() {
    return {
      username: null,
      password1: null,
      password2: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const nickname = this.nickname
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username: username,
        nickname: nickname, 
        password1: password1,
        password2: password2,
      }
      
      this.$store.dispatch('signUp', payload)

    }
  }
}
</script>

<style>

</style>
