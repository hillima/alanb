import { useNavigatorUserAgent } from '../../hooks';
import {
  Container,
  OffersWrap,
  OffersHead,
  OffersHeadText,
  OffersBody,
  OfferItem,
  OfferName,
  OfferTxType,
  OfferTxId,
  OfferAmount,
  OfferTime,
  OfferMintAddr,
  OfferTx,
  OfferNameText,
  OfferActionWrap,
  ActionBtn
} from './UserOffersView.styled';
import { Image } from '../../styles/index.styled';
import moment from 'moment';
import { addPrecisionDecimal } from '../../utils';
import Link from 'next/link';
import { SpinnerWrap } from '../FinishedAuctions/FinishedAuctions.styled';
import Spinner from '../Spinner';
import { NoDataWrap } from '../UserCollectionWatchView/UserCollectionWatchView.styled';
import proton from '../../services/proton';

const UserOffersView = ({ isLoading, data, state, reload }: any): JSX.Element => {
  const offerCancel = async (offerId, from) => {
    await proton.cancelOffer({ 
      offerId,
      from
    }).then(res => {
      if(res.success){
        setTimeout(() => {
          reload();
        }, 2000);
      }
    });
  };
  const offerAccept = async (offerId, from, assetIds, price) => {
    await proton.acceptOffer({
      from,
      offerId,
      assetIds,
      price
    }).then(res => {
      if(res.success){
        setTimeout(() => {
          reload();
        }, 2000);
      }
    });
  }
  const offerDecline = async (offerId, from) => {
    await proton.declineOffer({
      offerId,
      from
    }).then(res => {
      if(res.success){
        setTimeout(() => {
          reload();
        }, 2000);
      }
    });
  }
  return (
    <Container>
      {isLoading ? <SpinnerWrap><Spinner /></SpinnerWrap> :
      data.length == 0 ? <NoDataWrap>No Data</NoDataWrap> :
        <OffersWrap>
          <OffersHead>
            <OffersHeadText width='17%'>Name</OffersHeadText>
            <OffersHeadText width='12.5%'>{state == 'made' ? 'Seller' : 'Buyer'}</OffersHeadText>
            <OffersHeadText width='12.5%'>Transaction Type</OffersHeadText>
            <OffersHeadText width='15.5%'>Time</OffersHeadText>
            <OffersHeadText width='15%'>Total Amount</OffersHeadText>
            <OffersHeadText width='12.5%'>Mint Address</OffersHeadText>
            <OffersHeadText width='10%'>Action</OffersHeadText>
            <OffersHeadText width='5%' style={{justifyContent: 'center'}}>Detail</OffersHeadText>
          </OffersHead>
          <OffersBody>
            {data.map((item) => (
              <OfferItem>
                <OfferName>
                  <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="32px" height="32px" style={{borderRadius: '5px'}} />
                  <OfferNameText>{item['assets'][0]['data']['name']}</OfferNameText>
                </OfferName>
                <OfferTxId>{state == 'made' ? item['seller'] : item['buyer']}</OfferTxId>
                <OfferTxType>{item['state'] == 0 ? 'WAITING' : 
                item['state'] == 1 && item['decline_memo'] !== null ? 'DECLINED' : 
                item['state'] == 1 ? 'LISTED' :
                item['state'] == 2 ? 'CANCELED' : 'SOLD'}</OfferTxType>
                <OfferTime>{moment(new Date(parseInt(item['updated_at_time']))).fromNow()}</OfferTime>
                <OfferAmount>{addPrecisionDecimal(item['price']['amount'], 4, false)} XPR</OfferAmount>
                <OfferMintAddr>{item['assets'][0]['collection']['name']}</OfferMintAddr>
                <OfferActionWrap>{state == 'made' && item['state'] == 0 ? <ActionBtn onClick={() => offerCancel(parseInt(item['buyoffer_id']), item['buyer'])}>Cancel</ActionBtn> : 
                state == 'received' && item['state'] == 0 ? 
                <>
                  <ActionBtn onClick={() => offerAccept(parseInt(item['buyoffer_id']), item['seller'], item['assets'].map((it) => it['asset_id']), item['price']['amount'])}>Accept</ActionBtn>
                  <ActionBtn onClick={() => offerDecline(parseInt(item['buyoffer_id']), item['seller'])}>Decline</ActionBtn>
                </> : null
                }</OfferActionWrap>
                <OfferTx>
                    <Link href={`/collections/${item['assets'][0]['collection']['collection_name']}/${item['assets'][0]['template']['template_id']}`}>
                      <a target="_blank">
                        <Image src="/tx-icon.svg" width="16px" height='16px' />
                      </a>
                    </Link>
                </OfferTx>
              </OfferItem>
            ))}
          </OffersBody>
        </OffersWrap>
      }
    </Container>
  );
};

export default UserOffersView;
