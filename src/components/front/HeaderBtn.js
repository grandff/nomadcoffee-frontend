import styled from "styled-components";
import {Link} from "react-router-dom";

// 로그인 폼에 사용할 버튼
// input value확인 후 누르면 안되는 경우 opacity로 사용자에게 표시
const HeaderBtn = styled(Link)`
  border: none;
  border-radius: 4px;  
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;  
  width :120px;
  height : 40px;
  display : flex;
  align-items : center;
  justify-content : center;
  margin-left : 10px;
  font-size : 16px;
`;


export default HeaderBtn;