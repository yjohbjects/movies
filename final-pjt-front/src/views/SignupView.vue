<template>
  <div class="container my-5">
    <div class="card my-5" style="background-color: rgba(255, 255, 255, 0.2); border-radius: 10px">
    <form @submit.prevent="signUp">
      <div class="container">

      <h1 style="text-align: center">회원가입</h1><br>

      <label for="username">Username</label><br>
      <input type="text" class="form-control" id="username" placeholder="Enter Your ID" v-model="username"><br>
      <label for="nickname">Nickname</label><br>
      <input type="text" class="form-control" id="nickname" placeholder="Enter Your Nickname" v-model="nickname"><br>

      <label for="password1">Password</label><br>
      <input type="password" class="form-control" id="password1" placeholder="Enter Your Password" v-model="password1"><br>
      <label for="password2">Password Confirmation</label><br>
      <input type="password" class="form-control" id="password2" placeholder="Confirm Your Password" v-model="password2"><br>
      <input type="submit" value="다음">
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
      const password1 = this.password1
      const password2 = this.password2

      const payload = {
        username: username,
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
