<template>
  <div class="about">


    <!-- 집으로 가는 방법 두가지 -->
    <h1>This is an about page</h1>
    <button @click="toHome">to home</button>
    <router-link :to="{ name: 'Home' }">to home</router-link>

  <div class="btn-group">
    <button type="button" class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" data-bs-display="static" aria-expanded="false">
      <span class="mx-1"><img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="20"> {{ username }}</span>
    </button>
    <ul class="dropdown-menu dropdown-menu-lg-end">
      <li><button class="dropdown-item" type="button">
        <span class="mx-1"><img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="20"> {{ username }}</span>
      </button></li>

      <li><hr class="dropdown-divider"></li>
      <li><button class="dropdown-item" type="button">마이페이지</button></li>
      <li><button class="dropdown-item" type="button">평가한 영화</button></li>
      <li><button class="dropdown-item" type="button">나중에 볼 영화</button></li>
      <li><button class="dropdown-item" type="button">리뷰</button></li>
      <li><hr class="dropdown-divider"></li>
      <li><button class="dropdown-item" type="button">로그아웃</button></li>
    </ul>
  </div>
        

  </div>
</template>

<script>
export default {
  name: 'AboutView',
  methods: {
    toHome() {
      this.$router.push({ name: "Home" })
    }
  }
}
</script>

<style>
.modal-header {
  background-color: #3F0071;
  color: white
}

body{
     background-color:#eeeeee59;
 }
 
  .footer-subscribe input[type=text] {
    border: 1px solid #ff3514;
    border-radius: 55px;
    font-size: 12px;
    padding: 12px 40% 12px 20px;
    background: transparent;
    width: 98%;
    box-shadow: none !important;
}

.mt-100{
    margin-top:200px;
}

a, button[type="submit"], input[type=text] {
    color: #333;
    text-decoration: none;
    -webkit-transition: all 400ms ease-in-out;
    -moz-transition: all 400ms ease-in-out;
    -o-transition: all 400ms ease-in-out;
    -ms-transition: all 400ms ease-in-out;
    transition: all 400ms ease-in-out;
}

.footer-subscribe .btn-theme {
    position: absolute;
    top: 0;
    height: 100%;
    right: 0;
}

.btn-theme:hover {
    box-shadow: none;
}

.btn-theme {
    color: #FFF !important;
    padding: 0.5rem 1.9rem;
    font-weight: 400;
    font-size: 0.875rem;
    display: inline-block;
    display: inline-flex;
    outline: none;
    border: none;
    cursor: pointer;
    overflow: hidden;
    z-index: 2;
    align-items: center;
    position: relative;
    cursor: pointer;
    -webkit-box-shadow: 0px 14px 47px 0px rgba(28, 28, 28, 0.24);
    -moz-box-shadow: 0px 14px 47px 0px rgba(28, 28, 28, 0.24);
    box-shadow: 0px 14px 47px 0px rgba(28, 28, 28, 0.24);
    -webkit-border-radius: 70px;
    -moz-border-radius: 70px;
    border-radius: 70px; 
}

.bg-orange {
    background: #ff3514;
}

ion-icon {
  color: black;
}
</style>

