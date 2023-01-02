<template>
  <div>
    <button class="btn btn-primary m-2" v-if="isSelected" @click="select" style="border-radius: 40px;">{{ genre["genre"] }}</button>
    <button class="btn btn-outline-primary m-2" v-else @click="select" style="border-radius: 40px;">{{ genre["genre"] }}</button>
  </div>
</template>

<script>
export default {
  name: "genreButton",
  props: {
    genre: Object,
  },
  data() {
    return {
      isSelected: false,
    }
  },
  methods: {
    select() {
      // 버튼 바꿔주기 true <-> false
      if(this.isSelected) {
        this.isSelected = false
        // 취소된 테마 삭제
        this.$emit('updateSelectedGenre', ["delete", this.genre["genreId"]])
      } else {
        this.isSelected = true
        // 선택된 테마 추가
        this.$emit('updateSelectedGenre', ["add", this.genre["genreId"]])
      }
    }
  }



}
</script>

<style>

</style>