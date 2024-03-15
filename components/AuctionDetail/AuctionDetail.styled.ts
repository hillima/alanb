import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type MainBtnProps = {
  isBackColor: boolean;
  isDisabled?: boolean;
}

export const Container = styled.div`
  display: flex;
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 50px;
  ${breakpoint.mobile`
  flex-direction: column;
  width: 100%;
  padding:20px;
  `};
`;

export const LeftView = styled.div`
  width: 48%;
  margin-right: 3%;
  ${breakpoint.mobile`
  width: 100%;
  margin-right: 0;
  `};
`;

export const Name = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 1.2;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
  font-size: 32px;
  line-height: 1.2;
  margin-bottom:10px;
  `};
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
  margin-top: 20px;
  margin-bottom: 20px;
  ${breakpoint.mobile`
  margin-top: 5px;
  margin-bottom: 5px;
  `};
`;
export const Divider = styled.div`
  width: 10px;
`;

export const Description = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 1.6;
  color: ${props => props.theme.colors.genColor};
`;

export const AtrText = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 170%;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 21px;
  ${breakpoint.mobile`
  padding-top: 15px;
  `};
`;
export const AtrWrap = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 20px;
  margin-bottom:20px;
  ${breakpoint.mobile`
    margin-top: 10px;
    margin-bottom: 10px;
  `}
`;
export const AtrBox = styled.div`
  display: flex;
  flex-direction: column;
  padding: 11px;
  background-color: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 8px;
  align-items: flex-start;
`;
export const AtrGrey = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  color: ${props => props.theme.colors.genColor};
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
  width: 49%;
  ${breakpoint.mobile`
  width: 100%;
  `};
`;

export const ImageContainer = styled(FadeInImageContainer)`
  ${breakpoint.mobile`
    margin-top: 0;
    max-width: 100%;
  `};
`;


export const AuctionDetailTime = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
  font-size: 24px;
`}
`;


export const AuctionBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 16px;
  padding: 30px;
  margin: 30px 0;
  ${breakpoint.mobile`
  padding: 15px;
  margin: 20px 0;
  `};
`;
export const AuctionLeft = styled.div`
  display: flex;
  flex-direction: column;
  ${breakpoint.mobile`
  padding-bottom: 0px;
  margin-bottom: 0;
`};
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
  ${breakpoint.mobile`
    font-size: 24px;
    margin-bottom: 10px;
  `}
`;

export const BoldTextb = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.01em;
  margin-top: 5px;
  margin-bottom: 5px;
  color: ${props => props.theme.colors.titleColor};
  display: flex;
  ${breakpoint.mobile`
    font-size: 24px;
    margin-bottom: 10px;
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
  ${breakpoint.mobile`
    font-size: 10px;
  `}
`;
export const AuctionRight = styled.div`
  display: flex;
  flex-direction: column;
`;
export const Dividera = styled.div`
  width: 25px;
`;

export const LastestBox = styled.div`
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 12px;
  display: flex;
  flex-direction: column-reverse;
  margin-bottom: 18px;
  padding: 20px;
  ${breakpoint.mobile`
  padding: 10px;
`}
`;

export const LastestGrey = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #9BA2AD;
  ${breakpoint.mobile`
  font-size: 9px;
`}
`;
export const LastestBold = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  ${breakpoint.mobile`
  padding: 10px;
  font-size: 9px;
`}
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
  background-color: ${props => props.isBackColor ? props.theme.colors.btnBorder : props.theme.colors.btnBg};
  color: ${props => !props.isBackColor ? props.theme.colors.btnTitle : props.theme.colors.btnbgTitle};
  border: 1.5px solid #7B0A75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.01em;
  opacity: ${props => props.isDisabled ? 0.7 : 1};
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

export const HowDesc = styled.p`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 170%;
  color: ${props => props.theme.colors.titleColor};
`;

export const BidWrap = styled.div`
  display: flex;
  ${breakpoint.mobile`
  display: block;
  `}
`;

export const AvailbleBal = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 170%;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 3px;
`;

export const ErrorText = styled.h3`
  font-size: 12px;
  color: ${props => props.theme.colors.genColor};
  margin-top: 3px;
`;

export const NextBidText = styled.h3`
  font-size: 12px;
  color: ${props => props.theme.colors.genColor};
  margin-bottom: 8px;
`;

export const NextMinimumBtn = styled.button`
  margin-top: 8px;
  border: 1px solid ${props => props.theme.colors.genColor};
  color: ${props => props.theme.colors.genColor};
  margin-right: 5px;
  font-size: 12px;
  display: flex;
  align-items: center;
  height: 30px;
  padding: 10px;
  border-radius: 5px;
`;