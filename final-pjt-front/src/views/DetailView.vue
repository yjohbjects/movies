<template>
<!-- 지정된 영화 1편에 대한 디테일 페이지 -->
<div id="detail" :style="`background: rgba(0, 0, 0, 0.75); background-image: url(${ movieDetail?.poster_path }); background-size: cover; background-blend-mode: darken; background-repeat : no-repeat; width: 100%; height: 180vh`">
  <h1>⠀</h1>
  <div class="container my-5" >
  <div class="d-flex justify-content-between">
    <img :src="`${ movieDetail?.poster_path }`" width="30%" height="30%" style="border-radius: 5px">
    <!-- 시간이 된다면 포스터를 확대해서 볼 수 있는 기능을 추가하고싶다 -->
    
    <div class="row container">
      <div class="d-flex justify-content-between">
        <div>
          <span>
            <span style="font-weight: bold; font-size: 50px">{{ movieDetail?.title }} </span>
            <span style="font-size: 50px;">({{ release_year }})</span>
          </span>
          <p class="lead">{{ movieDetail?.original_title }}</p>
        </div>

        <!-- <button type="button" class="btn btn-primary">나중에 볼 영화</button> -->
        <button type="button" class="btn btn-outline-primary" @click="toWatch">나중에 볼 영화</button>

      </div>

      <div class="">
        <!-- age limit image -->
        <span v-if="movieDetail?.certification==='PG-13'" class="mx-2"><img src="../../src/assets/12.png" alt="12" width="29" height="29"></span>
        <span v-if="movieDetail?.certification==='PG'" class="mx-2"><img src="../../src/assets/12.png" alt="12" width="29" height="29"></span>
        <span v-else-if="movieDetail?.certification==='G'" class="mx-2"><img src="../../src/assets/all.png" alt="ALL" width="29" height="29"></span>
        <span v-else-if="movieDetail?.certification==='R'" class="mx-2"><img src="../../src/assets/18.png" alt="18" width="29" height="29"></span>
        <span v-else-if="movieDetail?.certification==='NC-17'" class="mx-2"><img src="../../src/assets/18.png" alt="18" width="29" height="29"></span>
        <span v-else-if="movieDetail?.certification==='NR'" class="genres mx-2">NR</span>
        <span v-else-if="!movieDetail?.certification" class="genres mx-2">NR</span>
        
        <span class="genres m-2">
          <span style="color: #FABD02">★</span>
           {{ movieDetail?.vote_average/2 }}</span>
        <span class="genres mx-2">{{ genres.join(', ') }}</span>
      </div>

      <div class="my-3">
        <!-- <h5>user's rate</h5> -->
      <div
      @mouseover="hover = true"
      @mouseleave="hover = false"
      >
      <!-- hover하면 조정할 수 있는 별점 -->
      <star-rating 
        v-if="hover"
        v-model="inputRate"
        :rating="5"
        :increment="0.5" 
        inactive-color="#808080"
        active-color="#FABD02"
        :star-size="50"
        class="mb-3"
        @rating-selected ="setRating"
        :show-rating="false"
        >
      </star-rating>   
        
      <!-- 보여지는 별점 -->
      <star-rating 
      v-else
      :rating="`${ userRate }`" 
      :increment="0.5"
      inactive-color="#808080"
      active-color="#FABD02"
      :star-size="50"
      class="mb-3"
      :show-rating="false"  
      >
      </star-rating>
      </div>

        <span><h5>Director:</h5></span>
        <h6>{{ director }}</h6>
        <br>
        <span><h5>Credits:</h5></span>
        <h6>{{ actors.join(', ') }}</h6>
        <br>
        <span><h5>Overivew:</h5></span>
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
    <hr>
    <ReviewDetailCard v-for="review in reviews" :key="review.id" :review="review"/>
  </div>

    
</div>
</template>

<script>
import StarRating from 'vue-star-rating'
import ReviewDetailCard from '@/components/ReviewDetailCard'
import axios from 'axios'

// const API_URL_GET_DIRECTOR_NAME = `http://127.0.0.1:8000/api/v1/get_director_name/`

export default {
  name: 'DetailView',
  components: {
    ReviewDetailCard,
    StarRating,
  },
  data() {
    return {
      movieId: this.$route.params.movieId,
      directorId: null,
      movieDetail: null,

      director: null,
      genres: [],
      genreId: null,
      actors: [],
      actorId: null,

      userRate: 0,
      hover: false,
    }
  },
  props: {
    // movie: Object,
  },
  computed: {
    release_year() {
      return this.movieDetail.release_date.substring(0, 4)
    },
    movieDetails() {
      return this.$store.state.movieDetails
    },
    reviews() {
      return this.$store.state.reviews
    },

  },
  methods: {
    setRating(){
      console.log('clicked')
      const rate = this.rating  // 입력된 값
      const watched_user = this.$store.state.user
      const movieId = this.movieId
      const payload = {
        rate: rate,
        watched_user: watched_user,
        movieId: movieId
      }
      
      if (this.userRate === 0) {
        this.$store.dispatch('createRate', payload)
      } else {
        this.$store.dispatch('updateRate', payload)
      }
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
        this.directorId = response.data.director
        
        this.$store.dispatch('getReviews', this.movieId)
        
        // 감독 이름 받기
        this.getDirectorName(response.data.director)
        
        // 배우 이름 받기
        for (this.actorId of response.data.actors) {
          this.getActorName(this.actorId)
        }
        
        // 장르 이름 받기
        for (this.genreId of response.data.genres) {
          this.getGenreName(this.genreId)
        }
        
        
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getDirectorName(directorId) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/get_director_name/${directorId}`,
        headers: {
          Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((response) => {
        this.director = response.data["name"]
      })
      .catch((error) => {
        console.log(error)
      })
    },

    getGenreName(genreId) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/get_genre_name/${genreId}`,
        headers: {
          Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((response) => {
        this.genres.push(response.data["name"])
      })
      .catch((error) => {
        console.log(error)
      })
    },
    getActorName(actorId) {
      axios({
        method: 'get',
        url: `http://127.0.0.1:8000/api/v1/get_actor_name/${actorId}`,
        headers: {
          Authorization : `Token ${ this.$store.state.token }`
        }
      })
      .then((response) => {
        this.actors.push(response.data["name"])
      })
      .catch((error) => {
        console.log(error)
      })
    },
    toCreateReview() {
      this.$router.push({ name: "CreateReview", params: { movieId: this.movieId } })
    },

    toWatch() {
      axios({
        method: 'post',
        url: `http://127.0.0.1:8000/api/v1/wish/${this.movieId}/`,
        headers: {
          Authorization : `Token ${ this.$store.state.token }`
        }
      })
        .then((response) => {
          console.log(response.data)
          if (response.data["is_wished"] === true) {
            alert('나중에 볼 꺼야!')
          } else {
            alert('아니 안볼꺼야!')
          }
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created() {
    this.getMovieDetail()
    // this.$store.dispatch('getReviews', this.movieId)


    const watched_user = this.$store.state.user
    const movieId = this.movieId
    const payload = {
      watched_user: watched_user,
      movieId: movieId
    }
    this.$store.dispatch('getRate', payload)
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
