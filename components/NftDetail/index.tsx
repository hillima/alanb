import { useRouter } from 'next/router';
import { useNavigatorUserAgent } from '../../hooks';
import { Image } from '../../styles/index.styled';
import { useCallback, useEffect, useState } from 'react'; 
import {
  AtrBox,
  AtrColor,
  AtrGrey,
  AtrMain,
  AtrText,
  AtrWrap,
  BoldText,
  ButtonWrap,
  Divider,
  AuctionBox,
  AuctionLeft,
  GreyTexta,
  BoldTexta,
  SmalText,
  AuctionRight,
  Dividera,
  Container, Description, GreyText, ImageContainer, LeftView, Name, RightView, LastestBox, LastestGrey, LastestBold, LastestSee, MainBtn, HowText, HowDesc,
  ArrowWrap,
  NoList,
  AboutDesc,
  DetailWrap,
  DetailLine,
  DetailGrey,
  DetailAdr,
  RatingBox,
  Wrap,
  BidsWrap,
  BidsTop,
  BidsGrey,
  BidsLine,
  BidsText,
  ScrollWrap
} from './NftDetail.styled';
import { DisabledInput, DropdownMenu } from '../AssetFormBuy/AssetFormBuy.styled';
import ReactTooltip from 'react-tooltip';
import AssetVideo from '../AssetDisplay/AssetVideo';
import Link from 'next/link';
import { MODAL_TYPES, useAuthContext, useModalContext, useWhitelistContext } from '../Provider';
import proton from '../../services/proton';
import { addPrecisionDecimal } from '../../utils';
import moment from 'moment';
import ModalImage from "react-modal-image";
import AssetFormPopupMenu from '../AssetFormPopupMenu';
import { REPORT_TYPE } from '../../utils/constants';
import AssetModel from '../AssetDisplay/AssetModel';
import Spinner from '../Spinner';
import { BoxWrap } from '../PageHeader/PageHeader.styled';
import toast from '../Toast';

const NftDetail = ({
  data, assets, allAssets, 
  collectionData, offers, transfers, 
  isRefetching, assetId, setAssetId,
  saleIds, assetIds, setCurrentAssetAsModalProps,
  isMyTemplate, currentUser, updateCurrentUserBalance,
  soldBtnText, soldBtnClick, isLoading, xprbalanceAmount,
  fetchData, userAssets
}: any): JSX.Element => {
  const stateList = ['sale', 'auction'];
  const exceptList = ['image', 'audio', 'name', 'glbthumb', 'series', 'video', 'model', 'marketplace', 'desc'];
  const [active, setActive] = useState([false, true, true, false, true, true]);
  const [assetIndex, setIndex] = useState(0);
  const [website, setWebsite] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [purchasingError, setPurchasingError] = useState<string>('');
  const { verifiedData } = useWhitelistContext();
  const { openModal, setModalProps } = useModalContext();
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);

  useEffect(() => {
    const { data: { url } } = collectionData;

    if(url !== undefined){
      let newArr = url.split('\n');
      const website = newArr[0].substring(newArr[0].indexOf('website:') + 8, newArr[0].length);
      const twitterLink = newArr[1].substring(newArr[0].indexOf('twitter:') + 9, newArr[1].length);
      const telegramLink = newArr[2].substring(newArr[0].indexOf('telegram:') + 10, newArr[2].length);
      const instaLink = newArr[3].substring(newArr[0].indexOf('instagram:') + 11, newArr[3].length);

      setWebsite(website);
      setTwitter(twitterLink);
      setTelegram(telegramLink);
      setInstagram(instaLink);
    }
  }, []);
  const buyAsset = async () => {
    try {
      if (!currentUser) {
        setPurchasingError('Must be logged in');
        return;
      }
      const chainAccount = currentUser.actor;
      const purchaseResult = await proton.purchaseSale({
        buyer: chainAccount,
        amount: assets[assetIndex]['listingPrice'],
        sale_id: assets[assetIndex]['saleId'],
      });

      if (purchaseResult.success) {
        updateCurrentUserBalance(chainAccount);
        notify("success", "Success!");
        fetchData();
      } else {
        throw purchaseResult.error;
      }
    } catch (e) {
      setPurchasingError(e.message);
    }
  };
  
  const cancelAsset = async () => {
    try {
      if (!currentUser) {
        setPurchasingError('Must be logged in');
        return;
      }
      const chainAccount = currentUser.actor;
      const cancelResult = await proton.cancelSale({
        actor: chainAccount,
        sale_id: assets[assetIndex]['saleId'],
      });

      if (cancelResult.success) {
        updateCurrentUserBalance(chainAccount);
        notify("success", "Success!");
        fetchData();
      } else {
        throw cancelResult.error;
      }
    } catch (e) {
      setPurchasingError(e.message);
    }
  };

  useEffect(() => {
    if(0 < assets.length){
      setAssetId(assets[0]['assetId']);
    }
  }, [assets]);

  const handleDropdownSelect = (id: string) => {
    const dropdownAsset = assets.find((asset) => {
      return asset.assetId === id;
    });
    const dropIndex = assets.findIndex((asset) => {
      return asset.assetId === id;
    })
    
    setAssetId(dropdownAsset['assetId']);
    setIndex(dropIndex);
  };
  const createReport = () => {
    if(currentUser == undefined){
      proton.login()
      .then(res => {
        if(res.error == ''){
          window.location.reload();
        }
      })
    }else{
      openModal(MODAL_TYPES.REPORT);
      setModalProps({
        type: REPORT_TYPE.NFT
      })
    }
  }
  const getDropdown = () => {
    if (isLoading){
      return;
    } else if (!assets.length) {
      return (
        <DisabledInput placeholder="Preparing newly minted NFTs..." disabled />
      );
    } else if (!assets.length) {
      return <DisabledInput placeholder="No assets" disabled />;
    } else {
      return (
        <DropdownMenu
          name="Available Assets For Sale"
          onChange={(e) => handleDropdownSelect(e.target.value)}>
          <option key="blank" value="" disabled>
            - - Select a serial number - -
          </option>
          {assets.length > 0 && 0 < allAssets.length &&
            assets.map(({ assetId, templateMint, salePrice, assetCount, saleId }, index) => 
            <option key={templateMint} value={assetId}>
              #{templateMint} x {assetCount} - {salePrice || 'Not for sale'}
            </option>
          )}
        </DropdownMenu>
      );
    }
  };
  return (
    <Container>
      <Wrap>
        <LeftView>
          <ImageContainer>
            {data['immutable_data']['image'] == '' || data['immutable_data']['image'] == undefined ? 
              data['immutable_data']['video'] == '' || data['immutable_data']['video'] == undefined ? 
              <AssetModel 
                model={data['immutable_data']['model']} width="100%" 
                height="500px" image={data['immutable_data']['glbthumb']} 
              /> :
              <AssetVideo video={data['immutable_data']['video']} /> :
              <ModalImage
                className="modal-img"
                small={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['immutable_data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                large={`${process.env.NEXT_PUBLIC_IPFS_URL}${data['immutable_data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                alt={`${data['immutable_data']['name']}`}
                hideZoom={true}
                hideDownload={true}
              />
            }
            </ImageContainer>
            <ArrowWrap  
              onClick={() => {
                  let newArr = active;
                  newArr[5] = !newArr[5];
                  return setActive([...newArr]);
              }}>
              <AtrText active={active[5]}>About {data['immutable_data']['name']}</AtrText>
              <Image 
                src={active[5] ? "/new/arrow-down-active.svg" : '/new/arrow-down.svg'} 
                width="16px" 
                height='16px' 
                style={active[5] ? { transition: '.5s ease-in-out', transform: 'rotate(-180deg)', cursor: 'pointer'} : {cursor: 'pointer', transition: '.5s ease-in-out'}} 
              />
            </ArrowWrap>
            {active[5] ? 
              <AboutDesc>
                {data['immutable_data']['desc']}
              </AboutDesc> : null}
              <ArrowWrap
              onClick={() => {
                let newArr = active;
                newArr[2] = !newArr[2];
                return setActive([...newArr]);
              }}>
              </ArrowWrap>
              <ArrowWrap
              onClick={() => {
                let newArr = active;
                newArr[1] = !newArr[1];
                return setActive([...newArr]);
              }}>
              <AtrText active={active[1]}>Attributes</AtrText>
              <Image 
                src={active[1] ? "/new/arrow-down-active.svg" : '/new/arrow-down.svg'} 
                width="16px" 
                height='16px' 
                style={active[1] ? { transition: '.5s ease-in-out', transform: 'rotate(-180deg)', cursor: 'pointer'} : {cursor: 'pointer', transition: '.5s ease-in-out'}} 
              />
            </ArrowWrap>
            {active[1] ? 
              <AtrWrap>
                {Object.keys(data['immutable_data']).map(item => 
                    exceptList.indexOf(item) < 0 ? <AtrBox>
                  <AtrGrey>{item}</AtrGrey>
                  <AtrColor>{data['immutable_data'][item]}</AtrColor>
                  {/* <AtrMain>13% have this trait</AtrMain> */}
                </AtrBox> : null 
                )}
                {
                  0 < allAssets.length ? Object.keys(allAssets[assetIndex]['mutable_data']).map(item =>
                  <AtrBox>
                    <AtrGrey>{item}</AtrGrey>
                    <AtrColor>{allAssets[assetIndex]['mutable_data'][item]}</AtrColor>
                    {/* <AtrMain>13% have this trait</AtrMain> */}
                  </AtrBox>) : null
                }
              </AtrWrap> : null}
        </LeftView>
        <RightView>
        <Name>{data['immutable_data']['name']}
        { allAssets.length <= 0 || collectionData['collection_name'].length <= 0 ? null : 
          <AssetFormPopupMenu 
            templateId={data['template_id']}
            collectionName={collectionData['collection_name']}
            author={data['collection']['author']}
            schemaName={data['schema']['schema_name']}
            setCurrentAssetAsModalProps={setCurrentAssetAsModalProps}
            assetIds={assetIds}
            saleIds={saleIds}
            isMyTemplate={isMyTemplate}
            isRefetchingAssets={isRefetching}
            isTemplateCreator={
              currentUser && data['collection']['author'] === currentUser.actor
            }
            gotouser={assets.length == 0 ?  allAssets[assetIndex]['owner'] : assets[assetIndex]['seller']}
          />}
        </Name>
          { allAssets.length <= 0 || collectionData['collection_name'].length <= 0 ? null : 
            <>
              <GreyText>By</GreyText>
              <Link href={`/collections/${collectionData['collection_name']}`}>
                <a>
                  <BoldText> {data['collection']['name']}</BoldText>
                </a>
              </Link>
              <GreyText> Owner</GreyText>
              <Link href={`/user/${assets.length == 0 ?  allAssets[assetIndex]['owner'] : assets[assetIndex]['seller']}`}>
              <a>
                <BoldText> {assets.length == 0 ?  allAssets[assetIndex]['owner'] : assets[assetIndex]['seller']}</BoldText>
              </a>
              </Link>
            </>
          } 
            <ButtonWrap>
              {/* <Image src="/discord-icon.svg" width='100px' height='30px' />
              <Divider /> */}
              {twitter == '' ? null : <>
                <BoxWrap onClick={() => window.open(twitter)}>
                  <Image src="/collection/twitter-grey-icon.svg" width='16px' height='16px'/>
                </BoxWrap>
                <Divider />
              </>}  
              {website == '' ? null : 
                <>
                  <BoxWrap onClick={() => window.open(`https://${website}`)}>
                    <Image src="/collection/website-grey-icon.svg" width='16px' height='16px' />
                  </BoxWrap>
                  <Divider />
                </>
              }
              <BoxWrap onClick={createReport} >
                <Image src="/collection/flag-grey-icon.svg" width='16px' height='16px'  />
              </BoxWrap>
              <Divider />
              {verifiedData.filter((item) => item.name == collectionData['collection_name']).length == 0 ? null : 
                <RatingBox>
                  <Image src={verifiedData.filter((item) => item.name == collectionData['collection_name'])[0]['rating'] == 'bronze' ? '/new/verified/bronze-icon.svg' : 
                    verifiedData.filter((item) => item.name == collectionData['collection_name'])[0]['rating'] == 'silver' ? '/new/verified/silver-icon.svg' :
                    verifiedData.filter((item) => item.name == collectionData['collection_name'])[0]['rating'] == 'gold' ? '/new/verified/gold-icon.svg' : null } width='24px' height='24px' />
                </RatingBox>
              }
            </ButtonWrap>
            <AuctionBox>
              <AuctionLeft>
                <GreyTexta>Price</GreyTexta>
                {isLoading ? <div style={{marginTop: '20px'}}><Spinner size={50} /></div> : assets.length < 1 ? <NoList>Not Listed</NoList> :
                <>
                  <BoldTexta>{assets[assetIndex]['salePrice']}</BoldTexta>
                  <SmalText>${assets[assetIndex]['dollar']}</SmalText>
                </>
                }
              </AuctionLeft>
            </AuctionBox>
            {assets.length < 1 ? null : getDropdown()}
            {isLoading ? null : currentUser && 0 < assets.length && currentUser.actor != assets[assetIndex]['seller'] ? 
            <MainBtn
                isBackColor={true}
                disabled={currentUser.actor != assets[assetIndex]['seller'] && !assets[assetIndex]['salePrice'] || currentUser.actor != assets[assetIndex]['seller'] && parseFloat(assets[assetIndex]['salePrice'].split(' ')[0].replace(',', '')) > xprbalanceAmount}
                onClick={currentUser ? buyAsset : () => proton.login()}>
                {currentUser ? !assets[assetIndex]['salePrice'] ? 'Not Listed' : `Buy now for ${assets[assetIndex]['salePrice']}` : `Buy now for ${assets[assetIndex]['salePrice']}`}
            </MainBtn> : null}
            {
              !currentUser ? 
              <MainBtn
                isBackColor={true}
                onClick={() => proton.login()}
              >
                Connect Wallet
              </MainBtn> : null
            }
            {purchasingError}
            <div style={{height: '15px'}} /> 
            {isLoading ? null : currentUser ? 
            allAssets.length == assets.length && 1 < allAssets.length || 1 < assets.length && currentUser.actor != assets[assetIndex]['seller'] && soldBtnText == 'Cancel Sale' ? null : 
            <MainBtn
                isBackColor={false}
                onClick={soldBtnText == 'Cancel Sale' ? cancelAsset : soldBtnClick}>
              {soldBtnText}
            </MainBtn> : null}
            <ArrowWrap  
              onClick={() => {
                  let newArr = active;
                  newArr[0] = !newArr[0];
                  return setActive([...newArr]);
              }}>
              <AtrText active={active[0]}>About {data['collection']['name']}</AtrText>
              <Image 
                src={active[0] ? "/new/arrow-down-active.svg" : '/new/arrow-down.svg'} 
                width="16px" 
                height='16px' 
                style={active[0] ? { transition: '.5s ease-in-out', transform: 'rotate(-180deg)', cursor: 'pointer'} : {cursor: 'pointer', transition: '.5s ease-in-out'}} 
              />
            </ArrowWrap>
            {active[0] ? 
              <AboutDesc>
                {collectionData['data']['description']}
              </AboutDesc> : null}
              <ArrowWrap
              onClick={() => {
                let newArr = active;
                newArr[2] = !newArr[2];
                return setActive([...newArr]);
              }}>
              <AtrText active={active[2]}>Details</AtrText>
              <Image 
                src={active[2] ? "/new/arrow-down-active.svg" : '/new/arrow-down.svg'} 
                width="16px" 
                height='16px' 
                style={active[2] ? { transition: '.5s ease-in-out', transform: 'rotate(-180deg)', cursor: 'pointer'} : {cursor: 'pointer', transition: '.5s ease-in-out'}} 
              />
            </ArrowWrap>
            {active[2] && 0 < allAssets.length ? 
              <DetailWrap>
                <DetailLine>
                  <DetailGrey>Mint address</DetailGrey>
                  <DetailAdr data-tip="Open in protonscan" onClick={() => window.open(`https://protonscan.io/account/${data['collection']['author']}`)}><Image src="/new/protonscan.svg" width={'24px'} height={'24px'} style={{marginRight:'5px'}} /> {data['collection']['author']}</DetailAdr>
                </DetailLine>
                <DetailLine>
                  <DetailGrey>On-chain Collection</DetailGrey>
                  <DetailAdr data-tip="Open in protonscan" onClick={() => window.open(`https://protonscan.io/nft/${allAssets[assetIndex]['asset_id']}`)}><Image src="/new/protonscan.svg" width={'24px'} height={'24px'} style={{marginRight:'5px'}} /> {data['collection']['name']}</DetailAdr>
                </DetailLine>
                <DetailLine>
                  <DetailGrey>Token address</DetailGrey>
                  <DetailAdr data-tip="Open in protonscan" onClick={() => window.open(`https://protonscan.io/account/${assets.length == 0 ?  allAssets[assetIndex]['owner'] : assets[assetIndex]['seller']}`)}><Image src="/new/protonscan.svg" width={'24px'} height={'24px'} style={{marginRight:'5px'}} /> {assets.length == 0 ?  allAssets[assetIndex]['owner'] : assets[assetIndex]['seller']}</DetailAdr>
                </DetailLine>
                <DetailLine>
                  <DetailGrey>Owner</DetailGrey>
                  <DetailAdr data-tip="Open in protonscan" onClick={() => window.open(`https://protonscan.io/account/${assets.length == 0 ?  allAssets[assetIndex]['owner'] : assets[assetIndex]['seller']}`)}><Image src="/new/protonscan.svg" width={'24px'} height={'24px'} style={{marginRight:'5px'}} /> {assets.length == 0 ?  allAssets[assetIndex]['owner'] : assets[assetIndex]['seller']}</DetailAdr>
                </DetailLine>
                <DetailLine>
                  <DetailGrey>Creator Royalties</DetailGrey>
                  <DetailAdr>{data['collection']['market_fee'] * 100}%</DetailAdr>
                </DetailLine>
                <DetailLine>
                  <DetailGrey>Marketplace Fee(Taker 1% + Maker 1%)</DetailGrey>
                  <DetailAdr>2%</DetailAdr>
                </DetailLine>
                <DetailLine>
                  <DetailGrey>Listing/Bidding/Cancel</DetailGrey>
                  <DetailAdr>{data['is_burnable'] && data['is_transferable'] ? 'Free' : 'No'}</DetailAdr>
                </DetailLine>
                <ReactTooltip backgroundColor="#052251" clickable={true} />
              </DetailWrap>
            : null}
        </RightView>
        <ReactTooltip backgroundColor="#052251" clickable={true} />
      </Wrap>
      <ArrowWrap
            onClick={() => {
              let newArr = active;
              newArr[3] = !newArr[3];
              return setActive([...newArr]);
            }}>
              <AtrText active={active[3]}>Bids</AtrText>
              <Image 
                src={active[3] ? "/new/arrow-down-active.svg" : '/new/arrow-down.svg'} 
                width="16px" 
                height='16px' 
                style={active[3] ? { transition: '.5s ease-in-out', transform: 'rotate(-180deg)', cursor: 'pointer'} : {cursor: 'pointer', transition: '.5s ease-in-out'}} 
              />
            </ArrowWrap>
            {active[3] && 0 < offers.length ? 
              <BidsWrap>
                <BidsTop>
                  <BidsGrey width="15%" style={{paddingLeft: '0'}}>State</BidsGrey>
                  <BidsGrey width="25%">Price</BidsGrey>
                  <BidsGrey width="45%">Created At</BidsGrey>
                  <BidsGrey width="15%">From</BidsGrey>
                </BidsTop>                  
                {offers.map((offer) => (
                    <BidsLine>
                      <BidsText width="15%" style={{paddingLeft: '0'}}>
                        {offer['state'] == '0' ? 'PENDING' : 
                         offer['state'] == '1' ? 'LISTED' : 
                         offer['state'] == '2' ? 'CANCELED' : 
                         offer['state'] == '3' ? 'SOLD' : 'NONE'}
                      </BidsText>
                      <BidsText width="25%">
                        {addPrecisionDecimal(offer['price']['amount'], 4, false)} XPR
                      </BidsText>
                      <BidsText width="45%">
                        {new Date(parseInt(offer['created_at_time'])).toUTCString()}
                      </BidsText>
                      <BidsText width="15%">
                        {offer['buyer']}
                      </BidsText>
                    </BidsLine>
                ))}
              </BidsWrap> : active[3] && offers.length === 0 ? <span>No Bids</span> : null
            }
              <ArrowWrap
              onClick={() => {
                let newArr = active;
                newArr[4] = !newArr[4];
                return setActive([...newArr]);
              }}>
              <AtrText active={active[4]}>Activities</AtrText>
              <Image 
                src={active[4] ? "/new/arrow-down-active.svg" : '/new/arrow-down.svg'} 
                width="16px" 
                height='16px' 
                style={active[4] ? { transition: '.5s ease-in-out', transform: 'rotate(-180deg)', cursor: 'pointer'} : {cursor: 'pointer', transition: '.5s ease-in-out'}} 
              />
            </ArrowWrap>
            {active[4] && 0 < transfers.length ? 
              <BidsWrap>
                <BidsTop>
                  <BidsGrey width="20%" style={{paddingLeft: '0'}}>State</BidsGrey>
                  <BidsGrey width="15%">Recipient</BidsGrey>
                  <BidsGrey width="15%">Sender</BidsGrey>
                  <BidsGrey width="25%">Price</BidsGrey>
                  <BidsGrey width="20%">Date</BidsGrey>
                  <BidsGrey width="5%" style={{paddingRight: '8px'}}>tx</BidsGrey>
                </BidsTop>                  
                <ScrollWrap>
                  {transfers.map((transfers) => -1 < transfers['memo'].indexOf('AtomicMarket Purchased Sale - ID') ? null : (
                      <BidsLine>
                        <BidsText width="20%" style={{textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap', paddingLeft: '0'}} >
                          {-1 < transfers['memo'].indexOf('Cancelled Auction') ? 'Cancelled Auction' : 
                           -1 < stateList.indexOf(transfers['memo'].toLowerCase()) || transfers['memo'] != '' ? transfers['memo'] : 
                          'Transfer'}
                        </BidsText>
                        <BidsText width="15%">
                          {transfers['recipient_name']}
                        </BidsText>
                        <BidsText width="15%">
                          {transfers['sender_name']}
                        </BidsText>
                        <BidsText width="25%" style={{color: "rgba(123, 10, 117, 1)"}}>
                          {transfers['price']}
                        </BidsText>
                        <BidsText width="20%" data-tip={`${new Date(parseInt(transfers['created_at_time'])).toUTCString()}`}>
                          {moment(new Date(parseInt(transfers['created_at_time']))).fromNow()}
                        </BidsText>
                        <BidsText width="5%" onClick={() => window.open(`https://www.protonscan.io/transaction/${transfers['txid']}`)} style={{paddingRight: '0'}}>
                          <Image src="/tx-icon.svg" width='16px' height='16px' />
                        </BidsText>
                      </BidsLine>
                  ))}
                </ScrollWrap>
              </BidsWrap> : active[4] && transfers.length === 0 ? <span style={{paddingBottom: '20px'}}>No Activities</span> : null
            }
    </Container>
  );
};

export default NftDetail;
