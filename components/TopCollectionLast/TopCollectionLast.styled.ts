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
  min-height: 200px;
  justify-content: center;
  ${breakpoint.mobile`
    margin-top: 20px;
    width: calc(100% - 40px);
  `}
`;
export const TopLeftMobileWrap = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;
export const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
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
    color: #FFFFFF;
    background: #7B0A75;
    border: 1px solid #7B0A75;
    margin-bottom: 40px;
  `}
`;

export const ItemWrap = styled.div<ItemWrapProps>`
  margin-top: 31px;
  margin-bottom: 113px;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, minmax(0,1fr) )`};
  column-gap: 22px;
  ${breakpoint.mobile`
    column-gap: 12px;
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 10px;
    margin-bottom: 10px;
    margin-top: 20px;
    height: 403px;
  `}
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  height: 363px;
  align-items: center;
  margin-bottom: 28px;
  justify-content: space-around;
  mix-blend-mode: normal;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15));
  border-radius: 16px;
  background-color: ${props => props.theme.colors.itemBg};
  ${breakpoint.mobile`
    height: 100%;
    margin-bottom: 0;
    min-width: 300px;
    filter: none;
    border: 1px solid rgba(0, 0, 0, 0.15);
    padding-bottom: 15px;
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
  max-height: 260px;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const ItemColName = styled.h2`
  margin-top: 4px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  color: ${props => props.theme.colors.titleColor};
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
  margin-top: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.subColor};
`;


export const ItemImgWrap = styled.div`
  width: 100%;
  height: 260px;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
  ${breakpoint.mobile`
    height: 300px;
  `}
`;

export const ItemColImg = styled.img`
  margin-top: -25px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
`;

export const ItemAutor = styled.span``;

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
type HeartBtnProps = {
  isActive ?: boolean
}
export const HeartBtn = styled.div<HeartBtnProps>`
  cursor: pointer;
  width: 70px;
  height: 32px;
  display:flex;
  align-items:center;
  justify-content: center;
  background: ${props => props.isActive ? 'red' : 'rgba(19, 12, 26, 0.15)'};
  mix-blend-mode: normal;
  border-radius: 23px;
  position: absolute;
  top: 14px;
  right: 14px;
  z-index: 100;
`;

export const HeartIcon = styled.img``;

export const HeartCnt = styled.span`
  margin-left: 9.5px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: #FFFFFF;
  flex: none;
  order: 1;
  flex-grow: 0;
`;

export const VerifiedIcon = styled.img`
  position: absolute;
  left: 12px;
  top: 14px;
`;

export const SpinnerWrap = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
`;

export const SelectWrap = styled.div`
  background: ${props => props.theme.colors.itemBg};
  border-radius: 5px;
`;