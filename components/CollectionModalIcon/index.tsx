import { IconContainer } from './CollectionModalIcon.styled';
import { IPFS_RESOLVER_IMAGE } from '../../utils/constants';
import { Image } from '../../styles/index.styled';
export { IconContainer } from './CollectionModalIcon.styled';

type Props = {
  name: string;
  image?: string;
  margin?: string;
  width?: string;
};

const CollectionModalIcon = ({ name, image, margin, width }: Props): JSX.Element => {
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
        height="80px"
        width="80px"
        onError={onImageError}
        objectFit="cover"
        style={{
          maxWidth: '88px',
          maxHeight: '88px',
          objectFit: 'contain'
        }}
      />
    </IconContainer>
  );
};

CollectionModalIcon.defaultProps = {
  name: 'collection icon',
};

export default CollectionModalIcon;
