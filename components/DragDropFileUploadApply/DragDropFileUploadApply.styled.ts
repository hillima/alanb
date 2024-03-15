import styled from 'styled-components';

type PlaceholderContainerProps = {
  borderless?: boolean;
};

export const Container = styled.div`
  border-radius: 100%;
  display: flex;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;

  :active,
  :focus {
    outline: none;
  }
`;

export const PreviewImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 13px;
`;

export const PlaceholderContainer = styled(PreviewImage).attrs({
  as: 'div',
})<PlaceholderContainerProps>`
  width: 100%;
  height: 100%;
  border-radius: 13px;
  border: ${({ borderless }) => (borderless ? 'none' : '2px dashed #DDE4ED')};
  display: flex;
  justify-content: center;
  align-items: center;
`;
