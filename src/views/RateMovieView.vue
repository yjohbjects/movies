<template>
  <div class="rateMovie">
    <h1>rate movies, so we can recommend you some</h1>

    
    <!-- if 평가된 영화가 n개 이상일 시 -->
    <router-link :to="{ name: 'home'}">
      <input type="submit" value="계속하기">
    </router-link>


  </div>
</template>
<script>
export default {
  name: 'rateMovie',
}
</script>