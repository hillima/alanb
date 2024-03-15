import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

export const Wrap = styled.div`
    width: 247px;
    max-width: 100%;
    display: flex;
    flex-direction: column;
    padding-right: 21px;
    ${breakpoint.mobile`
      width: 150px;
      padding-right: 10px;
    `}
`;

export const BulkTop = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const Title = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;
export const ClearText = styled.h4`
  cursor: pointer;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: #9BA2AD;
`;

export const Item = styled.div`
  display: flex;
  margin-top: 30px;
  width: 100%;
`;
export const ItemLeft = styled.div`
  margin-right: 14px;
`;
export const CloseImg = styled.img`
  width: 8px;
  height: 8px;
`;
export const ItemRight = styled.div`
  width: calc(100% - 68px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
export const Name = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;
export const Price = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 21px;
  color: #7B0A75;
`;

export const ItemImg = styled.img`
  width: 54px;
  height: 54px;
  border-radius: 10px;
`;

export const CloseWrap = styled.div`
  width: 16px;
  height: 16px;
  background: #7B0A75;
  position: absolute;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: -5px;
  margin-top: -5px;
  cursor: pointer;
`;

export const TotalWrap = styled.div`
  margin-top: 28px;
  display: flex;
  justify-content: space-between;
`;
export const TotalText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;
export const TotalPrice = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 11px;
  line-height: 21px;
  color: ${props => props.theme.colors.priceColor};
`;
export const MainBtn = styled.button`
  margin-top: 24px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color:  #7B0A75;
  color: #FFFFFF;
  border: 1.5px solid #7B0A75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  text-align: center;
`;

export const BuyContent = styled.p`
  margin-top: 14px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 150%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;