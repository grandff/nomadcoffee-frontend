import {Link} from "react-router-dom";
import styled from "styled-components";

// 전체 container
const Card = styled.div`
	display : relative;
	float : left;
	width : 31%;
	margin : 10px;
`;

// 사용자 이름

// 카페 이름
const NameDiv = styled(Link)`
	font-weight : bold;
	font-size : 25px;
	textDecoration : 'none';
	color : black;
`;

// 카페 설명 란
const CaptionDiv = styled.div`

`;

// 사진 
const PhotoFile = styled.img`
	min-width : 100%;
	max-width : 100%;
`;

function Board({id, userId, name, caption, latitude, longitude, createdAt, updatedAt ,users, photos, categories}){
	return (		
		<Card key={id}>			
			{photos?.map((photo) => (
			<PhotoFile src={photo.url} />
			))}			
			<NameDiv to = {`/shop/${id}`} >
				{name}
			</NameDiv>
			<CaptionDiv>
				{caption}
			</CaptionDiv>
		</Card>      		
	)
}

export default Board;