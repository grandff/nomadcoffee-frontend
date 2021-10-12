import { useReactiveVar } from "@apollo/client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";

// 전체 컨테이너
const Container = styled.div`
	display : flex;
	height : 100vh;
	justify-content : center;
	align-items : center;
	flex-direction : column;
`;

// 컨테이너 안의 로그인 폼 박스
const Wrapper = styled.div`
	max-width : 300px;
	width : 100%;
`;

// 하단 푸터
const Footer = styled.footer` 
	margin-top: 20px;
`;

// 다크모드 설정 버튼
const DarkModeBtn = styled.span` 
	cursor: pointer;
`;


/*
	전체 컨테이너 서순
	Container > Wrapper > TopBox, BottomBox
*/
function AuthLayout({children}) {
	// 다크모드 설정 var
	const darkMode = useReactiveVar(darkModeVar);
	return (
		<Container>
			<Wrapper>
				{children}
			</Wrapper>
			<Footer>
				<DarkModeBtn onClick={darkMode ? disableDarkMode : enableDarkMode}> 
					<FontAwesomeIcon icon={darkMode ? faSun : faMoon} /> 
				</DarkModeBtn>
			</Footer>
		</Container>
	)
}

export default AuthLayout;