import { useState, useRef, memo, useEffect } from 'react';
import { Image } from '../../styles/index.styled';
import { useAuthContext, useModalContext, MODAL_TYPES, useWhitelistContext } from '../Provider';
import {
  PageHeaderContainer,
  ImageContainer,
  RoundButton,
  Name,
  SubName,
  ButtonContainer,
  VerifiedIconContainer,
  PageHeaderAvatarContainer,
  StatsWrap,
  StatsBox,
  GreyText,
  Price,
  RatingBox,
  ColBox,
  RightBox,
  BoxWrap
} from './PageHeader.styled';
import { ReactComponent as MoreIcon } from '../../public/more.svg';
import { ReactComponent as VerifiedIcon } from '../../public/icon-light-verified-24-px.svg';
import { useClickAway } from '../../hooks';
import ReadMoreDescription from '../ReadMoreDescription';
import { ReactComponent as ReportIcon } from '../../public/report.svg';
import { REPORT_TYPE } from '../../utils/constants';
import Link from 'next/link';
import { addPrecisionDecimal } from '../../utils';
import proton from '../../services/proton-rpc';
import protonSDK from '../../services/proton';
import axios from 'axios';
import { CSVLink, CSVDownload } from "react-csv";

type PageHeaderProps = {
  isWhiteList ?: boolean;
  rating?: string;
  image?: string;
  description?: string;
  name?: string;
  subName?: string;
  type: 'user' | 'collection';
  author?: string;
  hasEditFunctionality?: boolean;
  isLightKYCVerified?: boolean;
  url?: string;
  collectionName: string;
  stats?: {
    volume: string;
    total: string;
    last: string;
    floor: string;
    owners: string;
    avg: number;
    listedCnt: number;
  }
};

const PageHeader = ({
  isWhiteList,
  rating,
  image,
  description,
  name,
  subName,
  type,
  author,
  hasEditFunctionality,
  isLightKYCVerified,
  url,
  collectionName,
  stats,
}: PageHeaderProps): JSX.Element => {
  const { currentUser } = useAuthContext();
  const { openModal, setModalProps } = useModalContext();
  const [shareActive, setShareActive] = useState<boolean>(false);
  const [website, setWebsite] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [discord, setDiscord] = useState<string>('');
  const [isWatch, setWatch] = useState(false);
  const [watches, setWatches] = useState([]);
  const [csvData, setCsv] = useState([]);
  const shareRef = useRef(null);
  useClickAway(shareRef, () => setShareActive(false));
  const actor = currentUser ? currentUser.actor : '';
  const getCsvData = async () => {
    const res = await axios.post(`/api/data/csv`, {
      data: {
        collectionName: collectionName,
        name: name
      }
    })
    setCsv(res.data.data);
  }
  const getUserWatches = async () => {
    const res = await proton.getUserMutations(actor);
    await setWatch(-1 < res['colwatches'].indexOf(collectionName));
    await setWatches(res['colwatches']);
  }
  const onWatchClick = async () => {
    if(currentUser != undefined){
      let type = await -1 < watches.indexOf(collectionName) ? 'unwt' : 'wt';
      await axios.post('/api/collection/mutations', {
          data: {
            collection_name: collectionName,
            type: type,
            actor: actor
          }
        }).then(async res => {
          if(res.status == 200){
            if(type == 'wt'){
              let newArr = watches;
              newArr.push(collectionName);
              setWatches(newArr);
              setWatch(true);
            }else{
              let newArr = watches;
              let newIndex = watches.indexOf(collectionName);
              newArr.splice(newIndex, 1);
              setWatches(newArr);
              setWatch(false);
            }
          }else{
            return;
          }
        })
    }else{
      await protonSDK.login().then(res => {
        if(res['user'] != null){
          window.location.reload();
        }
      });
      
    }
  }
  const createReport = () => {
    if(currentUser == undefined){
      protonSDK.login()
      .then(res => {
        if(res.error == ''){
          window.location.reload();
        }
      })
    }else{
      openModal(MODAL_TYPES.REPORT);
      setModalProps({
        type: REPORT_TYPE.COLLECTION
      })
    }
  }
  useEffect(() => {
    if(actor != ''){
      getUserWatches();
      getCsvData();
    }
    if(url !== undefined){
      let newArr = url.split('\n');
      const website = newArr[0].substring(newArr[0].indexOf('website:') + 8, newArr[0].length);
      const twitterLink = newArr[1].substring(newArr[0].indexOf('twitter:') + 9, newArr[1].length);
      const telegramLink = newArr[2].substring(newArr[0].indexOf('telegram:') + 10, newArr[2].length);
      const instaLink = newArr[3].substring(newArr[0].indexOf('instagram:') + 11, newArr[3].length);
      const discordLink = newArr[5].substring(newArr[0].indexOf('discord:') + 9, newArr[5].length);
      setWebsite(website);
      setTwitter(twitterLink);
      setTelegram(telegramLink);
      setInstagram(instaLink);
      setDiscord(discordLink);
    }
  }, []);
  const avatarImg = image
    ? `data:image/jpeg;base64,${image}`
    : '/default-avatar.png';
  const collectionImg = image
    ? `${process.env.NEXT_PUBLIC_IPFS_URL}${image}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`
    : '/proton.svg';

  const displayImg = type === 'user' ? avatarImg : collectionImg;

  const canReport =
    actor && (type === 'user' ? actor !== subName : actor !== author);

  const onImageError = (e) => {
    e.currentTarget.onerror = null;
    if (type === 'user' && image) {
      e.currentTarget.src = `${process.env.NEXT_PUBLIC_IPFS_URL}${image}`;
    }
  };
  const shareButton = (
    <RoundButton
      size="40px"
      ref={shareRef}
      onClick={() => setShareActive(!shareActive)}>
      <MoreIcon />
      {/* <ShareOnSocial top="50px" active={shareActive} /> */}
    </RoundButton>
  );

  const reportButton = (
    <RoundButton
      size="40px"
      margin="0 0 0 8px"
      onClick={() => {
        setModalProps({
          type: type === 'user' ? REPORT_TYPE.CREATOR : REPORT_TYPE.COLLECTION,
        });
        openModal(MODAL_TYPES.REPORT);
      }}>
      <ReportIcon />
    </RoundButton>
  );
  const buttons = hasEditFunctionality ? (
    <ButtonContainer>
      <RoundButton
        onClick={() => openModal(MODAL_TYPES.UPDATE_COLLECTION)}
        padding="8px 16px"
        margin="0 0 0 0">
        Edit collection
      </RoundButton>
      {csvData.length == 0 ? null : <CSVLink data={csvData} filename={`${name}-stats.csv`}>
        <RoundButton
          padding="8px 16px"
          margin="0 0 0 10px">
            Export CSV file
        </RoundButton>
      </CSVLink>}
    </ButtonContainer>
  ) : (
    <ButtonContainer>
      {/* <Image src="/discord-icon.svg" width='100px' height='30px' />
      <div style={{width: '20px'}}/> */}
      {discord == '' ? null : 
      <>
        <Link href={discord.indexOf('https://') < 0 ? `https://${discord}` : discord}>
          <a target="_blank"> 
          <BoxWrap>
            <Image src="/collection/discord-grey.svg" width='20' height='16px' />
          </BoxWrap>
          </a>
        </Link>
        <div style={{width: '10px'}}/>
      </>}
      {telegram == '' ? null : 
      <>
        <Link href={telegram.indexOf('https://') < 0 ? `https://${telegram}` : telegram}>
          <a target="_blank"> 
          <BoxWrap>
            <Image src="/collection/telegram-grey.png" width='16px' height='16px' />
          </BoxWrap>
          </a>
        </Link>
        <div style={{width: '10px'}}/>
      </>}
      {twitter == '' ? null : 
      <>
        <Link href={twitter.indexOf('https://') < 0 ? `https://${twitter}` : twitter}>
          <a target="_blank"> 
          <BoxWrap>
            <Image src="/collection/twitter-grey-icon.svg" width='16px' height='16px' />
          </BoxWrap>
          </a>
        </Link>
        <div style={{width: '10px'}}/>
      </>}
      {website == '' ? null : 
      <>
        <Link href={website.indexOf('https://') < 0 ? `https://${website}` : website}>
          <a target="_blank"> 
            <BoxWrap>
              <Image src="/collection/website-grey-icon.svg" width='16px' height='16px' />
            </BoxWrap>
          </a>
        </Link>
        <div style={{width: '20px'}}/>
      </>}
      <BoxWrap 
        onClick={onWatchClick}  
      >
        <span style={{
          fontFamily: 'Futura',
          fontSize: '12px',
          color: '#98A2AD'
        }}>{isWatch ? "UNWATCH" : "WATCH"}</span>
        <Image src="/watch.svg" width="20px" height='16px' style={{marginLeft: '10px'}} />
      </BoxWrap>
      <div style={{width: '10px'}}/>
      <BoxWrap 
        onClick={createReport}
      >
        <Image src="/collection/flag-grey-icon.svg" width='16px' height='16px' onClick={createReport} />
      </BoxWrap>
      <div style={{width: '10px'}}/>
      {isWhiteList ?
      <RatingBox>
        <Image src={rating == 'bronze' ? '/new/verified/bronze-icon.svg' : 
          rating == 'silver' ? '/new/verified/silver-icon.svg' :
          rating == 'gold' ? '/new/verified/gold-icon.svg' : null } width='24px' height='24px' />
      </RatingBox> : null}
    </ButtonContainer>
  );

  return (
    <PageHeaderContainer>
      <PageHeaderAvatarContainer>
        <ImageContainer>
          <Image
            width="100%"
            height="100%"
            src={displayImg}
            onError={onImageError}
            objectFit="cover"
          />
        </ImageContainer>
        {isLightKYCVerified && (
          <VerifiedIconContainer>
            <VerifiedIcon />
          </VerifiedIconContainer>
        )}
      </PageHeaderAvatarContainer>
      <ColBox>
      <Name>{name}</Name>
      <StatsWrap>
        <StatsBox>
            <GreyText>Floor Price</GreyText>
            <Price><Image src="/new/price-xpr.svg" width="19px" height='20px' style={{marginRight: '8px'}} />{addPrecisionDecimal(stats.floor.substring(0, stats.floor.length - 4), 0, false)} XPR</Price> 
        </StatsBox>
        <StatsBox>
            <GreyText>Volume</GreyText>
            <Price><Image src="/new/price-xpr.svg" width="19px" height='20px' style={{marginRight: '8px'}} />{addPrecisionDecimal(stats.volume.substring(0, stats.volume.length - 4), 0, false)} XPR</Price>
        </StatsBox>
          {/* <StatsBox>
            <GreyText>Last sale</GreyText>
            <Price><Image src="/new/price-xpr.svg" width="19px" height='20px' style={{marginRight: '8px'}} />{addPrecisionDecimal(stats.last, 4, false)} XPR</Price>
          </StatsBox> */}
          <StatsBox>
              <GreyText>Avg sale</GreyText>
              <Price><Image src="/new/price-xpr.svg" width="19px" height='20px' style={{marginRight: '8px'}} />{stats.avg == null ? 0 : addPrecisionDecimal(String(stats.avg.toFixed(0)), 0, false)} XPR</Price>
          </StatsBox>
          <StatsBox>
              <GreyText>Total supply</GreyText>
              <Price>{stats.total}</Price>
          </StatsBox>
          <StatsBox>
              <GreyText>Owners</GreyText>
              <Price>{stats.owners}</Price>
          </StatsBox>
          <StatsBox>
              <GreyText>Listed</GreyText>
              <Price>{stats['listedCnt']}</Price>
          </StatsBox>
      </StatsWrap>
      </ColBox>
      {subName ? <SubName>@{subName}</SubName> : null}
      <RightBox>
        {isWhiteList ? buttons : null}
        {description ? (
          <ReadMoreDescription
            description={description}
            mb="61px"
            maxWidth="626px"
            textAlign="center"
            fontColor="#808080"
            maxDescriptionLength={183}
          />
        ) : null}
      </RightBox>
    </PageHeaderContainer>
  );
};

export default memo(PageHeader);
