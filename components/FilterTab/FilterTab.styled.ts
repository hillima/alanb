import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
type MainBtnProps = {
    isBackColor: boolean;
  }
export const Wrap = styled.div`
    min-width: 247px;
    max-width: 247PX;
    display: flex;
    flex-direction: column;
    margin: 20px 0 0 20px;
    @media(max-width: 598px){
      position: fixed;
      z-index: 100;
      margin-left: 0;
      background: ${props => props.theme.colors.volBg};
      margin-top: 0;
      padding-left: 20px;
      padding-top: 20px;
      height: 100%;
      overflow-y: scroll;
      top: 80px;
      padding-right: 20px;
      max-width: 100%;
      width: 100%;
    }
`;

export const TraitWrap = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 40px;
`;

export const TraitTop = styled.div`
    cursor: pointer;
    width:100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 16px;
`;

export const TraitTitle = styled.h3`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    letter-spacing: 0.01em;
    color: ${props => props.theme.colors.titleColor};
`;
export const TraitCnt = styled.h4`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 130%;
    letter-spacing: 0.01em;
    color: ${props => props.theme.colors.titleColor};
    margin-right: 8px;
`;

export const TraitValue = styled.h4`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 203%; 
    color: #A6A9B9;
    margin-top: 3px;
    margin-bottom: 3px;
    cursor: pointer;
`;

export const RightWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const ValueWrap = styled.div`
    display: flex;
    align-items: center;
`;

export const Title = styled.h4`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    letter-spacing: 0.01em;
    color: ${props => props.theme.colors.titleColor};
    margin-bottom: 25px;
`;

export const MainBtn = styled.button<MainBtnProps>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7B0A75;
  color: #FFFFFF;
  border: 1.5px solid #7B0A75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
  ${breakpoint.mobile`
    width: 100%;
    margin-bottom: 15px;
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 130%;
    text-align: center;
    letter-spacing: 0.01em;
  `}
`;

export const StatusWrap = styled.div`
  display: flex;
  margin-bottom: 40px;
  color: ${props => props.theme.colors.titleColor};
  font-size: 12px;
`;

export const PriceWrap = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 40px;
`;

export const PriceInputWrap = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 24px;
`;

export const CloseIcon = styled.div`    
  position: absolute;
  right: 15px;
  width: 30px;
  height: 30px;
  background: ${props => props.theme.images.closeImg};
  background-size: 30px;
`;
export const ClearWrap = styled.div`
    display: flex;
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 20px;
    height: 30px;
    ${breakpoint.mobile`
      width: 100%;
      max-width: 2000px;
    `}
`;
export const ClearScroll = styled.div`
    width: 100%;
    ${breakpoint.mobile`
      overflow-x: scroll;
    `}
`;
export const ClearBtn = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  margin-right: 5px;
  background: grey;
  color: #FFF;
  font-size: 11px;
  width: 70px;
  border-radius: 5px;
  ${breakpoint.mobile`
    min-width: 70px;
  `}
`;

export const TraitBtn = styled.div`
    cursor: pointer;
    margin-right: 5px;
    color: #FFF;
    font-size: 11px;
    padding: 5px 10px;
    display: flex;
    background-color: #7B0A75;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    ${breakpoint.mobile`
      white-space : nowrap;
    `}
`;