import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type MainBtnProps = {
  isBackColor: boolean;
}

export const FeatureBtn = styled.button`
  width: 120px;
  height: 28px;
  left: 356px;
  top: 230px;
  background: #9BA2AD;
  backdrop-filter: blur(5px);
  border-radius: 21px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  letter-spacing: 0.01em;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #FFFFFF;
  border: none;
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
  font-size: 16px;
  line-height: 130%;
  letter-spacing: 0.01em;
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
export const Container = styled.div`
  max-width: 1180px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: calc(100% - 104px);
  overflow: hidden;
  margin: 0 auto;
  padding-top: 43px;
  ${breakpoint.mobile`
    flex-direction: column-reverse;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top:0;
  `}
`;

export const Content = styled.div`
  padding: 20px 0 0 0;
  height: 100%;
  margin-right: 63px;
  max-width: 523px;
  width: 100%;
  ${breakpoint.tablet`
    min-width: 420px;
  `}

  ${breakpoint.mobile`
    min-width: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin: 0;
    padding: 0;
    padding-left: 20px;
    padding-top: 20px;
    padding-right: 20px;
  `}
`;
export const Artist = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 130%;
  color: ${props => props.theme.colors.genColor};
  margin-top: 14px;
  margin-bottom: 16px;
  ${breakpoint.mobile`
    text-align: left;
    margin: 5px 0;
    font-size: 14px;
  `}
`;
export const Title = styled.h1`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 1.2;
  margin-top:15px;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 10px;
  ${breakpoint.tablet`
    font-size: 32px;
    line-height: 1.2;
  `};

  ${breakpoint.mobile`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 44px;
    color: ${props => props.theme.colors.titleColor};
    text-align: left;
  `};
`;

export const SubTitle = styled.p`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 1.6;
  color: ${props => props.theme.colors.titleColor};
  max-width: 523px;
  margin: 10px 0;
  ${breakpoint.tablet`
  `};

  ${breakpoint.mobile`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 18px;
    line-height: 1.6;
    letter-spacing: 0.01em;
    color: ${props => props.theme.colors.titleColor};
    text-align: left;
    margin: 10px 0;
  `};
`;

export const ImageContainer = styled(FadeInImageContainer)`
  width: 100%;
  ${breakpoint.mobile`
    justify-content: space-between;
    margin-top: 20px;
    min-width: unset;
    max-width: calc(100% - 40px);
  `};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  ${breakpoint.mobile`
    width: 100%;
    flex-direction: column;
    padding-bottom: 0;
  `};
`;


export const AuctionBox = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  background-color: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 12px;
  padding: 24px 28px;
  margin: 35px 0;
  ${breakpoint.mobile`
    margin-top: 10px;
    padding: 12px 8px;
  `}
`;
export const AuctionLeft = styled.div`
  display: flex;
  flex-direction: column;
  width: 50%;
`;
export const GreyText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  margin-bottom:10px;
  color: ${props => props.theme.colors.volSub};
  ${breakpoint.mobile`
    text-align: left;
  `}
`;
export const BoldText = styled.h2`
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
    margin: 5px 0;
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
  width: 50%;
`;
export const Divider = styled.div`
  width: 25px;
`;