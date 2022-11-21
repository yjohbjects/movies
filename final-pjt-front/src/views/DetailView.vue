<template>
<!-- 지정된 영화 1편에 대한 디테일 페이지 -->
<div>
  <h1>Movie Detail Page</h1>
  <h1>{{ movieId }}</h1>
  <h1>{{ title }}</h1>
  <!-- 디테일 영화정보 받아오는 페이지 완성하기 -->

  <!-- Detail 디테일 구역 -->
  <div class="container">
  <div class="d-flex justify-content-between">
    <img :src="poster_path" alt="와칸다뽀에바" width="30%" height="30%">
    <!-- 시간이 된다면 포스터를 확대해서 볼 수 있는 기능을 추가하고싶다 -->
    
    <div class="row container">
      <div class="d-flex justify-content-between">
        <div>
          <h2>{{ title }}</h2>
          <p class="lead">{{ movieDetail?.original_title }}</p>
        </div>

        <button type="button" class="btn btn-primary">나중에 볼 영화</button>
        <button type="button" class="btn btn-outline-primary">나중에 볼 영화</button>

      </div>

      <div class="d-flex justify-content-start">
        <p>age limit</p>
        <!-- <img src="../src/assets/12.png" alt="" width="20" height="20"> -->
        <p>rate</p>
        <p>genres</p>
      </div>

      <div>
        <p>user's rate</p>
        <!-- if 별점한 적이 있다면 별점보여주기 -->
        <!-- if 벌점한 적이 없다면 빈 별점 보여주기 -->

        <p>director</p>
        <p>credits</p>
        <p>overivew:</p>
        <p>L{{ movieDetail?.overview }}</p>
      </div>
    </div>
  </div>
</div>
  <!-- Reviews 커뮤니티 구역 -->
  <h1>Reviews</h1>
  <ReviewDetailCard/>

    
</div>
</template>

<script>
import ReviewDetailCard from '@/components/ReviewDetailCard'

export default {
  name: 'DetailView',
  components: {
    ReviewDetailCard,
  },
  data() {
    return {
      movieId: this.$route.params.movieId,
      movieDetail: null,
    }
  },
  props: {
    // movie: Object,
  },
  computed: {
  },
  methods: {
  },
  created() {
  }

  }


</script>

<style>

</style>