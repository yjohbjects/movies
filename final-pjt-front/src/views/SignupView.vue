<template>
  <div class="container">
    <div class="card">
    <form @submit.prevent="signUp">
      <h1 style="text-align: center">회원가입</h1><br>
      <label for="username">username</label><br>
      <input type="username" class="form-control" id="username" placeholder="username" v-model="username"><br>
      <label for="nickname">nickname</label><br>
      <input type="nickname" class="form-control" id="nickname" placeholder="nickname" v-model="nickname"><br>

      <label for="password1">Password</label><br>
      <input type="password" class="form-control" id="password1" placeholder="Enter Your Password" v-model="password"><br>
      <label for="password2">Password Confirmation</label><br>
      <input type="password" class="form-control" id="password2" placeholder="Confirm Your Password" v-model="password"><br>
      <input type="submit" value="다음">
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
      nickname: null,
    }
  },
  methods: {
    signUp() {
      const username = this.username
      const password1 = this.password1
      const password2 = this.password2
      const nickname = this.nickname

      const payload = {
        username: username,
        password1: password1,
        password2: password2,
        nickname: nickname
      }
      
      this.$store.dispatch('signUp', payload)
    }
  }
}
</script>

<style>

</style>
