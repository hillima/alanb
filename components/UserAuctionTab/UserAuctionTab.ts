import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Wrap = styled.div`
  width: calc(100% - 40px);
  background: ${props => props.theme.colors.volBg};
  border: 1px solid ${props => props.theme.colors.volBg};
  border-radius: 16px;
  display: flex;
  align-items: center;
  padding: 15px;
  margin-left: 20px;
  ${breakpoint.mobile`
  margin-left: 20px;
  overflow: auto;
  white-space: nowrap;
  `}
`;

type ActiveTabProps = {
  isActive: boolean;
}

export const ActiveTab = styled.div<ActiveTabProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  color:${props => props.theme.colors.genColor}; 
  border-radius: 6px;
  span{  
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 21px;
    text-align: center;
    width: 120px;
    color:${props => props.theme.colors.titleColor};
  }
`;