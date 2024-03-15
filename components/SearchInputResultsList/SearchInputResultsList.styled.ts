import styled, { css } from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

const SearchBoxCSS = css`
  position: absolute;
  width: inherit;
  max-width: 600px;
  top: 88px;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(0, 0, 0, 0.08);
  max-height: 40vh;
  overflow: scroll;
  ${breakpoint.tablet`
    top: 48px;
  `}

  ${breakpoint.mobile`
  max-height: 40vh;
  overflow: scroll;
  `}
`;

export const LoadingSearchBox = styled.ul`
  display: flex;
  align-items: center;
  justify-content: center;
  width: inherit;
  height: 200px;
  ${SearchBoxCSS};
`;

export const ResultsList = styled.ul`
  background:${props => props.theme.colors.altbgColor};
  ${SearchBoxCSS};
  background:${props => props.theme.colors.altbgColor};
`;

export const ResultListTitle = styled.h3`
  font-family: CircularStdBold;
  font-size: 14px;
  line-height: 24px;
  color: ${props => props.theme.colors.titleColor};
  margin: 0 8px 8px;

  :not(:first-child) {
    margin-top: 15px;
  }
`;

export const SeeAllLink = styled.button`
  background-color: transparent;
  border: none;
  font-size: 14px;
  line-height: 1.71;
  color: #7B0A75;
  margin-top: 15px;
  cursor: pointer;
`;

export const ResultItem = styled.li`

  transition: 0.2s;
  display: flex;
  align-items: center;
  padding: 8px;
  outline: none;
  cursor: pointer;
  border-radius: 6px;

  :hover,
  :focus-visible {
    background: ${props => props.theme.colors.altbgColor};
  }

  :focus-visible {
    color: #7B0A75;
  }
`;

export const ResultItemName = styled.span`
  font-size: 14px;
  line-height: 1.71;
  color: ${props => props.theme.colors.titleColor};
`;


export const CollectionImg = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 6px;
  margin-right: 15px;
`;

export const RatingImg = styled.img`
  width: 32px;
  height: 32px;
  position: absolute;
  right: 24px;
`;