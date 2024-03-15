import styled from 'styled-components';

type IconContainerProps = {
  margin?: string;
  width?: string;
};

export const IconContainer = styled.div<IconContainerProps>`
  position: relative;
  overflow: hidden;
  object-fit: cover;
  max-width: 180px;
  max-height: 180px;
  border-radius: 6px;
`;
