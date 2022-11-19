<template>
  <div id="app">
    <nav>
      <div class="container-fluid">
      <span>
        <img src="../src/assets/logo.png" alt="logo" width="120">
      
        <router-link :to="{ name: 'Home' }">Home</router-link> |
        <router-link :to="{ name: 'About' }">About</router-link>
        여기서부터는 테스트용 (지울거임!!)
        <router-link :to="{ name: 'Login' }">Log In</router-link> and
        <router-link :to="{ name: 'Signup' }">Sign Up</router-link> and
        <router-link :to="{ name: 'SetGenre' }">Set Genre</router-link> 

        <!-- <router-link :to="{ name: 'Home' }">홈</router-link> -->
        <!-- <router-link :to="{ name: 'MyPage' }">마이페이지</router-link> -->
        <!-- <router-link :to="{ name: 'WatchedMovie' }">평가한 영화</router-link> -->
        <!-- <router-link :to="{ name: 'ToWatchMovie' }">나중에 볼 영화</router-link> -->
        <!-- <router-link :to="{ name: 'UserReview' }">리뷰</router-link> -->
      </span>  
      

      <!-- search bar section -->
      <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#searchbarModal" style="border-radius: 40px;">
      ⠀Search⠀⠀⠀⠀⠀⠀
      <ion-icon name="search-outline"></ion-icon>
      </button>

      <!-- user section -->
      <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#profileModal" style="border-radius: 40px;">
        <router-link :to="{ name: 'mypage' }">
        <img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="50">
        <p>username</p>
        </router-link>
      </button>

    </div>
    </nav>
    <router-view/>

  <!-- Modal -->
    <div class="modal fade" id="searchbarModal" tabindex="-1" aria-labelledby="searchbarModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <input class="form-control" type="text" placeholder="Search" aria-label="Search" style="padding-left: 20px; border-radius: 40px;">
            <div class="input-group-addon d-flex align-content-center" style="margin-left: -40px; border-radius: 40px; background-color: transparent; border:none;">
              <button class="btn" type="submit"><ion-icon name="search-outline"></ion-icon></button>
            </div>
          </div>

            <div class="modal-body">
              <h1>여기에 검색 결과가 뜰 수 있도록</h1>
            </div>
        </div>
      </div>
    </div>

  <!-- Search Bar Modal -->
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header d-flex justify-content-start">
              <span><img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="50" class="mx-3"></span>

              <div class="col">
                <h5>{닉네임}님,</h5>
                <p>{아이디}</p>
              </div>

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
