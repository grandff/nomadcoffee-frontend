import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";

const TOKEN = "TOKEN";	// 로그인 토큰 
const DARK_MODE = "DARK_MODE";	// 다크모드

export const isLoggedInVar = makeVar(Boolean(localStorage.getItem(TOKEN)));		// 로그인
export const darkModeVar = makeVar(Boolean(localStorage.getItem(DARK_MODE)));	// 다크모드 유무

// 로그인
export const logUserIn = (token) => {
	localStorage.setItem(TOKEN, token);
	isLoggedInVar(true);
}

// 로그아웃
export const logUserOut = () => {
	localStorage.removeItem(TOKEN);
	window.location.reload();	
}

// 다크모드 on
export const enableDarkMode = () => {
	localStorage.setItem(DARK_MODE, "enabled");
	darkModeVar(true);
}

// 다크모드 off
export const disableDarkMode = () => {
	localStorage.removeItem(DARK_MODE);
	darkModeVar(false);
}

// apollo client 연결
export const client = new ApolloClient({
	uri : "https://nomadcoffee-backend-kjm.herokuapp.com/graphql",
	cache: new InMemoryCache(),
})