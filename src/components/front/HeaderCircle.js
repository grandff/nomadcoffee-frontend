import styled from "styled-components";
import {Link} from "react-router-dom";

// 로그인 폼에 사용할 버튼
// input value확인 후 누르면 안되는 경우 opacity로 사용자에게 표시
const SHeaderCircle = styled.div`
	border-radius : 100%;
	width : 40px;
	height : 40px;
	border : 1px solid gray;
`;

function HeaderCircle({children}){
	return (
		<SHeaderCircle>
			{children}
		</SHeaderCircle>
	)
}


export default HeaderCircle;