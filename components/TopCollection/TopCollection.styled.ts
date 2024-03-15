import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type ItemPerProps = {
  isUp: boolean;
}
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: calc(100% - 40px);
  margin: 0 auto;
  margin-top: 50px;
  height: auto;
  ${breakpoint.mobile`
    margin-top: 0;
    width: 100%;
    height: 100%;
    padding-left:20px;
    padding-right:20px;
  `}
`;

export const TopWrap = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 31px;
`;

export const TopLeftWrap = styled.div`
  display: flex;
  align-items: flex-end;
  ${breakpoint.mobile`
    width: 100%;
    display: block;
  `}  
`;


export const Title = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 32px;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
    font-size: 20px;
    width: 100%;
  `}
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
  cursor: pointer;
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
  `}
`;

export const ItemWrap = styled.div`
  display: grid;
  column-gap: 28px;
  margin-bottom: 50px;
  grid-template-columns: repeat(3, 3fr);   
  .item:nth-child(1) { order: 1; } 
  .item:nth-child(2) { order: 4; } 
  .item:nth-child(3) { order: 7; } 
  .item:nth-child(4) { order: 2; } 
  .item:nth-child(5) { order: 5; } 
  .item:nth-child(6) { order: 8; } 
  .item:nth-child(7) { order: 3; } 
  .item:nth-child(8) { order: 6; } 
  .item:nth-child(9) { order: 9; } 
  ${breakpoint.mobile`
    grid-template-columns: none;   
    .item:nth-child(1) { order: 1; } 
    .item:nth-child(2) { order: 2; } 
    .item:nth-child(3) { order: 3; } 
    .item:nth-child(4) { order: 4; } 
    .item:nth-child(5) { order: 5; } 
    .item:nth-child(6) { order: 6; } 
    .item:nth-child(7) { order: 7; } 
    .item:nth-child(8) { order: 8; } 
    .item:nth-child(9) { order: 9; } 
    margin-bottom: 0;
  `}
`;

export const Item = styled.div`
  display: flex;
  height: 54px;
  align-items: center;
  margin-bottom: 28px;
  
  ${breakpoint.mobile`
    margin: 0;
    margin-bottom: 32px;
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
  margin-left: 23px;
  margin-right: 18px;
  width: 54px;
  height: 54px;
  border-radius: 10px;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 60%;
`;

export const ItemColName = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
`;
export const ItemRight = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
  width: 20%;
`;

export const ItemVol = styled.h4`
  margin-top: 8px;
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.altpriceColor};
`;

export const ItemPer = styled.div<ItemPerProps>`
  height: 100%;
  display: flex;
  align-items: center;
`;


export const SpinnerWrap = styled.div`
  min-height: 200px;
  display: flex;
  align-items: center;
`;


export const SelectWrap = styled.div`
  background: ${props => props.theme.colors.itemBg};
  border-radius: 5px;
  ${breakpoint.mobile`
    width: 50%;
    .MuiInputBase-root{
      width: 100%;
    }
  `}
  .top-col-select .MuiSelect-select{
    border-radius:8px;
    background: ${props => props.theme.colors.altbgColor};
    padding: 12px 32px 12px 20px;
  }
  .col-form-select .MuiSelect-select{
    border-radius:8px;
    background: ${props => props.theme.colors.altbgColor};
    padding: 12px 32px 12px 20px;
  }
  .col-form-select .MuiSvgIcon-root{
    color: ${props => props.theme.colors.muiSvgColor};
  }
  .top-col-select .MuiSvgIcon-root{
    color: ${props => props.theme.colors.muiSvgColor};
  }
`;