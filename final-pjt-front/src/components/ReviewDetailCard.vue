<template>
  <div>
    <!-- <h1>test</h1> -->
    <hr>
    <h2>제목: {{ review.title }}</h2>
    <p> 내용: {{ review.content }}</p>

  </div>
</template>

<script>

export default {
  name: 'ReviewDetailCard',
  props: {
    review: Object,
  },
}
</script>

<style>

</style>