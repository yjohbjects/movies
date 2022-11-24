# README
: 추천 알고리즘을 적용한 영화 커뮤니티 사이트

<br>



## 🚧개발환경

**사용 프로그램**

- Python 3.9.x
- Django 3.2.x
- Node.js 16.x
- Vue 2


##### 사용 아키텍처
- Django REST Framework & Vue


<br>

## ⚙️실행 방법

movies/final-pjt-front

```bash
$ npm install
$ npm install vue-star-rating
$ npm install @egjs/vue-flicking
$ npm run serve
```

movies/final-pjt-back

```bash
$ pip install -r requirements.txt
$ python manage.py migrate
$ python manage.py loaddata movies.json
$ python manage.py runserver
```

<br>

## 👥팀원 정보 및 업무 분담 내역

| 이름   | 역할 | 업무 분담                                                    |
| ------ | ---- | ------------------------------------------------------------ |
| 서형준 | 팀장 | **back-end**<br>* 데이터 모델링(ERD) 설계 및 작성<br> * Database, Django REST API 구현<br>* 영화 추천 알고리즘 구현 |
| 오연진 | 팀원 | **front-end**<br>* Prototype 설계 및 기획<br>* Vue Cli, Axios를 통한 REST API 구현<br>* 서비스 화면 구현 |

<br>

## 📽️서비스 구현

### 목표 서비스 

- `Content Filtering`을 통한 영화 추천 알고리즘

  : 유저가 입력한 평점을 기반으로 `장르`, `배우`, `키워드`에 점수를 부과하여 평점 미입력 영화(시청 전 영화) 중 점수가 높은 영화를 추천하는 방식

### 실제 구현

- 장르 기반 영화 추천 알고리즘

​		: 유저가 입력한 평점을 기반으로, 많이 시청한 `장르`를 확인하여, 해당 장르의 영화를 추천하는 방식

<br>

## 설계

### 데이터 베이스 모델링 (ERD)

`ERD Cloud`를 활용하여 ERD 기획 ([링크](https://www.erdcloud.com/d/TfbqmkLxihr8ASueY))



### 페이지 기획 (Prototype)

`Figma`을 활용하여 페이지 기획 ([링크](https://www.figma.com/file/cpZuSQ5wtZDEU6qTVFxrHr/Movie-Recommender-System?node-id=0%3A1&t=Wk89BkMWo0tixwRE-1))

![](https://ifh.cc/g/87qQCg.jpg)

![](https://ifh.cc/g/RL9ZJA.jpg)



`FigJam`을 활용하여 컴포넌트 구조 기획 ([링크](https://www.figma.com/file/iRok4smD0Om5DWqUuqmqgl/movies-component-structure?node-id=0%3A1&t=Wk89BkMWo0tixwRE-1))

![컴포넌트 구조](https://ifh.cc/g/ZR1ztx.jpg)

## 데이터베이스 모델링 (ERD)

## 영화 추천 알고리즘 (기술적 설명)
## 🍿서비스 대표 기능에 대한 설명

#### Accounts

- 로그인
- 회원가입

#### Movies

- 영화 검색
- 영화 정보 조회
- 영화 평점 입력
- 찜하기 (나중에 볼 영화)

#### Community

- 리뷰 (영화 A에 대해서 user별 1개만 작성 가능)
- 마이페이지
  - 평점 남긴 영화
  - 나중에 볼 영화
  - 리뷰

## 배포 서버 URL (배포했을 경우)
## 기타(느낀점, 후기)

#### 잘한 점

#### 아쉬운점

#### 다음엔?
