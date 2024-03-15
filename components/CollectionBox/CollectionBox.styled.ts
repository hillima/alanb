import styled from 'styled-components';

type BoxContainerProps = {
  active?: boolean;
};

export const BoxContainer = styled.div<BoxContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 150px;
  height: 125px;
  border-radius: 8px;
  margin-right: 20px;
  border: solid 1px ${({ active }) => (active ? '#7B0A75' : '#EAECF0')};
  cursor: pointer;
  padding: 0 10px;

  :hover,
  :focus-visible {
    border: 1px solid #7B0A75;
    #col-name{
      color: #7B0A75;
    }
  }
`;

export const CollectionName = styled.p<BoxContainerProps>`
  margin: 9px 0 0;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  color: ${({ active }) => (active ? '#7B0A75' : '#9BA2AD')};
  text-align: center;
  max-height: 48px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 100%;
`;
