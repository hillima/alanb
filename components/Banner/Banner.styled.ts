import styled from 'styled-components';

type MoneyProps = {
  right?: boolean;
};

export const Background = styled.section`
  width: 100%;
  height: 40px;
  background: ${props => props.theme.colors.volBg};
  z-index: 5;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-family: 'Futura';
  cursor: pointer;
  margin-top: 2px;
`;

export const Spacer = styled.div`
  height: 40px;
`;

export const Content = styled.span`
  position: relative;
  color: ${props => props.theme.colors.titleColor};
  font-size: 14px;
  font-family: 'Futura';
`;

export const Money = styled.span<MoneyProps>`
  font-size: 16px;
  margin-right: ${({ right }) => (right ? '8px' : '0')};
  margin-left: ${({ right }) => (!right ? '8px' : '0')};
`;
