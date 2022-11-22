<template>
  <div>
    <h1>test</h1>
    <h1>{{ review.title }}</h1>
    <p>{{ review.content }}</p>

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