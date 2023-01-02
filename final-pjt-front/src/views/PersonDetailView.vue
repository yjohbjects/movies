<template>
  <div>
    <p>{{ KOBISDetail }}</p>
  <div class="container my-5" >
  <div class="d-flex justify-content-between">
    <img :src="`https://image.tmdb.org/t/p/original${ personDetail?.profile_path }`" width="20%" height="20%" style="border-radius: 5px">

    <div class="row container">
      <div>
        <div class="d-flex justify-content-start align-items-center">
          <span style="font-weight: bold; font-size: 50px">{{ KOBISDetail?.peopleNm }}</span>
          <span style="font-size: 30px;">⠀|⠀{{ KOBISDetail?.repRoleNm }}</span>
        </div>
        <span style="font-size: 25px;">{{ personDetail.name}}</span>
      </div>

      <div class="mb-4">
        <h5 style="font-weight: bold;">출생</h5>
        <span>{{ personDetail.birthday }}</span>
      </div>

      <div v-if="personDetail.deathday" class="mb-4"><h5 style="font-weight: bold;">사망</h5>
        <span>{{ personDetail.deathday }}</span>
      </div>

      <div v-if="personDetail.place_of_birth" class="mb-4"><h5 style="font-weight: bold;"> 출생지</h5>
        <span>{{ personDetail.place_of_birth }}</span>
      </div>

      <div v-if="personDetail.biography" class="mb-4">
        <h5 style="font-weight: bold;">프로필</h5>
        <span>{{ personDetail.biography }}</span>
      </div>

    </div>

  </div>
  </div>

  <div class="container">
    <h1>Filmography</h1>
    <hr>
    <!-- <p>{{ filmoList }}</p> -->
    <div v-for="(movie, id) in filmoList" :key="id">
      <span>{{ filmoList[id] }}</span>
      
    </div>  
  </div>

  </div>
</template>

<script>
import axios from 'axios'
const API_KEY = process.env.VUE_APP_TMDB_API_KEY
const KOBIS_APP_API_KEY = process.env.KOBIS_APP_API_KEY

export default {
  name: 'PersonDetailView',
  data() {
    return {
      personId: this.$route.params.personId,
      personDetail: null,
      KOBISDetail: null,
      peopleNm: null,
      filmoList: null,
      temp: null,
    }
  },
  methods: {
    getPersonDetail() {
      const params = {
        api_key: API_KEY,
        language: 'ko-KR',
      }
      axios({
        method: 'get',
        url: 'https://api.themoviedb.org/3/person/' + this.personId,
        params: params,
      })

      .then((response) => {
        this.personDetail = response.data
        this.peopleNm = response.data.name
        this.getKOBISData()
      })
      .catch((error) => {
        console.log(error)
      })

    },
    getKOBISData() {
      const params = {
        key: KOBIS_APP_API_KEY,
        peopleNm: this.peopleNm,
      }
      axios({
        method: 'get',
        url: 'http://www.kobis.or.kr/kobisopenapi/webservice/rest/people/searchPeopleList.json',
        params: params
        })

        .then((response) => {
          this.KOBISDetail = response.data.peopleListResult.peopleList[0]
          this.filmoList = response.data.peopleListResult.peopleList[0].filmoNames.split('|')
        })
        .catch((error) => {
          console.log(error)
        })
    },
  },
  created() {
    this.getPersonDetail()
  }
}
</script>

<style>

</style>