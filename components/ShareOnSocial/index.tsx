import { useState, useEffect } from 'react';
import {
  Container,
  ShareLink,
  ShareLinkText,
  CopyLinkButton,
} from './ShareOnSocial.styled';
import Image from 'next/image';

type ShareOnSocialProps = {
  top?: string;
  bottom?: string;
  left?: string;
  right?: string;
  mt?: string;
  mb?: string;
  mr?: string;
  ml?: string;
  active: boolean;
};

const ShareOnSocial = ({
  top,
  bottom,
  left,
  right,
  active,
  mt,
  mb,
  ml,
  mr,
}: ShareOnSocialProps): JSX.Element => {
  const [url, setUrl] = useState<string>('');

  useEffect(() => {
    if (window) {
      setUrl(window.location.href);
    }
  }, [window]);

  const copyLink = () => {
    navigator.clipboard.writeText(url);
  };

  return (
    <Container
      top={top}
      bottom={bottom}
      left={left}
      right={right}
      mt={mt}
      mb={mb}
      ml={ml}
      mr={mr}
      active={active}>
      <ShareLink
        href={`https://twitter.com/intent/tweet?url=${url}`}
        target="_blank"
        rel="noreferrer">
        <Image src="/twitter-icon.svg" width={95} height={30} />
        <ShareLinkText>Twitter</ShareLinkText>
      </ShareLink>
      {/* <ShareLink
        href={`http://www.facebook.com/share.php?display=page&u=${url}`}
        target="_blank"
        rel="noreferrer">
        <Image src="/facebook-icon.svg" />
        <ShareLinkText>Facebook</ShareLinkText>
      </ShareLink> */}
      {/* <ShareLink
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${url}`}
        target="_blank"
        rel="noreferrer">
        <Image src="/linkedin-icon.svg" />
        <ShareLinkText>LinkedIn</ShareLinkText>
      </ShareLink> */}
      {/* <CopyLinkButton onClick={copyLink}>
        <Image src="/link-icon.svg" />
        <ShareLinkText>Copy link</ShareLinkText>
      </CopyLinkButton> */}
    </Container>
  );
};

export default ShareOnSocial;
