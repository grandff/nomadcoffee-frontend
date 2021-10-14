import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import { useForm } from "react-hook-form";
import { gql, useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";
import routes from "../routes";

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
`

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
				<div>
				<form method="post" enctype="multipart/form-data" onSubmit={handleSubmit(onSubmitValid)}>
					<input 
						ref={register({
							required : "카페 이름을 입력해주세요."
						})}
						name="name"												
						maxlength="100"						
						type="text" 
						placeholder="카페 이름" 
					/>
					<textarea
						ref = {register({
							required : "설명을 입력해주세요."
						})}
						name="caption"						
					/>					
					<input 
						ref= {register}
						type="text" 
						name="latitude"
						placeholder="위도" 
					/>
					<input 
						ref={register}
						type="text" 
						name="longitude"
						placeholder="경도" 
					/>
					<input 
						ref={register({
							required : "카페 사진을 한장 이상 올려주세요."
						})}
						type="file" 
						name="file"
					/>
					<input 
						type="submit" 						
						value={loading ? "처리중..." : "등록"} 
						disabled={!formState.isValid || loading}   
					/>
				</form>
			</div>
		</FrontLayout>		
	);
}

export default Add;