import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type ItemPerProps = {
  isUp: boolean;
}
type ItemWrapProps = {
  columns: number;
}
type MainBtnProps = {
  isBackColor: boolean;
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
export const MainBtn = styled.button<MainBtnProps>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${props => props.isBackColor ? '#7B0A75': '#FFFFFF'};
  color: ${props => !props.isBackColor ? '#7B0A75': '#FFFFFF'};
  border: 1.5px solid #7B0A75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.01em;
  padding: 5px 10px;
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
    color: #7B0A75;
    background: #ffffff;
    border: 1px solid #7B0A75;
    margin-bottom: 51px;
  `}
`;

export const ItemWrap = styled.div<ItemWrapProps>`
  width: 100%;
  margin-bottom: 113px;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, minmax(0, 1fr) )`};
  column-gap: 12px;
  ${breakpoint.mobile`
    margin-top: 20px;
    margin-bottom: 0;
    grid-template-columns: none;
  `}
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  padding-bottom: 15px;
  align-items: center;
  margin-bottom: 12px;
  justify-content: space-around;
  mix-blend-mode: normal;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15));
  border-radius: 16px;
  background-color: ${props => props.theme.colors.itemBg};
  ${breakpoint.mobile`
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
  font-family: 'Futura';
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
  height: 260px;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
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
  padding: 0px 14px 0px 14px;
  width: 100%;
`;


export const ItemBidWrap = styled.div`
  display: flex;
  margin-top: 15px;
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
  color:${props => props.theme.colors.altpriceColor};
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

export const ImgWrap = styled.div`
  overflow: hidden;
  height: 250px;
`;

export const BtnWrap = styled.div`
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: repeat(4, minmax(0,1fr) );
  height: 50px;
  margin: 20px 0;
  max-width: 100%;
  ${breakpoint.mobile`
  height: auto;
  grid-template-columns: repeat(1, minmax(0,1fr) );
  grid-column-gap: 0;
  grid-row-gap: 0;
`}
`;