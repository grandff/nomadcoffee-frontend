import { useReactiveVar } from "@apollo/client";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import { faMoon, faSun, faUserCircle } from "@fortawesome/free-regular-svg-icons";
import { darkModeVar, disableDarkMode, enableDarkMode } from "../../apollo";
import {Link} from "react-router-dom";
import Header from "./Header";
import LogoBox from "./LogoBox";
import HeaderBtn from "./HeaderBtn";
import HeaderCircle from "./HeaderCircle";
import SearchInput from "./SearchInput";
import useUser from "../../hooks/useUser";

// 전체 컨테이너
const Container = styled.div`
	display : flex;	
	justify-content : center;
	align-items : center;
	flex-direction : column;	
	background-color : #f8f9fa;
`;

// 헤더 버튼 박스
const TopBtnBox = styled.div`
	position : relative;
	width : 40%;
	display : flex;
	flex-direction : row;
	justify-content : right;	
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
	const {data : userData} = useUser();		// 사용자 정보
	
	return (
		<Container>
			<Header>				
				<LogoBox to="/">
					<FontAwesomeIcon icon={faCoffee} size="3x"/>
					<Title>
						NomadCoffee
					</Title>		
				</LogoBox>	
				<SearchInput 
					type="text"
					maxlength="50"
					placeholder="카페 이름을 검색해보세요!"
				/>		
				<TopBtnBox>	
					{userData?.me?.avatarUrl === null ? "얍얍" : (
						<FontAwesomeIcon icon={faUserCircle} size="3x" />
					)}					
					<HeaderBtn to="/add">
						글쓰기						
					</HeaderBtn>					
				</TopBtnBox>				
			</Header>			
			{children}			
		</Container>
	)
};

export default FrontLayout;

