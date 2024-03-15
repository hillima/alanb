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
  ItemImg,
  ItemCreator,
  ItemImgWrap,
  ItemColImg,
  ArrowWrap,
  ArrowLeftBtn,
  ArrowRightBtn,
  TopLeftMobileWrap,
  SearchWrap,
  SelectWrap,
  SpinnerWrap,
  ItemBottom,
  GridWrap,
  GridHeader,
  GridItem,
  GridHeaderText,
  GridItemTem,
  GridColName,
  GridScroll,
  RightWrap,
  ActiveBox
} from './TrendingCollections.styled';
import { Image } from '../../styles/index.styled';
import Link from 'next/link';
import Spinner from '../Spinner';
import CollectionSearch from '../CollectionSearch';
import { ItemVol } from '../DigitalGalaxyBlog/DigitalGalaxyBlog';
import { addPrecisionDecimal } from '../../utils';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';


const TrendingCollections = ({data, type, setType, setAfter, after, setTab, tab, isOpen, setOpen}): JSX.Element => {
  const { isDesktop } = useNavigatorUserAgent();
  const size = useWindowSize();
  
  return (
    <Container>
       {isDesktop ? 
      <TopWrap>
        <TopLeftWrap>
          <Title>Trending collections</Title>
          <SearchWrap>
            <CollectionSearch 
              isMobileSearchOpen={false} 
              closeMobileSearch={() => {}} 
              placeholder="Search collections …"
            />
          </SearchWrap>
          <SelectWrap>
            <FormControl sx={{ ml: '15px'}} className="col-form-control">
              <Select
                value={type}
                onChange={(e) => setType(e.target.value)}
                displayEmpty
                sx={{fontSize: '14px', color: '#A6A9B9'}}
                className="col-form-select"
              >
                <MenuItem value={'all'} sx={{fontSize: '14px'}} className="col-form-option">All collections</MenuItem>
                <MenuItem value={'gold'} sx={{fontSize: '14px'}} className="col-form-option">Gold collections</MenuItem>
                <MenuItem value={'silver'} sx={{fontSize: '14px'}} className="col-form-option">Silver collections</MenuItem>
                <MenuItem value={'bronze'} sx={{fontSize: '14px'}} className="col-form-option">Bronze collections</MenuItem>
              </Select>
            </FormControl>
            <FormControl sx={{ ml: '15px'}} className="col-form-control">
              <Select
                value={after}
                onChange={e => setAfter(e.target.value)}
                displayEmpty
                sx={{fontSize: '14px', color: '#A6A9B9'}}
                className="col-form-select"
              >
                <MenuItem value={1} sx={{fontSize: '14px'}} className="col-form-option">Last 24 hours</MenuItem>
                <MenuItem value={7} sx={{fontSize: '14px'}} className="col-form-option">Last 7 days</MenuItem>
                <MenuItem value={30} sx={{fontSize: '14px'}} className="col-form-option">Last 30 days</MenuItem>
                <MenuItem value={0} sx={{fontSize: '14px'}} className="col-form-option">All</MenuItem>
              </Select>
            </FormControl>
          </SelectWrap>
          <RightWrap>
            <ActiveBox onClick={() => setTab(0)} isActive={tab === 0}>
              <Image src={tab === 0 ? '/menu-on.svg' : '/menu-off.svg'} width="22px" height="22px"/>
            </ActiveBox>
            <ActiveBox onClick={() => setTab(1)} isActive={tab === 1}>
              <Image src={tab === 1 ? '/grid-on.svg' : '/grid-off.svg'} width="22px" height="22px" />
            </ActiveBox>
          </RightWrap>
        </TopLeftWrap>
      </TopWrap> : 
      <TopWrap>
        <TopLeftWrap>
          <div style={{display: 'flex'}}>
            <TopLeftMobileWrap>
              <Title>Top Collections</Title>
            </TopLeftMobileWrap>
            <RightWrap>
              <ActiveBox onClick={() => setTab(0)} isActive={tab === 0}>
                <Image src={tab === 0 ? '/menu-on.svg' : '/menu-off.svg'} width="22px" height="22px"/>
              </ActiveBox>
              <ActiveBox onClick={() => setTab(1)} isActive={tab === 1}>
                <Image src={tab === 1 ? '/grid-on.svg' : '/grid-off.svg'} width="22px" height="22px" />
              </ActiveBox>
            </RightWrap>
          </div>
          <SelectBox   
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
              <option value={'all'} className="col-form-option">All collections</option>
              <option value={'gold'} className="col-form-option">Gold collections</option>
              <option value={'silver'} className="col-form-option">Silver collections</option>
              <option value={'bronze'} className="col-form-option">Bronze collections</option>
          </SelectBox>
          <SelectBox
              value={after}
              onChange={e => setAfter(e.target.value)}
          >
              <option value={1} className="col-form-option">Last 24 hours</option>
              <option value={7} className="col-form-option">Last 7 days</option>
              <option value={30} className="col-form-option">Last 30 days</option>
              <option value={0} className="col-form-option">All</option>
          </SelectBox>
        </TopLeftWrap>
      </TopWrap>
      }
      {data.length == 0 ? <SpinnerWrap><Spinner size={50}/></SpinnerWrap> : 
        tab === 1 ? <ItemWrap columns={Math.floor(size['windowWidth'] / 250)}>
          {data.map((item, index) => (
                <Item>
                  <ItemColumn>
                    <Link href={`/collections/${item['collection_name']}`}>
                      <a>
                        <ItemImgWrap>
                          <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" />
                        </ItemImgWrap>
                        {/* <ItemColImg src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['img']}`} />  */}
                        <ItemBottom>
                          <ItemColName>{item['data']['name']}</ItemColName>
                          <ItemVol>{item['total']} Total Supply</ItemVol>
                        </ItemBottom>        
                      </a>
                    </Link>
                  </ItemColumn>
                </Item>
          ))}
        </ItemWrap> : 
        <GridWrap>
          <GridHeader>
            <GridHeaderText width='25%'>Collection</GridHeaderText>
            <GridHeaderText width='15%'>{after == 7 ? '7days' :  after == 30 ? '30days': '24h'} volume</GridHeaderText>
            <GridHeaderText width='20%'>Volume total</GridHeaderText>
            {/* <GridHeaderText width='10%'>24 volume</GridHeaderText> */}
            <GridHeaderText width='10%'>Sales</GridHeaderText>
            <GridHeaderText width='10%'>Floor price</GridHeaderText>
            <GridHeaderText width='10%'>Owners</GridHeaderText>
            <GridHeaderText width='10%'>Total Supply</GridHeaderText>
          </GridHeader>
          <GridScroll>
            {data.map((item) =>
              <GridItem>
                <GridItemTem width='25%'>
                  <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="32px" height="32px" style={{ borderRadius: '10px' }} />
                  <Link href={`/collections/${item['collection_name']}`}>
                    <a>
                      <GridColName>{item['data']['name']}</GridColName>
                    </a>
                  </Link>
                </GridItemTem>
                <GridItemTem width="15%" style={{paddingLeft: '5px'}}>
                  {`${addPrecisionDecimal(item['volume'] == null || item['volume'] == '0' || item['volume'] == undefined ? '0' : item['volume'].substring(0, item['volume'].length-4), 0, false)} XPR`}
                </GridItemTem>
                <GridItemTem width="20%" style={{paddingLeft: '5px'}}>
                  {`${addPrecisionDecimal(item['totvolume'] == undefined || item['totvolume'] == null || item['totvolume'] == '0' ? '0' : item['totvolume'].substring(0, item['totvolume'].length-4), 0, false)} XPR`}
                </GridItemTem>
                {/* <GridItemTem width="10%" style={{paddingLeft: '10px'}}>
                  {item['volume']}
                </GridItemTem> */}
                <GridItemTem width="10%" style={{paddingLeft: '10px'}}>
                  {item['sales']}
                </GridItemTem>
                <GridItemTem width="10%" style={{paddingLeft: '10px'}}>
                  {`${addPrecisionDecimal(item['floor'], 4, false)} XPR`}
                </GridItemTem>
                <GridItemTem width="10%" style={{paddingLeft: '15px'}}>
                  {item['owners']}
                </GridItemTem>
                <GridItemTem width="10%" style={{paddingLeft: '15px'}}>
                  {item['total']} 
                </GridItemTem>
              </GridItem>
            )}
          </GridScroll>
        </GridWrap>
      }
    </Container>
  );
};

export default TrendingCollections;
