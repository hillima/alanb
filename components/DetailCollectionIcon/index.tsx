import { IconContainer } from './DetailCollectionIcon.styled';
import { IPFS_RESOLVER_IMAGE, RESIZER_IMAGE, RESIZER_IMAGE_COL, RESIZER_IMAGE_XSM } from '../../utils/constants';
import { Image } from '../../styles/index.styled';
export { IconContainer } from './DetailCollectionIcon.styled';

type Props = {
  name: string;
  image?: string;
  margin?: string;
  width?: string;
};

const DetailCollectionIcon = ({ name, image, margin, width }: Props): JSX.Element => {
  const isIpfs = image && image.slice(0, 4).toLowerCase() !== 'data';
  const imageSrc = isIpfs
    ? `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`
    : image || '/icon-blank-collection.png';
  const onImageError = (e) => {
    e.currentTarget.onerror = null;
    if (isIpfs) {
      e.currentTarget.src = `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
    }
  };

  return (
    <IconContainer margin={margin}>
      <Image
        alt={name}
        src={imageSrc}
        height="32px"
        width="32px"
        onError={onImageError}
        objectFit="cover"
        style={{
          maxWidth: '32px',
          maxHeight: '32px',
          borderRadius: '20px'
        }}
      />
    </IconContainer>
  );
};

DetailCollectionIcon.defaultProps = {
  name: 'collection icon',
};

export default DetailCollectionIcon;
