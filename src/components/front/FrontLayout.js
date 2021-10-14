import { useReactiveVar } from "@apollo/client";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faMoon, faSun } from "@fortawesome/free-regular-svg-icons";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import {Link} from "react-router-dom";

// 전체 컨테이너
const Container = styled.div`
	display : flex;	
	justify-content : center;
	align-items : center;
	flex-direction : column;	
`;

// 헤더
const Header = styled.div`	
	width : 100%;	
	display : flex;
	flex-direction : row;
	height : 80px;
	border-bottom : 1px solid gray;
`;

// 헤더 로고 박스 링크로 대체
const LogoBox = styled(Link)`
	width : 60%;	
	display : flex;
	flex-direction : row;
	padding-left : 20px;
	align-items : center;
	text-decoration : none;
	color : black;
`

// 헤더 버튼 박스
const TopBtnBox = styled.div`
	position : relative;
	width : 40%;
	display : flex;
	flex-direction : row;
	align-items : left;
	padding-right : 20px;
`;

// 상단 로고 타이틀
const Title = styled.h1`
	font-weight:bold;
	font-size:20px;
	line-height:42px;
	margin-left:15px;
	margin-right:15px;
`;

function FrontLayout({children}){
	return (
		<Container>
			<Header>				
					<LogoBox to="/">
						<FontAwesomeIcon icon={faCoffee} size="3x"/>
						<Title>
							NomadCoffee
						</Title>					
						<input type="text" placeholder="검색창" />
					</LogoBox>
				
				<TopBtnBox>
					<button>다크모드</button>
					<button>프로필</button>
					<Link to="/add">글쓰기</Link>
				</TopBtnBox>				
			</Header>			
			{children}			
		</Container>
	)
};

export default FrontLayout;

