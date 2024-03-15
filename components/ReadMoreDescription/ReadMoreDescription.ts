import styled from 'styled-components';

type DescriptionProps = {
  mb: string;
  maxWidth: string;
  textAlign: string;
  fontColor: string;
};

export const Description = styled.span<DescriptionProps>`
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 150%;
  text-align: center;
  letter-spacing: 0.01em;
  color: ${props => props.theme.colors.titleColor};
  overflow-wrap: break-word;
  width: 100%;
  max-width: ${(props) => props.maxWidth};
`;

export const More = styled.span`
  color: #7B0A75;
  cursor: pointer;
  font-size: 12px;
`;
