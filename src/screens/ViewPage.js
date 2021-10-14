import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import {SHOP_FRAGMENT, USER_FRAGMENT, PHOTO_FRAGMENT, CATEGORY_FRAGMENT} from "../fragments";
import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import {Link} from "react-router-dom";

// see coffee shop
const SEE_QUERY = gql`
	query seeCoffeeShop($id : Int!){
		seeCoffeeShop(id : $id){
			...ShopFragment
			user{
				...UserFragment				
			}			
			photos{
				...PhotoFragment				
			}
			categories{
				...CategoryFragment				
			}
		}
	}
	${SHOP_FRAGMENT}
	${USER_FRAGMENT}
	${PHOTO_FRAGMENT}
	${CATEGORY_FRAGMENT}
`;

// delte coffee shop
const DELETE_MUTATION = gql`
	mutation deleteCoffeeShop($id : Int!){
		deleteCoffeeShop(id : $id){
			ok
			error
		}
	}
`;

// 전체 컨테이너
const ViewContainer = styled.div`
	display : flex;
	height : 800px;
	justify-content : center;
	align-items : center;
	flex-direction : column;
	min-width : 600px;
	max-width : 800px;
`;

// 사용자 정보 컨테이너
const UserContainer = styled.div`
	
`;

// 카페 사진
const CafeImage = styled.img`
	min-width : 100%;
	max-width : 100%;
`;

// 작성자 정보
const UserName = styled.div``;

// 작성자 아바타
const UserAvater = styled.div``;

// 줄긋는 영역
const GubunArea = styled.div``;

// 게시글 컨테이너
const ShopContainer = styled.div`
	
`;

// 제목 
const TitleDiv = styled.div``;

// 카테고리 및 올린날짜
const CategoryDiv = styled.div``;

// 내용
const CtxDiv = styled.div``;

// 버튼 컨테이너
const BtnContainer = styled.div``;

// 수정 버튼
const EditBtn = styled.button``;

// 삭제 버튼
const DelBtn = styled.button`
	color : white;
	background-color : tomato;
	width : 75px;
	height : 25px;
`;

// 목록 버튼
const ListBtn = styled.button``;

function ViewPage(){	
	const history = useHistory();	// 삭제 후 페이지 이동을 위해 history 호출		
	const { id : getId } = useParams();		// home에서 전달받은 coffeeshop id
	
	// see coffee shop
	const { data, loading } = useQuery(SEE_QUERY, {
		variables : {
			id : (getId * 1)
		}
	});	
	
	// 상단 페이지 타이틀
	const pageTitle = data?.seeCoffeeShop?.name === "undefined" ? "카페 정보" : data?.seeCoffeeShop?.name;
	
	// delete mutation callback
	const updateDeleteShop = (cache, result) => {
		const { data : {deleteCoffeeShop : {ok, error}}} = result;
		
		if(!ok){
			alert(`${error}`);
		}else{
			// cache로부터 생성된 object 삭제를 위한 메서드로 evict사용
			cache.evict({id : `CoffeeShop:${getId}`});				
			alert("정상적으로 삭제됐습니다.");
			history.push(routes.home);
		}
	}
	
	// delete mutation
	const [deleteShopMutation, {loading : deleteLoading}] = useMutation(DELETE_MUTATION,{
		variables : {
			id : (getId * 1),
		},
		update : updateDeleteShop
	});
			
	// 삭제 이벤트
	const deleteData = () => {
		if(deleteLoading)	return false;							
		if(window.confirm("정말 해당 글을 삭제하시겠습니까?"))	deleteShopMutation();					
	}
	
	return (
		<FrontLayout>
			<PageTitle title={pageTitle} />
			<ViewContainer>
				<UserContainer>
					{data?.seeCoffeeShop?.photos.map((photo) => <CafeImage src={photo.url} />)}
					<UserAvater>아바타 사진</UserAvater>
					<UserName>{data?.seeCoffeeShop?.user.username}</UserName>					
				</UserContainer>				
				<GubunArea></GubunArea>
				<ShopContainer>
					<TitleDiv>{data?.seeCoffeeShop?.name}</TitleDiv>
					<CategoryDiv>
						카테고리 들어갈 영역
						{data?.seeCoffeeShop?.createdAt}						
					</CategoryDiv>
					<CtxDiv>
						{data?.seeCoffeeShop?.caption}
					</CtxDiv>
				</ShopContainer>
				<BtnContainer>
					<Link to = {`/edit/${getId}`}>
						수정
					</Link>
					<DelBtn onClick={deleteData}>삭제</DelBtn>
					<ListBtn>목록</ListBtn>
				</BtnContainer>
			</ViewContainer>						
		</FrontLayout>
		
	)
}

export default ViewPage;