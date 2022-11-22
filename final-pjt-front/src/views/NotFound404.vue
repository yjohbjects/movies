<template>
  <div class="d-flex justify-content-center">
    <img src="https://ifh.cc/g/YOVLOx.png" alt="망망이 says Page Not Found" class="w-75">    
  </div>
</template>

<script>
export default {
  name: 'NotFound404',
  created() {
    this.$store.dispatch('nowLogin')
  }
}
</script>

<style>

</style>
