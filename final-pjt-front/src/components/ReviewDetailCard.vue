<template>
  <div>
    <hr>
    <h1>{{ review.title }}</h1>
    <p>{{ review.content }}</p>
    {{ review }}

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