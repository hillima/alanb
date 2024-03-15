import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

type InputContainerProps = {
  isSearchInputActive: boolean;
  isMobileSearchOpen: boolean;
};

type ClearTextButtonProps = {
  isVisibleOnDesktop: boolean;
};

const IconButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  padding: 0;
  cursor: pointer;
  outline: none;
`;

export const MagnifyingIconButton = styled(IconButton)`
  margin-left: 16px;
  ${breakpoint.tablet`
    margin-left: 18px;
  `}
`;

export const ClearTextButton = styled(IconButton)<ClearTextButtonProps>`
  display: ${({ isVisibleOnDesktop }) =>
    isVisibleOnDesktop ? 'flex' : 'none'};
  margin-right: 12px;
  border-radius: 100%;
  transition: 0.3s;
  border: 1px solid white;

  :hover,
  :focus-visible {
    transform: scale(1.3);
    background: #f2f2f2;
    border: 1px solid #7B0A75;
  }

  ${breakpoint.tablet`
    display: flex;
  `}
`;

export const InputContainer = styled.div<InputContainerProps>`
  border-radius: 8px;
  transition: 0.2s;
  display: flex;
  align-items: center;
  outline: none;
  background: ${props => props.theme.colors.altbgColor};
  border: solid 1px ${props => props.theme.colors.altbgColor};

  :focus,
  :focus-visible {
    background: ${props => props.theme.colors.altbgColor};
    border: solid 1px ${props => props.theme.colors.altbgColor};
  }

  ${breakpoint.tablet`
    ${({ isMobileSearchOpen }) => !isMobileSearchOpen && `display: none;`}
    z-index: 4;
    position: absolute;
    left: 0;
    width: 100%;
    max-width: unset;
    margin: 0;
    border-radius: 20px;
    background: white;
  `}
`;

export const Input = styled.input`
  width: 100%;
  height: 40px;
  font-size: 16px;
  color: black;
  padding: 12px 28px 12px 16px;
  border-radius: 8px;
  border: none;
  outline: none;
  line-height: 24px;
  background: none;
  color: ${props => props.theme.colors.genColor};

  ::placeholder {
    color: ${props => props.theme.colors.genColor};
  }
  :focus{
    outline: none;
    border: none;
    --tw-ring-shadow: none;
  }

  ${breakpoint.tablet`
    border-radius: 20px;
    padding: 8px 16px 8px 18px;
  `}
`;
