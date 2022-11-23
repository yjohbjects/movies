<template>
  <div class="container-fluid mt-5">
    <h1>{{ userId }}</h1>
    <!-- <h1>mypage view</h1> -->
    <div class="container my-3">
        <div class="d-flex align-items-center">
          <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2c/Default_pfp.svg/1200px-Default_pfp.svg.png" alt="user" width="150">
        <div class="mx-5">
          <h2 class="my-0">{{ nickname }}님,</h2>
          <p class="lead">ID: {{ username }}</p>
          <p>평가한 영화:⠀{{ numWatchedMovies }} ⠀⠀|⠀⠀ 나중에 볼 영화:⠀{{ numToWatchMovies }}</p>
        </div>
        </div>
    </div>

    <div class="container my-5">
      <div class="d-flex justify-content-between">
        <h3>평가한 영화</h3>
        <router-link :to="{ name: 'WatchedMovie' }">더보기</router-link>
      </div>
      <hr>
      <RatedList/>
      <hr>
    </div>

    <div class="container my-5">
      <div class="d-flex justify-content-between">
        <h3>나중에 볼 영화</h3>
        <router-link :to="{ name: 'ToWatchMovie' }">더보기</router-link>
      </div>
      <hr>
      <WatchList/>
      <hr>
    </div>
    
    <div class="container my-5">

    <div class="d-flex justify-content-between">
        <h3>작성한 리뷰</h3>
        <router-link :to="{ name: 'UserReview' }">더보기</router-link>
      </div>
      <hr>
      <UserReviewDetailCard v-for="review in reviews" :key="review.id" :review="review"/>
    </div>

  </div>
</template>

<script>
import WatchList from '@/components/WatchList'
import RatedList from '@/components/RatedList'
import UserReviewDetailCard from '@/components/UserReviewDetailCard'

export default {
  name: 'MyPageView',
  components: {
    WatchList,
    RatedList,
    UserReviewDetailCard,
  },
  data() {
    return {
    }
  },
  computed: {
    isLogin() {
      return this.$store.getters.isLogin
    },
    username() {
      return this.$store.state.username
    },
    nickname() {
      return this.$store.state.nickname
    },
    numToWatchMovies() {
      return this.$store.getters.numToWatchMovies
    },
    numWatchedMovies() {
      return this.$store.getters.numWatchedMovies
    },
    reviews() {
      return this.$store.state.userReviews
    },
  },
  methods: {
    getMypage() {
      if (this.isLogin === true) {
        return this.$store.dispatch('nowMypage')
      } else {
        alert('로그인이 필요한 페이지입니다 :-D')
        this.$router.push({ name : "Login" })
      }
    }
  },
  created() {
    this.getMypage()
    this.$store.dispatch('getUsername')
    this.$store.dispatch('getUserReviews')
    this.$store.dispatch('nowMypage')
  }
}
</script>

<style>
a {
  color: #5CB8E4; 
  text-decoration: none;
}

</style>