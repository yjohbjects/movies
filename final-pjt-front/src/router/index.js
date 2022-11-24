import Vue from 'vue'
import VueRouter from 'vue-router'
// home
import HomeView from '@/views/HomeView'
import AboutView from '@/views/AboutView'
import DetailView from '@/views/DetailView'
import CreateReviewView from '@/views/CreateReviewView'
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
  { path: '/movie/:movieId', name: 'Detail', component: DetailView },
  { path: '/movie/:movieId/create', name: 'CreateReview', component: CreateReviewView },
  
  // accounts
  { path: '/login', name: 'Login', component: LoginView },
  { path: '/signup', name: 'Signup', component: SignupView },
  { path: '/set_genre', name: 'SetGenre', component: SetGenreView },
  { path: '/rate_movie', name: 'RateMovie', component: RateMovieView },

  // mypage (:username/userId 추가 예정) 
  { path: '/user', name: 'MyPage', component: MyPageView },
  { path: '/to_watch_movies',name: 'ToWatchMovie', component: ToWatchMovieView },
  { path: '/watched_movies', name: 'WatchedMovie', component: WatchedMovieView },
  { path: '/user_reviews', name: 'UserReview', component: UserReviewView },
  { path: '/review/:reviewId', name: 'ReviewDetail', component: ReviewDetailView },

  // NotFound404
  { path: '/404-not-found', name: 'NotFound404', component: NotFound404 },
  { path: '*', redirect: { name: 'NotFound404' } },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})
router.beforeEach(function (to, from, next) { 
  setTimeout(() => {
      window.scrollTo(0, 0);
  }, 100);
  next();
});

export default router
