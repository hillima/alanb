import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  Row,
  Title,
  Text,
  GreyText,
  Tag,
  CardBottom,
  PlaceholderPrice,
  ShimmerBlock,
  Price,
} from './MainTemplateCard.styled';
import CollectionIcon from '../CollectionIcon';
import TemplateImage from '../TemplateImage';
import TemplateVideo from '../TemplateVideo';
import {
  IPFS_RESOLVER_VIDEO,
  IPFS_RESOLVER_IMAGE,
  RESIZER_IMAGE,
  RESIZER_IMAGE_XSM,
} from '../../utils/constants';
import { useAuthContext } from '../Provider';
import { Template } from '../../services/templates';
import { addPrecisionDecimal } from '../../utils';

type Props = {
  template: Template;
  isUsersTemplates?: boolean;
  hasShimmer?: boolean;
};

const MainTemplateCard = ({
  template,
  isUsersTemplates,
  hasShimmer,
}: Props): JSX.Element => {
  const {
    template_id,
    name,
    collection: { collection_name, img, name: collectionDisplayName },
    immutable_data: { glbthumb, model, image, video },
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
    const videoSrc = `${IPFS_RESOLVER_VIDEO}${video}`;
    const imageSrc = !image
      ? `https://ipfs.com/ipfs/${glbthumb}`
      : `${RESIZER_IMAGE}${IPFS_RESOLVER_IMAGE}${image}`;
    const fallbackImageSrc = image ? `${IPFS_RESOLVER_IMAGE}${image}` : '';

    setTemplateVideoSrc(videoSrc);
    setTemplateImgSrc(imageSrc);
    setFallbackImgSrc(fallbackImageSrc);
  }, [image, video, glbthumb, model]);

  const router = useRouter();
  const isMyTemplate =
    currentUser && router.query.chainAccount === currentUser.actor;
  const redirectPath = isMyTemplate
    ? `/details/${currentUser.actor}/${collection_name}/${template_id}`
    : `/${collection_name}/${template_id}`;
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
    <Text>{lowestPrice}</Text>
  ) : (
    <PlaceholderPrice aria-hidden />
  );
  const numberWithCommas = (x) => {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  return (
    <Card
      tabIndex={0}
      hasMultiple={ownerHasMultiple || hasMultiple}
      onClick={openDetailPage}
      onKeyDown={handleEnterKey}>
        <TemplateImage
          templateImgSrc={templateImgSrc}
          fallbackImgSrc={fallbackImgSrc}
          ipfsHash={image}
          templateName={name}
          priceTag={priceTag}
        />
      <CardBottom>
        <Row onClick={openCollectionPage}>
          <img src={`${RESIZER_IMAGE_XSM}https://ipfs.io/ipfs/${img}`} style={{width: '32px', height: '32px', borderRadius: '50%', marginRight: '5px'}} />
          <Text>{collectionDisplayName || collection_name}</Text>
        </Row>
        <Title>{name}</Title>
        <GreyText>
          Edition size: {max_supply === '0' ? 'Unlimited' : max_supply}
        </GreyText>
        {template['listingPrice'] === undefined ? null : <Price>{template['tokenSymbol'] === 'XUSDC' ? addPrecisionDecimal(template['listingPrice'], 6, false) : addPrecisionDecimal(template['listingPrice'], 4, false)} {template['tokenSymbol']}{template['tokenSymbol'] === 'XUSDC' ? <img src="/icon-token-usdc.svg" /> : <img src="/icon-token-xpr.svg" />}</Price>}
      </CardBottom>
    </Card>
  );
};

MainTemplateCard.defaultProps = {
  collectionName: 'Collection',
  templateName: 'Name',
  maxSupply: 0,
  hasShimmer: false,
  isCreatePreview: false,
};

export default MainTemplateCard;
