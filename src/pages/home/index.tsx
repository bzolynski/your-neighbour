import DummyText from 'components/DummyText';
import { FC } from 'react';
import styled from 'styled-components';
import LandingPage from './components/LandingPage';

const Wrapper = styled('div')`

`;

const HomePage: FC = () => {
	return (
		<Wrapper>
			<LandingPage />
			<DummyText />
		</Wrapper>
	);
};

export default HomePage;
