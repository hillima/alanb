import styled from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';
type ContainerProps = {
  columns: string;
}
export const Container = styled.div<ContainerProps>`
  width: 100%;
  display: grid;
  grid-column-gap: 10px;
  grid-row-gap: 10px;
  grid-template-columns: repeat(${props => `${props.columns}`}, minmax(0,1fr) );
  padding-right: 50px;
  padding-top: 48px;
  padding-bottom: 70px;
  grid-auto-rows: minmax(0px, 1fr);
`;