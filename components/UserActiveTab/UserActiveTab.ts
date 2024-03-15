import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type ListItemProps = {
  active: boolean;
}
export const Wrap = styled.div`
  display: flex;
  padding: 15px;
  margin-left: 20px;
  margin-right: 20px;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  height: 64px;
  align-items: center;
  border-radius: 12px;
  margin-bottom: 30px;
  justify-content: space-between;
  ${breakpoint.mobile`
  overflow: auto;
  white-space: nowrap;
  height: auto;
  margin-left: 20px;
  margin-right: 20px;
  `};
`;
export const ListWrap = styled.div`
  display: flex;
`;

export const ListItem = styled.div<ListItemProps>`
  cursor: pointer;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  background: ${props => props.active ? props.theme.colors.wallBtn : props.theme.colors.altbgColor};
  color: ${props => props.active ? props.theme.colors.wallText : props.theme.colors.titleColor};
  padding: 10px 8px;
  border-radius: 6px;
  margin-right: 11px;
  ${breakpoint.mobile`
  padding: 10px 15px;
  `};
`;

export const CreateBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 204px;
  height: 40px;
  background: #7B0A75;
  border: 1px solid #7B0A75;
  border-radius: 6px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #FFFFFF;
  ${breakpoint.mobile`
    padding: 0 10px;
  `}
`;