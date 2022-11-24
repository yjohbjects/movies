import router from '@/router'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import _ from 'lodash'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'
const API_NOW_PLAYING_MOVIE_URL = 'https://api.themoviedb.org/3/movie/now_playing'
const API_POPULAR_MOVIE_URL = 'https://api.themoviedb.org/3/movie/popular'
const API_KEY = process.env.VUE_APP_TMDB_API_KEY
const randomNum = _.sample(_.range(1, 20))


export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    recommendedMovies: [],
    popularMovies: [],
    nowPlayingMovies: [],
    randomBackground: null,
    isMypage: true,
    isLoginpage: true,
    token: null,
    user: null,
    username: null,
    nickname: null,
    reviews: [],
    userReviews: [],
    toWatchMovies: [],
    userRate: 0,
    isWished: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    },
    numWatchedMovies(state) {
      // watched movies로 변경되어야함
      return state.recommendedMovies.length
    },
    numToWatchMovies(state) {
      // to watch movies로 변경되어야함
      return state.recommendedMovies.length
    },
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.recommendedMovies = movies
    },

    GET_POPULAR_MOVIES(state, popularMovies) {
      state.popularMovies = popularMovies
    },

    GET_NOW_PLAYING_MOVIES(state, nowPlayingMovies) {
      state.nowPlayingMovies = nowPlayingMovies
    },

    GET_RANDOM_BACKGROUND(state, poster_path) {
      state.randomBackground = 'https://image.tmdb.org/t/p/original'+ poster_path
    },

    NOW_HOME(state) {
      state.isMypage = false    
      state.isLoginpage = false
    },

    NOW_MYPAGE(state) {
      state.isMypage = true
      state.isLoginpage = false
    },

    NOW_LOGIN(state) {
      state.isMypage = false
      state.isLoginpage = true
    },

    SAVE_TOKEN(state, token) {
      state.token = token
      // sessionStorage.setItem("token", token)
      router.push({ name : 'Home' })
    },

    GET_USERNAME(state, payload) {
      state.username = payload["username"]
      state.nickname = payload["nickname"]
      state.user = payload["pk"]
    },

    LOGOUT(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      state.token = null
      state.username = null
    },
    CREATE_REVIEW(state, review) {
      state.reviews.push(review)
      state.review_id = state.review_id + 1
    },
    // by movies
    GET_REVIEWS(state, reviews) {
      state.reviews = reviews
    },

    // by users
    GET_USER_REVIEWS(state, reviews) {
      state.userReviews = reviews
    },

    GET_TO_WATCH_MOVIE(state, movies) {
      state.toWatchMovies = movies
    },

    SAVE_RATE(state, rate) {
      state.userRate = rate
      console.log('rate: ' + state.userRate)
    },

    GET_WISH(state, payload) {
      state.isWished = payload["is_wished"]
      console.log('vuex')
      console.log(state.isWished)
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/recommend_movies/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response) => {
          context.commit('GET_MOVIES', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    },
    getPopularMovies(context) {
      const params = {
        api_key: API_KEY, 
        language: 'ko-KR',
        page: _.sample(_.range(1, 40)),
        adult: false
      }

      axios({
        method: 'get',
        url: API_POPULAR_MOVIE_URL,
        params: params,
      })
      .then((response) => {
        context.commit('GET_POPULAR_MOVIES', response.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getNowPlayingMovies(context) {
      const params = {
        api_key: API_KEY, 
        language: 'ko-KR',
        page: _.sample(_.range(1, 40)),
        adult: false
      }
      axios({
        method: 'get',
        url: API_NOW_PLAYING_MOVIE_URL,
        params: params,
      })
      .then((response) => {
        context.commit('GET_NOW_PLAYING_MOVIES', response.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    getRandomBackground(context) {
      const params = {
        api_key: API_KEY,
        language: 'ko-KR',
        adult: false,
        page: _.sample(_.range(1, 5)),
      }

      axios({
        method: 'get', 
        url: 'https://api.themoviedb.org/3/discover/movie/',
        params: params,
      })
      .then((response) => {
        // console.log(response.data.results[randomNum]["poster_path"])
        context.commit('GET_RANDOM_BACKGROUND', response.data.results[randomNum]["poster_path"])
      })
      .error((error) => {
        console.log(error)
      })
    },

    nowHome(context) {
      context.commit('NOW_HOME')
    },

    nowMypage(context) {
      context.commit('NOW_MYPAGE')
    },

    nowLogin(context) {
      context.commit('NOW_LOGIN')
    },

    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          nickname: payload.nickname,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((response) => {
          context.commit('SAVE_TOKEN', response.data.key)
        })
        .catch((error) => {
          // console.log(error.response.data)
          if (error.response.data["username"]) {
            alert('username error: ' + error.response.data["username"])
          } else if (error.response.data["nickname"]) {
            alert ('nickname error: ' + error.response.data["nickname"])
          } else if (error.response.data["password1"]) {
            alert('password error: ' + error.response.data["password1"])
          } else if (error.response.data["password2"]) {
            alert('password error: ' + error.response.data["password2"])
          } else {
            alert(error.response.data["non_field_errors"])
          }
        })
    },

    logIn(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/login/`,
        data: {
          username: payload.username,
          password: payload.password,
        }
      })
        .then((response) => {
          context.commit('SAVE_TOKEN', response.data.key)
        })
        .catch((error) => {
          if (error.response.data["username"]) {
            alert('username error: ' + error.response.data["username"])
          } else if (error.response.data["password"]) {
            alert('password error: ' + error.response.data["password"])
          } else {
            alert(error.response.data["non_field_errors"])
          }
        })
    },

    getUsername(context) {
      axios({
        method: 'get',
        url: `${API_URL}/accounts/user/`,
        headers: {
          Authorization : `Token ${ context.state.token }`
        }
      })
      .then((response) => {
        context.commit('GET_USERNAME', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    createReview(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/createreview/${payload.movieId}/`,
        data: {
          title: payload.title,
          content: payload.content,
          review_user: payload.user,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response) => {
          console.log(response.data["title"])
          if (response.data["title"]) {
            alert('리뷰가 작성되었습니다.')
          } else if (response.data["error"]) {
            alert(response.data["error"])
          }
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateReview(context, payload) {
      axios({
        method: 'put',
        url: `${API_URL}/api/v1/review/${payload.reviewId}/`,
        data: {
          title: payload.title,
          content: payload.content,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then((response) => {
        console.log(response)
        if (response.data["error"]) {
          alert(response.data["error"])
        }
        router.push({ name : "Detail", params: { movieId: payload.movieId} })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // 별점 조회
    getRate(context, payload) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/get_rate/${payload.movieId}/`,
        data: {
          watched_user: payload.watched_user,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then((response) => {
        console.log(response)
        // 여기서 값을 받아오면 값을 저장하면되고
        // 값을 받아서 userRate에 push하는 뮤테이션을 만들어서 커밋
        context.commit('SAVE_RATE', response.data["rate"])
      })
      .catch((error) => {
        console.log(error)
        // 유저가 평가한 적이 없어서 값이 없다면, 0을 받아오면 된다
        context.commit('SAVE_RATE', 0)
      })
    },
    createRate(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/api/v1/rate_movie/${payload.movieId}/`,
        data: {
          rate: payload.rate,
          watched_user: payload.watched_user,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response) => {
          console.log(response.data["rate"])
          // 값을 받아서 userRate에 push하는 뮤테이션을 만들어서 커밋
          context.commit('SAVE_RATE', response.data["rate"])
        })
        .catch((error) => {
          console.log(error)
        })
    },
    updateRate(context, payload){
      axios({
        method: 'put',
        url: `${API_URL}/api/v1/get_rate/${payload.movieId}/`,
        data: {
          rate: payload.rate,
          watched_user: payload.watched_user,
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response) => {
          console.log(response)
          // 값을 받아서 userRate에 push하는 뮤테이션을 만들어서 
          context.commit('SAVE_RATE', response.data["rate"])
      })
        .catch((error) => {
          console.log(error)
        })

    },
    deleteReview(context, payload) {
      axios({
        method: 'delete',
        url: `${API_URL}/api/v1/review/${payload.reviewId}/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then((response) => {
        console.log(response)
        alert('리뷰가 삭제되었습니다.')
        router.push({ name : "Detail", params: { movieId: payload.movieId} })
      })
      .catch((error) => {
        console.log(error)
      })
    },
    // by movies
    getReviews(context, movieId) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/review_list/${movieId}`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then((response) => {
        context.commit('GET_REVIEWS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    },    
    // by usres
    getUserReviews(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/review_list/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
      .then((response) => {
        console.log(response)
        context.commit('GET_USER_REVIEWS', response.data)
      })
      .catch((error) => {
        console.log(error)
      })
    }
  },
  modules: {
  }
})
