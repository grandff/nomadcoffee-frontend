import {makeVar} from "@apollo/client";

export const isLoggedInVar = makeVar(false);		// 로그인
export const darkModeVar = makeVar(false);			// 다크모드 유무