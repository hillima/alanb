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
    margin-top: 40px;
  `}
`;

export const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const TopLeftWrap = styled.div`
  display: flex;
  ${breakpoint.mobile`
    justify-content: space-between;
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
`;

export const ItemWrap = styled.div<ItemWrapProps>`
  margin-top: 31px;
  margin-bottom: 50px;
  display: grid;
  grid-template-columns: ${props => `repeat(${props.columns}, minmax(0,1fr) )`};
  column-gap: 20px;
  ${breakpoint.mobile`
    display: flex;
    overflow-x: scroll;
    overflow-y: hidden;
    padding-bottom: 10px;
    margin-bottom: 50px;
    margin-top: 20px;
    column-gap: 12px;
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
    max-height: 433px;
    filter: none;
    height: auto;
    padding-bottom: 15px;
    border: 1px solid rgba(0, 0, 0, 0.15);
  `}
`;

export const ItemImg = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: center;
`;

export const ItemColName = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 7px;
  text-align: center;
  width: 200px;
  overflow:hidden;       
  text-overflow:ellipsis;
  white-space:nowrap;  
`;

export const ItemCreator = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 8px;
  margin-bottom: 16px;
`;

export const ItemBy = styled.span`
  margin-right: 4px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: #9BA2AD;
`;

export const ItemPrice = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.priceColor};
  align-items: center;
  display: flex;
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

export const ItemColImg = styled.img`
  margin-top: -25px;
  width: 48px;
  height: 48px;
  border: 2px solid ${props => props.theme.colors.bgColor};
  border-radius: 100%;
  @media(max-width: 598px){
    position: relative;
  }
`;

export const XprIcon = styled.img`
  margin-right: 8px;
`;

export const ArrowWrap = styled.div`
  display: flex;
  margin-left: 23px;
`;
export const ArrowLeftBtn = styled.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
`;
export const ArrowRightBtn = styled.img`
  cursor: pointer;
  width: 32px;
  height: 32px;
`; 

export const HeartBtn = styled.div`
  width: 70px;
  height: 32px;
  display:flex;
  align-items:center;
  justify-content: center;
  background: rgba(19, 12, 26, 0.15);
  mix-blend-mode: normal;
  border-radius: 23px;
  position: absolute;
  top: 14px;
  right: 14px;
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


export const SpinnerWrap = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
`;