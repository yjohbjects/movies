import Vue from 'vue'
import VueRouter from 'vue-router'
// home
import HomeView from '../views/HomeView.vue'
import DetailView from '@/views/DetailView'
// account
import LoginView from '@/views/LoginView'
import SignupView from '@/views/SignupView'
import SetGenreView from '@/views/SetGenreView'
import RateMovieView from '@/views/RateMovieView'
// mypage
import MyPageView from '@/views/MyPageView'
import ToWatchMovieView from '@/views/ToWatchMovieView'
import WatchedMovieView from '@/views/WatchedMovieView'
import UserReviewView from '@/views/UserReviewView'
import ReviewDetailView from '@/views/ReviewDetailView'

Vue.use(VueRouter)

const routes = [
  // home
  { path: '/', name: 'home', component: HomeView },
  { path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  { path: '/detail/:movieId', name: 'detail', component: DetailView },
  
  // account
  { path: '/login', name: 'login', component: LoginView },
  { path: '/signup', name: 'signup', component: SignupView },
  { path: '/set_genre', name: 'setGenre', component: SetGenreView },
  { path: '/rate_movie', name: 'rateMovie', component: RateMovieView },

  // mypage (:username/userId 추가 예정) 
  { path: '/user', name: 'mypage', component: MyPageView },
  { path: '/to_watch_movie',name: 'toWatchMovie', component: ToWatchMovieView },
  { path: '/watched_movie', name: 'watchedMovie', component: WatchedMovieView },
  { path: '/user_review', name: 'userReview', component: UserReviewView },
  { path: '/review_detail', name: 'reviewDetail', component: ReviewDetailView },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
