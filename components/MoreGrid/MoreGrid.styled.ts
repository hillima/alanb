import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Container = styled.section`
  width: 100%;
  overflow: hidden;
  height: 500px;
  padding-bottom: 30px;
  margin-top: 30px;
    ${breakpoint.mobile`
  width: 100%;
  padding-left: 0;
  padding-top: 20px;
  `};
`;


export const Scroll = styled.div`
  overflow-x: auto;
  display: flex;
  flex-wrap: nowrap;
  gap: 10px;
  padding-bottom: 30px;
  ${breakpoint.mobile`
  width: 100%;
  padding-left: 0;
  padding:0;
  `};
`;

export const MoreText = styled.h4`
  font-family: 'Futura';l
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;