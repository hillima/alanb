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
  min-height: 800px;
  margin: 0 auto;
  margin-top: 20px;
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
  width: 100%;
  justify-content: space-between;
`;

export const TopLeftWrap = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: space-between;
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
  min-width: 250px;
`;

export const SelectBox = styled.select`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  color: #A6A9B9;
  width: 155px;
  height: 100%;
  margin-left: 15px;
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
    width: 100%;
    margin: 0;
    margin-top: 20px;
    padding-left: 100px;
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
    margin-bottom: 41px;
  `}
`;

export const ItemWrap = styled.div<ItemWrapProps>`
  margin-top: 20px;
  margin-bottom: 60px;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, minmax(0,1fr) )`};
  column-gap: 20px;
  ${breakpoint.mobile`
    grid-template-columns: none;
    margin-bottom: 0;
    margin-top: 20px;
  `}
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  margin-bottom: 20px;
  justify-content: space-around;
  mix-blend-mode: normal;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15));
  border-radius: 16px;
  background-color: ${props => props.theme.colors.itemBg};
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
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
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
  color: ${props => props.theme.colors.titleColor};
`;


export const ItemImgWrap = styled.div`
  width: 100%;
  height: 260px;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
  ${breakpoint.mobile`
  height: auto;
`}
`;

export const ItemColImg = styled.img`
  margin-top: -25px;
  width: 48px;
  height: 48px;
  border-radius: 50%;
  border: 2px solid #FFFFFF;
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

export const SearchWrap = styled.div`
  width: 100%;
  margin-left: 72px;
`;

export const SelectWrap = styled.div`
  display: flex;
  .top-col-select .MuiSelect-select{
    border-radius:8px;
    background: ${props => props.theme.colors.altbgColor};
    padding: 14px 20px;
  }
  .col-form-select .MuiSelect-select{
    border-radius:8px;
    background: ${props => props.theme.colors.altbgColor};
    padding: 14px 20px;
  }
  .col-form-select .MuiSvgIcon-root{
    color: ${props => props.theme.colors.muiSvgColor};
  }
  .top-col-select .MuiSvgIcon-root{
    color: ${props => props.theme.colors.muiSvgColor};
  }
`;

export const SpinnerWrap = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
`;

export const ItemBottom = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0.75rem;
`;



export const GridWrap = styled.div`
  margin-top: 30px;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  ${breakpoint.mobile`
    width: 100%;
    overflow: scroll;
  `}
`;
export const GridHeader = styled.div`
  display: flex;
  padding-bottom: 11px;
  width: 100%;
  ${breakpoint.mobile`
    width: 1000px;
  `}
`;
export const GridItem = styled.div`
  display: flex;
  border-bottom: 1px solid ${props => props.theme.colors.colBorder};
  padding-bottom: 14px;
  padding-top: 14px;
`;

type WidthtProps = {
  width: string;
}
export const GridHeaderText = styled.h4<WidthtProps>`
  width: ${props => props.width};
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: ${props => props.theme.colors.volSub};
`;

export const GridItemTem = styled.div<WidthtProps>`
  display: flex;
  align-items: center;
  width: ${props => props.width};
  color: ${props => props.theme.colors.colText};
  ${breakpoint.mobile`
  font-size: 14px;
`}
`;

export const GridColName = styled.h4`
  padding-left: 20px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
  font-size: 14px;
`}
`;

export const GridScroll = styled.div`
  height: 800px;
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
  `}
`;


export const RightWrap = styled.div`
  margin-left: 16px;
  display: flex;
  min-width: 95px;
  max-width: 95px;
  width: 7%;
  justify-content: space-between;
`;


type ActiveBoxProps = {
  isActive: boolean;
}
export const ActiveBox = styled.div<ActiveBoxProps>`
  cursor: pointer;
  width: 45px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${props => props.isActive ? '#7B0A75' : 'none'};
  border: 1.5px solid #7B0A75;
  border-radius: 8px;
`;