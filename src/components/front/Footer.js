import styled from "styled-components";
import {logUserOut, darkModeVar, disableDarkMode, enableDarkMode} from "../../apollo"
import {Link} from "react-router-dom";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// 푸터
const SFooter = styled.div`
	width : 100%;
	background-color : #495057;	
    display: flex;
    flex-direction: row;
    justify-content: center;
    padding-top: 53px;
    padding-bottom: 53px;
	color : white;
	font-size: 16px;
    font-weight: 700;
	a {
		text-decoration : none;
		color : white;
		margin-right : 20px;
	}			
	span {
		margin-right : 20px;
	}
	bottom : 0;
`;

// 다크모드 버튼
// 다크모드 설정 버튼
const DarkModeBtn = styled.span` 
	cursor: pointer;
`;

// 로그아웃 버튼
const LogoutBtn = styled.button`
  border: none;
  border-radius: 4px;  
  background-color: tomato;
  color: white;
  text-align: center;  
  font-weight: 600;  
  width :74px;  
  display : flex;
  align-items : center;
  justify-content : center;
`;



function Footer(){
	// 다크모드 설정 var
	const darkMode = useReactiveVar(darkModeVar);
	
	return (
		<SFooter>
			<Link to="/">소개</Link>
			<Link to="/">이용약관</Link>
			<DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}> 
				<FontAwesomeIcon icon={darkMode ? faSun : faMoon} /> 
			</DarkModeBtn>	
			<LogoutBtn onClick={logUserOut}>로그아웃</LogoutBtn>			
		</SFooter>
	)
}

export default Footer;