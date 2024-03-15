import styled from 'styled-components';
import { FadeInImageContainer } from '../../styles/FadeInImageContainer.styled';

type ImageContainerProps = {
  isAudio?: boolean;
  isVideo?: boolean;
};

export const VideoContainer = styled(FadeInImageContainer)<ImageContainerProps>`
  width: 100%;
  position: relative;
  overflow: hidden;
  max-height: 363px;
  border-radius: 10px 10px 0px 0px;
`;

export const CenterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Video = styled.video`
  width: 100%;
  max-height: 100%;
  border-radius: 16px;
  outline: none;
  z-index: 1;
`;

export const VideoError = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 8px;
  padding: 20px;
  font-size: 16px;
  line-height: 24px;
  z-index: 1;
  color: #808080;
  background: #e6e6e6;
`;
