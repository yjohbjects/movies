<template>
  <div id="app">
    <nav>
      <div class="d-flex justify-content-between">
      <span><img src="../src/assets/logo.png" alt="logo" width="120">
      
      <router-link :to="{ name: 'home' }">Home</router-link> |
      <router-link :to="{ name: 'about' }">About</router-link>
      여기서부터는 테스트용 (지울거임!!)
      <router-link :to="{ name: 'login' }">Log In</router-link> and
      <router-link :to="{ name: 'signup' }">Sign Up</router-link> and
      <router-link :to="{ name: 'setGenre' }">Set Genre</router-link> 
      </span>


      <!-- user section -->
      <span>
        <router-link :to="{ name: 'mypage' }">
        <img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="50">
        <p>username</p>
        </router-link>
      </span>

    </div>
    </nav>
    <router-view/>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
}

nav {
  padding: 30px;
  background-color: #8758FF;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
