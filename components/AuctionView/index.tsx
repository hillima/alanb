import { useNavigatorUserAgent, useWindowSize } from '../../hooks';
import {
  Container,
  SeeBtn, 
  ItemWrap,
  Item, 
  ItemColName, 
  ItemColumn, 
  ItemCreator,
  ItemImgWrap,
  HeartBtn,
  HeartIcon,
  AuctionTimeBtn,
  AuctionTime,
  Relative,
  ItemBottom,
  ItemBidWrap,
  ItemBidText,
  ItemBidLeft,
  ItemBidPrice,
  ItemBidBtn,
  ImgWrap,
  BtnWrap,
  MainBtn
} from './AuctionView.styled';
import { Image } from '../../styles/index.styled';
import { addPrecisionDecimal } from '../../utils';
import Countdown from "react-countdown";
import Link from 'next/link';
import { SpinnerWrap } from '../FinishedAuctions/FinishedAuctions.styled';
import Spinner from '../Spinner';
import { Video } from '../TemplateVideo/TemplateVideo.styled';
import proton from '../../services/proton';
import { NoDataWrap } from '../UserCollectionWatchView/UserCollectionWatchView.styled';

const AuctionView = ({ data, isLoading, allData, reload }: any): JSX.Element => {
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
  const claimWon = async () => {
    const ids = await allData['buyer'].filter((item) => !item['claimed_by_buyer']);
    if(0 < ids.length){
      await proton.claimAuctionBuy(ids.map((item) => item['auction_id']));
    }
  }
  const claimFunds = async () => {
    const ids = await allData['sold'].filter((item) => !item['claimed_by_seller'] && item['state'] == 3);
    if(0 < ids.length){
      await proton.claimAuctionSell(ids.map((item) => item['auction_id']));
    }
  }
  const claimUnsold = async () => {
    const ids = await allData['seller'].filter((item) => !item['claimed_by_buyer'] && item['state'] == 4);
    if(0 < ids.length){
      await proton.cancelAuction(ids.map((item) => item['auction_id']));
    }
  }
  const auctionCancel = async (id) => {
    await proton.cancelAuction([id])
    .then(res => {
      if(res.success){
        reload();
      }
    })
  }
  return (
    <Container>
      <BtnWrap>
        {0 < allData['buyer'].filter((item) => !item['claimed_by_buyer']).length ? 
        <MainBtn isBackColor={true} onClick={claimWon}>Claim NFT(s) from auctions won ({allData['buyer'].filter((item) => !item['claimed_by_buyer']).length})</MainBtn> : null}
        {0 < allData['sold'].filter((item) => !item['claimed_by_seller'] && item['state'] == 3).length ? 
        <MainBtn isBackColor={true} onClick={claimFunds}>Claim Auction Funds</MainBtn> : null}
        {0 < allData['seller'].filter((item) => !item['claimed_by_buyer'] && item['state'] == 4).length ? 
        <MainBtn isBackColor={true} onClick={claimUnsold}>Claim Unsold Nfts ({allData['seller'].filter((item) => !item['claimed_by_buyer'] && item['state'] == 4).length})</MainBtn> : null}
      </BtnWrap>
      {isLoading ? <SpinnerWrap><Spinner /></SpinnerWrap> :
      data.length == 0 ? <NoDataWrap>No Data</NoDataWrap> :
        <ItemWrap columns={Math.floor(size['windowWidth'] / 260)}>
          {data.map((item, index) => (
                <Item>
                  <ItemColumn>
                      <ItemImgWrap>
                      <ImgWrap>
                      {
                        item['assets'][0]['data']['glbthumb'] != '' && item['assets'][0]['data']['glbthumb'] != undefined ? 
                          <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" />  :
                        item['assets'][0]['data']['video'] != '' && item['assets'][0]['data']['video'] != undefined ? 
                          <Video 
                            src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} 
                            width="100%" 
                            height="100%" 
                            style={{objectFit: 'cover', borderRadius: '0'}} 
                            autoPlay
                          /> : 
                        <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image'] || item['assets'][0]['data']['Image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" /> 
                      }
                      </ImgWrap>
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
                        <ItemCreator>Buyer - {item['buyer'] == null ? 'No Buyer' : `@${item['buyer']}`}</ItemCreator>
                        <ItemBidWrap>
                          <ItemBidLeft>
                            {item['state'] == 3 ? <ItemBidText>Price</ItemBidText> : <ItemBidText>Current Bid</ItemBidText>}
                            <ItemBidPrice>{addPrecisionDecimal(item['price']['amount'], 4, false)} XPR</ItemBidPrice>
                          </ItemBidLeft>
                          <div>
                            {item['state'] == 1 ? <ItemBidBtn 
                            onClick={() => auctionCancel(item['auction_id'])}
                            style={{marginRight: '8px'}}>Cancel</ItemBidBtn> : null}
                            <Link href={`/auctions/${item['auction_id']}`}>
                              <a>
                                <ItemBidBtn>Detail</ItemBidBtn>                 
                              </a>
                            </Link>
                          </div>
                        </ItemBidWrap>
                      </ItemBottom>
                    </ItemColumn>
                  </Item>
          ))}
        </ItemWrap>
      }
      {!isDesktop ? <SeeBtn>See all</SeeBtn> : null}
    </Container>
  );
};

export default AuctionView;
