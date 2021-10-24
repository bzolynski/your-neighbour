import Content from 'components/Content';
import { FC } from 'react';
import styled from 'styled-components';
import WavyShapeDivider from './WavyShapeDivider';

const sectionHeigth = '700px';

const Wrapper = styled('div')`
    height: calc(${sectionHeigth} - ${(props) => props.theme.sizing.common.header});
`;

const Landing = styled('div')`
    height: ${sectionHeigth};
    width: 100%;
    top: 0;
    left: 0; 
    position: absolute;
`;
const ContentWrapper = styled('div')`
    position: relative;
    background-color: green;
    height: 100%;
`;

const StyledContent = styled(Content)`
	display: grid;
	justify-content: center;
	align-items: center;

	font-size: 30px;
	font-weight: bold;
	color: white;
`;

const LandingPage: FC = () => {
	return (
		<Wrapper>
			<Landing>
				<ContentWrapper>
					<StyledContent>Gorące mamuśki w Twojej okolicy</StyledContent>
					<WavyShapeDivider />
				</ContentWrapper>
			</Landing>
		</Wrapper>
	);
};

export default LandingPage;
