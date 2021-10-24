import { FC } from 'react';
import styled from 'styled-components';
import Content from './Content';
import Footer from './Footer';
import Header from './Header';

const Wrapper = styled('div')`
    width: 100%;
    height: 100vh;
	position: relative;
    z-index: 10;
`;
const ContentWrapper = styled('main')`
`;

const Layout: FC = ({ children }) => {
	return (
		<Wrapper>
			<Header />
			<ContentWrapper>
				<Content>{children}</Content>
			</ContentWrapper>
			<Footer />
		</Wrapper>
	);
};

export default Layout;
