import {
    Container,
    TopLine,
    ColName,
    StasBox,
    StatText
} from './UserCollectionAsset.styled';
import { Image } from '../../styles/index.styled';
import Grid from '../Grid';
import { addPrecisionDecimal } from '../../utils';
import LoadingPage from '../LoadingPage';
import { NoDataWrap } from '../UserCollectionWatchView/UserCollectionWatchView.styled';

const UserCollectionAsset = ({data, isLoading, listingPrice, originAssets}): JSX.Element => {

  if(isLoading){
    return <LoadingPage />
  }


  return data.length == 0 ? <NoDataWrap>No Data</NoDataWrap> : ( 
    <Container>
        <TopLine>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['assets'][0]['collection']['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="36px" height='36px' style={{borderRadius: '50%',filter: 'drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.15))'
              }} />
              <ColName onClick={() => window.location.href = `/collections/${data['assets'][0]['collection']['collection_name']}`}>{data['assets'][0]['collection']['name']}</ColName>
            </div>
            <StasBox>
                <StatText>ITEMS {data['assets'].length}</StatText>
                <StatText style={{marginLeft: '13px', marginRight: '20px'}}>FLOOR {originAssets.filter((it) => it['assets'][0]['collection']['name'] === data['assets'][0]['collection']['name']).length == 0 ? '--' : `${originAssets.filter((it) => it['assets'][0]['collection']['name'] === data['assets'][0]['collection']['name'])[0]['floor']} XPR`}</StatText>
                <StatText>TOTAL {originAssets.filter((it) => it['assets'][0]['collection']['name'] === data['assets'][0]['collection']['name']).length == 0 ? '--' : `${originAssets.filter((it) => it['assets'][0]['collection']['name'] === data['assets'][0]['collection']['name'])[0]['total']} XPR`}</StatText>
            </StasBox>
        </TopLine>
        <Grid items={data['assets']} isFilter={false} isBulk={false} listingPrice={listingPrice} />
    </Container>
  );
};

export default UserCollectionAsset;
