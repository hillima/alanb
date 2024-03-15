import { FC } from 'react';
import {
  Card,
  Row,
  Title,
  ColName,
  GreyText,
  CollectionNameButton,
  PlaceholderIcon,
  PreviewBg,
} from './PreviewTemplateCard.styled';
import { IconContainer } from '../CollectionIcon';
import TemplateVideo from '../TemplateVideo';
import PreviewCollectionIcon from '../PreviewCollectionIcon';
import Image from 'next/image';
import PreviewTemplateImage from '../PreviewTemplateImage';

type Props = {
  templateVideo?: string;
  templateImage?: string;
  templateName: string;
  collectionImage?: string;
  collectionDisplayName?: string;
  collectionName: string;
  maxSupply: string;
  hasPlaceholderIcon?: boolean;
  isGlb?: boolean;
};

const PreviewTemplateCard: FC<Props> = ({
  collectionName,
  templateName,
  maxSupply,
  collectionDisplayName,
  collectionImage,
  templateVideo,
  templateImage,
  hasPlaceholderIcon,
  isGlb
}) => {
  const collectionIcon = hasPlaceholderIcon ? (
    <IconContainer margin="24px 16px 24px 12px">
      <PlaceholderIcon />
    </IconContainer>
  ) : (
    <PreviewCollectionIcon
      name={collectionName}
      image={collectionImage}
      margin="24px 16px 24px 12px"
    />
  );
  return (
    <Card tabIndex={0}>
      <Row>
        <CollectionNameButton>
          {collectionIcon}
          <ColName>{collectionDisplayName || collectionName}</ColName>
        </CollectionNameButton>
      </Row>
      {templateVideo ? (
        <TemplateVideo src={templateVideo} autoPlay={true} />
      ) : templateImage ? 
        (
          <PreviewTemplateImage
            templateImgSrc={templateImage}
            templateName={templateName}
            isGlb={isGlb}
          />
        ): (
        <PreviewBg>
          <Image src="/preview-bg.svg" width="90px" height="90px" />
        </PreviewBg>
      )}
      <> 
          <Title>{templateName}</Title>
          <GreyText>
            Edition size: {maxSupply === '0' ? 'Unlimited' : maxSupply}
          </GreyText>
      </>
    </Card>
  );
};

PreviewTemplateCard.defaultProps = {
  collectionName: 'Collection',
  templateName: 'Name',
  maxSupply: null,
};

export default PreviewTemplateCard;
