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
  border: 1px solid ${props => props.theme.colors.volBg};
  background: ${props => props.theme.colors.volBg};
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.45));
  border-radius: 16px;
  height: 360px;
  padding: 20px;
  ${breakpoint.mobile`
    overflow-x: scroll;
    height: auto;
    padding: 20px;
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
  width: 25%;
  align-items: center;
`;
export const OfferTxType = styled.div`
  display: flex;
  width: 25%;
  align-items: center;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: ${props => props.theme.colors.altpriceColor};
  padding-right: 50px;
`;
export const OfferTxId = styled.div`
  display: flex;
  width: 15%;
  align-items: center;
  color: #7B0A75;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
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
`;
export const OfferTime = styled.div`
  display: flex;
  width: 17.5%;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
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
`;