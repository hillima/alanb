import styled from 'styled-components';

type WrapProps = {
    hide: boolean;
}

export const Wrap = styled.div<WrapProps>`
    min-height: 800px;
    margin-left: ${props => props.hide ? '100px' : '302px'};
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.colors.bgColor};
    @media (max-width: 1140px){
        margin-left: 100px;
    }
    @media (max-width: 598px){
        margin-left: 0;
    }
`;