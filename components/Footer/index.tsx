import { Image } from '../../styles/index.styled';
import {
  ImageContainer,
  StyledFooter,
  Section,
  FooterLink,
  FooterWrap,
  FooterBottomWrap,
  CopyText,
  BottomLeft,
  BottomRight,
  LogoIcon
} from './Footer.styled';

const links = [
  {
    name: 'Privacy Policy',
    url: 'https://proton.org/terms#privacy-policy',
  },
  {
    name: 'Help Center',
    url: 'https://help.proton.org',
  },
  {
    name: 'API',
    url: 'https://proton.org/terms',
  },
];

const Footer = (): JSX.Element => {
  return (
    <StyledFooter>
      <FooterWrap>
        <ImageContainer>
          <LogoIcon />
        </ImageContainer>
        <Section>
        </Section>
      </FooterWrap>
      <FooterBottomWrap>
        <BottomLeft>
        {links.map(({ name, url }) => (
            <FooterLink key={name} href={url} target="_blank" rel="noreferrer">
              {name}
            </FooterLink>
          ))}
          <CopyText>© 2023 All rights reserved</CopyText>
        </BottomLeft>
        <BottomRight>
        </BottomRight>
      </FooterBottomWrap>
    </StyledFooter>
  );
};

export default Footer;
