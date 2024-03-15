import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Wrap = styled.div`
  width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  display: flex;
  ${breakpoint.mobile`
  padding-left: 20px;
  padding-right: 20px;
  margin-bottom: 20px;
  display: inline-block;
`}
`;
export const DisWrap = styled.div`
  display: flex;
  width: 100%;
  max-width: calc(100% - 95px);
  ${breakpoint.mobile`
  display: flex;
  width: auto;
  align-items: center;
  max-width: inherit;
`}
`;
export const SearchWrap = styled.div`
  margin-right: 15px;
  width: 100%;
  border-radius: 10px;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  ${breakpoint.mobile`
  width: auto;
  display:none;
  `}
`;


export const SelectBox = styled.select`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: ${props => props.theme.colors.titleColor};
  width: 155px;
  height: 42px;
  background: ${props => props.theme.colors.altbgColor} url('/new/arrow-down.svg') calc(100% - 10.5px) center no-repeat;
  background-size: 14px;
  outline: 0 none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1.5px solid ${props => props.theme.colors.altbgColor};
  border-radius: 10px;
  padding-left: 16.5px;
  ${breakpoint.mobile`
    font-size: 12px;
    width: 100%;
    margin: 0;
    padding-left: 10px;
    background: ${props => props.theme.colors.altbgColor} url('/new/arrow-down.svg') calc(100% - 10.5px) center no-repeat;
  `}
`;

export const SelectWrap = styled.div`
  background: ${props => props.theme.colors.itemBg};
  border-radius: 5px;
  ${breakpoint.mobile`
    width: 100%;
    .MuiInputBase-root{
      width: 100%;
    }
  `}
  .top-col-select .MuiSelect-select{
    border-radius:8px;
    background: ${props => props.theme.colors.altbgColor};
    padding: 14px 32px 14px 20px;
  }
  .col-form-select .MuiSelect-select{
    border-radius:8px;
    background: ${props => props.theme.colors.altbgColor};
    padding: 14px 32px 14px 20px;
  }
  .col-form-select .MuiSvgIcon-root{
    color: ${props => props.theme.colors.muiSvgColor};
  }
  .top-col-select .MuiSvgIcon-root{
    color: ${props => props.theme.colors.muiSvgColor};
  }
`;

export const RefreshBox = styled.div`
  cursor: pointer;
  margin-right: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 40px;
  background: ${props => props.theme.colors.altbgColor};
  border: 1.5px solid ${props => props.theme.colors.altbgColor};
  border-radius: 8px;
  ${breakpoint.mobile`
    display: flex;
    margin-right: 10px;
    height: 48px;
  `}
`;

export const RightWrap = styled.div`
  display: flex;
  min-width: 95px;
  width: 7%;
  justify-content: space-between;
  ${breakpoint.mobile`
  width: auto;
  margin-top: 20px;
  display:none;
`}
`;


export const VerfiedToggleWrap = styled.div`
  display: flex;
  align-items: center;
  margin-right: 15px;
  width: 200px;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius:8px;
  ${breakpoint.mobile`
  width: 180px;
  margin-top: 0;
  display:flex;
  height:48px
`}
`;
type VerifiedToggleProps = {
  isActive: boolean
};
export const VerifiedToggleBtn = styled.button<VerifiedToggleProps>`
  height: 100%;
  background: ${props => props.isActive ? '#7B0A75' : props.theme.colors.altbgColor};
  border-radius: 10px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  line-height: 21px;
  text-align: center;
  color: ${props => props.isActive ? '#FFFFFF' : props.theme.colors.titleColor};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  ${breakpoint.mobile`
  width: 140px;
  margin-top: 0;
  padding: 5px;
  display: inline-flex;
`}
`

type ActiveBoxProps = {
  isActive: boolean;
}
export const ActiveBox = styled.div<ActiveBoxProps>`
  cursor: pointer;
  width: 48px;
  height: 42px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isActive ? '#7B0A75' : 'none'};
  border: 1.5px solid #7B0A75;
  border-radius: 10px;
  margin-left:10px;
  ${breakpoint.mobile`
  width: 140px;
  margin-top: 0;
  display: inline-flex;
`}
`;