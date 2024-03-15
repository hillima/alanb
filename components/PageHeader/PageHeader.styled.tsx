import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type RoundButtonProps = {
  size?: string;
  padding?: string;
  margin?: string;
};

export const PageHeaderContainer = styled.div`
  margin-top: 20px;
  display: flex;
  padding-left: 20px;
  padding-right: 20px;
  ${breakpoint.mobile`
    padding-left: 20px;
    padding-right: 20px;
    display: block;
  `}
`;

export const PageHeaderAvatarContainer = styled.div`
  position: relative;
  ${breakpoint.mobile`
  text-align: -webkit-center;
`}
`;

export const ImageContainer = styled.div`
  width: 120px;
  height: 120px;
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
  font-family: 'Futura';
  font-style: normal;
  font-weight: 700;
  font-size: 32px;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 20px;
  ${breakpoint.mobile`
    font-size: 40px;
    line-height: 1.4;
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
  color: ${(props) => props.theme.colors.volMain};
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
  margin-bottom: 26px;
`;


export const StatsWrap = styled.div`
  width: 100%;
  display: grid;
  max-width: 700px;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 15px;
  ${breakpoint.mobile`
  grid-template-columns: 1fr 1fr;
  gap: 15px;
`}  
`;
export const StatsBox = styled.div`
  display: flex;
  padding: 8px 10px;
  flex-direction: column;
  align-items: center;
  background: ${props => props.theme.colors.altbgColor};
  border: 1.5px solid ${props => props.theme.colors.altbgColor};
  border-radius: 8px;
  width: 100%;
  justify-content: center;
`;
export const GreyText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 130%;
  color: #A6A9B9;
  margin-bottom: 5px;
`;
export const Price = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.priceColor};
  display: flex;
  align-items: center;
`;

export const RatingBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 30px;
  height: 30px;
  border: 1px solid ${props => props.theme.colors.altbgColor};
  box-shadow: 0px 1px 2px rgba(16, 24, 40, 0.05);
  border-radius: 4px;
`;

export const ColBox = styled.div`
  display; flex;
  width: 50%;
  margin-left: 50px;
  padding-right: 30px;
  margin-right: 30px;
  border-right: 1px solid ${props => props.theme.colors.brdGeneral};
  max-width: 750px;
  ${breakpoint.mobile`
    width: 100%;
    margin-left: 0;
    padding-right: 0;
    margin-right: 0;
    border-right: none;
  `}  
`;

export const RightBox = styled.div`
  display; flex;
  width: 50%;
  max-width: 750px;
  ${breakpoint.mobile`
    width: 100%;
    margin-top:20px;
  `}  
`;

export const BoxWrap = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 5px 10px;
  background: ${props => props.theme.colors.altbgColor};
  border-radius: 4px;
`;