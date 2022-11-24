<template>
  <div class="home">
    <HelloWorld/>
    <div class="container-fluid mt-5">
    <div class="container mb-3" style="font-weight: bold; font-size: 50px;"><p>안녕하세요, {{ nickname }}님!</p></div>
    
    <!-- 영화들 리스트별 horizontal scroll 추가 예정 -->
    <!-- https://codepen.io/Temmio/pen/gKGEYV -->
    
    <div class="container my-3">
      <h2 class="movie-type">{{ nickname }}님을 위한 추천영화</h2>
      <div class="horizontal-scrollable">
        <div class="row flex-nowrap movie-list">
          <RecommendedMovieCard v-for="(movie, id) in recommendedMovies" :key="id" :movie="movie" class="for-cursor"/>
        </div>
      </div>
    </div>
    <br>
    <div class="container my-3">
      <h2 class="movie-type">인기영화는 어때요?</h2>
      <div class="horizontal-scrollable"> 
        <div class="row flex-nowrap movie-list">
          <PopularMovieCard v-for="(movie, id) in popularMovies" :key="id" :movie="movie" class="for-cursor"/>
        </div>
      </div>
    </div>
    <br>
    <div class="container my-3">
      <h2 class="movie-type">최근 상영 영화는 어떤가요?</h2>
      <div class="horizontal-scrollable">
        <div class="row flex-nowrap movie-list">
          <NowPlayingMovies v-for="(movie, id) in nowPlayingMovies" :key="id" :movie="movie" class="for-cursor"/>
        </div>
      </div>
    </div>
    </div> <!-- container -->
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import RecommendedMovieCard from '@/components/RecommendedMovieCard.vue'
import PopularMovieCard from '@/components/PopularMovieCard.vue'
import NowPlayingMovies from '@/components/NowPlayingMovieCard.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    RecommendedMovieCard,
    PopularMovieCard,
    NowPlayingMovies,
  },
  computed: {
    recommendedMovies() {
      return this.$store.state.recommendedMovies
    },
    popularMovies() {
      return this.$store.state.popularMovies
    },
    nowPlayingMovies() {
      return this.$store.state.nowPlayingMovies
    },
    isLogin() {
      return this.$store.getters.isLogin
    },
    nickname() {
      return this.$store.state.nickname
    }
  },
  methods: {
    getMovies() {
      if (this.isLogin === true) {
        this.$store.dispatch('getMovies')
        this.$store.dispatch('getPopularMovies')
        this.$store.dispatch('getNowPlayingMovies')
      } else {
        alert('로그인이 필요한 페이지입니다 :-D')
        this.$router.push({ name : "Login" })
      }
    }
  },
  created() {
    this.getMovies()
    this.$store.dispatch('getUsername')
    this.$store.dispatch('nowHome')
  }
}
</script>

<style>
/* The heart of the matter */
  
.horizontal-scrollable > .row {
    overflow-x: auto ;
    display: flex;
    /* white-space: nowrap; */
}
  
.horizontal-scrollable > .row > .col-xs-4 {
    display: inline-block;
    float: none;
}

  .movie-type {
    text-align: left;
  }

/* 스크롤바 꾸미기 */
.movie-list::-webkit-scrollbar {
  height: 6px;
}
.movie-list::-webkit-scrollbar-track {
  background-color: #3A3B3C;
}
.movie-list::-webkit-scrollbar-thumb {
  border-radius: 3px;
  background-color: #5CB8E4;
}
.movie-list::-webkit-scrollbar-button {
  width: 0;
  height: 0;
}

.for-cursor {
  cursor: pointer;
}

</style>