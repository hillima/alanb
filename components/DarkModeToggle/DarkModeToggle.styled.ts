import styled from 'styled-components';

export const Wrap = styled.div`
    position: absolute;
    top: 40px;
    right: 270px;
    z-index: 102;
    @media(max-width: 598px){
        right: 110px;
        top: 20px;
        position: fixed;
    }
`;