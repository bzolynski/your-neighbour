import logo from './logo.svg';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle, NormalizeStyle, theme } from 'styles/index';
import Layout from 'components/Layout';
import HomePage from 'pages/home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

export const App = () => {
	return (
		<ThemeProvider theme={theme}>
			<NormalizeStyle />
			<GlobalStyle />
			<Router>
				<Switch>
					<Layout>
						<Route path={[ '/', '/home' ]}>
							<HomePage />
						</Route>
					</Layout>
				</Switch>
			</Router>
		</ThemeProvider>
	);
};

export default App;
