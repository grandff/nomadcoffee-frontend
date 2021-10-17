import {Link} from "react-router-dom";
import styled from "styled-components";

// 헤더 로고 박스 링크로 대체
const SLogoBox = styled(Link)`
	width : 18%;	
	display : flex;
	flex-direction : row;
	padding-left : 20px;
	align-items : center;
	text-decoration : none;
	color : black;
	text-align: right;
    justify-content: center;
`;

function LogoBox({children}){
	return (
		<SLogoBox to = "/">
			{children}
		</SLogoBox>
	)
}

export default LogoBox;