import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Container = styled.div`
${breakpoint.mobile`
padding-left:20px;
padding-right:20px;
`}
`;

export const TopLine = styled.div`
    display: flex;
    padding-left: 20px;
    align-items: center;
    margin-bottom: 20px;
    ${breakpoint.mobile`
        display: flex;
        -webkit-box-align: center;
        align-items: stretch;
        flex-direction: column;
        padding-left:0;
        margin-bottom: 15px;
    `}
`;
export const ColName = styled.h3`  
    cursor: pointer;
    margin-left: 13px;
    margin-right: 20px;
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 32px;
    color: ${props => props.theme.colors.titleColor};
    ${breakpoint.mobile`
        margin: 15px 10px;
    `}
`;
export const StasBox = styled.div`
    display: flex;
    justify-content: space-around;
    background: ${props => props.theme.colors.altbgColor};
    border: 1px solid ${props => props.theme.colors.altbgColor};
    border-radius: 6px;
    padding: 5px 11px 5px 8px;
`;
export const StatText = styled.h4`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 11px;
    line-height: 21px;
    text-align: center;
    color: ${props => props.theme.colors.titleColor};
`;

export const NftImg = styled.img`
    
`;