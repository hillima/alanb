import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Card,
  Blur,
  BlurContainer,
  Title,
  Description,
  BottomSection,
  IconContainer,
} from './CollectionCreatorCard.styled';
import { Image } from '../../styles/index.styled';
import { Collection } from '../../services/collections';
import { RESIZER_IMAGE, IPFS_RESOLVER_IMAGE } from '../../utils/constants';

type Props = {
  cardContent: Collection;
};

const CollectionCard = ({ cardContent }: Props): JSX.Element => {
  const router = useRouter();
  const [collectionImgSrc, setCollectionImgSrc] = useState<string>('');
  const {
    img,
    name,
    collection_name,
    data: { description },
  } = cardContent;
  const fallbackImgSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${img}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}&img-width=62`;

  useEffect(() => {
    (async () => {
      if (img) {
        setCollectionImgSrc(`${process.env.NEXT_PUBLIC_IPFS_URL}${img}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}&img-width=82`);
        return;
      }

      setCollectionImgSrc('/icon-blank-collection.png');
    })();
  }, [img]);

  const openCollectionsPage = () => {
    router.push(`/${collection_name}`);
  };

  return (
    <Card onClick={openCollectionsPage}>
      <BlurContainer>
        <Blur img={fallbackImgSrc} />
      </BlurContainer>
      <BottomSection height="224px">
        <IconContainer>
          <Image
            width="82px"
            height="82px"
            src={collectionImgSrc}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = fallbackImgSrc;
            }}
            alt={name}
          />
        </IconContainer>
        <Title>{name}</Title>
        {description ? <Description>{description}</Description> : null}
      </BottomSection>
    </Card>
  );
};

export default CollectionCard;
