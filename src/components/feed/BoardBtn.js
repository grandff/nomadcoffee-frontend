import PropTypes from "prop-types";
import styled from "styled-components";
import {Link} from "react-router-dom";

const SBoardBtn = styled(Link)`
  	border: none;
  	border-radius: 4px;  
	background-color: ${props => props.color || props.theme.accent};  	
  	color: white;
  	text-align: center;
  	padding: 8px 0px;
  	font-weight: 600;  
  	width :80px;
  	height : 35px;
  	display : flex;
  	align-items : center;
  	justify-content : center;  	
  	font-size : 16px;
	margin-right : 10px;
`;

function BoardBtn({cta, color, link}){
	return <SBoardBtn color={color} to={link}>{cta}</SBoardBtn>
}

BoardBtn.propTypes = {
	cta : PropTypes.string.isRequired,
	link : PropTypes.string.isRequired,
	color : PropTypes.string
};

export default BoardBtn;