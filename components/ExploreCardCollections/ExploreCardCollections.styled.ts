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
  justify-content: space-between;
  align-items: center;
  width: calc(100% - 104px);
  overflow: hidden;
  margin: 0 auto;
  padding-top: 43px;
  ${breakpoint.mobile`
    flex-direction: column;
    align-items: center;
    height: 100%;
    width: 100%;
  `}
`;

export const Content = styled.div`
  padding: 22px 0 0 0;
  height: 100%;
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
    padding-left: 15px;
    padding-top: 30px;
    padding-right: 15px;
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
    font-size: 32px;
    line-height: 44px;
    color: ${props => props.theme.colors.titleColor};
    text-align: left;
  `};
`;

export const SubTitle = styled.p`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 24px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  margin: 15px 0 21px;

  ${breakpoint.tablet`
    font-size: 18px;
    line-height: 28px;
    margin: 12px 0 32px;
  `};

  ${breakpoint.mobile`
    font-family: 'Futura';
    font-style: normal;
    font-weight: 500;
    font-size: 20px;
    line-height: 130%;
    letter-spacing: 0.01em;
    color: ${props => props.theme.colors.titleColor};
    text-align: left;
  `};
`;

export const ImageContainer = styled(FadeInImageContainer)`
  ${breakpoint.mobile`
    justify-content: space-between;
    margin-top: 32px;
    min-width: unset;
    max-width: calc(100% - 30px);
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
