import styled from 'styled-components';
import { MaxWidth } from '../../styles/MaxWidth.styled';
import { breakpoint } from '../../styles/Breakpoints';

export const Main = styled.main`
  position: relative;
  min-height: calc(100vh - 88px);

  ${breakpoint.tablet`
    min-height: calc(100vh - 88px);
  `}
  ${breakpoint.mobile`
    padding-top: 0;
    width: 100%;
  `}
`;

export const Container = styled(MaxWidth)`
  width: 100%;
  flex-direction: column;
  justify-content: flex-start;
`;
