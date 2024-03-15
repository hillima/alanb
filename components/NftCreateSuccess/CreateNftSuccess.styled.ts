import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

export const CheckIconContainer = styled.div`
  width: 104px;
  height: 104px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #882282;
  border-radius: 100%;
`;

export const SuccessPageContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  padding-bottom: 100px;
`;

export const SuccessContentContainer = styled.div`
  margin-top: 165px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SuccessText = styled.p`
  margin-top: 32px;
  margin-bottom: 8px;
  font-size: 28px;
  line-height: 1.43;
  text-align: center;
  color: #052251;
`;

export const SuccessDescription = styled.p`
  width: 320px;
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  color: #333333;
`;

export const PurpleButton = styled(StyledButton)`
  width: 180px;
  height: 48px;
  padding: 11px 16px 13px;
  border-radius: 8px;
  transition: 0.2s;
  margin-right: 8px;
`;

export const GrayButton = styled(StyledButton)`
  margin-left: 8px;
  width: 180px;
  height: 48px;
  padding: 11px 16px 13px;
  border-radius: 8px;
  background-color: #f2f2f2;
  transition: 0.2s;
  color: #7B0A75;
  cursor: pointer;

  :hover,
  :focus-visible {
    color: white;
    background-color: #7B0A75;
  }

  :active,
  :focus {
    outline-color: #7B0A75;
  }
`;

export const ButtonsContainer = styled.div`
  margin-top: 48px;
  display: flex;
`;
