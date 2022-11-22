<template>
<!-- 지정된 영화 1편에 대한 디테일 페이지 -->
<div id="detail" :style="`background: rgba(0, 0, 0, 0.75); background-image: url(${ movieDetail?.poster_path }); background-size: cover; background-blend-mode: darken; background-repeat : no-repeat; width: 100%; height: 180vh`">
  <h1>⠀</h1>
  <!-- <h1>{{ directorId }}</h1> -->
  <!-- {{ movieDetail }} -->
  <div class="container my-5" >
  <div class="d-flex justify-content-between">
    <img :src="`${ movieDetail?.poster_path }`" width="30%" height="30%" style="border-radius: 5px">
    <!-- 시간이 된다면 포스터를 확대해서 볼 수 있는 기능을 추가하고싶다 -->
    
    <div class="row container">
      <div class="d-flex justify-content-between">
        <div>
          <span>
            <span style="font-weight: bold; font-size: 60px">{{ movieDetail?.title }} </span>
            <span style="font-size: 50px;">({{ release_year }})</span>
          </span>
          <p class="lead">{ movieDetail?.original_title }</p>
        </div>

        <!-- <button type="button" class="btn btn-primary">나중에 볼 영화</button> -->
        <button type="button" class="btn btn-outline-primary">나중에 볼 영화</button>

      </div>

      <div class="">
        <!-- age limit image -->
        <span v-if="movieDetail?.certification==='PG-13'" class="mx-2"><img src="../../src/assets/12.png" alt="12" width="29" height="29"></span>
        <span v-if="movieDetail?.certification==='PG'" class="mx-2"><img src="../../src/assets/12.png" alt="12" width="29" height="29"></span>
        <span v-else-if="movieDetail?.certification==='G'" class="mx-2"><img src="../../src/assets/all.png" alt="ALL" width="29" height="29"></span>
        <span v-else-if="movieDetail?.certification==='R'" class="mx-2"><img src="../../src/assets/18.png" alt="18" width="29" height="29"></span>
        <span v-else-if="movieDetail?.certification==='NC-17'" class="mx-2"><img src="../../src/assets/18.png" alt="18" width="29" height="29"></span>
        <span v-else-if="NR" class="genres mx-2">NR</span>
        <span v-else-if="!movieDetail?.certification" class="genres mx-2">NR</span>
        
        <span class="genres mx-2">
          <span style="color: #FABD02">★</span>
           {{ movieDetail?.vote_average }}</span>
        <span class="genres mx-2">{{ movieDetail?.genres }}</span>
      </div>

      <div>
        <!-- <h5>user's rate</h5> -->
      <star-rating
        @rating-selected ="setRating"
        v-model="rating"
        v-bind:increment="0.5" 
        v-bind:max-rating="5"
        inactive-color="#808080"
        :show-rating="false"
        active-color="#FABD02"
        v-bind:star-size="50">
      </star-rating>   


        <span><h5>director:</h5></span>
        {{ movieDetail?.director }}
        <span><h5>credits:</h5></span>
        {{ movieDetail?.actors }}
        <h5>overivew:</h5>
        <p>{{ movieDetail?.overview }}</p>
      </div>
    </div>
  </div>
</div>
  <!-- Reviews 커뮤니티 구역 -->
  <div class="container">
    <div class="d-flex justify-content-between">
    <h1>Reviews</h1>
    <button @click="toCreateReview" class="btn btn-outline-secondary">작성</button></div>
    <ReviewDetailCard v-for="review in reviews" :key="review.id" :review="review"
    />
  </div>

    
</div>
</template>

<script>
import StarRating from 'vue-star-rating'
import ReviewDetailCard from '@/components/ReviewDetailCard'
import axios from 'axios'

// const API_URL = 'http://127.0.0.1:8000/api/v1/get_director_name/'

export default {
  name: 'DetailView',
  components: {
    ReviewDetailCard,
    StarRating,
  },
  data() {
    return {
      movieId: this.$route.params.movieId,
      movieDetail: null,
      userRate: 0,
    }
  },
  props: {
    // movie: Object,
  },
  computed: {
    release_year() {
      return this.movieDetail?.release_date.substring(0, 4)
    },
    reviews() {
      return this.$store.state.reviews
    },
    directorId() {
      return this.movieDetail?.director
    }
    // get_director_API_URL() {
    //   return 'http://127.0.0.1:8000/api/v1/get_director_name/'
    // }
  },
  methods: {
    setRating(){
      this.userRate = this.rating
    },
    getMovieDetail() {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/movies/${this.movieId}`,
        headers: {
          Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((response) => {
        this.movieDetail = response.data
      })
      .catch((error) => {
        console.log(error)
      })
    },
    toCreateReview() {
      this.$router.push({ name: "CreateReview", params: { movieId: this.movieId } })
    },
  },
  created() {
    this.getMovieDetail()
    this.$store.dispatch('getReviews', this.movieId)

    // getGenres()
    // this.$store.dispatch('getDirector', this.directorId)
    // getActors()
  }

  }


</script>

<style>
.genres {
    border: 1px solid;
    /* height: auto; */
    text-align: center;
    padding: 5px 5px;
    border-radius: 5px;
    margin: 20px auto;
}
</style>