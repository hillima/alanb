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
} from './SearchTemplateListCard.styled';
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
  template: Template;
  isUsersTemplates?: boolean;
  hasShimmer?: boolean;
  listingPrice?: string;
};

const SearchTemplateListCard = ({
  template,
  isUsersTemplates,
  hasShimmer,
  listingPrice
}: Props): JSX.Element => {
  const {
    template_id,
    name,
    collection: { author, collection_name, img, name: collectionDisplayName },
    immutable_data: { model, image, video, glbthumb },
    data,
    max_supply,
    lowestPrice,
    totalAssets,
    assetsForSale,
    issued_supply
  } = template;
  const { currentUser } = useAuthContext();
  const [templateVideoSrc, setTemplateVideoSrc] = useState<string>('');
  const [templateImgSrc, setTemplateImgSrc] = useState<string>('');
  const [fallbackImgSrc, setFallbackImgSrc] = useState<string>('');

  useEffect(() => {
    const videoSrc = `${video}`;
    const imageSrc = `${glbthumb || image}`;
    const fallbackImageSrc = `${glbthumb || image}`;
    setTemplateVideoSrc(videoSrc);
    setTemplateImgSrc(imageSrc);
    setFallbackImgSrc(fallbackImageSrc);
  }, [image, video, model, data]);

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
  ) : lowestPrice || listingPrice ? (
    <Price><Image src="/new/price-xpr.svg" width={19} height={20} /><span style={{marginLeft: '8px'}}>{lowestPrice || addPrecisionDecimal(listingPrice, 4, false)}</span></Price>
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
          {templateVideoSrc != undefined && templateVideoSrc != '' && templateVideoSrc != 'undefined' ? (
            <TemplateVideo
              src={`${process.env.NEXT_PUBLIC_IPFS_URL}${templateVideoSrc}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
              priceTag={priceTag}
              autoPlay={false}
            />
          ) : (
            <TemplateImage
              templateImgSrc={`${process.env.NEXT_PUBLIC_IPFS_URL}${templateImgSrc}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
              fallbackImgSrc={`${process.env.NEXT_PUBLIC_IPFS_URL}${fallbackImgSrc}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
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

SearchTemplateListCard.defaultProps = {
  collectionName: 'Collection',
  templateName: 'Name',
  maxSupply: 0,
  hasShimmer: false,
  isCreatePreview: false,
};

export default SearchTemplateListCard;