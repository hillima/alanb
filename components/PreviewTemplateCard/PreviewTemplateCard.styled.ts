import styled from 'styled-components';
import { IconContainer } from '../CollectionIcon/CollectionIcon.styled';

export const Card = styled.article`
  display: flex;
  flex-direction: column;
  width: 455px;
  outline: none;
  border-radius: 16px;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  box-sizing: border-box;
  padding: 25px 25px 25px 25px;
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const Title = styled.h1`
  font-size: 21px;
  line-height: 32px;
  color: #052251;
  margin-top: 12px;
`;
export const ColName = styled.span`
  margin-left: 12px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.genColor};
  text-align: left;
  max-width: 190px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
export const Text = styled.span`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.titleColor};
  text-align: left;
  max-width: 190px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CollectionNameButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: none;
  z-index: 1;
`;

export const PlaceholderIcon = styled(IconContainer).attrs({ as: 'div' })`
  background-color: #e6e6e6;
  width: ${({ width }) => width || '32px'};
  height: ${({ width }) => width || '32px'};
`;

export const GreyText = styled(Text)`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 18px;
  color: ${props => props.theme.colors.titleColor};
  margin-top: 10px;
`;


export const PreviewBg = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 406px;
  height: 406px;
  background: ${props => props.theme.colors.altbgColor};
  border: 2px dashed ${props => props.theme.colors.altbgColor};
  border-radius: 13px;
`;

export const TemplateImgWrap = styled.div`
  width: 406px;
  height: 406px;
  border-radius: 13px;
  overflow: hidden;
`;