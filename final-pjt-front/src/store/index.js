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


export default new Vuex.Store({
  plugins: [
    createPersistedState()
  ],
  state: {
    recommendedMovies: [],
    popularMovies: [],
    nowPlayingMovies: [],
    isMypage: true,
    isLoginpage: true,
    token: null,
    username: null,
  },
  getters: {
    isLogin(state) {
      return state.token ? true : false
    }
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
      router.push({ name : 'Home' })
    },

    GET_USERNAME(state, username) {
      state.username = username
    },

    LOGOUT(state) {
      localStorage.removeItem('token')
      localStorage.removeItem('username')
      state.token = null
      state.username = null
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/api/v1/movies/`,
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response) => {
          console.log(response.data)
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
        adult:false
      }

      axios({
        method: 'get',
        url: API_POPULAR_MOVIE_URL,
        params: params,
      })
      .then((response) => {
        console.log(response.data.results)
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
        adult:false
      }

      axios({
        method: 'get',
        url: API_NOW_PLAYING_MOVIE_URL,
        params: params,
      })
      .then((response) => {
        console.log(response.data.results)
        context.commit('GET_NOW_PLAYING_MOVIES', response.data.results)
      })
      .catch((error) => {
        console.log(error)
      })
    },

    nowHome(context) {
      console.log('집이다!!')
      context.commit('NOW_HOME')
    },

    nowMypage(context) {
      console.log('마이페이지다!!')
      context.commit('NOW_MYPAGE')
    },

    nowLogin(context) {
      console.log('로그인해야겠다!!')
      context.commit('NOW_LOGIN')
    },

    signUp(context, payload) {
      axios({
        method: 'post',
        url: `${API_URL}/accounts/signup/`,
        data: {
          username: payload.username,
          password1: payload.password1,
          password2: payload.password2,
        }
      })
        .then((response) => {
          console.log(response)
          context.commit('SAVE_TOKEN', response.data.key)
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
          console.log(response)
          context.commit('SAVE_TOKEN', response.data.key)
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
        console.log(response.data["username"])
        context.commit('GET_USERNAME', response.data["username"])
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
        },
        headers: {
          Authorization: `Token ${ context.state.token }`
        }
      })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
