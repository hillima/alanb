import styled, { css } from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

const SearchBoxCSS = css`
  position: absolute;
  z-index: 10;
  width: 100%;
  background: ${props => props.theme.colors.altbgColor};
  border: 1px solid ${props => props.theme.colors.altbgColor};
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 12px 20px -4px rgba(0, 0, 0, 0.1), 0 0 8px 0 rgba(0, 0, 0, 0.08);
  margin-top: 5px;
  max-height: 40vh;
  overflow: scroll;
  ${breakpoint.tablet`
    top: 48px;
  `}

  ${breakpoint.mobile`
    max-height: 60vh;
    overflow: scroll;
  `}
`;

export const LoadingSearchBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 200px;
  ${SearchBoxCSS};
`;

export const ResultsList = styled.div`
  ${SearchBoxCSS};
`;

export const ResultListTitle = styled.h3`
  font-family: CircularStdBold;
  font-size: 24px;
  line-height: 1.2;
  color:${props => props.theme.colors.titleColor};
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
  color: ${props => props.theme.colors.linkClr};
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
    background: ${props => props.theme.colors.bgColor};
    border-radius: 8px;
  }

  :focus-visible {
    color: ${props => props.theme.colors.genColor};
  }
`;

export const ResultItemName = styled.span`
  font-size: 14px;
  line-height: 1.71;
  color: ${props => props.theme.colors.genColor};
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