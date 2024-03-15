function parseModelIpfs(imageUrl: string) {
  if (!imageUrl) {
    return imageUrl;
  }

  if (imageUrl.substring(0, 2) === 'Qm') {
    imageUrl = `https://ipfs.io/ipfs/${imageUrl}`;
  }

  return imageUrl;
}

const AssetModel = ({
  usdz,
  model,
  stage,
  skybox,
  width,
  height,
  image,
  minHeight,
  backgroundColor,
  isSelectedAssetBeingSold,
  control
}: {
  model: string;
  stage?: string;
  skybox?: string;
  usdz?: string;
  width?: string;
  height?: string;
  image?: string;
  minHeight?: string;
  backgroundColor?: string;
  isSelectedAssetBeingSold?: any;
  control?: boolean;
}): JSX.Element => {
  return (
    <model-viewer
      id="reveal"
      src={parseModelIpfs(model)}
      poster={`${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
      autoplay
      ar
      enable-pan
      ar-modes="scene-viewer webxr quick-look"
      ar-scale="auto"
      camera-controls
      environment-image="neutral"
      camera-orbit="0deg 60deg"
      quick-look-browsers="safari chrome"
      loading="eager" 
      style={{
        minHeight: minHeight,
        height: height || '100%',
        width: width || '100%',
        borderRadius: 20,
      }}>
      </model-viewer>
  );
};

export default AssetModel;
