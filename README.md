# Instaclone Challenge - Nomad Coffee frontend

## 07 Setup
### react app
1) npx create-react-app nomadcoffee-frontend
### install all
1) apollo client 설치
	- npm install @apollo/client
2) graphql 설치
	- npm install graphql
3) fortawesome 설치 모음
	- npm install --save @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome @fortawesome/free-brands-svg-icons @fortawesome/free-regular-svg-icons
	- npm install --save @fortawesome/fontawesome-svg-core
	- npm install --save @fortawesome/free-solid-svg-icons
	- npm install --save @fortawesome/react-fontawesome
	- npm install --save @fortawesome/free-brands-svg-icons
	- npm install --save @fortawesome/free-regular-svg-icons
4) react helmet async
	- npm install react-helmet-async
5) react hook form
	- npm install react-hook-form
6) react router dom
	- npm install react-router-dom
7) styled components
	- npm install styled-components
8) styled reset
	- npm install styled-reset
### Router 설정
1) 메인, 로그인, 404에 해당하는 화면 만들기
2) App에 BrowserRouter를 사용해서 기본 router 설정
	- switch 태그는 한번에 하나의 router만 render 시켜줌
	- exact prop은 path의 값과 정확히 일치하는 것만 리턴해줌
	- browserRouter는 해시태그가 안붙음
3) path, exact prop을 사용해서 404 에러 처리
	- redirect to 를 사용할 수도 있음
### Reactive Variables 추가
1) 로그인 유무에 따라 메인, 로그인 화면 분기 처리
	- 로그인 변수 추가
	- apollo client의 useReactiveVar 사용
	- client 변수들을 모아놓는 apollo 파일 생성
2) 다크모드를 설정할 수 있는 변수 추가
### styled components 적용
1) 로그인 화면에 styled components를 적용해서 프론트 화면 코딩
2) 다크모드 적용을 위해 App.js에 ThemeProvider 적용
### Global styles 적용
1) 공통으로 적용되는 global style 추가(App.js)
2) 공통 css 파일인 styles.js 추가