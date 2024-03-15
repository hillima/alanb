import { useNavigatorUserAgent, useWindowSize } from '../../hooks';
import {
  Container,
  TopWrap,
  TopLeftWrap, 
  Title, 
  SelectBox, 
  SeeBtn, 
  ItemWrap,
  Item, 
  ItemColName, 
  ItemColumn, 
  ItemCreator,
  ItemImgWrap,
  ItemColImg,
  ArrowWrap,
  ArrowLeftBtn,
  ArrowRightBtn,
  TopLeftMobileWrap,
  SpinnerWrap,
  ItemAutor,
  SelectWrap
} from './TopCollectionLast.styled';
import { Image } from '../../styles/index.styled';
import Link from 'next/link';
import Spinner from '../Spinner';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const TopCollectionLast = ({data, setAfter, after}: any): JSX.Element => {
  const { isDesktop } = useNavigatorUserAgent();
  const size = useWindowSize();

  return (
    <Container>
       {isDesktop ? 
      <TopWrap>
        <TopLeftWrap>
          <Title>Top Collections</Title>
          <FormControl sx={{ ml: '15px', height: '38px'}}>
            <SelectWrap className='top-col-select-wrap'>
              <Select
                value={after}
                onChange={e => setAfter(e.target.value)}
                displayEmpty
                sx={{fontSize: '14px', color: '#A6A9B9', height: '40px'}}
                className="top-col-select"
              >
                <MenuItem value={1} sx={{fontSize: '14px'}} className="top-col-select-option">Last 24 hours</MenuItem>
                <MenuItem value={7} sx={{fontSize: '14px'}} className="top-col-select-option">Last 7 days</MenuItem>
                <MenuItem value={30} sx={{fontSize: '14px'}} className="top-col-select-option">Last 30 days</MenuItem>
                <MenuItem value={0} sx={{fontSize: '14px'}} className="top-col-select-option">All</MenuItem>
              </Select>
            </SelectWrap>
            </FormControl>
        </TopLeftWrap>
        <Link href="/collections"><a style={{display: 'flex', alignItems: 'flex-end'}}><SeeBtn>See all</SeeBtn></a></Link>
      </TopWrap> : 
      <TopWrap>
        <TopLeftWrap>
          <TopLeftMobileWrap>
            <Title>Top Collections</Title>
            <Select
                value={after}
                onChange={e => setAfter(e.target.value)}
                displayEmpty
                sx={{fontSize: '14px', color: '#A6A9B9', height: '40px'}}
                className="top-col-select"
              >
                <MenuItem value={1} sx={{fontSize: '14px'}} className="top-col-select-option">Last 24 hours</MenuItem>
                <MenuItem value={7} sx={{fontSize: '14px'}} className="top-col-select-option">Last 7 days</MenuItem>
                <MenuItem value={30} sx={{fontSize: '14px'}} className="top-col-select-option">Last 30 days</MenuItem>
                <MenuItem value={0} sx={{fontSize: '14px'}} className="top-col-select-option">All</MenuItem>
            </Select>
          </TopLeftMobileWrap>
        </TopLeftWrap>
        {isDesktop ? <SeeBtn>See all</SeeBtn> : null}
      </TopWrap>
      }
      {data.length == 0 ? <SpinnerWrap><Spinner size={50} /></SpinnerWrap> :
        <ItemWrap columns={Math.floor(size['windowWidth'] / 300)}>
          {data.map((item, index) => isDesktop && Math.floor(size['windowWidth'] / 300) < index + 1 ? null : (
                <Item>
                  <ItemColumn>
                    <Link href={`/collections/${item['collection_name']}`}>
                      <a style={{display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%'}}>
                        <ItemImgWrap>
                          <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}&img-width=400`} width="100%" height="100%" />
                        </ItemImgWrap>
                        <ItemColImg src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} /> 
                        <ItemColName>{item['data']['name']}</ItemColName>
                        <ItemCreator>By <ItemAutor>{item['author']}</ItemAutor></ItemCreator>
                      </a>
                    </Link>
                  </ItemColumn>
                </Item>
          ))}
        </ItemWrap>
      }
      {!isDesktop ? <SeeBtn onClick={() => window.location.href = '/collections'}>See all</SeeBtn> : null}
    </Container>
  );
};

export default TopCollectionLast;
