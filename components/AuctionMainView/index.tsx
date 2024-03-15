import { Image } from '../../styles/index.styled';
import { addPrecisionDecimal } from '../../utils';
import {
  Container,
  Content,
  Title,
  SubTitle,
  ButtonWrapper,
  MainBtn,
  FeatureBtn,
  Artist,
  ImageContainer,
  AuctionBox,
  AuctionLeft,
  GreyText,
  BoldText,
  SmalText,
  AuctionRight,
} from './AuctionMainView.styled';
import Countdown from 'react-countdown';
import { Video } from '../TemplateVideo/TemplateVideo.styled';

const AuctionMainView = ({data, renderer}): JSX.Element => {
  const Completionist = () => <span>End Auction</span>;
  return (
    <Container>
      <Content>
        <FeatureBtn>Featured auction</FeatureBtn>
        <Title>{data['assets'][0]['data']['name']}</Title>
        <Artist>By {data['seller']}</Artist>
        <SubTitle>
          {data['assets'][0]['data']['desc']}
        </SubTitle>
        <AuctionBox>
          <AuctionLeft>
            <GreyText>CurrentBid</GreyText>
            <BoldText>{addPrecisionDecimal(data['price']['amount'], 4, false)} XPR</BoldText>
            <SmalText>Minimum bid: {addPrecisionDecimal(data['price']['amount'], 4, false)} XPR</SmalText>
          </AuctionLeft>
          <AuctionRight>
            <GreyText>Auction ends in</GreyText>
            <Countdown date={new Date(parseInt(data['end_time']))} renderer={renderer}>
              <Completionist />
            </Countdown>
          </AuctionRight>
        </AuctionBox>
        <ButtonWrapper>
          <MainBtn
            isBackColor={true}
            onClick={() => { window.location.href=`/auctions/${data['auction_id']}` }}>
            Place a bid
          </MainBtn>
        </ButtonWrapper>
      </Content>
      <ImageContainer>
      {data['assets'][0]['data']['video'] == '' || data['assets'][0]['data']['video'] == undefined ?
        <Image
          width="100%"
          height="100%"
          alt="Explore"
          style={{borderRadius: '18px'}}
          src={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['assets'][0]['data']['image'] || data['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
        /> :
        <Video src={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} />
      }
      </ImageContainer>
    </Container>
  );
};

export default AuctionMainView;
