import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';
import {breakpoint} from '../../styles/Breakpoints';
export const ColInfo = styled.div`
  display: flex;
  flex-direction: column;
`;
export const SchemaBox = styled.div`
  width: 100%;
  height: 50px;
  background: #222222;
  border-radius: 5px;
  color: rgba(128, 128, 128, 1);
  cursor: pointer;
  padding: 0 16px 0 16px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 20px;
`;
export const CollectionBox = styled.div`
  display: flex;
  margin-bottom: 32px;
  img{
    border-radius: 50%;
    margin-right: 26px;
  }
`;
export const AtrText = styled.h3`
    font-style: normal;
    font-weight: bold;
    font-size: 20px;
    line-height: 24px;
    color: #FFFFFF;
`;
export const AtrSubText = styled.h4`
    font-style: normal;
    font-weight: 450;
    font-size: 14px;
    line-height: 24px;
    color: #FFFFFF;
    margin-top: 20px;
`;
export const ColText = styled.h2`
  font-style: normal;
  font-weight: 450;
  font-size: 18px;
  line-height: 24px;
  color: #FFFFFF;
`;
export const DescText = styled.h3`
  font-style: normal;
  font-weight: 450;
  font-size: 14px;
  line-height: 24px;
  color: #FFFFFF;
`;
export const Container = styled.section`
  max-width: 60%;
  min-width: 864px;
  width: 100%;
  margin: 0 auto;
  margin-top: 40px;
  padding-bottom: 47px;
`;
export const FieldTitle = styled.h2`
  width: 100%;
  text-align: left;
  color: rgba(128, 128, 128, 1);
  font-style: normal;
  font-weight: 450;
  font-size: 16px;
  line-height: 24px;
`;
export const Row = styled.div`
  display: flex;
  width: 100%;
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 500px;
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin-left: 40px;
  margin-top: 119px;
`;

export const ElementTitle = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 43px;
  margin-bottom: 10px;
`;
export const Red = styled.span`
  color: #FF0000;
`;
type MarginProps = {
  mt ?: string;
  mb ?: string;
}
export const LabelText = styled.h2<MarginProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 160%;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  margin-top: ${props => props.mt};
  margin-bottom: ${props => props.mb};
`;
export const ElementTitleSecond = styled.h2`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 30px;
  margin-bottom: 25px;
`;


export const BackText = styled.h4`
  display:flex;
  font-family: CircularStdBold;
  font-size: 18px;
  line-height: 24px;
  color: ${props => props.theme.colors.genColor};
  cursor: pointer;
  img {
    margin-right: 9px;
  }
`;

export const Step = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${props => props.theme.colors.genColor};
`;

export const Title = styled.h1`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 43px;
  width: 100%;
`;

export const SubTitle = styled.p`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.genColor};
  margin-top: 15px;
`;

export const Terms = styled.p`
  font-size: 12px;
  line-height: 20px;
  color: ${props => props.theme.colors.genColor};
`;

export const TermsLink = styled.a`
  font-size: 12px;
  line-height: 20px;
  color: ${props => props.theme.colors.volSub};
  cursor: pointer;
  margin-bottom: 24px;
`;

export const ErrorMessage = styled.p`
  font-size: 14px;
  color: ${props => props.theme.colors.genColor};
  margin: 10px 0;
`;

export const BackButton = styled(StyledButton)`
  background-color: transparent;
  color: ${props => props.theme.colors.linkClr};
  padding: 12px 16px;

  :hover {
    color: ${props => props.theme.colors.linkhvrClr};
    background-color: transparent;
    box-shadow: none;
  }
`;

export const FeeLabel = styled.p`
  display: flex;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  color: ${props => props.theme.colors.genColor};
  margin-top: 17px;
  margin-bottom: 31px;
`;

export const AttrWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 50px;
`;
export const AttrText = styled.h4`
  font-family: 'Futura';
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  margin-bottom: 16px;
`;
export const AttrItemWrap = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
`;
export const AttrItem = styled.div`
  display: flex;
  flex-direction: column;
  width: 144px;
  height: 76px;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 8px;
  padding: 11px;
  justify-content: center;
  align-items: center;
`;


export const AttrLabel = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 130%;
  text-transform: uppercase;
  color: ${props => props.theme.colors.genColor};
`;
export const AttrVal = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 21px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 5px;
`;

export const DescriptionArea = styled.textarea`
  height: 150px;
  width: 100%;
  margin-top: 7px;
  transition: 0.2s;
  border: 1px solid ${props => props.theme.colors.altbgColor};
  background-color: ${props => props.theme.colors.altbgColor};
  font-size: 16px;
  color:${props => props.theme.colors.titleColor};
  padding: 12px 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  line-height: 24px;
    ${breakpoint.mobile`
    border:none;
    border-radius:none;
    margin-bottom: 15px;
  `};
  :hover,
  :focus,
  :focus-visible {
    border: none;
    outline: none;
  }
  -moz-appearance: textfield;
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    margin: 0;
  }

  ::placeholder {
    color: ${props => props.theme.colors.titleColor};
  }

  :disabled{
    background-color: #EBEBE4;
    color: ${props => props.theme.colors.genColor};
    ::placeholder {
      color: ${props => props.theme.colors.genColor};
    }
  }
`