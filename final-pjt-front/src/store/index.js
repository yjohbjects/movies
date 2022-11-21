import router from '@/router'
import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

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
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
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
    }
  },
  modules: {
  }
})
