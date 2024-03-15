import { KeyboardEvent, MouseEvent, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  Row,
  Title,
  Text,
  GreyText,
  CollectionNameButton,
  PlaceholderPrice,
  ShimmerBlock,
} from '../TemplateCard/TemplateCard.styled';
import CollectionIcon from '../CollectionIcon';
import TemplateImage from '../TemplateImage';
import TemplateVideo from '../TemplateVideo';
import {
  IPFS_RESOLVER_VIDEO,
  IPFS_RESOLVER_IMAGE,
  PROPAGATION_LAG_TIME,
} from '../../utils/constants';
import { addPrecisionDecimal } from '../../utils';
import { Template } from '../../services/templates';
import { getLowestPriceAsset } from '../../services/sales';
import { getCachedFiles } from '../../services/upload';

type Props = {
  template: Template;
};

const SearchTemplateCard = ({ template }: Props): JSX.Element => {
  const {
    template_id,
    name,
    collection: { collection_name, img, name: collectionDisplayName },
    immutable_data: { image, video, glbthumb },
    max_supply,
    issued_supply,
    created_at_time,
  } = template;

  const [templateVideoSrc, setTemplateVideoSrc] = useState<string>('');
  const [templateImgSrc, setTemplateImgSrc] = useState<string>('');
  const [fallbackImgSrc, setFallbackImgSrc] = useState<string>('');
  const [templateLowestPrice, setTemplateLowestPrice] = useState<string>('');
  const [isLoadingLowestPrice, setIsLoadingLowestPrice] = useState<boolean>(
    true
  );
  useEffect(() => {
    (async () => {
      if (
        new Date().getTime() - parseInt(created_at_time) <
        PROPAGATION_LAG_TIME
      ) {
        const cachedFile = await getCachedFiles(image || video || glbthumb);
        if (cachedFile[video]) {
          setTemplateVideoSrc(cachedFile[video]);
          return;
        }

        if (cachedFile[image]) {
          setTemplateImgSrc(cachedFile[image]);
          return;
        }

        if (cachedFile[glbthumb]) {
          setTemplateImgSrc(cachedFile[glbthumb]);
          return;
        }
      }

      const videoSrc = `${IPFS_RESOLVER_VIDEO}${video}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
      const imageSrc = !image
        ? `${process.env.NEXT_PUBLIC_IPFS_URL}${glbthumb}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`
        : `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
      const fallbackImageSrc = image
        ? `${IPFS_RESOLVER_IMAGE}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`
        : `${IPFS_RESOLVER_IMAGE}${glbthumb}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;

      setTemplateVideoSrc(videoSrc);
      setTemplateImgSrc(imageSrc);
      setFallbackImgSrc(fallbackImageSrc);
    })();
  }, [video, img, glbthumb]);

  useEffect(() => {
    (async () => {
      const saleForTemplateAsc = await getLowestPriceAsset(
        collection_name,
        template_id
      );
      const lowestPriceSale = saleForTemplateAsc[0];
      const lowestPrice =
        lowestPriceSale && lowestPriceSale.listing_price
          ? `${addPrecisionDecimal(
              lowestPriceSale.listing_price,
              lowestPriceSale.price.token_precision
            )} ${lowestPriceSale.listing_symbol}`
          : '';

      setTemplateLowestPrice(lowestPrice);
      setIsLoadingLowestPrice(false);
    })();
  }, []);

  const router = useRouter();
  const redirectPath = `/${collection_name}/${template_id}`;
  const hasMultiple = !isNaN(parseInt(issued_supply))
    ? parseInt(issued_supply) > 1
    : false;

  const openDetailPage = () => {
    router.push(redirectPath);
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

  const priceSection = isLoadingLowestPrice ? (
    <ShimmerBlock aria-hidden />
  ) : templateLowestPrice ? (
    <Text>{templateLowestPrice}</Text>
  ) : (
    <PlaceholderPrice aria-hidden />
  );

  return (
    <Card
      tabIndex={0}
      hasMultiple={hasMultiple}
      onClick={openDetailPage}
      onKeyDown={handleEnterKey}>
      <Row>
        <CollectionNameButton onClick={openCollectionPage}>
          <CollectionIcon
            name={collection_name}
            image={img}
            margin="24px 16px 24px 0"
          />
          <Text>{collectionDisplayName || collection_name}</Text>
        </CollectionNameButton>
      </Row>
      {video ? (
        <TemplateVideo src={templateVideoSrc} autoPlay={false} />
      ) : (
        <TemplateImage
          templateImgSrc={templateImgSrc}
          ipfsHash={image}
          fallbackImgSrc={fallbackImgSrc}
          templateName={name}
        />
      )}
      <Title>{name}</Title>
      <GreyText>
        Edition size: {max_supply === '0' ? 'Unlimited' : max_supply}
      </GreyText>
      {priceSection}
    </Card>
  );
};

export default SearchTemplateCard;
