import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type RoundButtonProps = {
  size?: string;
  padding?: string;
  margin?: string;
};

export const PageHeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 78px;
`;

export const PageHeaderAvatarContainer = styled.div`
  position: relative;
`;

export const ImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 100%;
  overflow: hidden;
  ${breakpoint.mobile`
    width: 112px;
    height: 112px;
    margin-bottom: 24px;
  `}
`;

export const VerifiedIconContainer = styled.div`
  position: absolute;
  bottom: 12px;
  right: 0;

  ${breakpoint.mobile`
    bottom: 20px;
  `}
`;

export const Name = styled.p`
height: 67px;
margin-top: 7px;
margin-bottom: 20px;
font-family: 'Futura';
font-style: normal;
font-weight: 700;
font-size: 32px;
line-height: 70px;
text-align: center;
color: ${props => props.theme.colors.titleColor};

  ${breakpoint.mobile`
    font-size: 40px;
    line-height: 1.4;
    height: auto;
  `}
`;

export const SubName = styled.p`
  line-height: 24px;
  font-size: 18px;
  color: #808080;
  margin-bottom: 24px;

  ${breakpoint.mobile`
    font-size: 21px;
    line-height: 1.52;
  `}
`;

export const RoundButton = styled.button<RoundButtonProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  background-color: transparent;
  height: ${({ size }) => size || 'auto'};
  width: ${({ size }) => size || 'auto'};
  padding: ${({ padding }) => padding || 0};
  margin: ${({ margin }) => margin || 0};
  border-radius: 20px;
  border: 1px solid #e6e6e6;
  cursor: pointer;
  outline: none;
  font-size: 16px;
  line-height: 24px;

  :hover {
    background-color: rgba(230, 230, 230, 0.3);
  }

  ${breakpoint.mobile`
    margin-top: 5px;
  `}

  > svg {
    position: absolute;
    left: 7px;
    top: 6px;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 43px;
`;

export const BlockName = styled.span`
  margin-left: 5px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 32px;
  text-align: right;
  color: #9BA2AD;
`;