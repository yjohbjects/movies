<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="toHome">to home</button>
    <router-link :to="{ name: 'home' }">to home</router-link>

    <h1>모달 테스트</h1>
    <!-- https://getbootstrap.com/docs/5.2/components/modal/ -->
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">
      1안
    </button>

    <!-- Modal -->
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-dialog-centered modal-size">
        <div class="modal-content">
          <div class="modal-header">
            <img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="logo" width="30">
            <h1 class="modal-title fs-5" id="profileModalLabel">{username}</h1>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>

            <div class="modal-body">
              <router-link :to="{ name: 'home' }">
                <p data-bs-dismiss="modal">마이페이지</p>
              </router-link>
              <hr>
              <router-link :to="{ name: 'home' }">
                <p data-bs-dismiss="modal">나중에 볼 영화</p>
              </router-link>
              <hr>
              <router-link :to="{ name: 'login' }">
                <p data-bs-dismiss="modal">로그아웃</p>
              </router-link>
            </div>
        </div>
      </div>
    </div>



  </div>
</template>

<script>
export default {
  name: 'AboutView',
  methods: {
    toHome() {
      this.$router.push({ name: "home" })
    }
  }
}
</script>

<style>
.modal-header {
  background-color: #3F0071;
  color: white
}
</style>

