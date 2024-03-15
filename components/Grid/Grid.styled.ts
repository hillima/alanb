import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
type ContainerProps = {
  columns: number;
}
export const Container = styled.section<ContainerProps>`
  width: 100%;
  display: grid;
  grid-column-gap: 20px;
  grid-row-gap: 20px;
  grid-template-columns: ${props => `repeat(${props.columns}, minmax(0,1fr) )`};
  padding-left: 20px;
  padding-right: 20px;
  padding-bottom: 40px;
  grid-auto-rows: minmax(0px, 1fr);
  ${breakpoint.mobile`
    padding-left: 0;
    padding-right: 0;
    grid-row-gap: 10px;
    grid-column-gap: 10px;
  `}
`;