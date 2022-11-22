<template>
  <div class="container">
    <div class="card my-5" style="background-color: rgba(255, 255, 255, 0.2); border-radius: 10px">
    <form @submit.prevent="logIn">

      <h1 style="text-align: center">로그인</h1><br>
      <label for="username">Username</label><br>
      <input type="text" class="form-control" id="username" placeholder="Enter Your ID" v-model="username"><br>

      <label for="password">Password</label>
      <input type="password" class="form-control" id="password" placeholder="Enter Your Password" v-model="password"><br>

      <input type="submit" value="로그인"><br>

      <div class="d-flex">
      <p>아직 회원이 아니신가요?</p>
      <router-link :to="{ name: 'Signup' }"><button>회원가입</button></router-link>
      </div>
    </form>
    </div>
  </div>
  
</template>

<script>
export default {
  name: 'LoginView',
  data() {
    return {
      username: null,
      password: null,
    }
  },
  methods: {
    logIn() {
      const username = this.username
      const password = this.password

      const payload = {
        username: username,
        password: password,
      }
      this.$store.dispatch('logIn', payload)
    },
    // signup() {
    //   this.$stoure.push({})
    // }
  },
  created() {
    this.$store.dispatch('nowLogin')
  }
}
</script>

<style>
.card{
  background-color: rgba(0, 0, 0, 0.5);
}
</style>