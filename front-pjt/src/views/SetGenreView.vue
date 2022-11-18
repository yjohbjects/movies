<template>
  <div class="setGenre">
    <h1>choose default genres</h1>


    <!-- if 선택된 장르가 n개 이상일 시 -->
    <router-link :to="{ name: 'rateMovie'}">
      <input type="submit" value="계속하기">
    </router-link>
    
  </div>
</template>

<script>
export default {
  name: 'setGenre',

}
</script>