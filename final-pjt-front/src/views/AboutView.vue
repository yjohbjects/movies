<template>
<!-- 테스트 뷰 -->
  <div class="about">




    
    <!-- 집으로 가는 방법 두가지 -->
    <h1>This is an about page</h1>
    <button @click="toHome">to home</button>
    <router-link :to="{ name: 'Home' }">to home</router-link><br>
    <router-link :to="{ name: 'Detail', params: { movieId: 550205 } }">test</router-link><br>

    <div style="width:218px; height:327px; background-color: black;opacity: 0.3 ; background-image: url(https://pds.joins.com/news/component/htmlphoto_mmdata/202007/13/1cf33940-bf50-410b-8ac2-c0dd9cd31955.jpg)">
      <h5>제목</h5>
      <p>장르</p>
      <br>
      <p>평점 남기기</p>
      <star-rating
        v-bind:increment="0.5" 
        v-bind:max-rating="5"
        inactive-color="#808080"
        active-color="#FED000"
        v-bind:star-size="30">

      </star-rating>        
      <button>나중에 볼 영화</button>

    </div>

   <img style="width:218px; height:327px;" src="https://pds.joins.com/news/component/htmlphoto_mmdata/202007/13/1cf33940-bf50-410b-8ac2-c0dd9cd31955.jpg" 
   @mouseover="shadowedImage"
   @click="zoomedImage">



  </div>
</template>

<script>
import StarRating from 'vue-star-rating'

export default {
  name: 'AboutView',
  components: {
    StarRating,
  },
  data() {
    return {
      isMouseover: false,
      isSelected: false,
      // genres: [
      //   {genre: "모험", genreId: 12},
      //   { genre: "판타지" , genreId: 14 },
      //   { genre: "애니메이션" , genreId: 16 },
      //   { genre: "드라마" , genreId: 18 },
      //   { genre: "공포" , genreId: 27 },
      //   { genre: "액션" , genreId: 28 },
      //   { genre: "코미디" , genreId: 35 },
      //   { genre: "역사" , genreId: 36 },
      //   { genre: "서부" , genreId: 37 },
      //   { genre: "스릴러" , genreId: 53 },
      //   { genre: "범죄" , genreId: 80 },
      //   { genre: "다큐멘터리" , genreId: 99 },
      //   { genre: "SF" , genreId: 878 },
      //   { genre: "미스터리" , genreId: 9648 },
      //   { genre: "음악" , genreId: 10402 },
      //   { genre: "로맨스" , genreId: 10749 },
      //   { genre: "가족" , genreId: 10751 },
      //   { genre: "전쟁" , genreId: 10752 },
      //   { genre: "TV 영화" , genreId: 10770 },
      // ]
    }
  },
  methods: {
    toHome() {
      this.$router.push({ name: "Home" })
    },
    shadowedImage() {

    },
    zoomedImage() {

    },
    selected() {
      // isSelected 값 바꿔주기 true <-> false
      if (this.isSelected) {
        this.isSelected = false
        console.log(this.isSelected)
      } else {
        this.isSelected = true
        console.log(this.isSelected)
      }

      console.log('selected')
    }
  },
  created() {
    this.$store.dispatch('getDBMovies')
  }
}
</script>

<style>


</style>

