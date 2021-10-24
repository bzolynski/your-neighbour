import { Link } from 'react-router-dom';
import styled from 'styled-components';

const PlainLink = styled(Link)`
    text-decoration: none;
	font-size: inherit;
	color: inherit;
	font-weight: inherit;
	&:hover {
		text-decoration: none;
	}
`;

export default PlainLink;
