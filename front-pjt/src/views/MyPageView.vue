<template>
  <div>
    <h1>mypage view</h1>

    <div class="d-flex">
    <img src="https://cdn-icons-png.flaticon.com/512/147/147133.png" alt="user" width="200">
      <div class="row">
        <h3>username</h3>
        <p>내가 본 영화: {n} | 보고싶은 영화: {n}</p>
        <p>{상태메세지} 저는 여가시간에 주로 영화를 보는걸 즐깁니다</p>
      </div>
    </div>

    <div class="d-flex justify-content-between">
      <h3>Watch list</h3>
      <router-link :to="{}">더보기</router-link>
    </div>
    <WatchList/>
    <hr>

    <div class="d-flex justify-content-between">
      <h3>Rated list</h3>
      <router-link :to="{}">더보기</router-link>
    </div>
    <RatedList/>
    <hr>

    <div class="d-flex justify-content-between">
      <h3>Reviews</h3>
      <router-link :to="{}">더보기</router-link>
    </div>
    <ReviewDetailCard/>

  </div>
</template>

<script>
import WatchList from '@/components/WatchList'
import RatedList from '@/components/RatedList'
import ReviewDetailCard from '@/components/ReviewDetailCard'


export default {
  name: 'MyPageView',
  components: {
    WatchList,
    RatedList,
    ReviewDetailCard,
  }
}
</script>