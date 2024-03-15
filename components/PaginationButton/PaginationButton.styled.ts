import styled from 'styled-components';

type ButtonProps = {
  isHidden: boolean;
  disabled: boolean;
};

export const Button = styled.button<ButtonProps>`
  ${({ isHidden }) => isHidden && `display: none;`}
  padding: 8px 16px;
  margin: 24px 0 12px;
  border-radius: 4px;
  border: 1px solid #FFF;
  transition: 0.2s;
  width: 100%;
  transform: rotate(-180deg);
  -webkit-transform: rotate(-180deg);
  background-color: #FFF;

  ${({ disabled }) =>
    !disabled &&
    `
    cursor: pointer;
    :hover {
      opacity: 1;
      color: #ffffff;
      border: 1px solid #7B0A75;
    }
  `}
`;
