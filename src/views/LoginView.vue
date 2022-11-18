<template>
  <div class="login">
    <div class="d-flex justify-content-center">
    <!-- 카드로 다 감싸주기 -->
    <div class="card" style="width: 23rem">
      
      <!-- 로고, h1 로그인 -->
      <div class="text-center">
        <img src="../assets/logo.png" alt="logo" width="150">
      </div>
      <h1>Login</h1>

      <div>

        <!-- 로그인 섹션 -->
        <section>
          <input type="text" value="아이디를 입력하세요."><br>
          <input type="text" value="비밀번호를 입력하세요"><br>
          
          <!-- 선택한 default_genre가 n개 이상이라면 -->
          <!-- lf default_genre >= n -->
          <router-link :to="{ name: 'home' }">
            <input type="submit" value="로그인">
          </router-link>

          <!-- else -->
          <!-- <router-link></router-link> -->
        </section>
        
        <br>
        <br>
        
        <!-- 회원가입 페이지로 -->
        <section>
          <span>아직 회원이 아니신가요? </span>
          <router-link :to="{ name: 'signup' }">
            <input type="submit" value="회원가입">
          </router-link>
        </section>

        
      </div>
    </div>
    </div>
  </div>
</template>
