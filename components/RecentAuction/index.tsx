import { useNavigatorUserAgent, useWindowSize } from '../../hooks';
import {
  Container,
  TopWrap,
  TopLeftWrap, 
  Title, 
  SeeBtn, 
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
  ItemBidBtn,
  TopLeftMobileWrap,
  SpinnerWrap,
} from './RecentAuction.styled';
import { Image } from '../../styles/index.styled';
import { addPrecisionDecimal } from '../../utils';
import Countdown from "react-countdown";
import Link from 'next/link';
import Spinner from '../Spinner';
import { Video } from '../TemplateVideo/TemplateVideo.styled';

const RecentAuction = ({data}: any): JSX.Element => {
  const { isDesktop } = useNavigatorUserAgent();
  const size = useWindowSize();
  const Completionist = () => <span>End Auction</span>;
  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <AuctionTime>{hours}h {minutes}m {seconds}s</AuctionTime>;
    }
  };
  return (
    <Container>
      {isDesktop ? 
      <TopWrap>
        <TopLeftWrap>
          <Title>Recent Auctions</Title>
        </TopLeftWrap>
        <Link href="/auctions"><a><SeeBtn>See all</SeeBtn></a></Link>
      </TopWrap> : 
      <TopWrap>
        <TopLeftWrap>
          <TopLeftMobileWrap>
            <Title>Recent Auctions</Title>
          </TopLeftMobileWrap>
        </TopLeftWrap>
        {isDesktop ? <SeeBtn>See all</SeeBtn> : null}
      </TopWrap>
      }
      {data.length == 0 ? <SpinnerWrap><Spinner /></SpinnerWrap> :
        <ItemWrap columns={Math.floor(size['windowWidth'] / 300)}>
          {data.map((item, index) => isDesktop && Math.floor(size['windowWidth'] / 300) < index + 1 ? null : (
            <Link href={`/auctions/${item['auction_id']}`}>
              <a>
                <Item>
                  <ItemColumn>
                      <ItemImgWrap>
                        {
                        item['assets'][0]['data']['glbthumb'] != '' && item['assets'][0]['data']['glbthumb'] != undefined ? 
                          <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" />  :
                        item['assets'][0]['data']['video'] != '' && item['assets'][0]['data']['video'] != undefined ? 
                          <Video 
                            src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} 
                            width="100%" 
                            height="100%" 
                            autoPlay={false}
                          /> : 
                        <Image 
                          src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} 
                          width="100%" height="100%" objectFit='contain' /> 
                        }
                      <Relative>
                        <AuctionTimeBtn>
                        <Countdown date={new Date(parseInt(item['end_time']))} renderer={renderer}>
                          <Completionist />
                        </Countdown>
                        </AuctionTimeBtn>
                        {/* <HeartBtn>
                          <HeartIcon src="/new/heart.svg" />
                        </HeartBtn> */}
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
                          <ItemBidBtn>Make an offer</ItemBidBtn>
                        </ItemBidWrap>
                      </ItemBottom>
                    </ItemColumn>
                  </Item>
                </a>
              </Link>
          ))}
        </ItemWrap>
      }
      {!isDesktop ? <SeeBtn onClick={() => window.location.href = '/auctions'}>See all</SeeBtn> : null}
    </Container>
  );
};

export default RecentAuction;
