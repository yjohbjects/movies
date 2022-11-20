import Vue from 'vue'
import VueRouter from 'vue-router'
// home
import HomeView from '@/views/HomeView'
import AboutView from '@/views/AboutView'
import DetailView from '@/views/DetailView'
// accounts
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
// NotFound404
import NotFound404 from '@/views/NotFound404'

Vue.use(VueRouter)

const routes = [
  // home
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/detail/:movieId', name: 'Detail', component: DetailView },
  
  // accounts
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  { path: '/set_genre', name: 'SetGenre', component: SetGenreView },
  { path: '/rate_movie', name: 'RateMovie', component: RateMovieView },

  // mypage (:username/userId 추가 예정) 
  { path: '/user', name: 'MyPage', component: MyPageView },
  { path: '/to_watch_movie',name: 'ToWatchMovie', component: ToWatchMovieView },
  { path: '/watched_movie', name: 'WatchedMovie', component: WatchedMovieView },
  { path: '/user_review', name: 'UserReview', component: UserReviewView },
  { path: '/review_detail', name: 'ReviewDetail', component: ReviewDetailView },

  // NotFound404
  { path: '/404-not-found', name: 'NotFound404', component: NotFound404 },
  { path: '*', redirect: { name: 'NotFound404' } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
