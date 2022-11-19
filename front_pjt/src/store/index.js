import axios from 'axios'
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const API_URL = 'http://127.0.0.1:8000'

export default new Vuex.Store({
  state: {
    // recommendedMovies: [
    //   // top rated movie로 일단 예시
    //   // 20221117112919
    //   // https://api.themoviedb.org/3/movie/top_rated?api_key=1958506c8d7b614bc3e3028c518b16fb&language=ko-KR&page=1
    // {
    //   "adult": false,
    //   "backdrop_path": "/rl7Jw8PjhSIjArOlDNv0JQPL1ZV.jpg",
    //   "genre_ids": [
    //     10749,
    //     18
    //   ],
    //   "id": 851644,
    //   "original_language": "ko",
    //   "original_title": "20 Century Girl",
    //   "overview": "보라의 둘도 없는 친구 연두는 심장 수술을 위해 미국에 가면서 자신이 좋아하는 남자 백현진에 대한 모든 정보를 수집해 달라고 보라에게 부탁한다. 보라는 백현진의 가장 친한 친구 풍운호와 먼저 친해지기로 한다. 하지만 보라의 서투른 계획은 예상치 못한 방향으로 전개된다. 새로운 세기가 오기 1년 전인 1999년, 17세가 된 보라는 첫사랑의 열병에 빠진다.",
    //   "popularity": 348.878,
    //   "poster_path": "/xM9Jt2sA6QcvLuHKM0RI3BMtFc5.jpg",
    //   "release_date": "2022-10-06",
    //   "title": "20세기 소녀",
    //   "video": false,
    //   "vote_average": 8.8,
    //   "vote_count": 242
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/rSPw7tgCH9c6NqICZef4kZjFOQ5.jpg",
    //   "genre_ids": [
    //     18,
    //     80
    //   ],
    //   "id": 238,
    //   "original_language": "en",
    //   "original_title": "The Godfather",
    //   "overview": "시실리에서 이민온 뒤, 정치권까지 영향력을 미치는 거물로 자리잡은 돈 꼴레오네는 갖가지 고민을 호소하는 사람들의 문제를 해결해주며 대부라 불리운다. 한편 솔로소라는 인물은 꼴레오네가와 라이벌인 탓타리아 패밀리와 손잡고 새로운 마약 사업을 제안한다. 돈 꼴레오네가 마약 사업에 참여하지 않기로 하자, 돈 꼴레오네를 저격해 그는 중상을 입고 사경을 헤매게 된다. 그 뒤, 돈 꼴레오네의 아들 소니는 조직력을 총 동원해 다른 패밀리들과 피를 부르는 전쟁을 시작하는데... 가족의 사업과 상관없이 대학에 진학한 뒤 인텔리로 지내왔던 막내 아들 마이클은 아버지가 총격을 당한 뒤, 아버지를 구하기 위해 위험천만한 협상 자리에 나선다.",
    //   "popularity": 90.096,
    //   "poster_path": "/cOwVs8eYA4G9ZQs7hIRSoiZr46Q.jpg",
    //   "release_date": "1972-03-14",
    //   "title": "대부",
    //   "video": false,
    //   "vote_average": 8.7,
    //   "vote_count": 16912
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/kXfqcdQKsToO0OUXHcrrNCHDBzO.jpg",
    //   "genre_ids": [
    //     18,
    //     80
    //   ],
    //   "id": 278,
    //   "original_language": "en",
    //   "original_title": "The Shawshank Redemption",
    //   "overview": "촉망받는 은행 간부 앤디 듀프레인은 아내와 그녀의 정부를 살해했다는 누명을 쓴다. 주변의 증언과 살해 현장의 그럴듯한 증거들로 그는 종신형을 선고받고 악질범들만 수용한다는 지옥같은 교도소 쇼생크로 향한다. 인간 말종 쓰레기들만 모인 그곳에서 그는 이루 말할 수 없는 억압과 짐승보다 못한 취급을 당한다. 그러던 어느 날, 간수의 세금을 면제받게 해 준 덕분에 그는 일약 교도소의 비공식 회계사로 일하게 된다. 그 와중에 교도소 소장은 죄수들을 이리저리 부리면서 검은 돈을 긁어 모으고 앤디는 이 돈을 세탁하여 불려주면서 그의 돈을 관리하는데...",
    //   "popularity": 68.371,
    //   "poster_path": "/oAt6OtpwYCdJI76AVtVKW1eorYx.jpg",
    //   "release_date": "1994-09-23",
    //   "title": "쇼생크 탈출",
    //   "video": false,
    //   "vote_average": 8.7,
    //   "vote_count": 22656
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/poec6RqOKY9iSiIUmfyfPfiLtvB.jpg",
    //   "genre_ids": [
    //     18,
    //     80
    //   ],
    //   "id": 240,
    //   "original_language": "en",
    //   "original_title": "The Godfather Part II",
    //   "overview": "아버지의 장례식 도중에 맏아들 파올로가 총에 맞아 죽고, 비토(로버트 드니로)는 겨우 도망쳐 미국으로 건너온다. 대부로 성장한 후 비토는 다시 치치오를 찾아 복수를 한다. 새롭게 등장한 젊은 대부 마이클(알 파치노)은 본거지를 라스베가스로 옮기고 가족의 사업을 가능한 합법적인 것으로 바꾸려고 애쓴다. 그런 과중 중에 자신을 제거하려는 음모를 알게되고 그는 냉혹하고 신속하게 반대파들을 제거, 조직을 더욱 확대해 나간다. 이를 위해 마이클은 배신한 형마저 죽이고, 일 때문에 아내와 헤어지는 등 인간적으로는 계속 외로워져 가는데...",
    //   "popularity": 57.636,
    //   "poster_path": "/cj9UsJEN5bNf6ZoF1BbKjKN81hc.jpg",
    //   "release_date": "1974-12-20",
    //   "title": "대부 2",
    //   "video": false,
    //   "vote_average": 8.6,
    //   "vote_count": 10252
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/aVFx1VtlOxR3v0ADEatalXOvwbu.jpg",
    //   "genre_ids": [
    //     16,
    //     14,
    //     28
    //   ],
    //   "id": 620249,
    //   "original_language": "zh",
    //   "original_title": "罗小黑战记",
    //   "overview": "숲속의 집을 잃고 홀로 떠돌던 검은 고양이 요정 ‘소흑’은 도시 뒷골목에서 미스터리한 능력의 요정 ‘풍식’을 만나 위기를 모면한다. ‘풍식’의 무리와 버려진 섬에서 행복한 시간을 보내는 ‘소흑’. 그러던 중 최강 능력의 집행자 ‘무한’이 ‘풍식’을 쫓아 섬에 오자 ‘풍식’ 일행은 달아나고, ‘소흑’만 남게 된다.  홀로 남은 ‘소흑’을 요정들의 회관으로 데려가려는 ‘무한’과 ‘무한’을 무서운 인간이라 여겨 도망치려는 ‘소흑’. 둘은 여정 속에서 점점 마음을 열게 되고, ‘무한’은 ‘소흑’에게 특별한 능력이 있음을 알게 된다.",
    //   "popularity": 18.892,
    //   "poster_path": "/nDieZR47cirx44UZxKQsCbRGYqW.jpg",
    //   "release_date": "2019-08-27",
    //   "title": "나소흑전기: 첫만남편",
    //   "video": false,
    //   "vote_average": 8.6,
    //   "vote_count": 208
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
    //   "genre_ids": [
    //     18,
    //     36,
    //     10752
    //   ],
    //   "id": 424,
    //   "original_language": "en",
    //   "original_title": "Schindler's List",
    //   "overview": "2차 세계대전 당시 독일군이 점령한 폴란드. 시류에 맞춰 자신의 성공을 추구하는 기회주의자 쉰들러는 유태인이 경영하는 그릇 공장을 인수한다. 그는 공장을 인수하기 위해 나찌 당원이 되고 독일군에게 뇌물을 바치는 등 갖은 방법을 동원한다. 그러나 냉혹한 기회주의자였던 쉰들러는 유태인 회계사인 스턴과 친분을 맺으면서 냉혹한 유태인 학살에 대한 양심의 소리를 듣기 시작한다. 마침내 그는 강제 수용소로 끌려가 죽음을 맞게될 유태인들을 구해내기로 결심하고, 독일군 장교에게 빼내는 사람 숫자대로 뇌물을 주는 방법으로 유태인들을 구해내려는 계획을 세우는데...",
    //   "popularity": 45.178,
    //   "poster_path": "/oyyUcGwLX7LTFS1pQbLrQpyzIyt.jpg",
    //   "release_date": "1993-12-15",
    //   "title": "쉰들러 리스트",
    //   "video": false,
    //   "vote_average": 8.6,
    //   "vote_count": 13446
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/vI3aUGTuRRdM7J78KIdW98LdxE5.jpg",
    //   "genre_ids": [
    //     35,
    //     18,
    //     10749
    //   ],
    //   "id": 19404,
    //   "original_language": "hi",
    //   "original_title": "दिलवाले दुल्हनिया ले जायेंगे",
    //   "overview": "영국에서 유학중인 라즈(샤룩 칸)와 인도 처녀 심란(까졸).  심란은 부모님이 정해주신 약혼자가 있는데 약혼을 앞두고 친구들과 유럽 여행을 떠나게 된다.  여행 중 우연히 만남 샤룩과 까졸. 두 남녀의 연속된 우연과 좌충우돌 사랑 만들기.  그렇게 사랑하게 된 그들이지만 까졸은 약혼자가 있는 몸. 인도로 돌아가게 된다.  샤룩 또한 그녀를 못 잊어 인도로 뒤 따라 들어가지만 엄격한 까졸의 부모를 설득하기가 힘이 든다. 도망가자는 까졸의 제안을 거부하고 샤룩은 끝내 그녀의 부모님의 허락을 얻어 내기 위해 고군분투한다.",
    //   "popularity": 27.112,
    //   "poster_path": "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
    //   "release_date": "1995-10-19",
    //   "title": "용감한 자가 신부를 데려가리",
    //   "video": false,
    //   "vote_average": 8.6,
    //   "vote_count": 3943
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/bxSBOAD8AuMHYMdW3jso9npAkgt.jpg",
    //   "genre_ids": [
    //     10751,
    //     18
    //   ],
    //   "id": 667257,
    //   "original_language": "es",
    //   "original_title": "Cosas imposibles",
    //   "overview": "폭력적인 남편의 사망 후, 마틸데는 여전히 트라우마와 외로움 그리고 유령같이 그녀의 주변을 맴도는 남편의 흔적에 시달린다. 이웃집 소년 미겔과 가까워진 마틸데는 미겔의 마약 판매에 가담하면서, 이전까지 경험하지 못했던 새로운 삶에 눈을 뜨기 시작한다. 나이 차에도 불구하고 두 사람이 나누는 평범하지 않은 우정은 서로의 상처를 보듬고 치유해 준다. 삶의 막다른 골목에서, 불가능해 보였던 희망을 향해 나아가는 마틸데와 미겔의 용기 어린 선택이 감동으로 다가온다.",
    //   "popularity": 10.022,
    //   "poster_path": "/eaf7GQj0ieOwm08rrvjJQNbN0kN.jpg",
    //   "release_date": "2021-06-17",
    //   "title": "불가능한 것들",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 276
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/Ab8mkHmkYADjU7wQiOkia9BzGvS.jpg",
    //   "genre_ids": [
    //     16,
    //     10751,
    //     14
    //   ],
    //   "id": 129,
    //   "original_language": "ja",
    //   "original_title": "千と千尋の神隠し",
    //   "overview": "평범한 열 살 짜리 소녀 치히로 식구는 이사 가던 중 길을 잘못 들어 낡은 터널을 지나가게 된다. 터널 저편엔 폐허가 된 놀이공원이 있었고 그곳엔 이상한 기운이 흘렀다. 인기척 하나 없는 이 마을의 낯선 분위기에 불길한 기운을 느낀 치히로는 부모님에게 돌아가자고 조르지만 부모님은 호기심에 들떠 마을 곳곳을 돌아다니기 시작한다. 어느 음식점에 도착한 치히로의 부모님은 그 곳에 차려진 음식들을 보고 즐거워하며 허겁지겁 먹어대다가 돼지로 변해버린다. 겁에 질려 당황하는 치히로에게 낯선 소년 하쿠가 나타나 빨리 이곳을 나가라고 소리치는데...",
    //   "popularity": 86.61,
    //   "poster_path": "/u1L4qxIu5sC2P082uMHYt7Ifvnj.jpg",
    //   "release_date": "2001-07-20",
    //   "title": "센과 치히로의 행방불명",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 13554
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
    //   "genre_ids": [
    //     18
    //   ],
    //   "id": 389,
    //   "original_language": "en",
    //   "original_title": "12 Angry Men",
    //   "overview": "뉴욕시의 법정에 아버지를 칼로 찌른 한 소년의 살인혐의를 두고, 12인의 배심원들은 만장일치 합의를 통해 소년의 유무죄 여부를 가려줄 것을 요구받는다. 판사는 유죄일 경우 이 소년은 사형이 불가피하다는 것을 이들에게 미리 일러둔다.  배심원 방에 모인 이들은 투표를 통해 유무죄 여부를 가리기로 한다. 사람들이 전부 소년이 유죄로 판단하는 가운데, 오직 한 배심원만이 소년이 무죄라고 주장하는데...",
    //   "popularity": 28.778,
    //   "poster_path": "/ppd84D2i9W8jXmsyInGyihiSyqz.jpg",
    //   "release_date": "1957-04-10",
    //   "title": "12명의 성난 사람들",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 6791
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/3RMLbSEXOn1CzLoNT7xFeLfdxhq.jpg",
    //   "genre_ids": [
    //     10749,
    //     16
    //   ],
    //   "id": 372754,
    //   "original_language": "ja",
    //   "original_title": "同級生",
    //   "overview": "밴드 활동을 하며 여자에게도 인기가 많은 쿠사카베 히카루.  고교 입시에서 만점을 받은 인재 사죠 리히토. 도무지 접점이 없어 보이는 두 남학생은 합창 대회 연습을 계기로 친해진다. 음을 느끼고 목소리에 귀를 기울이고 화음을 만들어가며 둘의 마음은 공명하기 시작하는데… 느긋하게 고조되다 뜻밖의 순간에 터져버리는 사랑의 감정. 순수하고 솔직한 쿠사카베 히카루와 그를 밀어내면서도 조금씩 마음을 열어가는 사죠 리히토.  청춘의 풋풋함 속에서 고민하고, 망설이며 앞으로 나아가고자 하는 그들이 깨달은 마음이란…",
    //   "popularity": 15.539,
    //   "poster_path": "/jNJ9shLhjRavjrCGRnoTmYB18d2.jpg",
    //   "release_date": "2016-02-20",
    //   "title": "동급생",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 260
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/mMtUybQ6hL24FXo0F3Z4j2KG7kZ.jpg",
    //   "genre_ids": [
    //     10749,
    //     16,
    //     18
    //   ],
    //   "id": 372058,
    //   "original_language": "ja",
    //   "original_title": "君の名は。",
    //   "overview": "시골에 사는 소녀 미츠하(가미시라이시 모네)는 어느 날 잠에서 깬 후 자신의 몸이 남자로 바뀐 걸 알게 된다. 같은 시간, 도쿄에 사는 소년 타키(가미키 류노스케) 역시 이 기이한 상황을 겪고 있다. 낯선 가족, 낯선 친구들, 낯선 풍경들... 서로에게 이어진 끈을 알게 된 둘은 둘만의 규칙을 정하고 점차 상황을 받아들이기 시작한다. 서로에게 남긴 메모를 확인하며  점점 친구가 되어가는 타키와 미츠하. 언제부턴가 더 이상 몸이 바뀌지 않자  자신들이 특별하게 이어져있었음을 깨달은  타키는 미츠하를 만나러 가는데...",
    //   "popularity": 126.455,
    //   "poster_path": "/wx1Dxr4UyvN18SyC5GsVWWWtYja.jpg",
    //   "release_date": "2016-08-26",
    //   "title": "너의 이름은",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 9224
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
    //   "genre_ids": [
    //     35,
    //     53,
    //     18
    //   ],
    //   "id": 496243,
    //   "original_language": "ko",
    //   "original_title": "기생충",
    //   "overview": "전원 백수로 살 길 막막하지만 사이는 좋은 기택 가족. 장남 기우에게 명문대생 친구가 연결시켜 준 고액 과외 자리는 모처럼 싹튼 고정수입의 희망이다. 온 가족의 도움과 기대 속에 박 사장 집으로 향하는 기우. 글로벌 IT기업의 CEO인 박 사장의 저택에 도착하자 젊고 아름다운 사모님 연교와 가정부 문광이 기우를 맞이한다. 큰 문제 없이 박 사장의 딸 다혜의 과외를 시작한 기우. 그러나 이렇게 시작된 두 가족의 만남 뒤로, 걷잡을 수 없는 사건이 기다리고  있는데.....",
    //   "popularity": 66.783,
    //   "poster_path": "/jjHccoFjbqlfr4VGLVLT7yek0Xn.jpg",
    //   "release_date": "2019-05-30",
    //   "title": "기생충",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 14706
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/l6hQWH9eDksNJNiXWYRkWqikOdu.jpg",
    //   "genre_ids": [
    //     14,
    //     18,
    //     80
    //   ],
    //   "id": 497,
    //   "original_language": "en",
    //   "original_title": "The Green Mile",
    //   "overview": "미국 루이지애나의 콜드 마운틴 교도소. 폴은 사형수 감방의 간수장으로 일하고 있다. 그의 일은 사형수들을 감독하고, 그린 마일이라 불리는 초록색 복도를 거쳐 그들을 사형 집행장까지 안내하는 것. 폴은 그들이 죽음을 맞이하는 순간까지 평화롭게 지낼 수 있도록 최선을 다한다. 어느 날 존 커피라는 사형수가 이송되어 온다. 그는 쌍둥이 여자아이를 살해한 흉악범. 하지만 순진한 눈망울에 겁을 잔뜩 집어먹은 그의 모습에 폴은 당혹감을 느낀다. 게다가 그는 초자연적 능력으로 폴의 지병을 깨끗하게 치료해주기까지 한다. 존을 전기 의자로 데려가야 할 날이 다가오면서 폴은 그가 무죄라는 확신을 갖게 되는데...",
    //   "popularity": 78.69,
    //   "poster_path": "/yuSpRhrTIJa5JN8oESrfD2bndp1.jpg",
    //   "release_date": "1999-12-10",
    //   "title": "그린 마일",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 14624
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/nMKdUUepR0i5zn0y1T4CsSB5chy.jpg",
    //   "genre_ids": [
    //     18,
    //     28,
    //     80,
    //     53
    //   ],
    //   "id": 155,
    //   "original_language": "en",
    //   "original_title": "The Dark Knight",
    //   "overview": "범죄와 부정부패를 제거하여 고담시를 지키려는 배트맨. 그는 짐 고든 형사와 패기 넘치는 고담시 지방 검사 하비 덴트와 함께 도시를 범죄 조직으로부터 영원히 구원하고자 한다. 세 명의 의기투합으로 위기에 처한 악당들이 모인 자리에 보라색 양복을 입고 얼굴에 짙게 화장을 한 괴이한 존재가 나타나 배트맨을 죽이자는 사상 초유의 제안을 한다. 그는 바로 어떠한 룰도, 목적도 없는 사상 최악의 악당 미치광이 살인광대 조커. 배트맨을 죽이고 고담시를 끝장내버리기 위한 조커의 광기 어린 행각에 도시는 혼란에 빠지는데...",
    //   "popularity": 79.96,
    //   "poster_path": "/f6dNinWX8rBM79JXKcShkfSh2oA.jpg",
    //   "release_date": "2008-07-14",
    //   "title": "다크 나이트",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 28581
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/jtAI6OJIWLWiRItNSZoWjrsUtmi.jpg",
    //   "genre_ids": [
    //     10749
    //   ],
    //   "id": 724089,
    //   "original_language": "en",
    //   "original_title": "Gabriel's Inferno: Part II",
    //   "overview": "",
    //   "popularity": 12.794,
    //   "poster_path": "/8Rxutea68d940kg44Box5gFmKcF.jpg",
    //   "release_date": "2020-07-31",
    //   "title": "가브리엘의 지옥 파트 2",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 1442
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/w2uGvCpMtvRqZg6waC1hvLyZoJa.jpg",
    //   "genre_ids": [
    //     10749
    //   ],
    //   "id": 696374,
    //   "original_language": "en",
    //   "original_title": "Gabriel's Inferno",
    //   "overview": "",
    //   "popularity": 11.952,
    //   "poster_path": "/oyG9TL7FcRP4EZ9Vid6uKzwdndz.jpg",
    //   "release_date": "2020-05-29",
    //   "title": "가브리엘의 지옥",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 2297
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/aQ7444JX7gefPhGJTlvilj3zG2S.jpg",
    //   "genre_ids": [
    //     10402
    //   ],
    //   "id": 553512,
    //   "original_language": "ko",
    //   "original_title": "번 더 스테이지: 더 무비",
    //   "overview": "19개 도시, 40회의 공연, 55만석 날개를 펼친 소년들의 역사. 성공적인 월드 투어로 마무리된 ‘2017 방탄소년단 라이브 트릴로지 에피소드3 윙스 투어(2017 BTS LIVE TRILOGY EPOSODE III THE WINGS TOUR)’를 가장 가까이에서 담아낸 방탄소년단의 첫 번째 영화! 지금, 우리  함께 빛나는 청춘의 순간이 스크린에 펼쳐진다.",
    //   "popularity": 16.436,
    //   "poster_path": "/pJKy1yvnKh8UjcuYeG3Rt35xHFA.jpg",
    //   "release_date": "2018-11-15",
    //   "title": "번 더 스테이지: 더 무비",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 371
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
    //   "genre_ids": [
    //     53,
    //     80
    //   ],
    //   "id": 680,
    //   "original_language": "en",
    //   "original_title": "Pulp Fiction",
    //   "overview": "펌프킨와 허니 버니가 레스토랑에서 강도 행각을 벌이기 시작한다. 빈센트와 그 동료 쥴스는 두목의 금가방을 찾기 위해 다른 건달이 사는 아파트를 찾아간다. 마르셀러스는 부치에게 돈을 주며 상대 선수에게 져 주라고 하지만 부치는 상대 선수를 때려 눕히고 도망치다, 어릴 때 아버지에게 물려받은 시계를 찾기 위해 아파트로 향한다. 아무런 상관 없이 보이는 이 사건들이 서로 얽히고 섥히면서 예상치 못한 인과관계가 만들어지는데...",
    //   "popularity": 73.56,
    //   "poster_path": "/6lXRHGoEbnnBUKsuqpL9JxD4DzT.jpg",
    //   "release_date": "1994-09-10",
    //   "title": "펄프 픽션",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 24059
    // },
    // {
    //   "adult": false,
    //   "backdrop_path": "/x4biAVdPVCghBlsVIzB6NmbghIz.jpg",
    //   "genre_ids": [
    //     37
    //   ],
    //   "id": 429,
    //   "original_language": "it",
    //   "original_title": "Il buono, il brutto, il cattivo",
    //   "overview": "미국의 남북전쟁이 한창인 때, 블론디는 멕시코인 총잡이 투코와 함께 동업 중이다. 블론디는 현상범 투코를 잡아 현상금을 받고, 투코가 교수형을 당하는 순간 구해주는 역할. 한편 세텐자라 불리우는 범죄자는 엄청나 돈이 묻힌 비밀장소를 추적 중이다. 그런데, 투코와 실랑이를 벌이던 블론디는 돈이 묻힌 장소를 죽어가는 사람에게 듣게 되고, 결국 둘은 돈을 찾아 나서는데...",
    //   "popularity": 52.841,
    //   "poster_path": "/sOTQkPoEZd7ImsZBuXfu4BqZ6JS.jpg",
    //   "release_date": "1966-12-23",
    //   "title": "석양의 무법자",
    //   "video": false,
    //   "vote_average": 8.5,
    //   "vote_count": 6973
    // }
    // ],
    // popularMovies: [
    //   // 20221117110943
    //   // https://api.themoviedb.org/3/movie/popular?api_key=1958506c8d7b614bc3e3028c518b16fb&language=ko-KR
    //     {
    //       "adult": false,
    //       "backdrop_path": "/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg",
    //       "genre_ids": [
    //         28,
    //         12,
    //         878
    //       ],
    //       "id": 505642,
    //       "original_language": "en",
    //       "original_title": "Black Panther: Wakanda Forever",
    //       "overview": "국왕이자 블랙 팬서인 티찰라의 죽음 이후 수많은 강대국으로부터 위협을 받게 된 와칸다. 라몬다, 슈리 그리고 나키아, 오코예, 음바쿠는 각자 사명감을 갖고 와칸다를 지키기 위해 외로운 싸움을 이어간다. 한편, 비브라늄의 패권을 둘러싼 미스터리한 음모와 함께 깊은 해저에서 모습을 드러낸 최강의 적 네이머와 탈로칸의 전사들은 와칸다를 향해 무차별 공격을 퍼붓기 시작하는데…",
    //       "popularity": 3728.879,
    //       "poster_path": "/3PCRWLeqp5y20k6XVzcamZR3BWF.jpg",
    //       "release_date": "2022-11-09",
    //       "title": "블랙 팬서: 와칸다 포에버",
    //       "video": false,
    //       "vote_average": 7.5,
    //       "vote_count": 667
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    //       "genre_ids": [
    //         28,
    //         14,
    //         878
    //       ],
    //       "id": 436270,
    //       "original_language": "en",
    //       "original_title": "Black Adam",
    //       "overview": "기원전 가장 번성하고 위대한 고대 국가였지만 현재는 국제 군사 조직 인터갱의 독재 국가로 전락한 칸다크. 인터갱의 눈을 피해 고대 유물을 찾던 '아드리아나'는 우연히 5000년 동안 잠들어 있던 '블랙 아담'을 깨우게 된다.  엄청난 괴력과 스피드, 방탄 능력과 자유자재의 고공비행, 번개를 쏘는 능력까지. 온몸이 무기인 '블랙 아담'은 자신의 앞을 막아서는 인터갱들을 모조리 쓸어버리고 칸다크 국민들은 이에 열광한다. 한편, 그의 폭주를 막기 위해 호크맨, 닥터 페이트, 아톰 스매셔, 사이클론으로 구성된 히어로 군단 '저스티스 소사이어티'가 칸다크에 나타나는데...",
    //       "popularity": 4430.63,
    //       "poster_path": "/mEdMHGy1FfCUc7PskFO0tibm8jp.jpg",
    //       "release_date": "2022-10-19",
    //       "title": "블랙 아담",
    //       "video": false,
    //       "vote_average": 6.9,
    //       "vote_count": 1114
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/yNib9QAiyaopUJbaayKQ2xK7mYf.jpg",
    //       "genre_ids": [
    //         18,
    //         28,
    //         10752
    //       ],
    //       "id": 966220,
    //       "original_language": "uk",
    //       "original_title": "Снайпер. Білий ворон",
    //       "overview": "",
    //       "popularity": 2665.449,
    //       "poster_path": "/66mrr3AK6grmkfGJ1wlCP8dkzjM.jpg",
    //       "release_date": "2022-05-03",
    //       "title": "Снайпер. Білий ворон",
    //       "video": false,
    //       "vote_average": 7.5,
    //       "vote_count": 74
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/y5Z0WesTjvn59jP6yo459eUsbli.jpg",
    //       "genre_ids": [
    //         27,
    //         53
    //       ],
    //       "id": 663712,
    //       "original_language": "en",
    //       "original_title": "Terrifier 2",
    //       "overview": "",
    //       "popularity": 2107.165,
    //       "poster_path": "/b6IRp6Pl2Fsq37r9jFhGoLtaqHm.jpg",
    //       "release_date": "2022-10-06",
    //       "title": "테리파이어 2",
    //       "video": false,
    //       "vote_average": 7,
    //       "vote_count": 603
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/u9Io1hVnxb2b3T0z99aOK8sq0SN.jpg",
    //       "genre_ids": [
    //         9648,
    //         12,
    //         80
    //       ],
    //       "id": 829280,
    //       "original_language": "en",
    //       "original_title": "Enola Holmes 2",
    //       "overview": "탐정이 된 후 첫 번째 사건을 수임한 에놀라. 하지만 실종된 소녀의 미스터리를 풀기 위해서는 친구들의 도움이 필요하다. 어쩌면 오빠 셜록의 도움까지도.",
    //       "popularity": 1961.331,
    //       "poster_path": "/S6fDnntDjduIWuLW2GcqFasobD.jpg",
    //       "release_date": "2022-11-04",
    //       "title": "에놀라 홈즈 2",
    //       "video": false,
    //       "vote_average": 7.7,
    //       "vote_count": 890
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/olPXihyFeeNvnaD6IOBltgIV1FU.jpg",
    //       "genre_ids": [
    //         27,
    //         9648,
    //         53
    //       ],
    //       "id": 882598,
    //       "original_language": "en",
    //       "original_title": "Smile",
    //       "overview": "기괴한 미소를 지으며 자신의 눈 앞에서 목숨을 끊는 환자를 목격한 정신과 의사 ‘로즈’. 그날 이후로 ‘로즈’의 일상에 설명할 수 없는 끔찍한 일들이 잇따라 발생한다. 일상을 덮친 공포에 발버둥치던 ‘로즈’는 이전에도 자신과 같은 일을 겪은 사람들이 있었고 그들 모두 끔찍한 죽음을 피할 수 없었다는 사실을 알게 된다. 시시각각 다가오는 죽음에서 벗어나기 위해 사투를 벌이던 로즈는 잊고 싶던 과거와 마주하게 되는데…",
    //       "popularity": 3419.675,
    //       "poster_path": "/8ncuVFt4e0M2NTTsoPtbxfWN5dO.jpg",
    //       "release_date": "2022-09-23",
    //       "title": "스마일",
    //       "video": false,
    //       "vote_average": 6.7,
    //       "vote_count": 551
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/b2FxWOxe9K7ZZ1uaPOze2RJ1ajq.jpg",
    //       "genre_ids": [
    //         27,
    //         28,
    //         35
    //       ],
    //       "id": 675054,
    //       "original_language": "es",
    //       "original_title": "MexZombies",
    //       "overview": "",
    //       "popularity": 1570.461,
    //       "poster_path": "/85zufUxhD97k2s5Bu2u101Qd8Sg.jpg",
    //       "release_date": "2022-10-26",
    //       "title": "MexZombies",
    //       "video": false,
    //       "vote_average": 7.2,
    //       "vote_count": 77
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/mqsPyyeDCBAghXyjbw4TfEYwljw.jpg",
    //       "genre_ids": [
    //         10752,
    //         18,
    //         28
    //       ],
    //       "id": 49046,
    //       "original_language": "de",
    //       "original_title": "Im Westen nichts Neues",
    //       "overview": "제1차 세계대전 당시 서부전선에서 싸운 독일군 청년의 강렬한 이야기.  젊은 사병과 전우들은 참호 속에서 사투를 벌이며,  처음 전쟁에 대해 느꼈던 환상과 도취감이  어떻게 절망과 공포로 변해가는지를 생생하게 체험한다.",
    //       "popularity": 1420.85,
    //       "poster_path": "/sNsmI4vQ1A6VG52dquTFx8oNTWk.jpg",
    //       "release_date": "2022-10-07",
    //       "title": "서부 전선 이상 없다",
    //       "video": false,
    //       "vote_average": 7.8,
    //       "vote_count": 787
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/f9g3R9gq0bASip9RnK2H56dbb5j.jpg",
    //       "genre_ids": [
    //         53
    //       ],
    //       "id": 979924,
    //       "original_language": "en",
    //       "original_title": "On the Line",
    //       "overview": "진행자가 전화를 받는데, 이 전화에서 정체를 알 수 없는 사람이  쇼맨의 온 가족을 죽이겠다고 협박합니다. 사랑하는 사람들을 구하기 위해  라디오 진행자는 생존 게임을 해야 할 것이고  이길 수 있는 유일한 방법은 범인의 신원을 알아내는 것입니다.",
    //       "popularity": 1609.63,
    //       "poster_path": "/jVmWI8PqoVTHCnrLYAcyrclzeY0.jpg",
    //       "release_date": "2022-10-31",
    //       "title": "온 더 라인",
    //       "video": false,
    //       "vote_average": 6.6,
    //       "vote_count": 109
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/pGx6O6IwqADOsgmqWzPysmWnOyr.jpg",
    //       "genre_ids": [
    //         28,
    //         14
    //       ],
    //       "id": 732459,
    //       "original_language": "en",
    //       "original_title": "Blade of the 47 Ronin",
    //       "overview": "",
    //       "popularity": 1083.84,
    //       "poster_path": "/kjFDIlUCJkcpFxYKtE6OsGcAfQQ.jpg",
    //       "release_date": "2022-10-25",
    //       "title": "47 로닌의 검",
    //       "video": false,
    //       "vote_average": 6.8,
    //       "vote_count": 74
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/tUBN1paMQ1tmVA5Sjy1ZjPWVsiF.jpg",
    //       "genre_ids": [
    //         12,
    //         16,
    //         35,
    //         10751,
    //         14
    //       ],
    //       "id": 676701,
    //       "original_language": "es",
    //       "original_title": "Tadeo Jones 3: La Tabla Esmeralda",
    //       "overview": "",
    //       "popularity": 1853.126,
    //       "poster_path": "/8ZJjRunZbkMSXcRHiqAdQiecXYz.jpg",
    //       "release_date": "2022-08-24",
    //       "title": "Tadeo Jones 3: La Tabla Esmeralda",
    //       "video": false,
    //       "vote_average": 7.9,
    //       "vote_count": 75
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg",
    //       "genre_ids": [
    //         27,
    //         53
    //       ],
    //       "id": 760161,
    //       "original_language": "en",
    //       "original_title": "Orphan: First Kill",
    //       "overview": "엄청난 비밀을 숨긴 사이코패스가 에스토니아의 정신병동을 탈출, 부유한 가족의 실종된 딸 ‘에스더’로 사칭해 미국에 온다. 재회의 기쁨도 잠시, 어딘지 낯선 딸의 정체를 눈치챈 엄마는 가족을 지키기 위해 에스더와 맞서는데...  누구도 상상 못한 충격적인 반전이 기다린다!",
    //       "popularity": 1093.742,
    //       "poster_path": "/vKIhsEVEtLTwTkmLSDNi230Zr3Q.jpg",
    //       "release_date": "2022-07-27",
    //       "title": "오펀: 천사의 탄생",
    //       "video": false,
    //       "vote_average": 6.8,
    //       "vote_count": 1293
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/1DBDwevWS8OhiT3wqqlW7KGPd6m.jpg",
    //       "genre_ids": [
    //         53
    //       ],
    //       "id": 985939,
    //       "original_language": "en",
    //       "original_title": "Fall",
    //       "overview": "내려갈 길이 끊겨버린 600미터 TV 타워 위에서  두 명의 친구가 살아남기 위해 펼치는 사상 최초의 고공 서바이벌 여기에서",
    //       "popularity": 1192.07,
    //       "poster_path": "/8huJowZK1t7MNLEKo3dgLAxmiLW.jpg",
    //       "release_date": "2022-08-11",
    //       "title": "폴: 600미터",
    //       "video": false,
    //       "vote_average": 7.3,
    //       "vote_count": 1740
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/y4XBYLldCLuNLVeObTndfAaUrc3.jpg",
    //       "genre_ids": [
    //         28,
    //         80,
    //         53
    //       ],
    //       "id": 896485,
    //       "original_language": "fr",
    //       "original_title": "Overdose",
    //       "overview": "툴루즈 경찰서의 사라 벨라이슈 경감은 파리에서 온 리샤르 크로스 반장의 지휘하에 긴밀하게 얽힌 두 10대의 살인 사건을 수사한다. 상반되는 수사 방식에도 범인을 찾기 위해 어쩔 수 없이 합동 수사를 벌여야 하는 사라와 리샤르는 스페인과 프랑스에서 시간에 쫓기는 싸움을 벌인다.",
    //       "popularity": 1073.538,
    //       "poster_path": "/9RvM4wawLRlX608FgZr9kL8CLmy.jpg",
    //       "release_date": "2022-11-04",
    //       "title": "오버도즈",
    //       "video": false,
    //       "vote_average": 6.6,
    //       "vote_count": 75
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/hNzrnsH9FMMfITu2xQqaf70CRv5.jpg",
    //       "genre_ids": [
    //         9648,
    //         14,
    //         53
    //       ],
    //       "id": 856245,
    //       "original_language": "es",
    //       "original_title": "Matar a la Bestia",
    //       "overview": "열일곱 살 에밀리아는 이모 이네스의 호스텔에 도착하는데, 그곳에는 위험한 야수가 어슬렁거린다는 소문이 돌고 있다. 성(性)에 눈을 뜨기 위한 여정을 떠난 에밀리아는 야수를 죽이기 위해 자신의 과거와 맞서야만 한다.",
    //       "popularity": 1053.707,
    //       "poster_path": "/epmWB73CmhoNkHXTf9aAiMhJLhN.jpg",
    //       "release_date": "2022-04-28",
    //       "title": "투 킬 더 비스트",
    //       "video": false,
    //       "vote_average": 6,
    //       "vote_count": 17
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/tIX6j3NzadlwGcJ52nuWdmtOQkg.jpg",
    //       "genre_ids": [
    //         27,
    //         53,
    //         9648
    //       ],
    //       "id": 717728,
    //       "original_language": "en",
    //       "original_title": "Jeepers Creepers: Reborn",
    //       "overview": "",
    //       "popularity": 1072.973,
    //       "poster_path": "/qVVegwPsW6n9unBtLWq1rzOutka.jpg",
    //       "release_date": "2022-09-15",
    //       "title": "Jeepers Creepers: Reborn",
    //       "video": false,
    //       "vote_average": 5.8,
    //       "vote_count": 458
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/nnUQqlVZeEGuCRx8SaoCU4XVHJN.jpg",
    //       "genre_ids": [
    //         14,
    //         12,
    //         10751
    //       ],
    //       "id": 532639,
    //       "original_language": "en",
    //       "original_title": "Pinocchio",
    //       "overview": "목수 ‘제페토’의 간절한 소원으로 태어난 나무 인형 ‘피노키오’는  진짜 사람이 되기 위해 자신의 양심이 되어줄 귀뚜라미 ‘지미니’와 함께  진실되고 용감한 마음을 가지기로 약속한다.  그러나 거리의 교활한 여우의 꾀임에 넘어간 피노키오는 서커스단에 들어가게 되고, 이기적인 어른들의 욕심으로 철장에 갇혀버리고 만다.  한편, 사라진 피노키오를 찾기 위해 길을 나선 ‘제페토’는 폭우 속에 목숨을 잃을 위기에 처하고 마는데…",
    //       "popularity": 813.164,
    //       "poster_path": "/aFVjf2zcFzoNgbDKDEHiIw2g1DR.jpg",
    //       "release_date": "2022-09-07",
    //       "title": "피노키오",
    //       "video": false,
    //       "vote_average": 6.7,
    //       "vote_count": 1074
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/cvOHMfZTxIiNI9yyjYgYfCpT48p.jpg",
    //       "genre_ids": [
    //         28,
    //         80,
    //         53
    //       ],
    //       "id": 944864,
    //       "original_language": "nl",
    //       "original_title": "The Takeover",
    //       "overview": "개인정보 탈취 음모를 발견한 뒤 살인 누명을 쓰게 된 화이트 해커. 경찰로부터 도주 중인 그녀가 자신을 협박하는 범죄자들의 정체를 밝히기 위해 싸운다.",
    //       "popularity": 806.325,
    //       "poster_path": "/fNbsrrNSuSkfo3FyDNPp9DGkhgX.jpg",
    //       "release_date": "2022-11-01",
    //       "title": "테이크오버",
    //       "video": false,
    //       "vote_average": 5.7,
    //       "vote_count": 65
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/akYTfFvYkFGJReFxXM841NidlAa.jpg",
    //       "genre_ids": [
    //         80,
    //         18
    //       ],
    //       "id": 1033107,
    //       "original_language": "en",
    //       "original_title": "Wild Is the Wind",
    //       "overview": "젊은 여성이 잔인하게 살해된 채 발견되면서 부패 경찰 두 명이 사건 수사에 착수한다. 그와 함께, 인종차별이 만연한 소도시에서는 사람들의 갈등이 극에 달하는데.",
    //       "popularity": 699.111,
    //       "poster_path": "/rITxQBtnMpneZf8QzH1dqONQocx.jpg",
    //       "release_date": "2022-10-28",
    //       "title": "와일드 이즈 더 윈드",
    //       "video": false,
    //       "vote_average": 5.8,
    //       "vote_count": 30
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/iS9U3VHpPEjTWnwmW56CrBlpgLj.jpg",
    //       "genre_ids": [
    //         14,
    //         35,
    //         10751
    //       ],
    //       "id": 642885,
    //       "original_language": "en",
    //       "original_title": "Hocus Pocus 2",
    //       "overview": "누군가가 검은 불꽃 초에 불을 붙여 17세기에 활동했던 자매들을 되살린 지도 29년이 흘렀다. 이제 자매들은 원수를 갚으려 한다. 핼러윈 전날의 동이 터오기 전에 세일럼에서 대혼란을 일으키려는 마녀들을 막아설 사람은 세 고등학생뿐이다.",
    //       "popularity": 843.776,
    //       "poster_path": "/xpDdvIaTHn38F17pPseL1MQI05B.jpg",
    //       "release_date": "2022-09-27",
    //       "title": "호커스 포커스 2",
    //       "video": false,
    //       "vote_average": 7.5,
    //       "vote_count": 1104
    //     }],
    // nowPlayingMovies: [
    //   // 20221117110948
    //   // https://api.themoviedb.org/3/movie/now_playing?api_key=1958506c8d7b614bc3e3028c518b16fb&language=ko-KR
    
    //     {
    //       "adult": false,
    //       "backdrop_path": "/yYrvN5WFeGYjJnRzhY0QXuo4Isw.jpg",
    //       "genre_ids": [
    //         28,
    //         12,
    //         878
    //       ],
    //       "id": 505642,
    //       "original_language": "en",
    //       "original_title": "Black Panther: Wakanda Forever",
    //       "overview": "국왕이자 블랙 팬서인 티찰라의 죽음 이후 수많은 강대국으로부터 위협을 받게 된 와칸다. 라몬다, 슈리 그리고 나키아, 오코예, 음바쿠는 각자 사명감을 갖고 와칸다를 지키기 위해 외로운 싸움을 이어간다. 한편, 비브라늄의 패권을 둘러싼 미스터리한 음모와 함께 깊은 해저에서 모습을 드러낸 최강의 적 네이머와 탈로칸의 전사들은 와칸다를 향해 무차별 공격을 퍼붓기 시작하는데…",
    //       "popularity": 3728.879,
    //       "poster_path": "/3PCRWLeqp5y20k6XVzcamZR3BWF.jpg",
    //       "release_date": "2022-11-09",
    //       "title": "블랙 팬서: 와칸다 포에버",
    //       "video": false,
    //       "vote_average": 7.5,
    //       "vote_count": 667
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg",
    //       "genre_ids": [
    //         28,
    //         14,
    //         878
    //       ],
    //       "id": 436270,
    //       "original_language": "en",
    //       "original_title": "Black Adam",
    //       "overview": "기원전 가장 번성하고 위대한 고대 국가였지만 현재는 국제 군사 조직 인터갱의 독재 국가로 전락한 칸다크. 인터갱의 눈을 피해 고대 유물을 찾던 '아드리아나'는 우연히 5000년 동안 잠들어 있던 '블랙 아담'을 깨우게 된다.  엄청난 괴력과 스피드, 방탄 능력과 자유자재의 고공비행, 번개를 쏘는 능력까지. 온몸이 무기인 '블랙 아담'은 자신의 앞을 막아서는 인터갱들을 모조리 쓸어버리고 칸다크 국민들은 이에 열광한다. 한편, 그의 폭주를 막기 위해 호크맨, 닥터 페이트, 아톰 스매셔, 사이클론으로 구성된 히어로 군단 '저스티스 소사이어티'가 칸다크에 나타나는데...",
    //       "popularity": 4430.63,
    //       "poster_path": "/mEdMHGy1FfCUc7PskFO0tibm8jp.jpg",
    //       "release_date": "2022-10-19",
    //       "title": "블랙 아담",
    //       "video": false,
    //       "vote_average": 6.9,
    //       "vote_count": 1114
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/y5Z0WesTjvn59jP6yo459eUsbli.jpg",
    //       "genre_ids": [
    //         27,
    //         53
    //       ],
    //       "id": 663712,
    //       "original_language": "en",
    //       "original_title": "Terrifier 2",
    //       "overview": "",
    //       "popularity": 2107.165,
    //       "poster_path": "/b6IRp6Pl2Fsq37r9jFhGoLtaqHm.jpg",
    //       "release_date": "2022-10-06",
    //       "title": "테리파이어 2",
    //       "video": false,
    //       "vote_average": 7,
    //       "vote_count": 603
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/olPXihyFeeNvnaD6IOBltgIV1FU.jpg",
    //       "genre_ids": [
    //         27,
    //         9648,
    //         53
    //       ],
    //       "id": 882598,
    //       "original_language": "en",
    //       "original_title": "Smile",
    //       "overview": "기괴한 미소를 지으며 자신의 눈 앞에서 목숨을 끊는 환자를 목격한 정신과 의사 ‘로즈’. 그날 이후로 ‘로즈’의 일상에 설명할 수 없는 끔찍한 일들이 잇따라 발생한다. 일상을 덮친 공포에 발버둥치던 ‘로즈’는 이전에도 자신과 같은 일을 겪은 사람들이 있었고 그들 모두 끔찍한 죽음을 피할 수 없었다는 사실을 알게 된다. 시시각각 다가오는 죽음에서 벗어나기 위해 사투를 벌이던 로즈는 잊고 싶던 과거와 마주하게 되는데…",
    //       "popularity": 3419.675,
    //       "poster_path": "/8ncuVFt4e0M2NTTsoPtbxfWN5dO.jpg",
    //       "release_date": "2022-09-23",
    //       "title": "스마일",
    //       "video": false,
    //       "vote_average": 6.7,
    //       "vote_count": 551
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/mqsPyyeDCBAghXyjbw4TfEYwljw.jpg",
    //       "genre_ids": [
    //         10752,
    //         18,
    //         28
    //       ],
    //       "id": 49046,
    //       "original_language": "de",
    //       "original_title": "Im Westen nichts Neues",
    //       "overview": "제1차 세계대전 당시 서부전선에서 싸운 독일군 청년의 강렬한 이야기.  젊은 사병과 전우들은 참호 속에서 사투를 벌이며,  처음 전쟁에 대해 느꼈던 환상과 도취감이  어떻게 절망과 공포로 변해가는지를 생생하게 체험한다.",
    //       "popularity": 1420.85,
    //       "poster_path": "/sNsmI4vQ1A6VG52dquTFx8oNTWk.jpg",
    //       "release_date": "2022-10-07",
    //       "title": "서부 전선 이상 없다",
    //       "video": false,
    //       "vote_average": 7.8,
    //       "vote_count": 787
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/f9g3R9gq0bASip9RnK2H56dbb5j.jpg",
    //       "genre_ids": [
    //         53
    //       ],
    //       "id": 979924,
    //       "original_language": "en",
    //       "original_title": "On the Line",
    //       "overview": "진행자가 전화를 받는데, 이 전화에서 정체를 알 수 없는 사람이  쇼맨의 온 가족을 죽이겠다고 협박합니다. 사랑하는 사람들을 구하기 위해  라디오 진행자는 생존 게임을 해야 할 것이고  이길 수 있는 유일한 방법은 범인의 신원을 알아내는 것입니다.",
    //       "popularity": 1609.63,
    //       "poster_path": "/jVmWI8PqoVTHCnrLYAcyrclzeY0.jpg",
    //       "release_date": "2022-10-31",
    //       "title": "온 더 라인",
    //       "video": false,
    //       "vote_average": 6.6,
    //       "vote_count": 109
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/tUBN1paMQ1tmVA5Sjy1ZjPWVsiF.jpg",
    //       "genre_ids": [
    //         12,
    //         16,
    //         35,
    //         10751,
    //         14
    //       ],
    //       "id": 676701,
    //       "original_language": "es",
    //       "original_title": "Tadeo Jones 3: La Tabla Esmeralda",
    //       "overview": "",
    //       "popularity": 1853.126,
    //       "poster_path": "/8ZJjRunZbkMSXcRHiqAdQiecXYz.jpg",
    //       "release_date": "2022-08-24",
    //       "title": "Tadeo Jones 3: La Tabla Esmeralda",
    //       "video": false,
    //       "vote_average": 7.9,
    //       "vote_count": 75
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/5GA3vV1aWWHTSDO5eno8V5zDo8r.jpg",
    //       "genre_ids": [
    //         27,
    //         53
    //       ],
    //       "id": 760161,
    //       "original_language": "en",
    //       "original_title": "Orphan: First Kill",
    //       "overview": "엄청난 비밀을 숨긴 사이코패스가 에스토니아의 정신병동을 탈출, 부유한 가족의 실종된 딸 ‘에스더’로 사칭해 미국에 온다. 재회의 기쁨도 잠시, 어딘지 낯선 딸의 정체를 눈치챈 엄마는 가족을 지키기 위해 에스더와 맞서는데...  누구도 상상 못한 충격적인 반전이 기다린다!",
    //       "popularity": 1093.742,
    //       "poster_path": "/vKIhsEVEtLTwTkmLSDNi230Zr3Q.jpg",
    //       "release_date": "2022-07-27",
    //       "title": "오펀: 천사의 탄생",
    //       "video": false,
    //       "vote_average": 6.8,
    //       "vote_count": 1293
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/1DBDwevWS8OhiT3wqqlW7KGPd6m.jpg",
    //       "genre_ids": [
    //         53
    //       ],
    //       "id": 985939,
    //       "original_language": "en",
    //       "original_title": "Fall",
    //       "overview": "내려갈 길이 끊겨버린 600미터 TV 타워 위에서  두 명의 친구가 살아남기 위해 펼치는 사상 최초의 고공 서바이벌 여기에서",
    //       "popularity": 1192.07,
    //       "poster_path": "/8huJowZK1t7MNLEKo3dgLAxmiLW.jpg",
    //       "release_date": "2022-08-11",
    //       "title": "폴: 600미터",
    //       "video": false,
    //       "vote_average": 7.3,
    //       "vote_count": 1740
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/tIX6j3NzadlwGcJ52nuWdmtOQkg.jpg",
    //       "genre_ids": [
    //         27,
    //         53,
    //         9648
    //       ],
    //       "id": 717728,
    //       "original_language": "en",
    //       "original_title": "Jeepers Creepers: Reborn",
    //       "overview": "",
    //       "popularity": 1072.973,
    //       "poster_path": "/qVVegwPsW6n9unBtLWq1rzOutka.jpg",
    //       "release_date": "2022-09-15",
    //       "title": "Jeepers Creepers: Reborn",
    //       "video": false,
    //       "vote_average": 5.8,
    //       "vote_count": 458
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/AaV1YIdWKnjAIAOe8UUKBFm327v.jpg",
    //       "genre_ids": [
    //         28,
    //         18
    //       ],
    //       "id": 361743,
    //       "original_language": "en",
    //       "original_title": "Top Gun: Maverick",
    //       "overview": "최고의 파일럿이자 전설적인 인물 매버릭은 자신이 졸업한 훈련학교 교관으로 발탁된다. 그의 명성을 모르던 팀원들은 매버릭의 지시를 무시하지만 실전을 방불케 하는 상공 훈련에서 눈으로 봐도 믿기 힘든 전설적인 조종 실력에 모두가 압도된다. 매버릭의 지휘 아래 견고한 팀워크를 쌓아가던 팀원들에게 국경을 뛰어넘는 위험한 임무가 주어지자 매버릭은 자신이 가르친 동료들과 함께 마지막이 될지 모를 하늘 위 비행에 나서는데...",
    //       "popularity": 761.054,
    //       "poster_path": "/jeqXUwNilvNqNXqAHsdwm5pEfae.jpg",
    //       "release_date": "2022-05-24",
    //       "title": "탑건: 매버릭",
    //       "video": false,
    //       "vote_average": 8.3,
    //       "vote_count": 4749
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/gVecEIEZLZg3pV5CACXAB48I6au.jpg",
    //       "genre_ids": [
    //         80,
    //         18,
    //         9648,
    //         53
    //       ],
    //       "id": 862965,
    //       "original_language": "en",
    //       "original_title": "Emily the Criminal",
    //       "overview": "",
    //       "popularity": 1236.631,
    //       "poster_path": "/iZvzMpREGiqDQ5eYbx8z70qPgst.jpg",
    //       "release_date": "2022-08-12",
    //       "title": "에밀리 더 크리미널",
    //       "video": false,
    //       "vote_average": 6.8,
    //       "vote_count": 176
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/yo0qfH2dQGGMxkfivdkz5zxVatD.jpg",
    //       "genre_ids": [
    //         27,
    //         53
    //       ],
    //       "id": 830788,
    //       "original_language": "en",
    //       "original_title": "The Invitation",
    //       "overview": "가족이 없는 이비는 우연히 DNA 검사를 받기로 결정한 후, 그녀가  몰랐던 먼 친척이 있음을 발견한다. 새로운 친척의 초대를 받은 이비는 멋진 영국 시골 결혼식에 참석을 하게 된다. 대저택의 영주인 월터를 만나게 되면서 그녀가 몰랐던 자신의 끔찍한 배경과 가족의 과거에 대한 어둡고 뒤틀린 비밀을 알게 되는데...",
    //       "popularity": 771.456,
    //       "poster_path": "/jcTq6gIskCsHlKDvCKKouEfiU66.jpg",
    //       "release_date": "2022-08-24",
    //       "title": "디 인비테이션",
    //       "video": false,
    //       "vote_average": 6.4,
    //       "vote_count": 322
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/iVtpnbPE91vmi3LmcOXycEblwPA.jpg",
    //       "genre_ids": [
    //         10749,
    //         35
    //       ],
    //       "id": 833097,
    //       "original_language": "en",
    //       "original_title": "Falling for Christmas",
    //       "overview": "스키 여행 중 사고로 기억을 잃은 철없는 상속녀. 아내와 사별 후 힘든 상황에 놓인 남자와 딸의 포근한 보살핌 속에 크리스마스를 보낸다.",
    //       "popularity": 1130.517,
    //       "poster_path": "/6GkphwL9s6dZb3DoQS9OQ4LcPgY.jpg",
    //       "release_date": "2022-11-10",
    //       "title": "폴링 포 크리스마스",
    //       "video": false,
    //       "vote_average": 6.8,
    //       "vote_count": 174
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/2cQMVHBaP1wK0UBX5SGDahB3lp3.jpg",
    //       "genre_ids": [
    //         9648,
    //         53,
    //         27
    //       ],
    //       "id": 807356,
    //       "original_language": "en",
    //       "original_title": "Watcher",
    //       "overview": "한 젊은 미국 여성이 남편과 함께 루마니아의 부쿠레슈티로 이사한 뒤 길 건너편 아파트에서 자신을 지켜보는 낯선 사람이 연쇄 살인범일 수도 있다고 의심을 하기 시작하면서 여성에게 벌어지는 공포스러운 이야기를 담은 영화",
    //       "popularity": 829.954,
    //       "poster_path": "/6Hg1l0alQNdCbFSVodRyR78A84w.jpg",
    //       "release_date": "2022-06-03",
    //       "title": "왓쳐",
    //       "video": false,
    //       "vote_average": 6.3,
    //       "vote_count": 288
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/14QbnygCuTO0vl7CAFmPf1fgZfV.jpg",
    //       "genre_ids": [
    //         28,
    //         12,
    //         878
    //       ],
    //       "id": 634649,
    //       "original_language": "en",
    //       "original_title": "Spider-Man: No Way Home",
    //       "overview": "미스테리오의 계략으로 세상에 정체가 탄로난 스파이더맨 피터 파커는 하루 아침에 평범한 일상을 잃게 된다. 문제를 해결하기 위해 닥터 스트레인지를 찾아가 도움을 청하지만 뜻하지 않게 멀티버스가 열리면서 각기 다른 차원의 불청객들이 나타난다. 닥터 옥토퍼스를 비롯해 스파이더맨에게 깊은 원한을 가진 숙적들의 강력한 공격에 피터 파커는 사상 최악의 위기를 맞게 되는데…",
    //       "popularity": 710.628,
    //       "poster_path": "/voddFVdjUoAtfoZZp2RUmuZILDI.jpg",
    //       "release_date": "2021-12-15",
    //       "title": "스파이더맨: 노 웨이 홈",
    //       "video": false,
    //       "vote_average": 8,
    //       "vote_count": 15834
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/Ach0puWzxuO2imh1yWEUK7CGsx.jpg",
    //       "genre_ids": [
    //         16,
    //         12,
    //         28,
    //         14
    //       ],
    //       "id": 900667,
    //       "original_language": "ja",
    //       "original_title": "ONE PIECE FILM RED",
    //       "overview": "오직 목소리 하나로 전 세계를 사로잡은 디바 ‘우타’.  그녀가 모습을 드러내는 첫 라이브 콘서트가 음악의 섬 ‘엘레지아’에서 열리고  ‘루피’가 이끄는 밀짚모자 해적단과 함께 수많은 ‘우타’ 팬들로 공연장은 가득 찬다.  그리고 이 콘서트를 둘러싼 해적들과 해군들의 수상한 움직임이 시작되는데…  드디어 전세계가 애타게 기다리던 ‘우타’의 등장과 함께 노래가 울려 퍼지고,  그녀가 ‘샹크스의 딸’이라는 충격적인 사실이 드러난다.  ‘루피’, ‘우타’, ‘샹크스’, 세 사람의 과거가 그녀의 노랫소리와 함께 밝혀진다! 여기에서",
    //       "popularity": 614.47,
    //       "poster_path": "/q9Ul66mQDGpAvqUrTZdSMSzym5w.jpg",
    //       "release_date": "2022-08-06",
    //       "title": "원피스 필름 레드",
    //       "video": false,
    //       "vote_average": 7.3,
    //       "vote_count": 176
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/2iGUavwv86Hubv3V5Iq4qEQXDfE.jpg",
    //       "genre_ids": [
    //         18,
    //         53,
    //         27
    //       ],
    //       "id": 848058,
    //       "original_language": "es",
    //       "original_title": "Cerdita",
    //       "overview": "스페인 남부의 여름. 사라는 냉담한 가족들이 경영하는 정육점에 박혀 다른 누군가가 되는 것을 꿈꾼다. 설상가상 다른 여자아이들로부터 지속적인 괴롭힘을 당한다. 어느 날, 강에서 사라는 정체를 알 수 없는 낯선 사람이 사라를 괴롭혔던 아이들을 납치하는 것을 목격한다. 사라가 소리를 질러야 할까?",
    //       "popularity": 603.473,
    //       "poster_path": "/kmCjZjm4CHuuJdwUdn3h93WqDdR.jpg",
    //       "release_date": "2022-10-07",
    //       "title": "피기",
    //       "video": false,
    //       "vote_average": 6.7,
    //       "vote_count": 198
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/ugS5FVfCI3RV0ZwZtBV3HAV75OX.jpg",
    //       "genre_ids": [
    //         16,
    //         878,
    //         28
    //       ],
    //       "id": 610150,
    //       "original_language": "ja",
    //       "original_title": "ドラゴンボール超 スーパーヒーロー",
    //       "overview": "2018년에 개봉한 에 이은  시리즈의 두 번째 영화",
    //       "popularity": 591.02,
    //       "poster_path": "/uohymzBVaIYjbnoQstbnlia6ZPJ.jpg",
    //       "release_date": "2022-06-11",
    //       "title": "드래곤볼 슈퍼: 슈퍼 히어로",
    //       "video": false,
    //       "vote_average": 8,
    //       "vote_count": 2023
    //     },
    //     {
    //       "adult": false,
    //       "backdrop_path": "/aQOWnw3HydsCQZ10O0wvxFOaWc3.jpg",
    //       "genre_ids": [
    //         36,
    //         28,
    //         18
    //       ],
    //       "id": 551271,
    //       "original_language": "en",
    //       "original_title": "Medieval",
    //       "overview": "",
    //       "popularity": 866.404,
    //       "poster_path": "/4njdAkiBdC5LnFApeXSkFQ78GdT.jpg",
    //       "release_date": "2022-09-08",
    //       "title": "미디벌",
    //       "video": false,
    //       "vote_average": 7.2,
    //       "vote_count": 124
    //     }],
    recommendedMovies: [

    ],
    popularMovies: [

    ],
    nowPlayingMovies: [

    ]
  },
  getters: {
  },
  mutations: {
    GET_MOVIES(state, movies) {
      state.recommendedMovies = movies
    }
  },
  actions: {
    getMovies(context) {
      axios({
        method: 'get',
        url: `${API_URL}/movies/`,
      })
        .then((response) => {
          console.log(response.data)
          context.commit('GET_MOVIES', response.data)
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  modules: {
  }
})
