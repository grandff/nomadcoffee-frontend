import {logUserOut} from "../apollo"

function Home(){
	return (
		<div>
			<h1>Home</h1>
			<button onclick={logUserOut}>logout</button>
		</div>		
	);
}

export default Home;