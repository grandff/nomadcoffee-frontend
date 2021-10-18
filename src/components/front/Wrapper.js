import styled from "styled-components";

// body
const SWrapper = styled.div`
	max-width : 900px;
	min-width : 800px;
	width : 100%;
	display : inline-block;				
	border : 1px solid #E9ECEF;	
	border-radius : 8px;
	margin-top : 20px;
	background-color : white;
	margin-bottom : 20px;
	min-height : 800px;
`;

function Wrapper({children}){
	return (
		<SWrapper>
			{children}
		</SWrapper>
	)
}

export default Wrapper;