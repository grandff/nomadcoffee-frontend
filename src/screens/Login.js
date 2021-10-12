import {useState} from "react";
import styled, {css} from "styled-components";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import {faGithub} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {isLoggedInVar, darkModeVar, logUserIn } from "../apollo";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Separator from "../components/auth/Separator";
import PageTitle from "../components/PageTitle";
import routes from "../routes";
import { useForm } from "react-hook-form";
import FormError from "../components/auth/FormError";
import { gql, useMutation } from "@apollo/client";
import { useLocation } from "react-router-dom";

// 로그인 mutation
const LOGIN_MUTATION = gql`
	mutation login($username : String!, $password : String!) {
		login(username : $username, password : $password){
			ok
			error
			token
		}
	}
`

// 상단 로고 컨테이너
const LogoBox = styled.div`
	display : flex;	
	flex-direction: column;
  	align-items: center;
`;

// 상단 로고 타이틀
const Title = styled.h1`
	font-weight:bold;
	font-size:20px;
	line-height:42px;
	margin-left:10px;
`;

// 로그인 버튼 div 뭔가 깃허브로 로그인하는 거일 듯?
const GitHubDiv = styled.div`
  color: #385285;
  span {
    margin-left: 10px;
    font-weight: 600;
  }	
`;

// signup 에서 전달받은 notification 
const Notification = styled.div`
	color: #2ecc71;
`;

function Login(){	
	// location.state 안에 signup에서 보낸 변수들이 있음
	const location = useLocation();
	
	// login react hook form
	const {register, handleSubmit, errors, formState, getValues, setError, clearErrors} = useForm({
		mode : "onChange",
		defaultValues : {	// signup을 통해 전달받은 값이 없으면 빈값
			username : location?.state?.username || "",
			password : location?.state?.password || "",
		}
	});
	
	// login mutation call back
	const onCompleted = (data) => {
		// get return values
		const {login : {ok, error, token}} = data; 
		
		// ok에 따른 분기 처리
		if(!ok){
			return setError("result", {
				message : error
			});
		}		
		
		// 토큰 설정
		logUserIn(token);
	}
	
	// login mutation
	const [login, {loading}] = useMutation(LOGIN_MUTATION, {
		onCompleted
	});		
	
	// submit valid event
	const onSubmitValid = (data) => {
		// 중복 체크 방지
		if(loading){
			return false;
		}
		
		// mutation 호출
		const {username, password} = getValues();
		login({
			variables : {username, password}
		})
	}
	
	// input값 입력시 result error 삭제 처리
	const clearLoginError = () => {
		clearErrors("result");
	}
		
	return (
		<AuthLayout>
			<PageTitle title="로그인"/>
			<FormBox>
				<LogoBox>
					<FontAwesomeIcon icon={faCoffee} size="3x"/>
					<Title>
						NomadCoffee
					</Title>
				</LogoBox>
				<Notification>{location?.state?.message}</Notification>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<Input
						ref={register({
							required: "아이디를 입력해주세요.",
							minLength: {
								value : 5,
								message : "최소 5글자 이상 입력해주세요."
							},
						})}
						name="username"
						type="text"
						maxlength="30"
						placeholder="아이디"
						onChange={clearLoginError}
						hasError={Boolean(errors?.username?.message)}
					/>
					<FormError message={errors?.username?.message} />
					<Input 
						ref={register({
							required : "비밀번호를 입력해주세요.",
						})}
						name="password"
						type="password"
						maxlength="30"
						placeholder="비밀번호" 
						onChange={clearLoginError}
						hasError={Boolean(errors?.password?.message)}
					/>
					<FormError message={errors?.password?.message} />
					<Button 
						type="submit" 
						value={loading ? "로그인 중..." : "로그인"} 
						disabled={!formState.isValid || loading}  
					/>
					<FormError message={errors?.result?.message} />
				</form>
				<Separator />
				<GitHubDiv>
					<FontAwesomeIcon icon={faGithub} />
					<span>Github 계정으로 로그인</span>
				</GitHubDiv>
			</FormBox>
			<BottomBox
				cta="아직 계정이 없으신가요?"
				linkText="회원가입"
				link={routes.signUp}
			/>
		</AuthLayout>			
	);
}

export default Login;