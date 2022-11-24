<template>
  <div class="about">
    <!-- <StarRating/> -->
    <star-rating></star-rating>

    <!-- 집으로 가는 방법 두가지 -->
    <h1>This is an about page</h1>
    <button @click="toHome">to home</button>
    <router-link :to="{ name: 'Home' }">to home</router-link><br>
    <router-link :to="{ name: 'Detail', params: { movieId: 360920 } }">test</router-link><br>

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
// import StarRating from '@/components/StarRating'

export default {
  name: 'AboutView',
  components: {
    StarRating
  },
  data() {
    return {
      isMouseover: false,
    }
  },
  methods: {
    toHome() {
      this.$router.push({ name: "Home" })
    },
    shadowedImage() {

    },
    zoomedImage() {

    }
  }
}
</script>

<style>


</style>

