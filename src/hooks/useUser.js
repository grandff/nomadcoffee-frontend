import {gql, useQuery, useReactiveVar} from "@apollo/client";
import {useEffect} from "react";
import {isLoggedInVar, logUserOut} from "../apollo";

const ME_QUERY = gql`
	query me {
		me {
			id
  			username  
  			name  
			avatarURL
		}
	}
`

const useUser = () => {	
	const hasToken = useReactiveVar(isLoggedInVar);	// 로그인 토큰 값	
	const {data} = useQuery(ME_QUERY, {
		skip : !hasToken,			// 로그인하지 않은 상태면 해당 쿼리 실행 안함
		fetchPolicy : "no-cache"
	});
	
	// data가 변경될때마다 실행
	useEffect(() => {
		if(data?.me === null){		// 비정상값이면 로그아웃처리
			logUserOut();
		}
	}, [data]);
	
	return {data};
}

export default useUser;