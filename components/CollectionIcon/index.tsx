import { IconContainer } from './CollectionIcon.styled';
import { IPFS_RESOLVER_IMAGE, RESIZER_IMAGE, RESIZER_IMAGE_COL, RESIZER_IMAGE_XSM } from '../../utils/constants';
import { Image } from '../../styles/index.styled';
export { IconContainer } from './CollectionIcon.styled';

type Props = {
  name: string;
  image?: string;
  margin?: string;
  width?: string;
};

const CollectionIcon = ({ name, image, margin, width }: Props): JSX.Element => {
  const isIpfs = image && image.slice(0, 4).toLowerCase() !== 'data';
  const imageSrc = `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
  const onImageError = (e) => {
    e.currentTarget.onerror = null;
    if (isIpfs) {
      e.currentTarget.src = `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`;
    }
  };

  return (
    <IconContainer margin={margin} width={width}>
      <Image
        alt={name}
        src={imageSrc}
        height="180px"
        width="180px"
        onError={onImageError}
        objectFit="cover"
        style={{
          maxWidth: '180px',
          maxHeight: '180px',
          borderRadius: '20px'
        }}
      />
    </IconContainer>
  );
};

CollectionIcon.defaultProps = {
  name: 'collection icon',
};

export default CollectionIcon;
