import styled from 'styled-components';

type ContainerProps = {
  isDragActive: boolean;
};

export const Container = styled.div<ContainerProps>`
  height: 136px;
  border-radius: 10px;
  border-color: ${({ isDragActive, theme }) => (isDragActive ? theme.colors.altbgColor : theme.colors.altbgColor)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ isDragActive, theme }) =>
    isDragActive ? theme.colors.altbgColor : theme.colors.altbgColor};
  cursor: pointer;

  :active,
  :focus {
    outline: none;
  }
`;

export const FileTypeDescription = styled.span`
  font-size: 14px;
  line-height: 1.71;
  text-align: center;
  color: ${props => props.theme.colors.genColor};
`;

export const UploadButton = styled.button`
  background: ${props => props.theme.colors.btnBg};
  border: 1px solid ${props => props.theme.colors.btnBg};
  border-radius: 6px;
  width: 150px;
  margin-top: 20px;
  padding: 3px 16px 5px;
  transition: 0.2s;
  color: ${props => props.theme.colors.btnbgTitle};
  cursor: pointer;

  :hover,
  :focus-visible {
    color: ${props => props.theme.colors.btnbgTitle};
    background-color:${props => props.theme.colors.btnBg};
  }

  :active,
  :focus {
    outline-color: ${props => props.theme.colors.btnBg};
  }
`;

export const UploadError = styled.span`
  margin: 10px 10px 0;
  font-size: 13px;
  color: ${props => props.theme.colors.titleColor};
  text-align: center;
`;

export const RemovePreviewIcon = styled.div`
  cursor: pointer;
`;

export const Preview = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 24px;
`;

export const ImageInfo = styled.div`
  display: flex;
`;

export const FilenameInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 16px;
  justify-content: center;
`;

export const PreviewImageContainer = styled.div`
  width: 64px;
  height: 64px;
  border-radius: 8px;
  overflow: hidden;
`;

export const FileNameText = styled.p`
  font-size: 14px;
  line-height: 1.71;
  max-width: 250px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const FileSize = styled.p`
  font-size: 12px;
  color: ${props => props.theme.colors.genColor};
  line-height: 1.67;
`;
