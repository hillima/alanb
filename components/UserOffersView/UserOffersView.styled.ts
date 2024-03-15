import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin: 0 auto;
  padding-bottom: 40px;
  ${breakpoint.mobile`
    width: calc(100% - 40px);
  `}
`;
export const OffersWrap = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background:${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.45));
  border-radius: 16px;
  height: 475px;
  padding: 20px;
  ${breakpoint.mobile`
    overflow-x: scroll;
  `}
`;
export const SpinnerWrap = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
`;

export const OffersHead = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 11px;
  ${breakpoint.mobile`
    width: 1000px;
    overflow-x: scroll;
  `}
`;
type WidthProps = {
  width: string;
}
export const OffersHeadText = styled.div<WidthProps>`
  display: flex;
  align-items: center;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: #9BA2AD;
  width: ${props => props.width};
`;

export const OffersBody = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  ::-webkit-scrollbar {
    width: 5px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #D9D9D9;
    border-radius: 30px;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ${breakpoint.mobile`
    width: 1000px;
    overflow-x: scroll;
  `}
`;
export const OfferItem = styled.div`
  padding: 9px 0 9px 0;
  display: flex;
  width: 100%;
`;
export const OfferName = styled.div`
  display: flex;
  width: 17%;
  align-items: center;
`;
export const OfferTxType = styled.div`
  display: flex;
  width: 12.5%;
  align-items: center;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
    font-size: 12px;
    line-height: 12px;
  `}
`;
export const OfferTxId = styled.div`
  display: flex;
  width: 12.5%;
  align-items: center;
  color: #7B0A75;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  ${breakpoint.mobile`
    font-size: 12px;
    line-height: 12px;
  `}
`;
export const OfferAmount = styled.div`
  display: flex;
  width: 15%;
  align-items: center;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
    font-size: 12px;
    line-height: 12px;
  `}
`;
export const OfferTime = styled.div`
  display: flex;
  width: 15.5%;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
    font-size: 12px;
    line-height: 12px;
    align-items: center;
  `}
`;
export const OfferMintAddr = styled.div`
  display: flex;
  width: 12.5%;
  align-items: center;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
    font-size: 12px;
    line-height: 12px;
  `}
`;
export const OfferTx = styled.div`
  display: flex;
  width: 5%;
  align-items: center;
  justify-content: center;
`;

export const OfferNameText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  margin-left: 12px;
  padding-right: 10px;
  ${breakpoint.mobile`
    font-size: 12px;
    line-height: 16px;
  `}
`;

export const OfferActionWrap = styled.div`
  width: 10%;
  display: flex;
  align-items: center;
`;

export const ActionBtn = styled.button`
  margin-right: 5px;
  padding: 2px 10px;
  background-color: #7B0A75;
  border-radius: 5px;
  color: #FFF;
`;