import {createGlobalStyle} from "styled-components";
import reset from "styled-reset";

// 기본 테마
export const lightTheme = {
	bgColor: "#FAFAFA", 
	fontColor: "rgb(38, 38, 38)",		
	accent : "#a47c6d",
  	borderColor: "rgb(219, 219, 219)",
};

// 다크 테마
export const darkTheme = {
	fontColor : "white",
	bgColor : "#000",
}

// 기본 스타일
export const GlobalStyles = createGlobalStyle`
	${reset}
	input {
		all : unset;
	}
	* {
		box-sizing : border-box;
	}
	body {
		background-color: ${(props) => props.theme.bgColor};
		color : ${(props) => props.theme.fontColor};
		font-size:14px;
        font-family:'Open Sans', sans-serif;		
	}
	a {
		text-decoration : none;
	}
`