import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';


export const Wrap = styled.div`
  background: ${props => props.theme.colors.volBg};
  display: flex;
  align-items: center;
  height: 40px;
  width: 100%;
  justify-content: center;
  ${breakpoint.mobile`
    padding-left: 8px;
    overflow: hidden;
    overflow-x: scroll;
    margin-top: 80px;
  `}
`;
export const Part = styled.div`
  display: flex;
  margin-right: 38px;
  ${breakpoint.mobile`
    min-width: fit-content;
    margin-right: 42px;
  `}
`;

export const GreyPart = styled.p`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.volMain};
  ${breakpoint.mobile`
    min-width: fit-content;
    margin:0px;
    padding:0px;
    width:100%;
  `}
`;

export const ColorPart = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.volSub};
  ${breakpoint.mobile`
    min-width: fit-content;
    margin-left: 8px;
  `}
`;