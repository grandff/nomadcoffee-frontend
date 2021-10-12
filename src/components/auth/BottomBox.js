import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import styled from "styled-components";
import { BaseBox } from "../shared";

// 로그인 버튼, 회원가입 버튼 이 있는 div
const SBottomBox = styled(BaseBox)`
	padding : 20px 0px;
	text-align : center;
	a {
		font-weight : 600;
		margin-left: 5px;
		color: ${(props) => props.theme.accent};
	}
`;

// 안내문구, link url, link text 세개를 변수로 받음
function BottomBox({cta, link, linkText}){
	return (
		<SBottomBox>
			<span>{cta}</span>
			<Link to={link}>{linkText}</Link>
		</SBottomBox>
	)
}

// bottom box 호출 시 필요한 변수들 체크
BottomBox.propTypes = {
	cta : PropTypes.string.isRequired,
	link : PropTypes.string.isRequired,
	linkText : PropTypes.string.isRequired
};


export default BottomBox;