import { useRef } from 'react';
import LazyLoad from 'react-lazyload';
import { ImageContainer } from './TemplateImage.styled';
import { PlaceholderAsset } from '../TemplateCard/TemplateCard.styled';
import ImageWrapper from '../ImageWrapper';
import dynamic from 'next/dynamic';

const AssetModelWithNoSsr = dynamic(() => import('../AssetDisplay/AssetModel'), {
  ssr: false,
});

type Props = {
  templateImgSrc?: string;
  fallbackImgSrc?: string;
  templateName: string;
  priceTag?: JSX.Element;
  ipfsHash?: string;
  isGlb?: boolean;
};

const TemplateImageChild = ({
  templateName,
  templateImgSrc,
  fallbackImgSrc,
  ipfsHash,
}: {
  templateName: string;
  templateImgSrc: string;
  fallbackImgSrc: string;
  ipfsHash: string;
}): JSX.Element => {
  const refPlaceholder = useRef<HTMLDivElement>();
  const removePlaceholder = () => {
    if (refPlaceholder && refPlaceholder.current) {
      refPlaceholder.current.remove();
    }
  };

  return (
    <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <PlaceholderAsset ref={refPlaceholder} />
      <LazyLoad offset={100} once style={{overflow: 'hidden', width: '100%'}}>
        <ImageWrapper
          src={templateImgSrc}
          alt={templateName}
          ipfsHash={ipfsHash}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = fallbackImgSrc;
            removePlaceholder();
          }}
          onLoad={removePlaceholder}
        />
      </LazyLoad>
    </div>
  );
};

const TemplateImage = ({
  templateName,
  templateImgSrc,
  priceTag,
  fallbackImgSrc,
  ipfsHash = '',
  isGlb
}: Props): JSX.Element => {
  if (!fallbackImgSrc) {
    fallbackImgSrc = '/preview-bg.svg';
  }
  return (
    <ImageContainer className="template-image-container">
      {isGlb ? 
      <AssetModelWithNoSsr 
        model={templateImgSrc}
        minHeight={'500px'}
        control={true}
      /> : 
      <TemplateImageChild
        templateName={templateName}
        fallbackImgSrc={fallbackImgSrc}
        templateImgSrc={templateImgSrc}
        ipfsHash={ipfsHash}
    /> }
      {priceTag}
    </ImageContainer>
  );
};

export default TemplateImage;
