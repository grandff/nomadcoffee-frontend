import styled from "styled-components";

// 로그인 폼에 사용할 버튼
// input value확인 후 누르면 안되는 경우 opacity로 사용자에게 표시
const Button = styled.input`
  border: none;
  border-radius: 3px;
  margin-top: 12px;
  background-color: ${(props) => props.theme.accent};
  color: white;
  text-align: center;
  padding: 8px 0px;
  font-weight: 600;
  width: 100%;
  opacity: ${(props) => (props.disabled ? "0.2" : "1")};
`;

export default Button;