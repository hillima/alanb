import styled from 'styled-components';

type IconContainerProps = {
  margin?: string;
  width?: string;
};

export const IconContainer = styled.div<IconContainerProps>`
  position: relative;
  overflow: hidden;
  object-fit: cover;
  max-width: 100%;
  border-radius: 20px;
  margin-top: -24px;
  display: flex;
  justify-content: center;
`;
