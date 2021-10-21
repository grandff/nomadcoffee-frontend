import { useParams } from "react-router-dom";
import { gql, useQuery, useMutation } from "@apollo/client";
import styled from "styled-components";
import {SHOP_FRAGMENT, USER_FRAGMENT, PHOTO_FRAGMENT, CATEGORY_FRAGMENT} from "../fragments";
import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import { useHistory } from "react-router-dom";
import routes from "../routes";
import {Link} from "react-router-dom";
import Footer from "../components/front/Footer";
import Wrapper from "../components/front/Wrapper";
import BoardBtn from "../components/feed/BoardBtn";


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
	width : 100%;
	border : 1px solid #E9ECEF;	
	border-radius : 8px;
	margin-top : 20px;
	background-color : white;
	margin-bottom : 20px;
	min-height : 600px;
	padding : 20px;
`;

// 사용자 정보 컨테이너
const UserContainer = styled.div`
	width : 100%;
	display : flex;
	margin-top : 20px;
`;

// 이름, 지역만 들어가는 서브 컨테이너
const UserSubContainer = styled.div`
	margin-left : 15px;
	display : grid;
	grid-gap : 12px;
`;

// 카페 사진
const CafeImage = styled.img`
	min-width : 100%;
	max-width : 100%;
`;

// 작성자 정보
const UserName = styled.div`
	font-size : 15px;
	font-weight : 600;
`;

// 작성자 지역
const UserLocation = styled.div`
	font-size : 13px;
`;

// 작성자 아바타 ?
const UserImg = styled.img`
	width : 40px;
	height : 40px;
`;

// 게시글 컨테이너
const ShopContainer = styled.div`
	width : 100%;
`;

// 제목 
const TitleDiv = styled.div`
	font-weight : 600;
	font-size : 20px;
`;

// 카테고리 및 올린날짜
const CategoryDiv = styled.div`
	color : #868E96;
	font-size : 13px;
`;

// 내용
const CtxDiv = styled.div`
	margin-top : 16px;
	margin-bottom : 16px;
	font-size : 17px;
`;

// 버튼 컨테이너
const BtnContainer = styled.div`
	width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
`;

// 삭제 버튼
const DelBtn = styled.button`
	border: none;
  	border-radius: 4px;  
	background-color : tomato;
  	color: white;
  	text-align: center;
  	padding: 8px 0px;
  	font-weight: 600;  
  	width :80px;
  	height : 35px;
  	display : flex;
  	align-items : center;
  	justify-content : center;  	
  	font-size : 16px;
	margin-right : 10px;	
`;

// 구분선
const Separator = styled.div`
  margin: 20px 0px 20px 0px;
  text-transform: uppercase;
  display: flex;
  justify-content: center;
  width: 100%;
  align-items: center;
  div {
    width: 100%;
    height: 1px;
    background-color: ${(props) => props.theme.borderColor};
  }
  span {
    margin: 0px 10px;
    font-weight: 600;
	font-size: 12px;
    color: #8e8e8e;
  }	
`;

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
				{data?.seeCoffeeShop?.photos.map((photo) => <CafeImage src={photo.url} />)}
				<UserContainer>			
					{data?.seeCoffeeShop?.user.avatarURL === null ? 
						<UserImg src= {process.env.PUBLIC_URL + "/images/user.png"} alt="사람모양" /> : 
						<UserImg src = {data?.seeCoffeeShop?.user.avatarUrl} alt="아바타사진" />
					}
					<UserSubContainer>
						<UserName>{data?.seeCoffeeShop?.user.username}</UserName>		
						<UserLocation>{data?.seeCoffeeShop?.user.location}</UserLocation>
					</UserSubContainer>
				</UserContainer>				
				<Separator>	
					<div></div>
				</Separator>
				<ShopContainer>
					<TitleDiv>
						{data?.seeCoffeeShop?.name}
					</TitleDiv>
					<CategoryDiv>
						카테고리 들어갈 영역
						{data?.seeCoffeeShop?.createdAt}						
					</CategoryDiv>
					<CtxDiv>
						{data?.seeCoffeeShop?.caption}
					</CtxDiv>
				</ShopContainer>
				<BtnContainer>
					<BoardBtn
						cta = "수정"
						color = "blue"
						link = {`/edit/${getId}`}
					/>					
					<DelBtn onClick={deleteData}>삭제</DelBtn>
					<BoardBtn
						cta = "목록"
						color = "gray"
						link = {`/`}
					/>						
				</BtnContainer>
			</ViewContainer>	
			<Footer/>
		</FrontLayout>
		
	)
}

export default ViewPage;