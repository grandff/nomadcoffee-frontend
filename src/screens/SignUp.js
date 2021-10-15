import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";
import AuthLayout from "../components/auth/AuthLayout";
import BottomBox from "../components/auth/BottomBox";
import Button from "../components/auth/Button";
import FormBox from "../components/auth/FormBox";
import Input from "../components/auth/Input";
import Select from "../components/auth/Select";
import { FatLink } from "../components/shared";
import routes from "../routes";
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import FormError from "../components/auth/FormError";

// 회원가입 mutation
const SIGNUP_MUTATION = gql`
	mutation createAccount(
		$username : String!
		$email : String!
		$name : String!
		$location : String!
		$password : String!
	){
		createAccount(
			username : $username
			email : $email
			name : $name
			location : $location
			password : $password
		){
			ok
			error
		}
	}
`;

// 상단 로고 컨테이너
const LogoBox = styled.div`
	display : flex;
	flex-direction: column;
  	align-items: center;
`;

// 상단 회원가입 안내 
const Subtitle = styled(FatLink)`
  font-size: 16px;
  text-align: center;
  margin-top: 10px;
`;

function SignUp(){
	// signup 완료 후 페이지 이동을 위해 history 호출
	const history = useHistory();
	
	// signup react hook form
	const {register, handleSubmit, errors, formState, getValues, setError, clearErrors} = useForm({
		mode : "onChange"
	});
	
	// signup callback
	const onCompleted = (data) => {
		// get data
		const { createAccount : {ok, error}} = data;
		
		// 오류발생시 확인
		if(!ok){
			return setError("result", {
				message : error
			});
		}
		
		// login 으로 이동
		const {username, password} = getValues();		
		history.push(routes.home, {
			message : "회원가입에 성공했습니다. 로그인해주세요.",
			username,
			password
		});
	}
	
	// signup mutation
	const [createAccount, {loading}] = useMutation(SIGNUP_MUTATION, {
		onCompleted
	});
	
	// form submit validate
	const onSubmitValid = (data) => {
		// 중복처리 방지
		if(loading) {
			return false;
		}
		
		// 비밀번호 입력값 확인
		const {password, rePassword} = getValues();
		if(password !== rePassword){
			return setError("password", {
				message : "비밀번호를 다시 확인해주세요."
			});
		}
		
		// mutation call
		createAccount({
			variables : {
				...data
			}
		})
	}
	
	// input값 입력시 result error 삭제 처리
	const clearSignUpError = () => {
		clearErrors("result");
		clearErrors("password");
	}
	
	return (
		<AuthLayout>
			<PageTitle title="회원가입"/>
			<FormBox>
				<LogoBox>
					<FontAwesomeIcon icon={faCoffee} size="3x"/>
					<Subtitle>
						나만의 카페를 홍보하고<br/>새로운 곳을 찾아보세요.
					</Subtitle>
				</LogoBox>
				<form onSubmit={handleSubmit(onSubmitValid)}>
					<Input 
						ref={register({
							required : "아이디를 입력해주세요.",
							minLength: {
								value : 3,
								message : "최소 3글자 이상 입력해주세요."
							},
						})}
						name="username"
						type="text" 
						onChange={clearSignUpError}
						maxlength="100"
						placeholder="아이디" 
					/>
					<Input 
						ref={register({
							required : "이메일을 입력해주세요."
						})}
						name="email"
						onChange={clearSignUpError}
						maxlength="50"
						type="text" 
						placeholder="이메일" 
					/>
					<Input 
						ref={register({
							required : "이름을 입력해주세요."
						})}
						onChange={clearSignUpError}
						maxlength="10"
						name="name"
						type="text" 
						placeholder="이름" 
					/>
					<Select
						ref={register({
							required : "지역을 선택해주세요."
						})}	
						onChange={clearSignUpError}						
						name="location"
					>
						<option value="">선택</option>
						<option value="서울">서울</option>
						<option value="대구">대구</option>
						<option value="광주">광주</option>
						<option value="대전">대전</option>
						<option value="부산">부산</option>
						<option value="울산">울산</option>
						<option value="전남">전남</option>
						<option value="전북">전북</option>
						<option value="강원">강원</option>
						<option value="충청">충청</option>
						<option value="제주">제주</option>
					</Select>					
					<Input 
						ref={register({
							required : "비밀번호를 입력해주세요.",
							minlength : {
								value : 6,
								message : "최소 6글자 이상 입력해주세요."
							}
						})}
						onChange={clearSignUpError}
						maxlength="20"
						name="password"
						type="password" 
						placeholder="비밀번호" 
					/>
					<Input 
						ref={register({
							required : "비밀번호를 다시 입력해주세요."
						})}
						onChange={clearSignUpError}
						maxlength="20"
						name="rePassword"
						type="password" 
						onChange={() => clearErrors("password")}
						placeholder="비밀번호 확인" 
					/>
					<FormError message={errors?.password?.message} />
					<Button 
						type="submit" 
						value={loading ? "처리중..." : "회원가입"} 
						disabled={!formState.isValid || loading}   
					/>
					<FormError message={errors?.result?.message} />
				</form>
			</FormBox>
			<BottomBox cta="이미 계정이 있으신가요?" linkText="로그인" link={routes.home} />
		</AuthLayout>
	)
}

export default SignUp;