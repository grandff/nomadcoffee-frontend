import styled from "styled-components";

// 기본 base div
export const BaseBox = styled.div`	
	background-color : ${(props) => props.theme.bgColor};
	border : 1px solid ${(props) => props.theme.borderColor};
	width : 100%;
`;

// link에 들어갈 텍스트 디자인
export const FatLink = styled.span`
	font-weight: 600;
  	color: rgb(142, 142, 142);
`;