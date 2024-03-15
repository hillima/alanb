import Image from 'next/image';
import Link from 'next/link';
import { useNavigatorUserAgent } from '../../hooks';
import { addPrecisionDecimal } from '../../utils';
import Spinner from '../Spinner';
import {
  Container,
  TopWrap,
  TopLeftWrap, 
  Title, 
  SelectBox, 
  SeeBtn, 
  ItemWrap,
  Item, 
  ItemNum, 
  ItemColName, 
  ItemColumn, 
  ItemVol, 
  ItemPer,
  ItemImg,
  ItemRight,
  SpinnerWrap,
  SelectWrap
} from './TopCollection.styled';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const TopCollection = ({data, setAfter, after, rating, setRating}: any): JSX.Element => {
 const { isDesktop } = useNavigatorUserAgent();
  return (
    <Container>
      <TopWrap>
        {isDesktop ? 
        <TopLeftWrap>
          <Title>Top collections</Title>
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
            <FormControl sx={{ ml: '15px', height: '38px'}}>
              <SelectWrap className='top-col-select-wrap'>
                <Select
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  displayEmpty
                  sx={{fontSize: '14px', color: '#A6A9B9', height: '40px'}}
                  className="top-col-select"
                >
                  <MenuItem value={'all'} sx={{fontSize: '14px'}} className="top-col-select-option">All</MenuItem>
                  <MenuItem value={'gold'} sx={{fontSize: '14px'}} className="top-col-select-option">Gold</MenuItem>
                  <MenuItem value={'silver'} sx={{fontSize: '14px'}} className="top-col-select-option">Silver</MenuItem>
                  <MenuItem value={'bronze'} sx={{fontSize: '14px'}} className="top-col-select-option">Bronze</MenuItem>
                </Select>
              </SelectWrap>
            </FormControl>
        </TopLeftWrap> : 
        <TopLeftWrap>
        <Title>Top collections</Title>
        <div style={{width: '100%', marginTop: '10px', display: 'flex', justifyContent: 'flex-end'}}>
            <SelectWrap>
                <Select
                  value={after}
                  onChange={e => setAfter(e.target.value)}
                  displayEmpty
                  sx={{fontSize: '14px', color: '#A6A9B9', height: '40px'}}
                >
                  <MenuItem value={1} sx={{fontSize: '14px'}}>Last 24 hours</MenuItem>
                  <MenuItem value={7} sx={{fontSize: '14px'}}>Last 7 days</MenuItem>
                  <MenuItem value={30} sx={{fontSize: '14px'}}>Last 30 days</MenuItem>
                  <MenuItem value={0} sx={{fontSize: '14px'}}>All</MenuItem>
                </Select>
              </SelectWrap>
              <div style={{width: '10px'}} />
              <SelectWrap>
                <Select
                  value={rating}
                  onChange={e => setRating(e.target.value)}
                  displayEmpty
                  sx={{fontSize: '14px', color: '#A6A9B9', height: '40px'}}
                >
                  <MenuItem value={'all'} sx={{fontSize: '14px'}}>All</MenuItem>
                  <MenuItem value={'gold'} sx={{fontSize: '14px'}}>Gold</MenuItem>
                  <MenuItem value={'silver'} sx={{fontSize: '14px'}}>Silver</MenuItem>
                  <MenuItem value={'bronze'} sx={{fontSize: '14px'}}>Bronze</MenuItem>
                </Select>
              </SelectWrap>
          </div>
        </TopLeftWrap> 
        }
        {isDesktop ?      
          <Link href="/collections">
            <a style={{display: 'flex', alignItems: 'flex-end'}}>
              <SeeBtn>See all</SeeBtn>
            </a>
          </Link> : null}
      </TopWrap>
      {data.length == 0 ? <SpinnerWrap><Spinner /></SpinnerWrap> :
        <ItemWrap>
          {data.map((item, index) => !isDesktop && 4 < index ? null : (
            <Link href={`/collections/${item['collection_name']}`}>
              <a>
                <Item className='item'>
                  <ItemNum>{index + 1}</ItemNum>
                  <ItemImg src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} />
                  <ItemColumn>
                    <ItemColName>{item['data']['name']}</ItemColName>
                    <ItemVol>{addPrecisionDecimal(item['volume'], 4, false)} XPR</ItemVol>
                  </ItemColumn>
                  <ItemRight>
                    {/* <ItemPer isUp={false}><Image src={
                        item['rating'] == 'silver' ? '/new/verified/silver-icon.svg' :
                        item['rating'] == 'gold' ? '/new/verified/gold-icon.svg' 
                        : '/new/verified/bronze-icon.svg' } width='24px' height='24px' /></ItemPer> */}
                  </ItemRight>
                </Item>
              </a>
            </Link>
          ))}
        </ItemWrap>
      }
      {!isDesktop ? 
        <Link href="/collections">
          <a>
            <SeeBtn>See all</SeeBtn>
          </a>
        </Link> : null}
    </Container>
  );
};

export default TopCollection;
