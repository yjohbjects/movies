<template>
  <div class="signup">
    <div class="d-flex justify-content-center">


    <!-- 카드로 다 감싸주기 -->
    <div class="card" style="width: 23rem">
      
      <!-- 로고, h1 로그인 -->
      <div class="text-center">
        <img src="../assets/logo.png" alt="logo" width="150">
      </div>
      <h1>회원가입</h1>

      <!-- 회원가입 폼 -->
      <form @submit.prevent="signUp">
        <label for="username">username : </label>
        <input type="text" id="username" v-model="username"><br>
        <br>
        <label for="email"> email : </label>
        <input type="text" id="email" v-model="email"><br>
        <br>
        <label for="password1"> password : </label>
        <input type="password" id="password1" v-model="password1"><br>
        <br>
        <label for="password2"> password confirmation : </label>
        <input type="password" id="password2" v-model="password2">
        <br>
        <router-link :to="{ name: 'setGenre' }">
          <input type="submit" value="다음">
        </router-link>
      </form>

    </div>
    </div>
  </div>
</template>
