<template>
  <div id="app">
    <nav v-if="isMypage" class="mypage-nav">
    <!-- <nav v-else class="home-nav"> -->
      <div class="container-fluid d-flex justify-content-between">
      
      <div>
        <span><router-link :to="{ name: 'Home' }">
          <img src="../src/assets/logo.png" alt="logo" width="120"></router-link></span>
      </div>

      <div class="d-flex align-items-center">
          <router-link :to="{ name: 'Home' }">Home</router-link>⠀⠀⠀
          <router-link :to="{ name: 'MyPage' }">마이페이지</router-link>⠀⠀⠀ 
          <router-link :to="{ name: 'WatchedMovie' }">평가한 영화</router-link>⠀⠀⠀ 
          <router-link :to="{ name: 'ToWatchMovie' }">나중에 볼 영화</router-link>⠀⠀⠀ 
          <router-link :to="{ name: 'UserReview' }">리뷰</router-link> 
      </div>
      <!-- search bar section -->
      <div class="d-flex align-items-center">
      <div class="mx-2">
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#searchbarModal" style="border-radius: 40px;height: 37px;">⠀Search⠀⠀⠀⠀⠀⠀<ion-icon name="search-outline" style="color: white"></ion-icon></button>
      </div>

      <!-- user section -->
      <div class="mx-2">
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#profileModal" style="border-radius: 40px; height: 37px;">
          <div class="d-flex align-items-center">
            <span class="mx-1"><img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="20"> username</span>
          </div>
        </button>
      </div>
      </div>

    </div>
    </nav>
    <!-- </nav> -->

    <nav v-else class="home-nav">
      <div class="container-fluid d-flex justify-content-between">
      
      <div>
        <span><router-link :to="{ name: 'Home' }">
          <img src="../src/assets/logo.png" alt="logo" width="120"></router-link></span>
      </div>

      <!-- search bar section -->
      <div class="d-flex align-items-center">
      <div class="mx-2">
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#searchbarModal" style="border-radius: 40px;height: 37px;">⠀Search⠀⠀⠀⠀⠀⠀<ion-icon name="search-outline" style="color: white"></ion-icon></button>
      </div>

      <!-- user section -->
      <div class="mx-2">
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#profileModal" style="border-radius: 40px; height: 37px;">
          <div class="d-flex align-items-center">
            <span class="mx-1"><img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="20"> username</span>
          </div>
        </button>
      </div>
      </div>

    </div>
    </nav>
    <router-view/>

  <!-- Search Bar Modal -->
    <div class="modal fade" id="searchbarModal" tabindex="-1" aria-labelledby="searchbarModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search" style="padding-left: 20px; border-radius: 40px;">
          </div>

            <div class="modal-body">
              <h1>여기에 검색 결과가 뜰 수 있도록</h1>
            </div>
        </div>
      </div>
    </div>

  <!-- User Mypage Modal -->
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-start">
              <span><img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="40" class="mx-3"></span>
                <p>{닉네임}님,</p>
                <p>{아이디}</p>
            </div>

            <div class="modal-body">
              <router-link :to="{ name: 'MyPage' }">마이페이지</router-link><br>
              <router-link :to="{ name: 'ToWatchMovie' }">나중에 볼 영화</router-link><br>
              <router-link :to="{ name: 'Login' }">로그아웃</router-link>

            </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
export default {
  name: 'App',
  computed: {
    isMypage() {
      return this.$store.state.isMypage
    },
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

.home-nav {
  /* padding: 10px; */
  background-color: #8758FF;
}
.mypage-nav {
  /* padding: 10px; */
  background-color: #150050;
  color: white;
}

nav a {
  font-weight: bold;
  color: white;
}

nav a.router-link-exact-active {
  color: #42b983;
}

body{
     background-color:#eeeeee59;
 }

</style>
