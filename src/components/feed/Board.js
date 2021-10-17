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
	font-size : 16px;
	textDecoration : 'none';
	color : black;
`;

// 카페 설명 란
const CaptionDiv = styled.div`
	display: flex;
    justify-content: space-between;
`;

// 사진 
const PhotoFile = styled.img`
	width : 278px;
	height : 170px;	
`;

function Board({id, userId, name, caption, latitude, longitude, createdAt, updatedAt ,user, photos, categories}){
	
	const dateTime = createdAt.split("T");	// 등록 날짜
	return (		
		<Card key={id}>			
			{photos?.map((photo) => (
			<PhotoFile src={photo.url} />
			))}			
			<NameDiv to = {`/shop/${id}`} >
				{name.length >= 16 ? name.substring(0,16) + "..." : name}				
			</NameDiv>
			<CaptionDiv>
				<span>{user?.username}</span>
				<span>{dateTime[0]}</span>				
			</CaptionDiv>
		</Card>      		
	)
}

export default Board;