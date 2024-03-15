import { memo } from 'react';
import { addPrecisionDecimal } from '../../utils';
import { Wrap, Part, GreyPart, ColorPart } from './VolumeBar';

const VolumeBar = ({data}: any): JSX.Element => {
  return (
    <Wrap>
      <Part>
        <GreyPart>Volume 24h:</GreyPart>
        <ColorPart>${addPrecisionDecimal(String(data[0]['price']['volume_usd_24h'].toFixed(2)), 0, false)}</ColorPart>
      </Part>
      <Part>
        <GreyPart>Circulating Supply:</GreyPart>
        <ColorPart>{String(data[0]['supply']['circulating']).substring(0,2)}.{String(data[0]['supply']['circulating']).substring(2,4)}B XPR</ColorPart>
      </Part>
      <Part>
        <GreyPart>XPR/USD:</GreyPart>
        <ColorPart>${data[0]['price']['usd'].toFixed(6)}</ColorPart>
      </Part>
      <Part>
        <GreyPart>Market Cap:</GreyPart>
        <ColorPart>${addPrecisionDecimal(String(data[0]['price']['marketcap_usd']), 0, false)}</ColorPart>
      </Part>
    </Wrap>
  );
}

export default memo(VolumeBar);
