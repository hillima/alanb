import styled from 'styled-components';

type IconContainerProps = {
  margin?: string;
  width?: string;
};

export const IconContainer = styled.div<IconContainerProps>`
  position: relative;
  object-fit: cover;
`;
