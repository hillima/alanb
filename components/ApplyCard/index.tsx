import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  Row,
  Title,
  Text,
  GreyText,
  Tag,
  CollectionNameButton,
  PlaceholderPrice,
  ShimmerBlock,
  Author,
  GreyBy,
  Price
} from './ApplyCard.styled';
import TemplateImage from '../TemplateImage';
import TemplateVideo from '../TemplateVideo';
import {
  IPFS_RESOLVER_VIDEO,
  IPFS_RESOLVER_IMAGE,
  RESIZER_IMAGE,
} from '../../utils/constants';
import { useAuthContext } from '../Provider';
import { Template } from '../../services/templates';
import CollectionPageIcon from '../CollectionPageIcon';
import Image from 'next/image';
import Link from 'next/link';
import { addPrecisionDecimal } from '../../utils';

type Props = {
  key: number;
  data: any;
};

const ApplyCard = ({
  key, 
  data
}: Props): JSX.Element => {
  const {
    name,
    rating,
    img,
  } = data;
  const imageSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${img}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`

  return (
        <Card
          key={key}
          tabIndex={0}
          hasMultiple={false}
        >
            <TemplateImage
              templateImgSrc={imageSrc}
              fallbackImgSrc={imageSrc}
              ipfsHash={img}
              templateName={name}
            />
          <Row>
            <Text style={{maxWidth: 'calc(100% - 30px)'}}>{name}</Text>
            <Text style={{maxWidth: 'calc(100% - 30px)'}}>Submitted</Text>
          </Row>
        </Card>
  );
};

ApplyCard.defaultProps = {
  collectionName: 'Collection',
  templateName: 'Name',
  maxSupply: 0,
  hasShimmer: false,
  isCreatePreview: false,
};

export default ApplyCard;