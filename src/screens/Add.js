import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
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

// input label
const InputLabel = styled.label`
	font-size : 18px;
	font-weight : bold;
	margin-top: 15px;
`;

// add textarea
const TextArea = styled.textarea`
	width: 100%;
  border-radius: 3px;
  padding: 7px;
  background-color: #fafafa;
	border: 0.5px solid
    ${(props) => (props.hasError ? "tomato" : props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }	
    &:focus {
    border-color: rgb(38, 38, 38);
  }
height : 120px;
resize : none;
`;

function Add(){
	// add 완료 후 페이지 이동을 위해 history 호출
	const history = useHistory();
		
	// useform
	const {register, handleSubmit, errors, formState, getValues, setError, clearErrors} = useForm({
		mode : "onChange"
	});
	
	// completed callback
	const onCompleted = (data) => {
		// get data
		const {createCoffeeShop : {id}} = data;
		if(!id){
			alert("error");
		}
		
		history.push(routes.home);
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
					<Input 
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
					<Input 
						ref= {register}
						type="text" 
						name="latitude"
						id="latitudeInput"
						placeholder="위도" 
					/>
					<InputLabel for="longitudeInput">경도</InputLabel>
					<Input 
						ref={register}
						type="text" 
						name="longitude"
						id="longitudeInput"
						placeholder="경도" 
					/>
					<InputLabel for="fileInput">카페 사진</InputLabel>
					<input 
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