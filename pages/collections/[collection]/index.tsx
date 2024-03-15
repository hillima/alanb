import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '../../../components/PageLayout';
import ErrorComponent from '../../../components/Error';
import LoadingPage from '../../../components/LoadingPage';

import {
  Template,
  formatTemplatesWithPriceData,
  getLowestPricesForAllCollectionTemplates,
  getSaleTemplatesByCollection,
  getAllTemplatesByCollection,
} from '../../../services/templates';
import {
  CollectionStats,
  getCollection,
} from '../../../services/collections';
import Banner from '../../../components/Banner';
import PageHeader from '../../../components/PageHeader';
import {
  MODAL_TYPES,
  useAuthContext,
  useModalContext,
  useVolumeContext,
  useWhitelistContext,
} from '../../../components/Provider';
import { useNavigatorUserAgent, usePrevious } from '../../../hooks';
import Section from '../../../components/Section/Section';
import NavBar from '../../../components/NavBar';
import VolumeBar from '../../../components/VolumeBar';
import SideBar from '../../../components/SideBar';
import { FilterTab } from '../../../components/FilterTab/FilterTab';
import Spinner from '../../../components/Spinner';
import proton from '../../../services/proton';
import SelectGrid from '../../../components/SelectGrid';
import { BulkTab } from '../../../components/BulkTab/BulkTab';
import { SortTab } from '../../../components/SortTab/SortTab';
import OfferGrid from '../../../components/OfferGrid';
import { getUserTemplateAssets } from '../../../services/assets';
import { RESIZER_IMAGE_SM } from '../../../utils/constants';
import { ClearBtn, ClearScroll, ClearWrap, TraitBtn } from '../../../components/FilterTab/FilterTab.styled';

export async function getServerSideProps({ params }) {
  const { collection } = params;
  const collectionData = await getCollection(collection);
  
  return {
    props: { collection, collectionData },
  };
}

const CollectionPage = ({collection, collectionData}: any): JSX.Element => {
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const exceptList = ['image', 'audio', 'name', 'glbthumb', 'series', 'video', 'model', 'marketplace', 'desc', 'categorie'];
  const router = useRouter();
  const { volume } = useVolumeContext();
  const { verifiedData, isLoadingWhitelist } = useWhitelistContext();
  const { isLoadingUser, currentUser } = useAuthContext();
  const { isDesktop } = useNavigatorUserAgent();
  const previousCollection = usePrevious(collection);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filterKeys, setKeys] = useState([]);
  const [filterValues, setValues] = useState({});
  const [selectedValues, setSelected] = useState([]);
  const [active, setActive] = useState([]);
  const [lowestPrices, setLowestPrices] = useState<{ [id: string]: string }>(
    {}
  );
  const [renderedTemplates, setRenderedTemplates] = useState<Template[]>([]);
  const [originTemplates, setOriginTemplates] = useState<Template[]>([]);
  const [originSaleTemplates, setSaleTemplates] = useState<Template[]>([]);
  const [prefetchedTemplates, setPrefetchedTemplates] = useState<Template[]>(
    []
  );
  const [prefetchPageNumber, setPrefetchPageNumber] = useState<number>(2);
  const [isLoadingNextPage, setIsLoadingNextPage] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [collectionStats, setStats] = useState();
  const [isBuy, setBuy] = useState(true);
  const [minValue, minChange] = useState();
  const [maxValue, maxChange] = useState();
  const [gridLoading, setLoading] = useState(false);
  const [selectedCards, setCard] = useState([]);
  const [hideFilter, setFilterHide] = useState(true);
  const [hideBulk, setBulkHide] = useState(true);
  const { openModal, setModalProps, modalProps } = useModalContext();
  const [sortValue, setSort] = useState('lowtohigh')
  const whitelistFilter = verifiedData.filter((val) => val['name'] === collectionData['collection_name']);
  const isEditButtonVisible =
    isDesktop &&
    currentUser &&
    collectionData &&
    currentUser.actor === collectionData.author;

  
  const fetchAllTemplates = async () => {
    const allTemplates = await getAllTemplatesByCollection({
      type: collection
    });
    const lowestPricesResult = await getLowestPricesForAllCollectionTemplates(
      {
        type: collection,
      }
    );
    const allTemplatesWithLowestPrice = await formatTemplatesWithPriceData(
      allTemplates,
      lowestPricesResult
    );
    if(lowestPricesResult != null && typeof lowestPricesResult == "object" && !Object.keys(lowestPricesResult).length){
      await setBuy(false);
    }
    await setLowestPrices(lowestPricesResult);
    await setOriginTemplates(allTemplatesWithLowestPrice);
    await setRenderedTemplates(allTemplatesWithLowestPrice);
  }

  const fetchFilterData = async () => {
    const allTemplates = await getAllTemplatesByCollection({
      type: collection
    });
    let newKeys = [];
    let newObj = {};
    let newActive = [];
    await allTemplates.map((it) => Object.keys(it['immutable_data']).map(itm => {
      if(exceptList.indexOf(itm) <= -1){
        if(newKeys.indexOf(itm) <= -1){
          newKeys.push(itm);
        }
        if(newObj[itm] == undefined || newObj == null){
          newObj[itm] = [];
          newObj[itm].push(it['immutable_data'][itm]);
        }else{
          if(newObj[itm].indexOf(it['immutable_data'][itm]) <= -1){
            newObj[itm].push(it['immutable_data'][itm]);
          }
        }
      }
    }));
    await newKeys.map(() => newActive.push(false));
    await setActive(newActive);
    await setKeys(newKeys);
    await setValues(newObj);
  }

  const fetchCollection = async () => {
    try {
      await setIsLoading(true);
      await setRenderedTemplates([]);
      await setOriginTemplates([]);
      await setSaleTemplates([]);
      await fetchFilterData();

      const saleTemplates = await getSaleTemplatesByCollection({
        type: collection,
      });
      const statsData = await CollectionStats(collection);

      if(saleTemplates.length == 0){
        await fetchAllTemplates();
      }else{
        let newArr = saleTemplates.sort((a, b) => {
          return parseInt(a['listing_price']) - parseInt(b['listing_price']) 
        });
        await setSaleTemplates([...newArr]);
        await setRenderedTemplates([...newArr]);
        await setBuy(true);
      }
      await setStats(statsData);
      await setIsLoading(false);

    } catch (e) {
      await setIsLoading(false);
      setErrorMessage(e.message);
    }
  };
  useEffect(() => {
    (async () => {
      if (collection) {
        await fetchCollection();
      }
    })();
  }, [collection]);
  useEffect(() => {
    if(0 < renderedTemplates.length){
      if(sortValue == 'lowtohigh'){
        let newArr = renderedTemplates.sort((a, b) => {
          return parseInt(a['listing_price']) - parseInt(b['listing_price']) 
        });
        setRenderedTemplates([...newArr]);
      }else if(sortValue == 'hightolow'){
        let newArr = renderedTemplates.sort((a, b) => {
          return parseInt(b['listing_price']) - parseInt(a['listing_price']) 
        });
        setRenderedTemplates([...newArr]);
      }else if(sortValue == 'recently'){
        let newArr = renderedTemplates.sort((a, b) => {
          return parseInt(b['updated_at_time']) - parseInt(a['updated_at_time']) 
        });
        setRenderedTemplates([...newArr]);
      }else{
        return;
      }
    }
  }, [sortValue]);
  useEffect(() => {
    if (collectionData && 0 < verifiedData.length) {
      const {
        name,
        collection_name,
        img,
        market_fee,
        data: { description, url },
      } = collectionData;
      setModalProps({
        collectionName: collection_name,
        defaultDescription: description,
        defaultDisplayName: name,
        defaultImage: img,
        defaultRoyalties: market_fee.toString(),
        fetchPageData: fetchCollection,
        defaultUrl: url,
        defaultBannerImage: whitelistFilter.length == 0 ? '' : whitelistFilter[0]['banner'] == undefined  ? '' : whitelistFilter[0]['banner']
      });
    }
  }, [collectionData, verifiedData]);

  const filterBuy = async (status) => {
    await setLoading(true);
    await setBuy(status);
    if(status){
      await setRenderedTemplates(originSaleTemplates);
    }else{
      if(originTemplates.length == 0){
        await fetchAllTemplates();
      }else{
        await setRenderedTemplates(originTemplates);
      }
    }
    await setLoading(false);
  }
  const selectValue = (value, key) => {
    setLoading(true);
    if(isBuy){
      let renderTem = renderedTemplates;
      let newArr = selectedValues;
      let dupLength = newArr.filter(obj => obj[key] == value).length;
      let dupIndex = newArr.findIndex(obj => obj[key] == value);
      
      if(newArr.length == 0){
        let newObj = {};
        newObj[key] = value;
        newArr.push(newObj);
        setRenderedTemplates([...originSaleTemplates.filter(it => it['immutable_data'][key] == value)]);
        setSelected(newArr);
      }else{
        if(dupLength == 0){
          let newObj = {};
          newObj[key] = value;
          newArr.push(newObj);
          setRenderedTemplates([...renderTem, ...originSaleTemplates.filter(it => it['immutable_data'][key] == value)])
          setSelected(newArr);
        }else{
          let delArr = [];
          newArr.splice(dupIndex, 1);
          if(newArr.length == 0){
            delArr = [...originSaleTemplates];
          }else{
            newArr.map((item) => {
              let index = filterKeys.findIndex((key => item[key]));
              delArr = [...delArr, ...originSaleTemplates.filter(it => it['immutable_data'][filterKeys[index]] == item[filterKeys[index]])];
            })
          }
          setRenderedTemplates([...delArr]);
          setSelected(newArr);
        }
      }
    }else{
      let renderTem = renderedTemplates;
      let newArr = selectedValues;
      let dupLength = newArr.filter(obj => obj[key] == value).length;
      let dupIndex = newArr.findIndex(obj => obj[key] == value);
      
      if(newArr.length == 0){
        let newObj = {};
        newObj[key] = value;
        newArr.push(newObj);
        setRenderedTemplates([...originTemplates.filter(it => it['immutable_data'][key] == value)]);
      }else{
        if(dupLength == 0){
          let newObj = {};
          newObj[key] = value;
          newArr.push(newObj);
          setRenderedTemplates([...renderTem, ...originTemplates.filter(it => it['immutable_data'][key] == value)])
          setSelected(newArr);
        }else{
          let delArr = [];
          newArr.splice(dupIndex, 1);
          if(newArr.length == 0){
            delArr = [...originTemplates];
          }else{
            newArr.map((item) => {
              let index = filterKeys.findIndex((key => item[key]));
              delArr = [...delArr, ...originTemplates.filter(it => it['immutable_data'][filterKeys[index]] == item[filterKeys[index]])];
            })
          }
          setRenderedTemplates([...delArr]);
          setSelected(newArr);
        }
      }
    }
    setLoading(false);
  }
  const totalPrice = () => {
    let price = 0;
    selectedCards.map((it) => price += parseInt(it['listing_price']));
    return String(price);
  }
  const bulkBuy = async () => {
    if(currentUser == undefined){
      return proton.login();
    }else{ 
      let price = 0;
      await selectedCards.map((it) => price += parseInt(it['listing_price']));
      await proton.bulkSale({
        buyer: currentUser.acc,
        amount: String(price),
        ids: [...selectedCards.map((it) => it['sale_id'])],
      });
      
    }
  }
  const createOffer = async (templateId) => {
    setModalProps([]);
    openModal(MODAL_TYPES.MAKE_OFFER);
    let { assets } = await getUserTemplateAssets('', templateId);
    setModalProps(assets);
  };
  const priceApply = async () => {
    await setLoading(true);
    await setBuy(true);
    const saleTemplates = await getSaleTemplatesByCollection({
      type: collection,
      minValue,
      maxValue
    });
    await setRenderedTemplates(saleTemplates);
    await setLoading(false);
  }
  const getContent = () => {
    if (isLoading || isLoadingUser) {
      return <LoadingPage />;
    }

    if (errorMessage) {
      return (
        <ErrorComponent
          errorMessage={errorMessage}
          buttonText="Try again"
          buttonOnClick={() => router.reload()}
        />
      );
    }
    const {
      collection_name,
      market_fee,
      name,
      img,
      author,
      data: { description, url },
    } = collectionData;
    return (
      <>
      <div style={whitelistFilter.length == 0 ? {
        height: '0px',
        top: '0'
      } :  whitelistFilter[0]['banner'] == undefined || whitelistFilter[0]['banner'] == '' ? {
        height: '0px',
        top: '0'
      } :{
          width: '100%',
          backgroundPosition: 'center center', 
          backfaceVisibility: 'hidden', 
          backgroundRepeat: 'no-repeat', 
          backgroundImage: `url('${process.env.NEXT_PUBLIC_IPFS_URL}${whitelistFilter[0]['banner']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}')`, 
          height: '283px',
          backgroundSize: 'cover'
        }} />  
        <PageHeader 
          isWhiteList={0 < whitelistFilter.length}
          rating={0 < whitelistFilter.length ? whitelistFilter[0]['rating'] : 'unverified'}
          image={img}
          name={name || collection}
          description={description}
          type="collection"
          hasEditFunctionality={isEditButtonVisible}
          author={author}
          url={url}
          collectionName={collection_name}
          stats={collectionStats}
        />
        <SortTab 
          setFilterHide={() => setFilterHide(!hideFilter)}
          setBulkHide={() => setBulkHide(!hideBulk)}
          hideFilter={hideFilter}
          hideBulk={hideBulk}
          sortValue={sortValue}
          setSort={setSort}
          isSort={0 < originSaleTemplates.length && isBuy}
          setRenderTemplates={(value) => {
            if(isBuy){
              setRenderedTemplates(originSaleTemplates.filter((it) => -1 < it['data']['name'].toLowerCase().indexOf(value)).reverse());
            }else{
              setRenderedTemplates(originTemplates.filter((it) => -1 < it['immutable_data']['name'].toLowerCase().indexOf(value)).reverse());
            }
          }} 
          setLoading={setLoading} 
          setOrigin={() => {
            if(isBuy){
              setRenderedTemplates(originSaleTemplates);
            }else{
              setRenderedTemplates(originTemplates);
            }
          }}
          onRefresh={fetchFilterData}
        />
        <div style={{display: 'flex', minHeight: '800px', paddingBottom: '100px', flexDirection: 'column'}}>
          {hideFilter ? null : 
            <FilterTab 
              filterValues={filterValues} 
              filterKeys={filterKeys} 
              selectValue={selectValue} 
              selectedValues={selectedValues} 
              active={active} 
              setActive={setActive} 
              isBuy={isBuy} 
              setBuy={filterBuy} 
              saleLength={originSaleTemplates.length} 
              minValue={minValue}
              minChange={minChange}
              maxValue={maxValue}
              maxChange={maxChange}
              priceApply={priceApply}
              setFilterHide={setFilterHide}
              isDesktop={isDesktop}
            />
          }
          {selectedValues.length < 1 ? <div style={{height: '20px'}} /> :
              <ClearScroll>
                <ClearWrap>
                  {
                    0 < selectedValues.length ? 
                    <ClearBtn 
                    onClick={() => {
                      setSelected([]);
                      if(isBuy){
                        setRenderedTemplates(originSaleTemplates);
                      }else{
                        setRenderedTemplates(originTemplates);
                      }
                    }}>
                      <span>Clear All</span>
                    </ClearBtn> : null
                  }
                  {selectedValues.map((it) => (
                      Object.keys(it).map((key) => 
                      <TraitBtn 
                        onClick={() => selectValue(it[key], key)}  
                      >{key} : {it[key]}</TraitBtn>)
                    ))
                  }
                </ClearWrap>
              </ClearScroll>
          }
          <div style={{width: '100%'}}>
              {gridLoading ? <div style={{paddingTop: '100px'}}><Spinner size={50} /></div> : 
              0 < originSaleTemplates.length && isBuy ? 
              <SelectGrid items={renderedTemplates} isFilter={!hideFilter} selectedCards={selectedCards} setCard={setCard} isBulk={0 < selectedCards.length && !hideBulk} setBulkHide={setBulkHide} /> :
              <OfferGrid items={renderedTemplates} isFilter={!hideFilter} isBulk={0 < selectedCards.length && !hideBulk} onClick={createOffer} />}
          </div>
          {0 < selectedCards.length && !hideBulk ? 
          <div style={{ marginTop: '50px' }}>
            <BulkTab selectedCards={selectedCards} setCard={setCard} totalPrice={totalPrice} bulkBuy={bulkBuy} />
          </div> : null}
        </div>
      </>);
  };
  return (
    <PageLayout 
      title={`${collectionData.data.name}`}
      img={`${process.env.NEXT_PUBLIC_IPFS_URL}${collectionData['data']['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
      desc={`${collectionData['data']['name']} - ${collectionData['data']['description']}`}  
    >
      <SideBar hide={hide} active={'/collections/'} mobileHide={mobileHide} setHide={setHide} />
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume} />}
        <Banner modalType={MODAL_TYPES.CLAIM} />
        <div onClick={() => setMobileHide(true)}>
        {getContent()}
        </div>
      </Section>
    </PageLayout>
  );
};

export default CollectionPage;
