import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type ItemPerProps = {
  isUp: boolean;
}
type ItemWrapProps = {
  columns: number;
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin: 0 auto;
  ${breakpoint.mobile`
    width: calc(100% - 40px);
  `}
`;

export const TopWrap = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  ${breakpoint.mobile`
    width: 100%;
  `}
`;
export const TopLeftMobileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const TopLeftWrap = styled.div`
  display: flex;
  align-items: flex-end;
  ${breakpoint.mobile`
    flex-direction: column;
    width: 100%;
  `}
`;

export const Title = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: ${props => props.theme.colors.titleColor};
`;

export const SelectBox = styled.select`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #A6A9B9;
  width: 155px;
  margin-left: 33px;
  background: url('/new/arrow-down.svg') calc(100% - 10.5px) center no-repeat;
  background-size: 14px;
  outline: 0 none;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  border: 1.5px solid #F3F3F3;
  border-radius: 10px;
  padding-left: 21.5px;
  ${breakpoint.mobile`
    width: 100%;
    margin: 0;
    margin-top: 20px;
    padding-left: 109px;
    background: url('/new/arrow-down.svg') 60% center no-repeat;
  `}
`;

export const SeeBtn = styled.button`
  width: 88px;
  height: 32px;
  left: 947px;
  top: 9px;
  color: #FFFFFF;
  background: #7B0A75;
  border-radius: 10px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  letter-spacing: 0.01em;
  mix-blend-mode: normal;
  flex: none;
  order: 0;
  flex-grow: 0;
  border: none;
  ${breakpoint.mobile`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 12px;
    line-height: 130%;
    text-align: center;
    letter-spacing: 0.01em;
    width: 100%;
    color: #fff;
    background: #7B0A75;
    border: 1px solid #7B0A75;
    margin-bottom: 51px;
  `}
`;

export const ItemWrap = styled.div<ItemWrapProps>`
  width: 100%;
  margin-top: 31px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, minmax(0,1fr) )`};
  column-gap: 22px;
  ${breakpoint.mobile`
    display: flex;
    column-gap: 12px;
    margin-top: 20px;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 10px;
    margin-bottom: 10px;
  `}
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 15px;
  align-items: center;
  margin-bottom: 28px;
  justify-content: space-around;
  mix-blend-mode: normal;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15));
  border-radius: 16px;
  background-color: ${props => props.theme.colors.itemBg};
  ${breakpoint.mobile`
    margin-bottom: 0;
    min-width: 300px;
    max-width: 300px;
    max-height: 507px;
    filter: none;
    height: auto;
    padding-bottom: 15px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  `}
`;

export const ItemNum = styled.h3`
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.titleColor};
`;

export const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
`;

export const ItemColName = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  overflow:hidden;       
  text-overflow:ellipsis;
  white-space:nowrap;  
  ${breakpoint.mobile`
    text-align: center;
  `}
`;
export const ItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  height: 100%;
  width: 100px;
`;

export const ItemVol = styled.h4`
  margin-top: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;
  color: #7B0A75;
`;

export const ItemPer = styled.h4<ItemPerProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.isUp ? '#43B70D' : '#FB8C0A'};
`;

export const ItemCreator = styled.h4`
  margin-top: 4px;
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
    text-align: center;
  `}
`;

export const ItemImgWrap = styled.div`
  width: 100%;
  position: relative;
  z-index: -1;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
  :after {
    content: "";
    display: block;
    padding-bottom: 100%;
  }
  img{
    position: absolute;
  }
  video{
    position: absolute;
    object-fit: contain;
  }
  @media(max-width: 598px){
    z-index: 0;
    img{
      object-fit: contain;
    }
  }
`;

export const ArrowWrap = styled.div`
  display: flex;
  margin-left: 23px;
`;
export const ArrowLeftBtn = styled.img`
  margin-right: 13px;
  width: 32px;
  height: 32px;
`;
export const ArrowRightBtn = styled.img`
  width: 32px;
  height: 32px;
`; 


export const HeartBtn = styled.div`
  display:flex;
  margin-left: 8px;
  align-items:center;
  justify-content: center;
  width: 30px;
  height: 30px;
  background: rgba(19, 12, 26, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 21px;
`;

export const HeartIcon = styled.img``;


export const AuctionTimeBtn = styled.div`
  padding: 6px 10px 6px 10px;
  background: rgba(19, 12, 26, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 21px;
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const AuctionTime = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  letter-spacing: 0.01em;
  color: #FFFFFF;
`;

export const Relative = styled.div`
  display: flex;
  position: absolute;
  top: 17px;
  right: 17px;
`;

export const ItemBottom = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px 14px 0px 14px;
  width: 100%;
  max-height: 198px;
`;


export const ItemBidWrap = styled.div`
  display: flex;
  margin-top: 43px;
  justify-content: space-between;
  width: 100%;
  align-items: flex-end
`;
export const ItemBidLeft = styled.div``;
export const ItemBidText = styled.h4`
  margin-bottom: 5px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;
export const ItemBidPrice = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.priceColor};
  flex: none;
  order: 0;
  flex-grow: 0;
`;
export const ItemBidBtn = styled.button`
  padding: 5px 6px;
  height: 29.75px;
  border: none;
  background: #7B0A75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  mix-blend-mode: normal;
  flex: none;
  order: 0;
  flex-grow: 0;
  ${breakpoint.mobile`
    width: 126px;
  `}
`;

export const SpinnerWrap = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
`;
