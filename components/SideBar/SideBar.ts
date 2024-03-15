import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type StyledActiveProps = {
  active: boolean;
  hide ?: boolean;
};
type HideProps = {
  hide?: boolean;
  mobileHide?: boolean;
}

export const Wrap = styled.div<HideProps>`
  width: ${props => props.hide ? '100px' : '302px'};
  position: fixed;
  background: ${props => props.theme.colors.sideBg};
  border-right: 1.5px solid ${props => props.theme.colors.sideBorder};
  padding: 40px 18px 0 18px;
  z-index: 104;
  height: 100%;
  ${breakpoint.laptop`
    width: 100px;
  `}
  :hover{
    width: 302px;
    #tab-text{
      display: block;
    }
  }
  @media(max-width: 598px){
    display: ${props => props.mobileHide ? 'none' : 'block'};
    width: 200px;
    top: 80px;
    padding: 20px 9px 0 9px;
    :hover{
      width: 200px;
    }
  }
`;

export const Zone = styled.div`
  margin-top: 50px;
  ${breakpoint.mobile`
    margin-top: 35px;
  `}
`;

export const Title = styled.h3<HideProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 130%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.subColor};
  padding-left: 16px;
  padding-bottom: 13px;
  display: ${props => props.hide ? 'none' : 'block'};
  ${breakpoint.laptop`
    display: none;
  `}
  @media(max-width: 598px){
    display: block;
  }
`;

export const Tab = styled.div<StyledActiveProps>`
  cursor: pointer;
  display: flex;
  align-items: center;
  height: 44px;
  background: ${(props => props.active ? props.theme.colors.bgColor : "none")};
  padding: 12px 0 12px 19px;
  border-radius: 10px;
  @media(max-width: 598px){
    padding: 12px 0 12px 9px;
  }
`;

export const TabText = styled.h3<StyledActiveProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  max-width: 170px;
  letter-spacing: 0.01em;
  color: ${props => props.active ? props.theme.colors.sideActive : props.theme.colors.titleColor};
  display: ${props => props.hide ? 'none':'block'};
  ${breakpoint.laptop`
    display: none;
  `}
  @media(max-width: 598px){
    display: block;
    font-size: 12px;
    max-width: 110px;
  }
`;

export const DeskTopImg = styled.div`
  width: 100%;
  height: 51px;
  background: ${props => props.theme.images.logoImg};
  background-size: cover;
`;

export const DeskTopSmImg = styled.div`
  width: 56px;
  height: 56px;
  background: ${props => props.theme.images.logoImg};
  background-size: cover;
`;
type ActiveProps = {
  active: boolean;
}
export const ColIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.active ? props.theme.images.sideActColImg : props.theme.images.sideColImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;

export const AucIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.active ? props.theme.images.sideActAucImg : props.theme.images.sideAucImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;

export const CreIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.theme.images.sideCreImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;

export const AppIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.active ? props.theme.images.sideActAppImg : props.theme.images.sideAppImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;

export const ApAuIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.active ? props.theme.images.sideActApAuImg : props.theme.images.sideApAuImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;

export const IntIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.active ? props.theme.images.sideActIntImg : props.theme.images.sideIntImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;

export const WallIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.active ? props.theme.images.sideActWallImg : props.theme.images.sideWallImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;

export const ClockIcon = styled.div<ActiveProps>`
  width: 24px;
  height: 24px;
  margin-right: 20px;
  background: ${props => props.active ? props.theme.images.sideActClockImg : props.theme.images.sideClockImg};
  background-size: cover;
  @media(max-width: 598px){
    margin-right: 10px;
  }
`;


export const SocialZone = styled.div<HideProps>`
  display: ${props => props.hide ? 'none' : 'grid'};
  position: fixed;
  width: 262px;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(2, minmax(0,1fr) );
  border-top: 1px solid #33273F;
  padding-top: 20px;
  bottom: 20px;
  @media(max-width: 890px){
    display: ${props => props.mobileHide ? 'none' : 'grid'};
    width: 182px;
  }
`;

export const SocialItem = styled.div<HideProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  display: ${props => props.hide ? 'none' : 'flex'};
  border: 1px solid #33273F;
  border-radius: 5px;
  font-size: 14px;
  padding: 6px;
  color: ${props => props.theme.colors.subColor};
  img{
    margin-right: 5px;
  }
  @media(max-width: 890px){
    font-size: 14px;
    display: ${props => props.mobileHide ? 'none' : 'flex'};
  }
`;