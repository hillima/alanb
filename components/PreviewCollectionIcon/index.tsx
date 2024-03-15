import { IconContainer } from './PreviewCollectionIcon.styled';
import { IPFS_RESOLVER_IMAGE, RESIZER_IMAGE, RESIZER_IMAGE_COL, RESIZER_IMAGE_XSM } from '../../utils/constants';
import { Image } from '../../styles/index.styled';
export { IconContainer } from './PreviewCollectionIcon.styled';

type Props = {
  name: string;
  image?: string;
  margin?: string;
  width?: string;
};

const PreviewCollectionIcon = ({ name, image, margin, width }: Props): JSX.Element => {
  const isIpfs = image && image.slice(0, 4).toLowerCase() !== 'data';
  const imageSrc = isIpfs
    ? `${process.env.NEXT_PUBLIC_IPFS_URL}${image}`
    : image || '/icon-blank-collection.png';
  const onImageError = (e) => {
    e.currentTarget.onerror = null;
    if (isIpfs) {
      e.currentTarget.src = `${process.env.NEXT_PUBLIC_IPFS_URL}${image}`;
    }
  };

  return (
    <IconContainer margin={margin} width={width}>
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
          borderRadius: '6px',
        }}
      />
    </IconContainer>
  );
};

PreviewCollectionIcon.defaultProps = {
  name: 'collection icon',
};

export default PreviewCollectionIcon;
