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
} from './ScrollTemplate.styled';
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

type Props = {
  template: Template;
  isUsersTemplates?: boolean;
  hasShimmer?: boolean;
};

const ScrollTemplate = ({
  template,
  isUsersTemplates,
  hasShimmer,
}: Props): JSX.Element => {
  const {
    template_id,
    name,
    collection: { author, collection_name, img, name: collectionDisplayName },
    immutable_data: { glbthumb, model, image, video },
    data,
    max_supply,
    lowestPrice,
    totalAssets,
    assetsForSale,
    issued_supply,
  } = template;
  
  const { currentUser } = useAuthContext();
  const [templateVideoSrc, setTemplateVideoSrc] = useState<string>('');
  const [templateImgSrc, setTemplateImgSrc] = useState<string>('');
  const [fallbackImgSrc, setFallbackImgSrc] = useState<string>('');

  useEffect(() => {
    const videoSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${video}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
    const imageSrc = !image
      ? `${process.env.NEXT_PUBLIC_IPFS_URL}${glbthumb}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`
      : `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
    const fallbackImageSrc = image ? `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}` : data ? `${process.env.NEXT_PUBLIC_IPFS_URL}${data.image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}` : '';

    setTemplateVideoSrc(videoSrc);
    setTemplateImgSrc(imageSrc);
    setFallbackImgSrc(fallbackImageSrc);
  }, [image, video, glbthumb, model]);

  const router = useRouter();
  const isMyTemplate =
    currentUser && router.query.chainAccount === currentUser.actor;
  const redirectPath = isMyTemplate
    ? `/details/${currentUser.actor}/${collection_name}/${template_id == undefined ? template['template'].template_id : template_id}`
    : `/collections/${collection_name}/${template_id == undefined ? template['template'].template_id : template_id}`;
  const ownerHasMultiple =
    totalAssets && !isNaN(parseInt(totalAssets)) && parseInt(totalAssets) > 1;
  const hasMultiple =
    !totalAssets && !isNaN(parseInt(issued_supply))
      ? parseInt(issued_supply) > 1
      : false;

  const openDetailPage = () => {
    window.open(redirectPath);
  };

  const openCollectionPage = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/${collection_name}`);
  };

  const handleEnterKey = (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      openDetailPage();
    }
  };

  const priceTag =
    isUsersTemplates && assetsForSale && totalAssets ? (
      <Tag>
        {assetsForSale}/{totalAssets} FOR SALE
      </Tag>
    ) : null;

  const priceSection = hasShimmer ? (
    <ShimmerBlock aria-hidden />
  ) : lowestPrice ? (
    <Price><Image src="/new/price-xpr.svg" width={19} height={20} /><span style={{marginLeft: '8px'}}>{lowestPrice}</span></Price>
  ) : (
    <PlaceholderPrice aria-hidden style={{height: '26px'}}/>
  );

  return (
    <Link href={redirectPath}>
      <a>
        <Card
          tabIndex={0}
          hasMultiple={ownerHasMultiple || hasMultiple}
          onClick={() => {}}
          onKeyDown={handleEnterKey}>
          {video ? (
            <TemplateVideo
              src={templateVideoSrc}
              priceTag={priceTag}
              autoPlay={false}
            />
          ) : (
            <TemplateImage
              templateImgSrc={templateImgSrc}
              fallbackImgSrc={fallbackImgSrc}
              ipfsHash={image}
              templateName={name}
              priceTag={priceTag}
            />
          )}
          <Row>
            <Text style={{maxWidth: 'calc(100% - 30px)'}}>{name}</Text>
            <Author><GreyBy>by</GreyBy> {author}</Author>
            <CollectionNameButton onClick={openCollectionPage}>
            </CollectionNameButton>
          </Row>
          {priceSection}
        </Card>
      </a>
    </Link>
  );
};

ScrollTemplate.defaultProps = {
  collectionName: 'Collection',
  templateName: 'Name',
  maxSupply: 0,
  hasShimmer: false,
  isCreatePreview: false,
};

export default ScrollTemplate;