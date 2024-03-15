import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type ItemPerProps = {
  isUp: boolean
}

export const Container = styled.div`
  background: ${props => props.theme.colors.blogColor};
  padding: 60px;
  max-height: 660px;
  display: flex;
  flex-direction: column;
  ${breakpoint.mobile`
    padding: 0;
    padding-top: 42px;
    padding-left: 15px;
    padding-right: 16px;
  `}
`;

export const TopWrap = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Title = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 28px;
  line-height: 37px;
  text-align: center;
  color: ${props => props.theme.colors.titleColor};
`;
export const ArrowIcon = styled.img`
  width: 10px;
  height: 10px;
  margin-left: 8px;
`;

export const SubTitle = styled.h2`
  display: flex;
  align-items: center;
  margin-top: 19px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.topAuthor};
`;

export const ItemWrap = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 23px;
  margin-top: 31px;
  margin-bottom: 113px;
  ${breakpoint.mobile`
    display: flex;
    overflow-x: scroll;
    padding-bottom: 10px;
    margin-bottom: 10px;
    column-gap: 12px;
  `}
`;

export const Item = styled.div`
  display: flex;
  width: 100%;
  margin-bottom: 28px;
  mix-blend-mode: normal;
  filter: drop-shadow(0px 0px 20px rgba(0, 0, 0, 0.15));
  border-radius: 16px;
  background-color: ${props => props.theme.colors.itemBg};
  padding: 20.41px 24px 20.59px 21px;
  ${breakpoint.mobile`  
    margin-bottom: 0;
    min-width: 300px;
    filter: none;
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
  border-radius: 12px;
  max-height: 168px;
`;

export const ItemColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  align-items: flex-start;
`;

export const ItemName = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 130%;
  color: ${props => props.theme.colors.titleColor};
  padding-top: 12px;
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
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.subColor};
`;

export const ItemPer = styled.h4<ItemPerProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.isUp ? '#43B70D' : '#FB8C0A'};
`;

export const ItemContent = styled.h4`
  margin-top: 8.41px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.titleColor};
  opacity: 0.5;
`;

export const ItemDetail = styled.h4`
  cursor: pointer;
  display: flex;
  align-items: center;
  margin-top: 23px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.topAuthor};
`;

export const ItemImgWrap = styled.div`
  width: 100%;
  height: auto;
  min-height: 190px;
  max-height: 190px;
  border-radius: 10px 10px 0px 0px;
  overflow: hidden;
`;


export const ArrowWrap = styled.div`
  display: flex;
  margin: 0 auto;
  margin-bottom: 32px; 
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