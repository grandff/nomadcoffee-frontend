import {ApolloProvider, useReactiveVar} from "@apollo/client";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import Home from "./screens/Home";
import Login from "./screens/Login";
import NotFound from "./screens/NotFound";
import SignUp from "./screens/SignUp";
import { client, isLoggedInVar, darkModeVar } from "./apollo";
import {ThemeProvider} from "styled-components";
import {darkTheme, GlobalStyles, lightTheme} from "./styles";
import {HelmetProvider} from "react-helmet-async";

function App() {	
	const isLoggedIn = useReactiveVar(isLoggedInVar);	// 로그인 유무
	const darkMode = useReactiveVar(darkModeVar);		// 다크모드 유무
	
  	return (
		<ApolloProvider client={client}>
			<HelmetProvider>
				<ThemeProvider theme = {darkMode ? darkTheme : lightTheme}>
					<GlobalStyles />
					<Router>
						<Switch>
							<Route path="/" exact>
								{isLoggedIn ? <Home /> : <Login />}
							</Route>
							{!isLoggedIn ? (
								<Route path="/sign-up">
									<SignUp />
								</Route>
							) : null}
							<Route>
								<NotFound />
							</Route>
						</Switch>
					</Router>
				</ThemeProvider>   
			</HelmetProvider>
		</ApolloProvider>			 	
	);
}

export default App;
