import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';
import { breakpoint } from '../../styles/Breakpoints';

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
`;

export const RightColumn = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
  margin-left: 120px;
`;

export const ElementTitle = styled.h2`
  font-family: CircularStdBold;
  font-weight: normal;
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  margin-bottom: 16px;
`;

export const BackText = styled.h4`
  display:flex;
  font-family: CircularStdBold;
  font-size: 18px;
  line-height: 24px;
  color: #474747;
  cursor: pointer;
  img {
    margin-right: 9px;
  }
`;

export const Step = styled.h4`
  font-family: CircularStdBold;
  font-size: 10px;
  line-height: 1.6;
  color: #7B0A75;
  text-transform: uppercase;
`;

export const Title = styled.h1`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 48px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
`;

export const SubTitle = styled.p`
  margin-top: 29px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.subColor};
`;

export const Terms = styled.p`
  font-size: 12px;
  line-height: 20px;
  color: #808080;
`;

export const TermsLink = styled.a`
  font-size: 12px;
  line-height: 20px;
  color: #7B0A75;
  cursor: pointer;
  margin-bottom: 24px;
`;

export const ErrorMessage = styled.p`
  font-size: 14px;
  color: #7B0A75;
  margin: 10px 0;
`;

export const BackButton = styled(StyledButton)`
  background-color: transparent;
  color: rgb(117, 46, 235);
  padding: 12px 16px;

  :hover {
    color: rgba(117, 46, 235, 0.55);
    background-color: transparent;
    box-shadow: none;
  }
`;

export const FeeLabel = styled.p`
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  line-height: 24px;
  color: #333333;
  margin: 8px 0 20px;
`;



export const CommonStepBox = styled.div`
  width: 100%;
  margin-top: 29px;
  margin-bottom: 48px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: ${props => props.theme.colors.itemBg};
  border: 1px solid ${props => props.theme.colors.itemBrdr};
  border-radius: 12px;
  padding: 12px;
`;
export const CommonList = styled.div`
  display: flex;
`;
type ActiveProps = {
  isActive: boolean;
}
export const CommonListTab = styled.div<ActiveProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 108px;
  height: 40px;
  background: ${props => props.isActive ? props.theme.colors.wallBtn : props.theme.colors.altbgColor};
  border: 1px solid ${props => props.isActive ? props.theme.colors.wallBtn : props.theme.colors.altbgColor};
  border-radius: 6px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  margin-right:15px;
  color: ${props => props.isActive ? props.theme.colors.wallText : props.theme.colors.titleColor};
  ${breakpoint.mobile`
  width: 100px;
  `};
`;
export const CommonStepText = styled.h4`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #9ba2ad;
  margin-right: 8px;
  ${breakpoint.mobile`
  display:none;
  `};
`;

export const CommonTitle = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
`;


export const CommonSubTitle = styled.h3`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 13px;
  color: #9BA2AD;
`;


export const CommonStepRed = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  color: rgba(255, 16, 45, 1);
`;

type SelectProps = {
  width: string;
}
export const SelectBox = styled.div<SelectProps>`
  cursor: pointer;
  width: ${props => props.width};
  justify-content: space-between;
  margin-top: 15px;
  padding-left: 18px;
  padding-right: 18px;
  height: 60px;
  background: ${props => props.theme.colors.altbgColor};
  color:${props => props.theme.colors.titleColor};
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

export const RowWrap = styled.div`
  width: 100%;
  display: flex;
`;


export const ColumnWrap = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const RowBetween = styled.div`
  margin-top: 80px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  ${breakpoint.mobile`
  margin-top: 20px;
`};
`;

export const DragWrap = styled.div`
  margin-top: 23px;
  margin-bottom: 43px;
  width: 500px;
  height: 500px;
  ${breakpoint.mobile`
  width: auto;
  height: 300px;
`};
`;


export const DragBannerWrap = styled.div`
  margin-top: 23px;
  width: 1040px;
  height: 500px;
  ${breakpoint.mobile`
  width: auto;
  height: 300px;
`};
`;