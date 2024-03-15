import { useNavigatorUserAgent, useWindowSize } from '../../hooks';
import {
  Container,
  TopWrap,
  TopLeftWrap, 
  Title, 
  ItemWrap,
  Item, 
  ItemColName, 
  ItemColumn, 
  ItemImg,
  ItemCreator,
  ItemBy,
  ItemPrice,
  ItemImgWrap,
  ItemColImg,
  XprIcon,
  ArrowWrap,
  ArrowLeftBtn,
  ArrowRightBtn,
  SpinnerWrap,
} from './RecentlyListed.styled';
import { Image } from '../../styles/index.styled';
import { addPrecisionDecimal } from '../../utils';
import Link from 'next/link';
import Spinner from '../Spinner';
import { useState } from 'react';
import { Video } from '../TemplateVideo/TemplateVideo.styled';

const RecentlyListed = ({ data }: any): JSX.Element => {
  const { isDesktop } = useNavigatorUserAgent();
  const size = useWindowSize();
  const [page, setPage] = useState(1);
  return (
    <Container>
      <TopWrap>
        <TopLeftWrap>
          <Title>Recently listed</Title>
          {isDesktop ? <ArrowWrap>
            {1 < page ? 
              <ArrowRightBtn src="/new/arrow-right-btn.svg" onClick={() => setPage(page -1)} style={{transform: 'rotate(180deg)'}} /> :  <ArrowLeftBtn src="/new/arrow-left-btn.svg" />
            }
            <div style={{width: '13px'}} />
            {Math.ceil(data.length / Math.floor(size['windowWidth'] / 300)) <= page ? 
              <ArrowLeftBtn src="/new/arrow-left-btn.svg" style={{transform: 'rotate(180deg)'}} /> : 
              <ArrowRightBtn src="/new/arrow-right-btn.svg" onClick={() => setPage(page + 1)}/>
            }
          </ArrowWrap> : null}
        </TopLeftWrap>
        {/* {isDesktop ? <SeeBtn>See all</SeeBtn> : null} */}
      </TopWrap>
      {data.length == 0 ? <SpinnerWrap><Spinner /></SpinnerWrap> :
      isDesktop ?
        <ItemWrap columns={Math.floor(size['windowWidth'] / 300)}>
          {data.map((item, index) => (
           Math.floor(size['windowWidth'] / 300) * (page - 1) <= index && index < Math.floor(size['windowWidth'] / 300) * page && item['collection']['img'] != null ? 
            <Link href={`/collections/${item['collection_name']}/${item['assets'][0]['template']['template_id']}`}>
              <a>
                <Item>
                  <ItemColumn>
                    <ItemImgWrap>
                    {
                        item['assets'][0]['data']['glbthumb'] != '' && item['assets'][0]['data']['glbthumb'] != undefined ? 
                          <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" objectFit='unset' />  :                        item['assets'][0]['data']['video'] != '' && item['assets'][0]['data']['video'] != undefined ? 
                          <Video 
                            src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} 
                            width="100%" 
                            height="100%" 
                            style={{borderRadius: '0'}} 
                            autoPlay={false}
                          /> : 
                        <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" objectFit='unset' /> 
                        }
                    </ItemImgWrap>
                    <ItemColImg src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['collection']['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} /> 
                    <ItemColName>{item['assets'][0]['data']['name']}</ItemColName>
                    <ItemCreator><ItemBy>Owner</ItemBy>{item['seller']}</ItemCreator>
                    <ItemPrice><XprIcon src="/new/price-xpr.svg" />{addPrecisionDecimal(item['listing_price'], 4, false)} XPR</ItemPrice>
                  </ItemColumn>
                </Item>
              </a>
            </Link> 
          : null
          ))}
        </ItemWrap> : 
        <ItemWrap columns={Math.floor(size['windowWidth'] / 300)}>
        {data.map((item, index) => (
          <Link href={`/collections/${item['collection_name']}/${item['assets'][0]['template']['template_id']}`}>
            <a>
              <Item>
                <ItemColumn>
                  <ItemImgWrap>
                    {item['assets'][0]['data']['image'] == '' ? 
                      <Video 
                        src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['video']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} 
                        width="100%" 
                        height="100%" 
                        style={{objectFit: 'cover', borderRadius: '0'}} 
                        autoPlay
                      /> : 
                      <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" /> 
                    }
                  </ItemImgWrap>
                  <ItemColImg src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['collection']['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} /> 
                  <ItemColName>{item['assets'][0]['data']['name']}</ItemColName>
                  <ItemCreator><ItemBy>by</ItemBy>{item['seller']}</ItemCreator>
                  <ItemPrice><XprIcon src="/new/price-xpr.svg" />{addPrecisionDecimal(item['listing_price'], 4, false)} XPR</ItemPrice>
                </ItemColumn>
              </Item>
            </a>
          </Link>
        ))}
      </ItemWrap>
      }
    </Container>
  );
};

export default RecentlyListed;
