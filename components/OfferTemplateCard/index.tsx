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
  Price,
  AddBtn
} from './OfferTemplateCard.styled';
import TemplateImage from '../TemplateImage';
import TemplateVideo from '../TemplateVideo';
import { useAuthContext } from '../Provider';
import { Template } from '../../services/templates';
import CollectionPageIcon from '../CollectionPageIcon';
import Image from 'next/image';
import Link from 'next/link';

type Props = {
  template: Template;
  isUsersTemplates?: boolean;
  hasShimmer?: boolean;
  onClick: any;
};

const OfferTemplateCard = ({
  template,
  isUsersTemplates,
  hasShimmer,
  onClick
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
    const imageSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${glbthumb || image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
    const fallbackImageSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${image || glbthumb}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;

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


  const openCollectionPage = (e: MouseEvent) => {
    e.stopPropagation();
    router.push(`/${collection_name}`);
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
      <Price>
        <Image src="/new/price-xpr.svg" width={19} height={20} /><span style={{marginLeft: '5px'}}>{lowestPrice}</span>
      </Price>
  ) : (
    <PlaceholderPrice aria-hidden style={{height: '37px'}}/>
  );
  return (
        <Card
          tabIndex={0}
          hasMultiple={ownerHasMultiple || hasMultiple}
          onClick={() => {}}
          onKeyDown={() => {}}
          isSelected={false}
        >
          <Link href={`${redirectPath}`}>
            <a>
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
                <Text style={{maxWidth: 'calc(100% - 30px)'}} onClick={() => window.location.href = redirectPath}>{name}</Text>
                <CollectionNameButton onClick={openCollectionPage}>
                </CollectionNameButton>
              </Row>
            </a>
          </Link>
          {priceSection}
          <AddBtn id="add-btn" onClick={onClick}>
            Make an offer
          </AddBtn>
        </Card>
  );
};

OfferTemplateCard.defaultProps = {
  collectionName: 'Collection',
  templateName: 'Name',
  maxSupply: 0,
  hasShimmer: false,
  isCreatePreview: false,
};

export default OfferTemplateCard;