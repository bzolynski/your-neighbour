import { FC } from 'react';
import styled from 'styled-components';
import Content from './Content';
import PlainLink from './PlainLink';
import logo from 'assets/temp-logo.png';

const Wrapper = styled('header')`
    height: ${(props) => props.theme.sizing.common.header};
`;

const TopBar = styled('div')`
    position: fixed;
    top: 0px;
    width: 100%;
    height: ${(props) => props.theme.sizing.common.header};
    background-color: rgba(0, 0, 0, 0.2);;
    z-index: 100;
`;

const StyledContent = styled(Content)`
	display: flex;
	align-items: center;
`;

const LogoWrapper = styled('div')`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

const Logo = styled('div')`
	background-image: url(${logo});
	background-size: cover;
	height: 40px;
	width: 40px; 
`;

const NavigationWrapper = styled('ul')`
	margin-left: auto;
	display: flex;
`;

type Props = {
	className?: string;
};
const Header: FC<Props> = ({ className }) => {
	return (
		<Wrapper className={className}>
			<TopBar>
				<StyledContent>
					<PlainLink to=".">
						<LogoWrapper>
							<Logo /> Tfuj nejberhód
						</LogoWrapper>
					</PlainLink>

					<NavigationWrapper>
						<PlainLink to="lol">LOL</PlainLink>
					</NavigationWrapper>
				</StyledContent>
			</TopBar>
		</Wrapper>
	);
};

export default Header;
