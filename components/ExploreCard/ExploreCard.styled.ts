import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type MainBtnProps = {
  isBackColor: boolean;
}

export const MainBtn = styled.button<MainBtnProps>`
  width: 200px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
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
  display: flex;
  justify-content: center;
  border-radius: 16px;
  overflow: hidden;
  padding-top: 80px;
  margin: 0 auto;
  ${breakpoint.mobile`
    flex-direction: column-reverse;
    align-items: center;
    height: 100%;
    width: 100%;
    padding-top: 0px;
    padding-left:20px;
    padding-right:20px;
  `}
`;

export const Content = styled.div`
  padding: 22px 0 40px 0;
  height: 100%;
  width: 500px;
  margin-right: 20px;
  ${breakpoint.tablet`
    min-width: 420px;
    width: 420px;
  `}

  ${breakpoint.mobile`
    min-width: unset;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    width: 100%;
    margin: 0;
    padding: 30px 0 0 0;
    padding-top: 30px;
  `}
`;

export const Title = styled.h1`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 54px;
  line-height: 70px;
  color: ${props => props.theme.colors.titleColor};
  max-width: 534px;

  ${breakpoint.tablet`
    font-size: 32px;
    line-height: 48px;
  `};

  ${breakpoint.mobile`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 1.1;
    color: ${props => props.theme.colors.titleColor};
    text-align: left;
  `};
`;

export const SubTitle = styled.p`
  max-width: 450px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  line-height: 130%;
  color: ${props => props.theme.colors.subColor};
  margin: 16px 0 40px;

  ${breakpoint.tablet`
    font-size: 18px;
    line-height: 1.6;
    margin: 15px 0;
  `};

  ${breakpoint.mobile`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 400;
    font-size: 16px;
    line-height: 1.6;
    color: ${props => props.theme.colors.titleColor};
    text-align: left;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    margin: 15px 0;
  `};
`;

export const ImageContainer = styled(FadeInImageContainer)`
  max-width: 500px;
  max-height: 500px;
  ${breakpoint.mobile`
    justify-content: space-between;
    margin-top: 12px;
    min-width: unset;
    max-width: 100%;
    height: 350px;
  `};
`;

export const ButtonWrapper = styled.div`
  display: flex;
  padding-bottom: 50px;
  ${breakpoint.mobile`
    width: 100%;
    flex-direction: column;
    padding-bottom: 0;
  `};
`;


export const FloatRight = styled.div`
  position: absolute;
  right: 15px;
  margin-top: 20px;
  display: flex;
`;

export const TopWrap = styled.div`
  margin: 20px;
  display: flex;
  position: absolute;
  height: 28px;
  justify-content: space-between;
`;

export const GreyBack = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 6px 10px;
  background: rgba(19, 12, 26, 0.15);
  backdrop-filter: blur(5px);
  border-radius: 21px;
`;

export const WhiteText = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
  letter-spacing: 0.01em;
  color: #FFFFFF;
`;

export const BottomWrap = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  margin-top: -85px;
  margin-left: 25px;
`;
export const NftName = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  text-align: left;
`;
export const Author = styled.h3`
  font-family: 'Outfit';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #93989A;
  margin-top: 4px;
  margin-bottom: 10.69px;
  text-align: left;
`;
export const BidText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  margin-bottom: 4px;
  text-align: left;
`;
export const BidPrice = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: #FFFFFF;
  text-align: left;
`;

export const BidBtn = styled.button`
  position: absolute;
  margin-top: -50px;
  right: 0;
  padding: 5px 10px;
  height: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 25px;
  background-color: #7B0A75;
  color: #FFFFFF;
  border: 1.5px solid #7B0A75;
  border-radius: 8px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  text-align: center;
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

export const BackOverlay = styled.div`
  border-radius: 18px;
  width: 100%;
  height: 100%;
  position: absolute;
  background: linear-gradient(180deg, rgba(5, 34, 81, 0) 45.31%, rgba(5, 34, 81, 0.84) 100%); 
  ${breakpoint.mobile`
    height: 350px
  `}
`;

export const PrevBtn = styled.button`
  margin-left: -14px;
  cursor: pointer;
  display: flex;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: #7B0A75;
  box-shadow: 20px 14px 60px rgba(0, 0, 0, 0.05);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  position: absolute;
  z-index: 1;
  @media(max-width: 598px){
    margin-left: 0;
    left: 0;
  }
`;
export const NextBtn = styled.button`
  margin-left: 485px;
  margin-right: 37px;
  cursor: pointer;
  display: flex;
  height: 32px;
  width: 32px;
  align-items: center;
  justify-content: center;
  border: none;
  border-radius: 50%;
  background: #7B0A75;
  box-shadow: 20px 14px 60px rgba(0, 0, 0, 0.05);
  transform: matrix(-1, 0, 0, 1, 0, 0);
  position: absolute;
  z-index: 1;
  @media(max-width: 890px){
    margin: 0;
    right: 0;
  }
`;