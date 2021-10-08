import {useState} from "react";
import styled, {css} from "styled-components";
import {isLoggedInVar, darkModeVar } from "../apollo";

// 상단 로고 헤더
const Title = styled.h1``;

// 전체 컨테이너
const Container = styled.div``;

function Login(){
	return (
		<Container>
			<Title>Login</Title>			
		</Container>		
	);
}

export default Login;