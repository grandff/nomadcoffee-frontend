import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

// 기본 테마
export const lightTheme = {
	fontColor : "black",
	bgColor : "white",
};

// 다크 테마
export const darkTheme = {
	fontColor : "lightgray",
	bgColor : "#2c2c2c",
}

// 기본 스타일
export const GlobalStyles = createGlobalStyle`
	${reset}
	body {
		background-color: ${(props) => props.theme.bgColor};
		color : ${(props) => props.theme.fontColor};
	}
`