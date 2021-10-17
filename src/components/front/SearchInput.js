import styled from "styled-components";

// 로그인 폼에 사용할 input
const SearchInput = styled.input`
  width: 340px;
  height : 40px;
  border-radius: 4px;
  padding: 7px;  
	border: 0.5px solid
    ${(props) => (props.theme.borderColor)};
  margin-top: 5px;
  box-sizing: border-box;
  &::placeholder {
    font-size: 12px;
  }	
    &:focus {
    border-color: rgb(38, 38, 38);
  }
`;

export default SearchInput;