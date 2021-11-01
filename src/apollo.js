import { ApolloClient, InMemoryCache, makeVar } from "@apollo/client";
import { offsetLimitPagination } from "@apollo/client/utilities";
import { createUploadLink } from "apollo-upload-client";
import {setContext} from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";

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

// 에러 발생시 확인하는 링크
const onErrorLink = onError(({ graphQLErros, networkError }) => {
  if (graphQLErros) {
    // graphql error 발생 시
    console.log("GraphQL Error", graphQLErros);
  }

  if (networkError) {
    // network error 발생 시
    console.log("Network Error", networkError);
  }
});

// file 까지 포함한 backend 연결 url
const uploadHttpLink = createUploadLink({	
	uri : process.env.NODE_ENV === "production" ? "https://nomadcoffee-backend-kjm.herokuapp.com/graphql" : "https://instaclone-graphql.run.goorm.io/graphql"
	//uri : "https://nomadcoffee-backend-kjm.herokuapp.com/graphql",
	//uri : "https://instaclone-graphql.run.goorm.io/graphql",	
});

// 토큰 정보 
const authLink = setContext((_, {headers}) => {
	return {
		headers : {
			...headers,
			token : localStorage.getItem(TOKEN)
		}
	}
});

// merge 처리한 캐시
// cache persist 기능을 구현하기 위해 cache를 expot 처리 해주는 것도
export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        seeCoffeeShops: offsetLimitPagination(),
      },
    },
  },
});

// apollo client 연결
export const client = new ApolloClient({	
	link : authLink.concat(onErrorLink).concat(uploadHttpLink),
	cache,
});