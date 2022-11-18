<template>
  <div id="app">
    <nav>
      <div class="d-flex justify-content-between">
      <span>
        <img src="../src/assets/logo.png" alt="logo" width="120">
      
        <router-link :to="{ name: 'home' }">Home</router-link> |
        <router-link :to="{ name: 'about' }">About</router-link>
        여기서부터는 테스트용 (지울거임!!)
        <router-link :to="{ name: 'login' }">Log In</router-link> and
        <router-link :to="{ name: 'signup' }">Sign Up</router-link> and
        <router-link :to="{ name: 'setGenre' }">Set Genre</router-link> 

        <router-link :to="{ name: 'home' }">홈</router-link>
        <router-link :to="{ name: 'mypage' }">마이페이지</router-link>
        <router-link :to="{ name: 'watchedMovie' }">평가한 영화</router-link>
        <router-link :to="{ name: 'toWatchMovie' }">나중에 볼 영화</router-link>
        <router-link :to="{ name: 'userReview' }">리뷰</router-link>
      </span>  


      <!-- user section -->
      <span>
        <router-link :to="{ name: 'mypage' }">
        <img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="50">
        <p>username</p>
        </router-link>
      </span>

    </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #8758FF;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body{
     background-color:#eeeeee59;
 }
 
  .footer-subscribe input[type=text] {
    border: 1px solid #ff3514;
    border-radius: 55px;
    font-size: 12px;
    padding: 12px 40% 12px 20px;
    background: transparent;
    width: 98%;
    box-shadow: none !important;
}

.mt-100{
    margin-top:200px;
}

a, button[type="submit"], input[type=text] {
    color: #333;
    text-decoration: none;
    -webkit-transition: all 400ms ease-in-out;
    -moz-transition: all 400ms ease-in-out;
    -o-transition: all 400ms ease-in-out;
    -ms-transition: all 400ms ease-in-out;
    transition: all 400ms ease-in-out;
}

.footer-subscribe .btn-theme {
    position: absolute;
    top: 0;
    height: 100%;
    right: 0;
}

.btn-theme:hover {
    box-shadow: none;
}

.btn-theme {
    color: #FFF !important;
    padding: 0.5rem 1.9rem;
    font-weight: 400;
    font-size: 0.875rem;
    display: inline-block;
    display: inline-flex;
    outline: none;
    border: none;
    cursor: pointer;
    overflow: hidden;
    z-index: 2;
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-box-shadow: 0px 14px 47px 0px rgba(28, 28, 28, 0.24);
    -moz-box-shadow: 0px 14px 47px 0px rgba(28, 28, 28, 0.24);
    box-shadow: 0px 14px 47px 0px rgba(28, 28, 28, 0.24);
    -webkit-border-radius: 70px;
    -moz-border-radius: 70px;
    border-radius: 70px; 
}

.bg-orange {
    background: #ff3514;
}
</style>
