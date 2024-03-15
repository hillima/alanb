import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type MainBtnProps = {
  isBackColor: boolean;
}
type AtrProps = {
  active: boolean;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: 1170px;
  margin: 0 auto;
  padding-top: 68px;
  padding-right: 20px;
  padding-left: 20px;
  ${breakpoint.mobile`
  padding-top: 20px;
`}
`;

export const LeftView = styled.div`
  padding-right: 20px;
  width: 50%;
  flex: 0 0 auto;
  ${breakpoint.mobile`
  width: 100%;
  padding-right: 0;
`}
`;

export const Name = styled.h2`
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 32px;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
  font-size:24px;
`}
`;
export const GreyText = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #A6A9B9;
`;
export const BoldText = styled.span`
  cursor: pointer;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;

export const ButtonWrap = styled.div`
  display: flex;
  margin-top: 25px;
  padding-bottom: 25px;
  border-bottom: 1px solid ${props => props.theme.colors.altbgColor};
`;
export const Divider = styled.div`
  width: 10px;
`;

export const Description = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 170%;
  color: ${props => props.theme.colors.titleColor};
`;

export const AtrText = styled.h3<AtrProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 170%;
  color: ${props => props.active ? props.theme.colors.activeTab : props.theme.colors.inActiveTab};
`;
export const AtrWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
  ${breakpoint.mobile`
  grid-template-columns: repeat(2, minmax(0, 1fr));

`}
`;
export const AtrBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  background: ${props => props.theme.colors.altbgColor};
  border-radius: 8px;
  align-items: flex-start;
`;
export const AtrGrey = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  text-align: center;
  text-transform: uppercase;
  color: #A6A9B9;
`;
export const AtrColor = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 2px;
  margin-bottom: 2px;
`;
export const AtrMain = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  color: #7B0A75;
`;

export const RightView = styled.div`
  padding-left: 20px;
  width: 50%;
  flex: 0 0 auto;
  color:${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
  width: 100%;
  padding-top: 20px;
  padding-left:0;
`}
`;

export const ImageContainer = styled(FadeInImageContainer)`
  ${breakpoint.mobile`
    justify-content: space-between;
    margin-top: 0px;
    min-width: unset;
    max-width: calc(100% - 0px);
  `};
  .__react_modal_image__modal_content{
    background: rgba(0, 0, 0, 0.9);
  }
  .__react_modal_image__header{
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row-reverse;
    background: none;
  }
`;

export const AuctionBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 16px;
  padding: 20px;
  margin-top: 20px;
  margin-bottom: 20px;
  ${breakpoint.mobile`
    font-size: 24px;
    line-height: 1;
  `}
`;
export const AuctionLeft = styled.div`
  display: flex;
  flex-direction: column;
`;
export const GreyTexta = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #9BA2AD;
`;
export const BoldTexta = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  display: flex;
  margin-top 10px;
  margin-bottom: 10px;
  ${breakpoint.mobile`
    font-size: 24px;
    line-height: 1;
  `}
`;
export const SmalText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  display: flex;
`;
export const AuctionRight = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 53px;
`;
export const Dividera = styled.div`
  width: 25px;
`;

export const LastestBox = styled.div`
  background: #F7F8FA;
  border: 1px solid #ECF0F1;
  border-radius: 12px;
  display: flex;
  align-items: center;
  height: 68px;
  padding-left: 28px;
  padding-right: 23px;
  justify-content: space-between;
  margin-bottom: 18px;
`;

export const LastestGrey = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #9BA2AD;
`;
export const LastestBold = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;
export const LastestSee = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  /* identical to box height, or 16px */

  letter-spacing: 0.01em;

  color: #7B0A75;
`;

export const MainBtn = styled.button<MainBtnProps>`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #7B0A75;
  color: #FFFFFF;
  border: 1.5px solid #7B0A75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.01em;
  :disabled{
    opacity: 0.8;
  }
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

export const HowText = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 170%;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 23px;
  margin-bottom: 7px;
`;

export const HowDesc = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 170%;
  color: ${props => props.theme.colors.titleColor};
`;

export const ArrowWrap = styled.div`
  width: 100%; 
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
    ${breakpoint.mobile`
    margin-top: 20px;
    margin-bottom: 20px;
  `}
`;

export const NoList = styled.h2`
  margin-top: 40px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
`;

export const AboutDesc = styled.p`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
  color: #9BA2AD;
`;

export const DetailWrap = styled.div`
  display: flex;
  flex-direction: column;
`;
export const DetailLine = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
export const DetailGrey = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  color: #9BA2AD;
`;
export const DetailAdr = styled.div`
  cursor: pointer;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  text-align: right;
  color: #9BA2AD;
  display: flex;
  align-items: center;
`;

export const RatingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 4px;
`;

export const Wrap = styled.div`
  display: flex;
  max-width: 1170px;
  padding-bottom: 80px;
  width: 100%;
    ${breakpoint.mobile`
    display: initial;
    padding-bottom: 0;
  `}
`;


export const BidsWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  ${breakpoint.mobile`
    overflow-x: scroll;
  `}
`;
export const BidsTop = styled.div`
  display: flex;
  justify-content: space-around;
  padding-right: 10px;
  align-items:center;
  ${breakpoint.mobile`
    width: 600px;
  `}
`;
type WidthProps = {
  width: string;
}
export const BidsGrey = styled.h4<WidthProps>`
  padding: 5px 0;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  color: ${props => props.theme.colors.genColor};
  text-align: left;
  width: ${({width}) => width};
  ${breakpoint.mobile`
    width:100%;
    display: flex;
    justify-content: left;
  `}
`;

export const BidsLine = styled.div`
  display: flex;
  justify-content: space-around;
  ${breakpoint.mobile`
    width: 600px;
    padding-top: 10px;
    padding-bottom: 10px;
  `}
`;

export const BidsText = styled.h4<WidthProps>`
  width: ${({width}) => width};
  padding: 15px 0;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 1.2;
  color: ${props => props.theme.colors.titleColor};
  display: flex;
  align-items: left;
  ${breakpoint.mobile`
    width:100%;
    justify-content: left;
    font-size: 12px;
  `}
`;

export const ScrollWrap = styled.div`
  height: 250px;
  overflow-y: auto;
  padding-right: 10px;
  padding-bottom: 10px;
  ::-webkit-scrollbar {
    width: 5px;
    border-radius: 30px;
  }
  ::-webkit-scrollbar-thumb {
    background-color: #D9D9D9;
  }
  ::-webkit-scrollbar-track {
    background-color: none;
  }
  ${breakpoint.mobile`
    width: max-content;
    overflow-y: auto;
    padding-right: 0;
    padding-bottom: 10px;
  `}
`;