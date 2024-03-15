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
  OfferNameText
} from './UserActivitiesView.styled';
import { Image } from '../../styles/index.styled';
import moment from 'moment';
import { addPrecisionDecimal } from '../../utils';
import Link from 'next/link';
import { SpinnerWrap } from '../FinishedAuctions/FinishedAuctions.styled';
import Spinner from '../Spinner';
import { Video } from '../TemplateVideo/TemplateVideo.styled';
import { NoDataWrap } from '../UserCollectionWatchView/UserCollectionWatchView.styled';

const UserActivitiesView = ({ isLoading, data }: any): JSX.Element => {
  return (
    <Container>
      {isLoading ? <SpinnerWrap><Spinner /></SpinnerWrap> :
      data.length == 0 ? <NoDataWrap>No Data</NoDataWrap> :
        <OffersWrap>
          <OffersHead>
            <OffersHeadText width='25%'>Name</OffersHeadText>
            <OffersHeadText width='15%'>Sender</OffersHeadText>
            <OffersHeadText width='25%'>Transaction Type</OffersHeadText>
            <OffersHeadText width='17.5%'>Time</OffersHeadText>
            <OffersHeadText width='12.5%'>Mint Address</OffersHeadText>
            <OffersHeadText width='5%' style={{justifyContent: 'center'}}>Tx</OffersHeadText>
          </OffersHead>
          <OffersBody>
            {data.map((item) => (
              <OfferItem>
                <OfferName>
                  {item['assets'][0]['data']['video'] != undefined && item['assets'][0]['data']['video'] != '' ? 
                    <Video src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} style={{width: '32px', height: '32px', borderRadius: '5px'}} /> :
                    <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image'] || item['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="32px" height="32px" style={{borderRadius: '5px'}} />
                  }
                  <OfferNameText>{item['assets'][0]['data']['name']}</OfferNameText>
                </OfferName>
                <OfferTxId>{item['sender_name']}</OfferTxId>
                <OfferTxType>{item['memo']}</OfferTxType>
                <OfferTime>{moment(new Date(parseInt(item['created_at_time']))).fromNow()}</OfferTime>
                <OfferMintAddr>{item['assets'][0]['collection']['name']}</OfferMintAddr>
                <OfferTx>
                    <Link href={`https://www.protonscan.io/transaction/${item['txid']}`}>
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

export default UserActivitiesView;
