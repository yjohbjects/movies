<template>
  <div class="about">


    <!-- 집으로 가는 방법 두가지 -->
    <h1>This is an about page</h1>
    <button @click="toHome">to home</button>
    <router-link :to="{ name: 'Home' }">to home</router-link><br>

   <img src="https://pds.joins.com/news/component/htmlphoto_mmdata/202007/13/1cf33940-bf50-410b-8ac2-c0dd9cd31955.jpg" 
   width="30%" height="30%"
   style="mouseoverStyle"
   @mouseover="shadowedImage"
   @click="zoomedImage">

   <star-rating
     v-bind:increment="0.5"
     v-bind:max-rating="5"
     inactive-color="#000"
     active-color="#cc1166"
     v-bind:star-size="30">

   </star-rating>        

  </div>
</template>

<script>
// import StarRating from 'vue-star-rating'

export default {
  name: 'AboutView',
  components: {
    // StarRating
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

