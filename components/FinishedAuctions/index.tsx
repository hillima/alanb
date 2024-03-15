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
  AuctionTime,
  Relative,
  ItemBottom,
  ItemBidWrap,
  ItemBidText,
  ItemBidLeft,
  ItemBidPrice,
  ImgWrap,
} from './FinishedAuctions.styled';
import { Image } from '../../styles/index.styled';
import { addPrecisionDecimal } from '../../utils';
import { Video } from '../TemplateVideo/TemplateVideo.styled';

const FinishedAuctions = ({data, size}): JSX.Element => {
  return (
    <Container>
      <TopWrap>
        <TopLeftWrap>
          <Title>Finished Auctions</Title>
        </TopLeftWrap>
      </TopWrap>
        <ItemWrap columns={Math.floor(size['windowWidth'] / 300)}>
          {data.map((item, index) => (
              <Item>
              <ItemColumn>
                <ItemImgWrap>
                  <ImgWrap>
                  {
                      item['assets'][0]['data']['video'] == '' || item['assets'][0]['data']['video'] == undefined ?
                      <Image
                        width="100%"
                        height="100%"
                        src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image'] || item['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                      /> :
                      <Video src={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} 
                        autoPlay={false}
                      />
                  }
                  </ImgWrap>
                  <Relative>
                    <AuctionTimeBtn>
                      <AuctionTime>End Auction</AuctionTime>
                    </AuctionTimeBtn>
                  </Relative>
                </ItemImgWrap>
                <ItemBottom>
                  <ItemColName>{item['assets'][0]['data']['name']}</ItemColName>
                  <ItemCreator>By {item['seller']}</ItemCreator>
                  <ItemBidWrap>
                    <ItemBidLeft>
                      <ItemBidText>Buyer: {item['buyer']}</ItemBidText>
                      <ItemBidPrice>{addPrecisionDecimal(item['price']['amount'], 4, false)} XPR</ItemBidPrice>
                    </ItemBidLeft>
                  </ItemBidWrap>
                </ItemBottom>
              </ItemColumn>
              </Item>
          ))}
        </ItemWrap>
    </Container>
  );
};

export default FinishedAuctions;
