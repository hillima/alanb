import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
type ContainerProps = {
  columns: number;
}
export const Container = styled.section<ContainerProps>`
  width: 100%;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: ${props => `repeat(${props.columns}, minmax(0,1fr) )`};
  padding-left: 50px;
  padding-right: 50px;
  padding-bottom: 70px;
  grid-auto-rows: minmax(0px, 1fr);
`;