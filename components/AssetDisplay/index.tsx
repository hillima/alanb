import { AssetDisplayContainer } from './AssetDisplay.styled';
import AssetImage from './AssetImage';
import AssetVideo from './AssetVideo';
import dynamic from 'next/dynamic';

const AssetModelWithNoSsr = dynamic(() => import('./AssetModel'), {
  ssr: false,
});

type Props = {
  image?: string;
  video?: string;
  model?: string;
  stage?: string;
  skybox?: string;
  created?: string;
  templateName: string;
  glbthumb?: string;
  usdz?: string;
};

export const AssetDisplay = ({
  image,
  video,
  model,
  stage,
  skybox,
  created,
  templateName,
  usdz,
  glbthumb,
}: Props): JSX.Element => {
  let asset;
  if (video) {
    asset = <AssetVideo video={video} created={created} />;
  } else if (model) {
    asset = <AssetModelWithNoSsr usdz={usdz} image={image} model={model} stage={stage} skybox={skybox} minHeight='650px' control={true} />;
  } else if (image) {
    asset = (
      <AssetImage
        image={image}
        templateName={templateName}
        lightbox
        created={created}
      />
    );
  }

  return <AssetDisplayContainer>{asset}</AssetDisplayContainer>;
};

export default AssetDisplay;
