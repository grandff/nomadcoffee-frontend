import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import {logUserOut} from "../apollo"
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import {SHOP_FRAGMENT, USER_FRAGMENT, PHOTO_FRAGMENT, CATEGORY_FRAGMENT} from "../fragments";
import Board from "../components/feed/Board";
import Footer from "../components/front/Footer";

// see coffee shops query
const FEED_QUERY = gql`
	query seeCoffeeShops($offset : Int!, $userId : Int){
		seeCoffeeShops(offset : $offset, userId : $userId) {
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

// body
const Wrapper = styled.div`
	max-width : 900px;
	min-width : 800px;
	width : 100%;
	display : inline-block;				
	border : 1px solid #E9ECEF;	
	border-radius : 8px;
	margin-top : 20px;
	background-color : white;
	margin-bottom : 20px;
`;


function Home(){		
	// 전체 게시물 조회
	const {data, loading, refetch} = useQuery(FEED_QUERY, {
		variables : {
			offset : 0
		}
	});
	
	return (
		<FrontLayout>
			<PageTitle title="메인"/>
			<Wrapper>
				{loading ? (
					<h1>로딩중</h1>
				) : 
					data?.seeCoffeeShops?.map(
						shop => <Board key={shop.id} {...shop}></Board>
					)
				}
			</Wrapper>
			<Footer/>			
		</FrontLayout>		
	);
}

export default Home;