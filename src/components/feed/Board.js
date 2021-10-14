import {Link} from "react-router-dom";
import styled from "styled-components";

// 전체 container
const Card = styled.div`
	display : relative;
	float : left;
	width : 25%;
	margin : 10px;
`;

// 사용자 이름

// 카페 이름
const NameDiv = styled.div`
	font-weight : bold;
	font-size : 25px;
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
		<Link to = {`/shop/${id}`} style={{textDecoration : 'none', color : 'black'}}>
			<Card key={id}>
				<NameDiv>
					{name}
				</NameDiv>
				{photos?.map((photo) => (
				<PhotoFile src={photo.url} />
				))}			
				<CaptionDiv>
					{caption}
				</CaptionDiv>
			</Card>
		</Link>          		
	)
}

export default Board;