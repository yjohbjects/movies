<template>
  <div>
  <div class="bg-secondary">  
    <div class="row"> 
      <div class="col">
        <img :src="poster_path" alt="" width="150">
      </div>

      <div class="col-6">
        <h1>{{ title }}</h1>
        
        <div class="d-flex">
          <span>{{ movie_title }}</span>
          <span>{{ movie_original_title }}</span>
        </div>

        <p>rate</p>
        <p>{{ content }}</p>
      </div>

      
      <div class="col">
        <!-- 하트를 누르면 좋아요 -->
        <!-- <ion-icon name="heart-outline"></ion-icon> -->
        <!-- 챗박스를 누르면 대댓글 모달 -->
        <ion-icon name="chatbox-outline"></ion-icon>
        <!-- 더보기 아이콘을 누르면 review detail 페이지로 -->
        <ion-icon name="ellipsis-horizontal"></ion-icon>
        <!-- 북마크를 누르면  -->
        <!-- <ion-icon name="bookmark-outline"></ion-icon>     -->
      </div>
    </div>
  

  </div>

    <p>아래는 대댓글ㅋ</p>
    <!-- reviewDetail페이지에서만 보여주고, movieDetail페이지에서는 보여주지 않기 -->
    <CommentCard/>
  </div>
</template>

<script>
import CommentCard from '@/components/CommentCard'

export default {
  name: 'ReviewDetailCard',
  components: {
    CommentCard,

  },
  data() {
    return {
      poster_path: 'https://upload.wikimedia.org/wikipedia/ko/7/79/%ED%85%8C%EB%84%B7_%ED%8F%AC%EC%8A%A4%ED%84%B0.jpg',
      title: '리뷰 타이틀',
      content: '이러킁 저러쿵 킬링타임으로 좋은 영화입니다! 근데 영화관에서 보기에는 좀;',
      movie_title: '토르: 러브 앤 썬더',
      movie_original_title: 'Thor: Love and Thunder',
      

    }
  }

}
</script>

<style>

</style>