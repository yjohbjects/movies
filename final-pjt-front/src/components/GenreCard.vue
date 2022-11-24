<template>
  <div>
    <h1>{{ genre }}</h1>
    <h1>test</h1>
    <!-- <button v-if="isClicked" @click="clicked" class="btn mx-1 my-1" style="color: #5CB8E4; border-color: #5CB8E4; border-radius: 40px;">{{ genre }}</button> -->
    <!-- <button v-else @click="clicked" class="btn mx-1 my-1" style="background-color: #5CB8E4; color: #F2F2F2; border-radius: 40px;">{{ genre }}</button> -->
  </div>
</template>

<script>
export default {
  name: 'GenreCard',
  props: {
    genre: Object,
  },
  data() {
    return {
      isClicked: false,
    }
  }
}
</script>

<style>

</style>