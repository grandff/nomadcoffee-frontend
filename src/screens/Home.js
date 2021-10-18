import FrontLayout from "../components/front/FrontLayout";
import PageTitle from "../components/PageTitle";
import {logUserOut} from "../apollo"
import { gql, useQuery } from "@apollo/client";
import styled from "styled-components";
import {SHOP_FRAGMENT, USER_FRAGMENT, PHOTO_FRAGMENT, CATEGORY_FRAGMENT} from "../fragments";
import Board from "../components/feed/Board";
import Footer from "../components/front/Footer";
import Wrapper from "../components/front/Wrapper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from '@fortawesome/free-solid-svg-icons'

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

const SpinnerBar = styled.div`
	width : 100%;
	max-height : 100%;
	min-height : 700px;
	display : flex;
	justify-content : center;
	align-items : center;
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
					<SpinnerBar>
						<FontAwesomeIcon icon={faSpinner} spin size="5x" />					
					</SpinnerBar>
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