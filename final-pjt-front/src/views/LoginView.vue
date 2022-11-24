<template>
  <div class="logoin container">
    <div class="card my-5" style="background-color: rgba(255, 255, 255, 0.2); border-radius: 10px">

    <form @submit.prevent="logIn">
      <h1 style="text-align: center" class="mt-4">로그인</h1><br>
      <div class="card-body">

        <label for="username">아이디</label><br>
        <input type="text" class="form-control" id="username" placeholder="아이디를 입력하세요." v-model="username"><br>

        <label for="password">비밀번호</label>
        <input type="password" class="form-control" id="password" placeholder="비밀번호를 입력하세요." v-model="password"><br>

        <div class="d-flex justify-content-end my-2">
        <input type="submit" class="btn" style="background-color: #5CB8E4; color: #F2F2F2;" value="로그인">
        </div>


        <div class="d-flex justify-content-center align-items-center">
        <router-link :to="{ name: 'Signup' }">
          <span style="color: #F2F2F2">아직 회원이 아니신가요?</span>
          <button class="btn mx-3" style="background-color: #5CB8E4; color: #F2F2F2;">회원가입</button>
          </router-link>
        </div>
      </div> <!-- card-body -->
      
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