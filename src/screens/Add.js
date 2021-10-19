import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation, useApolloClient } from "@apollo/client";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import Footer from "../components/front/Footer";
import Button from "../components/auth/Button";
import Input from "../components/auth/Input";
import styled from "styled-components";

// coffee shop insert mutation
const INSERT_MUTATION = gql`
	mutation createCoffeeShop(
		$name : String!
		$caption : String
		$latitude : String
		$longitude : String
		$file : Upload!
	){
		createCoffeeShop(
			name : $name
			caption : $caption
			latitude : $latitude 
			longitude : $longitude
			file : $file
		){
			id
		}
	}
`;

// body
const AddWrapper = styled.div`
	max-width : 700px;
	min-width : 600px;
	width : 100%;
	display : flex;
	flex-direction : row;
	justify-content : center;
	align-items : center;
	border : 1px solid #E9ECEF;	
	border-radius : 8px;
	margin-top : 20px;
	background-color : white;
	margin-bottom : 20px;
	min-height : 600px;
	padding : 20px;
`;

// add margin prop to Input
const AddInput = styled(Input)`
	margin-bottom : 20px;
`;

// file input 
// https://webdir.tistory.com/435 참고해서 변경하기
const FileInput = styled(Input)`
	margin-bottom : 20px;
`;

// input label
const InputLabel = styled.label`
	font-size : 18px;
	font-weight : bold;	
	margin-bottom : 10px;
`;

// add textarea
const TextArea = styled.textarea`
	width: 100%;
  	border-radius: 3px;
  	padding: 7px;
  	background-color: #fafafa;
	border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};  	
  	box-sizing: border-box;
  	&::placeholder {
    	font-size: 12px;
  	}	
    &:focus {
    	border-color: rgb(38, 38, 38);
  	}
	height : 120px;
	resize : none;
	margin-bottom : 20px;
`;



function Add(){
	const client = useApolloClient();	// oncompleted를 위한 cache 수정
	
	// add 완료 후 페이지 이동을 위해 history 호출
	const history = useHistory();
		
	// useform
	const {register, handleSubmit, errors, formState, getValues, setError, clearErrors} = useForm({
		mode : "onChange"
	});
	
	// completed callback
	const onCompleted = (data) => {
		// get data		
		const { createCoffeeShop } = data;
		
		// cache 업데이트
		if (createCoffeeShop.id) {
			const { cache } = client;
			cache.modify({
				id : "ROOT_QUERY",
				fields : {
					seeCoffeeShops(prev) { 
						return [createCoffeeShop, ...prev]; 
					}, 
				}
			});
			
			// 메인화면으로 이동
			history.push(routes.home);
		}else{
			alert("등록 중 오류가 발생했습니다.")
		}				
	}
	
	// create coffee shop mutation
	const [createCoffeeShop, {loading}] = useMutation(INSERT_MUTATION, {
		onCompleted
	});
	
	// submit valid
	const onSubmitValid = (data) => {
		// 중복 처리 방지
		if(loading){
			return false;
		}	
		
		// 파일 전송 일단 사진 한개만
		const {name, caption, latitude, longitude, file} = getValues();
		let fileObj;
		if(file)	fileObj = file[0];			
		
		
		// mutation 호출
		createCoffeeShop({
			variables : {
				name,
				caption,
				latitude,
				longitude,
				file : fileObj				
			}
		})
	}
	
	return (
		<FrontLayout>
			<PageTitle title="카페 등록"/>
				<AddWrapper>
				<form method="post" enctype="multipart/form-data" onSubmit={handleSubmit(onSubmitValid)}>
					<InputLabel for="nameInput">카페 이름</InputLabel>
					<AddInput 
						ref={register({
							required : "카페 이름을 입력해주세요."
						})}
						name="name"												
						id="nameInput"
						maxlength="100"						
						type="text" 
						placeholder="카페 이름" 
					/>
					<InputLabel for="captionArea">카페 설명</InputLabel>
					<TextArea
						ref = {register({
							required : "설명을 입력해주세요."
						})}
						name="caption"				
						id="captionArea"
					/>					
					<InputLabel for="latitudeInput">위도</InputLabel>
					<AddInput 
						ref= {register}
						type="text" 
						name="latitude"
						id="latitudeInput"
						placeholder="위도" 
					/>
					<InputLabel for="longitudeInput">경도</InputLabel>
					<AddInput 
						ref={register}
						type="text" 
						name="longitude"
						id="longitudeInput"
						placeholder="경도" 
					/>
					<InputLabel for="fileInput">카페 사진</InputLabel>
					<FileInput
						ref={register({
							required : "카페 사진을 한장 이상 올려주세요."
						})}
						type="file" 
						name="file"
						id="fileInput"
					/>
					<Button
						type="submit" 
						value={loading ? "처리중..." : "등록"} 
						disabled={!formState.isValid || loading}  	
					/>
				</form>
			</AddWrapper>
			<Footer/>
		</FrontLayout>		
	);
}

export default Add;