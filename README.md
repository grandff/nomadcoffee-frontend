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


## 08 Admin Panel(login, signup)
### 공통 
1) Ui 디자인 코딩
	- fontawesome 에서 적당히 조합해서 하나 만들기
	- 공통으로 쓰는 모듈 추가해놓기
		-> components/auth에 추가
		-> layout, input, button, form, separator 등 추가
	- styled를 활용해 ui component 사용
		-> shared 파일에 base가 되는 component 별도 저장
2) 페이지 이동 시 Link 태그 사용
	- react-router-dom
3) 페이지 이동 정보가 담긴 routes.js 생성
4) 입력 데이터는 필수값 확인, 데이터형태 체크 등을 위해 prop-types 사용
	- npm install prop-types(이거 안해도 됐던걸로 기억이 남?)
5) 페이지 타이틀을 각 스크린마다 적용하기 위한 모듈 사용(10.6 강의 참고)
	- App.js에 HelmetProvider 적용(react-helmet-async)
	- ThemeProvider 상위에 감싸주면 됨
	- 각 스크린 별 이름을 알 수 있도록 PageTitle.js 생성
		-> 상단에 title 설정한대로 바껴야 정상임
6) 파라미터 부족, 입력값 비정상 등 오류 처리를 위한 formerror 파일 추가
	- 에러가 난 경우 빨간색으로 강조하기 위한 시각적 효과 추가
### Apollo
1) apollo client 연동
	- ApolloProvider 선언 후 Helmet 상위로 감싸기
	- props로 apollo.js에 설정한 client 변수 전달
2) 로그인 토큰값 저장을 위한 localStorage 사용
	- getItem, setItem을 사용해 토큰 저장
### Login
1) 공통 디자인 모듈을 사용해 화면 코딩
2) form 입력 처리를 위한 react-hook-form 사용
	- split get 에러 난다면 버전을 6.15.1 로 낮추고 진행
	- validate mode는 onchange로 처리(더 자세한건 docs 참고)
	- register prop으로 ref 등록
3) mutation 연결
	- apollo/client의 gql, useMutation 사용
	- react hook form의 getValues, setError, clearErrors 사용
	- submitvalid -> usemutation -> oncompleted 순으로 프로세스 진행
4) 로그인 성공시 토큰값 저장
5) 회원가입 완료 시 username, password 파라미터를 받기 위해 useLocation 사용
### Sign Up
1) 공통 디자인 모듈을 사용해 화면 코딩
2) form 입력 처리를 위한 react-hook-form 사용
	- login과 동일
3) mutation 연결
4) 회원가입 후 페이지 이동을 위해 useHistory 사용
	- react-router-dom 사용
	- callback에서 history.push로 이동
	- login 화면에서 바로 사용할 수 있도록 username과 password 전송
### Dark Mode
1) token 설정 처럼 apollo.js 에서 다크모드 var 설정
	- localStorage 사용
2) AuthLayout 에 다크모드 설정 추가
	- 추후 다 추가할듯?
	

## 09 CRUD in web
### 공통
1) 자주 쓰는 쿼리 컬럼을 모아놓은 fragments js 생성
2) token을 백엔드로 보내줄수 있도록 apollo 추가 코딩 필요
	- backend 접근 uri인 httplink과 토큰 정보를 포함한 헤더 정보인 authlink 별도로 분리하기
	- 파일을 업로드 할 수 있도록 apollo upload client 설치(npm install apollo-upload-client)
	- 두 링크 별도로 만든 후 concat을 통해 합쳐서 서버에 전송
### Home
1) 모든 coffeeshop 정보를 볼 수 있도록 구현
	- seeCoffeeShops query 추가
2) 메인 화면 구성은 당근마켓 벤치마킹
	- react-window 사용 (npm install react-window) -> 이거 못쓰겠다..
3) 각 div는 board 파일로 구성
### Add (insert)
1) /add route 추가해서 등록 페이지 생성
2) create coffee shop mutation 등록
3) 파일 등록 후 메인 화면으로 이동
### 상세페이지
1) Home에서 id를 통해 상세 페이지 이동
2) useparams를 통해 전달받은 id 값으로 상세 보기 쿼리 돌리기
	- string, int 매개변수 형태 다시 한번 확인하기
3) 수정 시 EditPage로 이동
	- 수정은 일단 form만 만들어놓기 (파일 테스트가 좀 까다로울듯..?)
	- 아직 연결 안해놨음!!
4) 삭제 시 mutation 호출
	- delete mutation 추가하기
	- delete 완료 후 메인화면으로 이동
	- 추후 마스터 권한을 가진 계정만 할 수 있도록 해야함
	
## 10 Deploy
### netlify
1) github 연결해서 deploy하기
2) public 폴더에 _redirects 파일 생성하고 여기에 router 정보 입력
3) node_env의 프로덕션 모드에 따른 uri 설정을 apollo.js 에 코딩