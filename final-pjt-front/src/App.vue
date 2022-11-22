<template>
  <div id="app">
    
    <!-- mypage nav -->
    <nav v-if="isMypage" class="mypage-nav">
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
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#searchbarModal" style="border-radius: 40px;height: 37px;">⠀영화 검색⠀⠀⠀⠀⠀⠀<ion-icon name="search-outline" style="color: white"></ion-icon></button>
      </div>

      <!-- user section -->
      <div class="btn-group">
        <button type="button" class="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" style="border-radius: 40px">
          <span class="mx-1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="user" width="20">⠀{{ nickname }}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end">
          <li @click="toMypage"><button class="dropdown-item" type="button">
            <span class="mx-1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="user" width="20">⠀{{ nickname }}</span>
          </button></li>

          <li><hr class="dropdown-divider"></li>
          <li @click="toMypage"><button class="dropdown-item" type="button">마이페이지</button></li>
          <li @click="toWatchedMovie"><button class="dropdown-item" type="button">평가한 영화</button></li>
          <li @click="toToWatchMovie"><button class="dropdown-item" type="button">나중에 볼 영화</button></li>
          <li @click="toUserReview"><button class="dropdown-item" type="button">리뷰</button></li>
          <li><hr class="dropdown-divider"></li>
          <li @click="logout"><button class="dropdown-item" type="button">로그아웃</button></li>
        </ul>
      </div> <!-- user section -->
      </div>
    </div>
    </nav>

    <!-- login nav -->
    <nav v-else-if="isLoginpage"></nav>

    <!-- home nav -->
    <nav v-else class="home-nav">
      <div class="container-fluid d-flex justify-content-between">
      
      <div>
        <span><router-link :to="{ name: 'Home' }">
          <img src="../src/assets/logo.png" alt="logo" width="120"></router-link></span>
      </div>

      <!-- search bar section -->
      <div class="d-flex align-items-center">
      <div class="mx-2">
        <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#searchbarModal" style="border-radius: 40px;height: 37px;">⠀영화 검색⠀⠀⠀⠀⠀⠀<ion-icon name="search-outline" style="color: white"></ion-icon></button>
      </div>

      <!-- user section -->
      <div class="btn-group">
        <button type="button" class="btn btn-outline-light dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false" style="border-radius: 40px">
          <span class="mx-1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="user" width="20">⠀{{ nickname }}</span>
        </button>
        <ul class="dropdown-menu dropdown-menu-lg-end">
          <li @click="toMypage"><button class="dropdown-item" type="button">
            <span class="mx-1"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="user" width="20">⠀{{ nickname }}</span>
          </button></li>

          <li><hr class="dropdown-divider"></li>
          <li @click="toMypage"><button class="dropdown-item" type="button">마이페이지</button></li>
          <li @click="toWatchedMovie"><button class="dropdown-item" type="button">평가한 영화</button></li>
          <li @click="toToWatchMovie"><button class="dropdown-item" type="button">나중에 볼 영화</button></li>
          <li @click="toUserReview"><button class="dropdown-item" type="button">리뷰</button></li>
          <li><hr class="dropdown-divider"></li>
          <li @click="logout"><button class="dropdown-item" type="button">로그아웃</button></li>
        </ul>
      </div> <!-- user section -->
    </div>

    </div>
    </nav>
    <router-view/>

  <!-- Search Bar Modal -->
    <div class="modal fade" id="searchbarModal" tabindex="-1" aria-labelledby="searchbarModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <input @input="onInputChange" @keyup="isExistingQuery=true" class="form-control" type="text" placeholder="어떤 영화를 찾아드릴까요?" aria-label="Search" style="padding-left: 20px; border-radius: 40px;">
          </div>

            <div class="modal-body">
            <p>{{ movieQuery }}</p>

          <div v-show="isExistingQuery">
            <!-- 검색결과가 없을 때 -->
            <div v-if="results.length === 0">
              <p>검색 결과가 없습니다</p>
            </div>

              <div v-else>
                <div v-for="(result) in results" :key='result.id'>
                  <span><p>{{ result.title }}</p></span>
                  <span><img :src="'https://image.tmdb.org/t/p/w500/' + result.poster_path" width="218" height="327" style="border-radius: 5px"></span>
                </div>
              </div>
          </div>

            </div>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
import axios from 'axios'

const API_KEY = process.env.VUE_APP_TMDB_API_KEY

export default {
  name: 'App',
  data() {
    return {
      movieQuery: '',
      results: '',
    }
  },
  computed: {
    isMypage() {
      return this.$store.state.isMypage
    },
    isLoginpage() {
      return this.$store.state.isLoginpage
    },
    username() {
      return this.$store.state.username
    },
    nickname() {
      return this.$store.state.nickname
    },
  },
  methods: {
    logout() {
      this.$store.commit('LOGOUT')
      this.$router.push({ name: "Login" })
    },
    toMypage() {
      this.$router.push({ name: "MyPage" })
    },
    toWatchedMovie() {
      this.$router.push({ name: "WatchedMovie" })
    },
    toToWatchMovie() {
      this.$router.push({ name: "ToWatchMovie" })
    },
    toUserReview() {
      this.$router.push({ name: "UserReview" })
    },
    onInputChange(event) {
      this.movieQuery = event.target.value

      axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=ko&query=` + event.target.value + '&include_adult=false')
      .then(response => {
        this.results = response.data.results.filter(
          function (result) {
            return result.poster_path
          }
        )
      })
      


    }
  },
  created() {
    this.$store.dispatch('getUsername')
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  /* background-color: black; */
  color: #F2F2F2;
}

.home-nav {
  /* padding: 10px; */
  background-color: #3F0071;
}
.mypage-nav {
  /* padding: 10px; */
  background-color: #150050;
  /* color: white; */
}

nav a {
  font-weight: bold;
  color: #F2F2F2;
}

a.router-link-exact-active {
  color: #FB2576;
}

body{
     background-color:#000000;
 }

.modal-header {
  background-color: #5CB8E4;
  color: #F2F2F2
}

.dropdown-toggle::after { 
 content: none; 
 }
</style>
