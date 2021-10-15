import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import {logUserOut} from "../apollo"
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import {SHOP_FRAGMENT, USER_FRAGMENT, PHOTO_FRAGMENT, CATEGORY_FRAGMENT} from "../fragments";
import Board from "../components/feed/Board";

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


// 푸터
const Footer = styled.div`
	width : 100%;
`;

// body
const Wrapper = styled.div`
	max-width : 1000px;
	min-width : 800px;
	width : 100%;
	display : flex;		
	flex-direction : column;	
	padding : 10px;
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
			<Footer>
				<div>
					이것저것 정보가 들어갈곳(상단)
				</div>
				<div>
					이것저것 정보가 들어갈곳(하단)					
				</div>
				<div>
					<button onClick={logUserOut}>로그아웃</button>
				</div>
			</Footer>
		</FrontLayout>		
	);
}

export default Home;