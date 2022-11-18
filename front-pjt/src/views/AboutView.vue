<template>
  <div class="about">

  <h1>example</h1>
  <div @click="openSearch" class="input-group mb-3">
    <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon">
    <!-- <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button> -->
    <!-- <button type="button" class="btn btn-outline-secondary" data-bs-toggle="modal" data-bs-target="#profileModal" id="button-addon2"> -->
    <button type="button" class="btn btn-outline-light" data-bs-toggle="modal" data-bs-target="#profileModal" id="button-addon2">
      <ion-icon name="search-outline"></ion-icon>
    </button>

  </div>




    <!-- 집으로 가는 방법 두가지 -->
    <!-- <h1>This is an about page</h1>
    <button @click="toHome">to home</button>
    <router-link :to="{ name: 'home' }">to home</router-link> -->

    <h1>모달 테스트</h1>
    <!-- https://getbootstrap.com/docs/5.2/components/modal/ -->
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#profileModal">1안</button>

    <!-- Modal -->
    <div class="modal fade" id="profileModal" tabindex="-1" aria-labelledby="profileModalLabel" aria-hidden="true">
      <div class="modal-dialog modal-xl modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
              <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search" aria-label="Search" aria-describedby="button-addon">
                <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
              </div>
          </div>

            <div class="modal-body">
              <h1>여기에 검색 결과가 뜰 수 있도록</h1>
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

