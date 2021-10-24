import { FC } from 'react';
import styled from 'styled-components';
import Content from './Content';

const Wrapper = styled('footer')`
    height: 60px;
    width: 100%;
    background-color: #5c5cff;
`;

type Props = {
	className?: string;
};
const Footer: FC<Props> = ({ className }) => {
	return (
		<Wrapper className={className}>
			<Content>sdsd</Content>
		</Wrapper>
	);
};

export default Footer;
