import { Image } from '../../styles/index.styled';
import { addPrecisionDecimal } from '../../utils';
import {
  AtrBox,
  AtrColor,
  AtrGrey,
  AtrText,
  AtrWrap,
  BoldText,
  ButtonWrap,
  AuctionBox,
  AuctionLeft,
  GreyTexta,
  BoldTexta,
  SmalText,
  AuctionRight,
  Container, 
  Description, 
  GreyText, 
  ImageContainer, 
  LeftView, 
  Name, 
  RightView, 
  LastestBox, 
  LastestGrey, 
  LastestBold, 
  MainBtn, 
  HowText, 
  HowDesc,
  BidWrap,
  AvailbleBal,
  ErrorText,
  NextBidText,
  NextMinimumBtn,
  Dividera,
  BoldTextb
} from './AuctionDetail.styled';
import AssetVideo from '../AssetDisplay/AssetVideo';
import AssetModel from '../AssetDisplay/AssetModel';
import ModalImage from "react-modal-image";
import InputField from '../InputField';
import proton from '../../services/proton';

const AuctionDetail = ({ 
  data, currentUser, login,
  inputVal, setInputVal, parseBalance, currentUserXprBalance,
  hours, minutes, seconds, rate}): JSX.Element => {
  const exceptList = ['image', 'audio', 'name', 'glbthumb', 'series', 'video', 'model', 'marketplace', 'desc'];
  const Completionist = () => <span>End Auction</span>;
  const handleOfferClick = async () => {
    await proton.bidOnAuction({
      auction_id: data['auction_id'],
      bid: `${parseFloat(inputVal).toFixed(4)} XPR`
    })
    .then(res =>{
      if(res.success){
        window.location.reload();
      }
    })
  };
  return (
    <Container>
     <LeftView>
        <Name>{data['assets'][0]['data']['name']}</Name>
        <>
          <GreyText>By</GreyText><BoldText> {data['collection']['name']}</BoldText><GreyText> Owner</GreyText><BoldText> {data['seller']}</BoldText>
        </>
        <ButtonWrap>
          <Image src="/gold-verified.svg" width='33px' height='30px' />
        </ButtonWrap>
        <Description>
          {data['assets'][0]['data']['desc']}
        </Description>
        <AtrText>Attributes</AtrText>
        <AtrWrap>
            {
              Object.keys(data['assets'][0]['data']).map(item => 
              exceptList.indexOf(item) < 0 ? (
                <AtrBox>
                  <AtrGrey>{item}</AtrGrey>
                  <AtrColor>{data['assets'][0]['data'][item]}</AtrColor>
              </AtrBox>
              ) : null)}
        </AtrWrap>
     </LeftView>
     <RightView>
      <ImageContainer>
            {data['assets'][0]['data']['image'] == '' || data['assets'][0]['data']['image'] == undefined ? 
              data['assets'][0]['data']['video'] == '' || data['assets'][0]['data']['video'] == undefined ? 
              <AssetModel 
                model={data['assets'][0]['data']['model']} width="100%" 
                height="500px" image={data['assets'][0]['data']['glbthumb']} 
              /> :
              <AssetVideo video={data['assets'][0]['data']['video']} /> :
              <ModalImage
                className="modal-img"
                small={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['assets'][0]['data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                large={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['assets'][0]['data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                alt={`${data['assets'][0]['data']['name']}`}
                hideZoom={true}
                hideDownload={true}
              />
            }
        </ImageContainer>
        <AuctionBox>
          <AuctionLeft>
            <GreyTexta>CurrentBid</GreyTexta>
            <BoldTexta>{addPrecisionDecimal(data['price']['amount'], 4, false)} XPR</BoldTexta>
            <BoldTextb>${(rate*parseInt(addPrecisionDecimal(data['price']['amount'], 4, true))).toFixed(2)}</BoldTextb>
            <SmalText>Minimum bid: {addPrecisionDecimal(data['price']['amount'], 4, false)} XPR</SmalText>
          </AuctionLeft>
          <AuctionRight>
            <GreyTexta>Auction ends in</GreyTexta>
            {
              (hours + minutes + seconds) <= 0 ? 
                <Completionist /> :
                <>
                  <BoldTexta>{hours}<Dividera />{minutes}<Dividera />{seconds}</BoldTexta>
                  <SmalText>Hours<Dividera />Minutes<Dividera />Seconds</SmalText>
                </>
            }
          </AuctionRight>
        </AuctionBox>
        {data['bids'].length <= 0 ? null : 
          <LastestBox>
              {data['bids'].map((item, index) => (
                <>
                  <div>{index == data['bids'].length - 1 ? <LastestGrey>Latest bid by</LastestGrey> : null}<LastestBold> {item['account']}, <span>{addPrecisionDecimal(item['amount'], 4, false)}XPR</span> </LastestBold><LastestGrey>{new Date(parseInt(item['created_at_time'])).toUTCString()}</LastestGrey></div>
                </>
              ))}
          </LastestBox>
        }
        {currentUser ? 
        data['state'] == 1 ? 
        <>
          <AvailbleBal>
            Available Balance: {addPrecisionDecimal(currentUserXprBalance, 4, false)}
          </AvailbleBal>
          <NextBidText>Next minimum bid: {data['bids'].length == 0 ? addPrecisionDecimal(data['price']['amount'], 4, false) : (parseInt(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) + Math.ceil(parseFloat(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) * 0.1000001)).toFixed(4)} XPR</NextBidText>
          <BidWrap>
            <InputField 
              inputType='number' 
              value={inputVal} 
              setValue={(val) => setInputVal(val)}
              mr={"15px"}
            />
            <MainBtn
              isBackColor={true}
              onClick={handleOfferClick}
              disabled={data['bids'].length == 0 ? parseFloat(parseBalance) < parseFloat(inputVal) || inputVal == '' || parseFloat(inputVal) < parseInt(addPrecisionDecimal(data['price']['amount'], 4, true)) : parseFloat(parseBalance) < parseFloat(inputVal) || inputVal == '' || parseFloat(inputVal) <= parseFloat(addPrecisionDecimal(data['price']['amount'], 4, true))}
              isDisabled={data['bids'].length == 0 ? parseFloat(parseBalance) < parseFloat(inputVal)  || inputVal == '' || parseFloat(inputVal) < parseInt(addPrecisionDecimal(data['price']['amount'], 4, true)) : parseFloat(parseBalance) < parseFloat(inputVal) || inputVal == '' || parseFloat(inputVal) <= parseFloat(addPrecisionDecimal(data['price']['amount'], 4, true))}
            >
              Place a Bid
            </MainBtn>
          </BidWrap>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <NextMinimumBtn onClick={() => {
              let val = data['bids'].length == 0 ? parseInt(addPrecisionDecimal(data['price']['amount'], 4, true)) : (parseInt(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) + Math.ceil(parseFloat(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) * 0.1000001));
              setInputVal(val);
            }}>Minimum</NextMinimumBtn>
            <NextMinimumBtn onClick={() => {
              let val = data['bids'].length == 0 ? parseInt(addPrecisionDecimal(data['price']['amount'], 4, true)) : (parseInt(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) + Math.ceil(parseFloat(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) * 0.1000001));
              setInputVal(inputVal == '' ? val + 10 : inputVal + 10);
            }}>+10</NextMinimumBtn>
            <NextMinimumBtn onClick={() => {
              let val = data['bids'].length == 0 ? parseInt(addPrecisionDecimal(data['price']['amount'], 4, true)) : (parseInt(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) + Math.ceil(parseFloat(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) * 0.1000001));
              setInputVal(inputVal == '' ? val + 100 : inputVal + 100);
            }}>+100</NextMinimumBtn>
            <NextMinimumBtn onClick={() => {
              let val = data['bids'].length == 0 ? parseInt(addPrecisionDecimal(data['price']['amount'], 4, true)) : (parseInt(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) + Math.ceil(parseFloat(data['bids'][data['bids'].length - 1]['amount'].substring(0, data['bids'][data['bids'].length - 1]['amount'].length - 4)) * 0.1000001));
              setInputVal(inputVal == '' ? val + 1000 : inputVal + 1000);
            }}>+1000</NextMinimumBtn>
            <NextMinimumBtn onClick={() => {
              setInputVal('');
            }}>Reset</NextMinimumBtn>
          </div>
          {parseFloat(parseBalance) < parseFloat(inputVal) ? <ErrorText>Insufficient funds</ErrorText> : null}
        </> : null : 
        <MainBtn 
          isBackColor={true} 
          onClick={login}
        >Connect Wallet</MainBtn>
        }
          <HowText>How it works:</HowText>
          <HowDesc>
            1. You will automatically get your XPR returned to your wallet if outbid<br />
            2. If a bid is received 5 minutes from the end of the auction, the bidding time will be extended by 5 minutes<br />
            3. When auction closes, the artwork will belong to the highest bidder. Please claim the NFT by pressing the “claim item” button
          </HowDesc>
     </RightView>
    </Container>
  );
};

export default AuctionDetail;
