import styled, { css } from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const General = styled.p`
  color: #808080;
  font-size: 12px;
  line-height: 24px;
`;

export const Amount = styled.h3`
  font-size: 28px;
  line-height: 32px;
  margin: 4px 0 32px;
  color: #7543E3;

  ${breakpoint.mobile`
    font-weight: normal;
  `}
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
`;

export const ErrorMessage = styled.p`
  color: #b57579;
  font-size: 16px;
  line-height: 24px;
`;

const inputCSS = css`
  font-size: 16px;
  margin-bottom: 12px;
  padding: 0 16px;
  width: 100%;
  height: 48px;
  color: ${props => props.theme.colors.titleColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 4px;
  line-height: 24px;
  position: relative;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  background-color: ${props => props.theme.colors.altbgColor};
  &:hover {
    border: 1px solid ${props => props.theme.colors.altbgColor};
  }
`;

export const DisabledInput = styled.input`
  ${inputCSS}
`;

export const DropdownMenu = styled.select`
  ${inputCSS}
  background-color: ${props => props.theme.colors.altbgColor}
  background-img: url('/down-arrow.svg');
  background-repeat: no-repeat;
  background-position: top 10px right 15px;
  cursor: pointer;
  border-color:${props => props.theme.colors.altbgColor};
`;

export const FeeLabel = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 24px;
  color: ${props => props.theme.colors.genColor};
  margin: 2px 0 12px;
`;
