import styled from 'styled-components';

const Content = styled('main')` 
    max-width: ${(props) => props.theme.sizing.common.content};
    margin-left: auto;
    margin-right: auto;
    height: 100%; 
`;

export default Content;
