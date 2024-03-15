import styled from 'styled-components';

export interface ContainerProps {
  margin?: string;
  height?: number;
}

export const Container = styled.section<ContainerProps>`
  width: 100%;
  height: 100%;
  min-height: 800px;
  margin: ${({ margin }) => margin};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
