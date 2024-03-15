import {
  Container,
  TopWrap,
  TopLeftWrap, 
  Title, 
  ItemWrap,
  Item, 
  ItemColName, 
  ItemColumn, 
  ItemCreator,
  ItemImgWrap,
  AuctionTimeBtn,
  Relative,
  ItemBottom,
  ItemBidWrap,
  ItemBidText,
  ItemBidLeft,
  ItemBidPrice,
  ItemBidBtn,
} from './LiveAuctions.styled';
import { Image } from '../../styles/index.styled';
import Link from 'next/link';
import Countdown from "react-countdown";
import { addPrecisionDecimal } from '../../utils';
import { Video } from '../TemplateVideo/TemplateVideo.styled';

const LiveAuctions = ({data, renderer, size}): JSX.Element => {
  const Completionist = () => <span>End Auction</span>;
  return (
    <Container>
      <TopWrap>
        <TopLeftWrap>
          <Title>Live Auctions</Title>
        </TopLeftWrap>
      </TopWrap>
      <ItemWrap columns={Math.floor(size['windowWidth'] / 300)}>
        {data.map((item) => (
            <Link href={`/auctions/${item['auction_id']}`}>
            <a>
              <Item>
                <ItemColumn>
                  <ItemImgWrap>
                    {
                      item['assets'][0]['data']['video'] == '' || item['assets'][0]['data']['video'] == undefined ?
                      <Image
                        width="100%"
                        height="100%"
                        objectFit='contain'
                        style={{position: 'absolute'}} 
                        src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image'] || item['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                      /> :
                      <Video 
                        src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} 
                        width="100%" height="100%" style={{objectFit: 'contain', position: 'absolute'}} 
                        autoPlay={false}
                      />
                    }
                    <Relative>
                      <AuctionTimeBtn>
                        <Countdown date={new Date(parseInt(item['end_time']))} renderer={renderer}>
                          <Completionist />
                        </Countdown>
                      </AuctionTimeBtn>
                    </Relative>
                  </ItemImgWrap>
                  <ItemBottom>
                    <ItemColName>{item['assets'][0]['data']['name']}</ItemColName>
                    <ItemCreator>By {item['seller']}</ItemCreator>
                    <ItemBidWrap>
                      <ItemBidLeft>
                        <ItemBidText>Current Bid</ItemBidText>
                        <ItemBidPrice>{addPrecisionDecimal(item['price']['amount'], 4, false)} XPR</ItemBidPrice>
                      </ItemBidLeft>
                      <ItemBidBtn>Place a bid</ItemBidBtn>
                    </ItemBidWrap>
                  </ItemBottom>
                </ItemColumn>
              </Item>
            </a>
            </Link>
        ))}
      </ItemWrap>
    </Container>
  );
};

export default LiveAuctions;
