import styled from 'styled-components';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type ImageContainerProps = {
  isAudio?: boolean;
  isVideo?: boolean;
};

export const ImageContainer = styled(FadeInImageContainer)<ImageContainerProps>`
  width: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px 10px 0px 0px;
`;

export const Image = styled.img`
  width: 100%;
  height: 100%;
  min-width: 100%;
  min-height: 100%;
  -o-object-fit: cover;
  object-fit: cover;
  position: absolute;
  top: 0;
  left: 0;
`;
