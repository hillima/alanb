import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

export const StyledFooter = styled.div`
  width: 100%;
  background: ${props => props.theme.colors.sideBg};
  mix-blend-mode: normal;
  border-top: 1.5px solid ${props => props.theme.colors.footerBorder};
  ${breakpoint.tablet`
    flex-direction: column;
    justify-content: center;
  `}
`;
export const FooterWrap = styled.div`
  max-width: calc(100% - 64px);
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 auto;
  ${breakpoint.mobile`
  max-width: 100%;
  padding-left: 20px;
  padding-right: 20px;
  `};
`;  
export const FooterBottomWrap = styled.div`
  display: flex;
  border-top: 1px solid ${props => props.theme.colors.footerBorder};
  ${breakpoint.mobile`
  padding-left: 20px;
  padding-right: 20px;
  `};
`;
export const ImageContainer = styled(FadeInImageContainer)`
  margin: 20px 0;
`;

export const Section = styled.section`
  display: flex;
  justify-content: space-between;

  ${breakpoint.tablet`
    flex-direction: column;
    justify-content: center;
  `}
`;

export const FooterLink = styled.a`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.titleColor};
  cursor: pointer;
  margin-left: 27px;
  padding: 30px 0;
  text-align: center;
  transition: 0.2s;

  :hover,
  :focus-visible {
    color: #1a1a1a;
  }

  ${breakpoint.tablet`
    padding: 0;
    margin: 0 0 15px;

    &:last-of-type {
      margin-bottom: 24px;
    }
  `}
`;


export const CopyText = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.genColor};
  margin-left: 20px;
  padding: 30px 0;
  ${breakpoint.mobile`
    margin-left: 20px;
    padding: 0;
  `};
`;

export const BottomLeft = styled.div`
    height: 100%;
    display: flex;
    width: 90%;
  ${breakpoint.mobile`
  display: inline-block;
  width: 100%;
  padding-top: 20px;
  `};
`;

export const BottomRight = styled.div`
    height: 100%;
    display: flex;
    padding: 30px 0;
`;


export const LogoIcon = styled.div`
  width: 210px;
  height: 56px;
  background: ${props => props.theme.images.logoImg};
  background-size: cover;
`;