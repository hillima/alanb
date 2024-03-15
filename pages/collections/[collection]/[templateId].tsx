import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '../../../components/PageLayout';
import ErrorComponent from '../../../components/Error';
import LoadingPage from '../../../components/LoadingPage';
import Banner from '../../../components/Banner';
import {
  MODAL_TYPES,
  useAuthContext,
  useModalContext,
  useVolumeContext,
} from '../../../components/Provider';
import NftDetail from '../../../components/NftDetail';
import { formatTemplatesWithPriceData, getLowestPricesForAllCollectionTemplates, getTemplateDetails, getTemplatesByCollection } from '../../../services/templates';
import proton from '../../../services/proton';
import { getActivities, getAllTemplateSales, getSalesHistoryForTemplate, SaleAsset } from '../../../services/sales';
import { Asset, FullSaleDataByAssetId, getAllUserAssetsByTemplate, getUserTemplateAssets } from '../../../services/assets';
import { getCollection } from '../../../services/collections';
import SideBar from '../../../components/SideBar';
import Section from '../../../components/Section/Section';
import NavBar from '../../../components/NavBar';
import VolumeBar from '../../../components/VolumeBar';
import { getBuyOffers } from '../../../services/offers';
import MoreGrid from '../../../components/MoreGrid';
import { delay } from '../../../utils';
import { MoreText } from '../../../components/MoreGrid/MoreGrid.styled';
import { RESIZER_IMAGE_SM } from '../../../utils/constants';

const shuffleArray = (array) => {
  return array.sort(() => Math.random() - 0.5);
}

export async function getServerSideProps({ params }) {
  const { templateId, collection } = params;
  const template = await getTemplateDetails(collection,templateId);
  const allTemplates = await getTemplatesByCollection({ type: collection });
  const lowestPricesResult = await getLowestPricesForAllCollectionTemplates({
    type: collection
  });
  const moreTemplates = await formatTemplatesWithPriceData(
    shuffleArray(allTemplates.filter((tem) => tem['template_id'] != templateId)).slice(0, 10),
    lowestPricesResult
  );
  const collectionData = await getCollection(collection);
  const offers = await getBuyOffers(templateId);
  return {
    props: { template, collection, templateId, collectionData, offers, moreTemplates },
  };
}

const NftPage = ({ template, templateId, collection, collectionData, offers, moreTemplates }: any): JSX.Element => {
  const router = useRouter();
  const { volume } = useVolumeContext();
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const {
    updateCurrentUserBalance,
    currentUser,
    isLoadingUser,
    currentUserBalance,
    currentUserXprBalance,
    login,
  } = useAuthContext();
  const xprbalanceAmount = parseFloat(
    currentUserXprBalance.split(' ')[0]
  );
  const [templateAssets, setTemplateAssets] = useState([]);
  const [formattedPricesBySaleId, setFormattedPricesBySaleId] = useState<{
    [templateMint: string]: string;
  }>({});
  const [rawPricesBySaleId, setRawPricesBySaleId] = useState<{
    [templateMint: string]: string;
  }>({});
  const [purchasingError, setPurchasingError] = useState<string>('');
  const [isBalanceInsufficient, setIsBalanceInsufficient] = useState<boolean>(
    false
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  const [currentAsset, setCurrentAsset] = useState<Partial<Asset>>({});
  const [saleId, setSaleId] = useState('');
  const [saleIds, setSaleIds] = useState<string[]>();
  const [allAssets, setAllAssets] = useState([]);
  const [userAssets, setUserAssets] = useState([]);
  const [transfers, setTransfers] = useState([]);
  const [assetIds, setAssetIds] = useState<string[]>([]);
  const [assetId, setAssetId] = useState<string>('');
  const [isRefetching, setIsRefetching] = useState<boolean>(false);
  const [
    saleDataByAssetId,
    setSaleDataByAssetId,
  ] = useState<FullSaleDataByAssetId>({});
  const { openModal, setModalProps } = useModalContext();
  const [isMyTemplate, setMyTemplate] = useState(false);
  const [isSelectedAssetBeingSold, setBeingSold] = useState('');
  const balanceAmount = parseFloat(
    currentUserBalance.split(' ')[0].replace(/[,]/g, '')
  );
  const fetchPageData = async () => {
    try {
      if(currentUser === undefined){
        return;
      }
      const owner = currentUser.actor;
      let { assets, saleData } = await getUserTemplateAssets(owner, templateId);
      
      setUserAssets(assets);
      setMyTemplate(currentUser && 0 < assets.length);

      const assetIds = assets
        .filter(({ asset_id }) => !saleData[asset_id])
        .map(({ asset_id }) => asset_id);

      const saleIds = Object.values(saleData).map(({ saleId }) => saleId);
      setModalProps({
        saleIds,
        assetIds,
        fetchPageData: async () => {
          await setIsLoading(true);
          await delay(12000);
          await fetchPageData();
          await loadTemplate();
          await setIsLoading(false);
        },
        collectionName: template.collection.collection_name,
        templateId: template.template_id,
        maxSupply: isNaN(parseInt(template.max_supply))
          ? 0
          : parseInt(template.max_supply),
        issuedSupply: isNaN(parseInt(template.issued_supply))
          ? 0
          : parseInt(template.issued_supply),
      });
      
      if (assets[0]) {
        const { asset_id, template_mint } = assets[0];
        setAssetId(asset_id);
        setCurrentAsset(assets[0]);
        setModalProps((previousModalProps) => ({
          ...previousModalProps,
          assetId: asset_id,
          templateMint: template_mint,
          saleId: saleData[asset_id] ? saleData[asset_id].saleId : '',
        }));
      }
      await setBeingSold(assets.length === 0 ? 'offer' : 
      Object.keys(saleData).length == 0 ? 'mark' : 'cancel');
      await setAssetIds(assetIds);
      await setSaleIds(saleIds);
      // setTemplateAssets(assets);
      await setSaleDataByAssetId(saleData);
    } catch (e) {
      setError(e.message);
    }
  };

  const setCurrentAssetAsModalProps = () => {
    setModalProps((previousModalProps) => ({
      ...previousModalProps,
      assetIds: userAssets.map((val) => templateAssets.filter((tem) => tem['assetId'] == val['asset_id']).length == 0 ? val['asset_id'] : false),
      templateMint: userAssets.map((val) => val['template_mint'])
    }));
  };

  const setOfferAsModalProps = async () => {
    let newAssets = await templateAssets.length === 0 ? allAssets : templateAssets;
    if(0 < templateAssets.length){
      await newAssets.map((val) => {
        val['asset_id'] = val['assetId'];
        val['template_mint'] = val['templateMint'];
        val['sale_id'] = val['saleId'];
        val['owner'] = val['seller'];
      })
    }
    await setModalProps((newAssets));
  };
  const loadTemplate = async () => {
    try {
        const owner = currentUser ? currentUser.actor : '';
        if(owner != ''){
          let { assets } = await getUserTemplateAssets(owner, templateId);
          setUserAssets(assets);
        }
        const {
          formattedPrices,
          rawPrices,
          assets,
        } = await getAllTemplateSales(templateId);
        const res = await getAllUserAssetsByTemplate('', templateId);
        await setAllAssets([...res]);
        await setTemplateAssets(assets);
        await setFormattedPricesBySaleId(formattedPrices);
        await setRawPricesBySaleId(rawPrices);
    } catch (e) {
      setError(e.message);
    } 
  };
  
  const loadActivity = async () => {
    try{
      const trans = await getActivities(templateId);
      setTransfers([...trans]);
    }catch(e){
      setTransfers([]);
    }
  }

  useEffect(() => {
    if(templateId){
      setIsLoading(true);
      loadActivity();
      loadTemplate();
      fetchPageData();
      setIsLoading(false);
    }
  }, [templateId, currentUser]);

  const createOffer = () => {
    if(0 < allAssets.length || 0 < templateAssets.length){
      openModal(MODAL_TYPES.MAKE_OFFER);
      setOfferAsModalProps();
    }
  };

  const createSale = () => {
    openModal(MODAL_TYPES.CREATE_SALE);
    setCurrentAssetAsModalProps();
  };


  const buttonText = currentUser ? 'Buy now' : 'Connect wallet to buy';

  const soldBtnClick = isSelectedAssetBeingSold == 'offer' ? createOffer : isSelectedAssetBeingSold == 'cancel' ? () => {} : createSale;
  const soldBtnText = isSelectedAssetBeingSold == 'offer' ? 'Make an offer' : isSelectedAssetBeingSold == 'cancel' ? 'Cancel Sale' : 'Mark for sale';

  const getContent = () => {

    if (errorMessage) {
      return (
        <ErrorComponent
          errorMessage={errorMessage}
          buttonText="Try again"
          buttonOnClick={() => router.reload()}
        />
      );
    }
    return (
      <>
        <NftDetail 
          assetId={assetId} setAssetId={setAssetId} 
          isRefetching={isRefetching} data={template} 
          assets={templateAssets} allAssets={allAssets} 
          collectionData={collectionData} offers={offers} 
          transfers={transfers} moreTemplates={moreTemplates} 
          assetIds={assetIds} saleIds={saleIds}
          setCurrentAssetAsModalProps={setCurrentAssetAsModalProps}
          isMyTemplate={isMyTemplate} currentUser={currentUser}
          updateCurrentUserBalance={updateCurrentUserBalance}
          soldBtnText={soldBtnText} soldBtnClick={soldBtnClick}
          isLoading={isLoading} xprbalanceAmount={xprbalanceAmount}
          fetchData={async () => {
            await setIsLoading(true);
            await delay(5000);
            await fetchPageData();
            await loadTemplate();
            await setIsLoading(false);
          }}
          userAssets={userAssets}
        />
        <div style={{marginLeft: '58px', height: '1px', backgroundColor: '#F5F5F5', marginBottom: '31px', width: 'calc(100% - 40px)', maxWidth: '1130px', margin: '0 auto'}} />
        <div style={{maxWidth: '1170px', margin: '0 auto', paddingTop: '31px', width: '100%', paddingLeft: '20px', paddingRight: '20px'}}>
          <MoreText>More from this collection</MoreText>
          <MoreGrid items={moreTemplates} isBulk={false} isFilter={false} />
        </div>
      </>
    );
  };
  return(
    <PageLayout 
      title={`${collectionData['name']} - ${template['name']}`} 
      img={`${process.env.NEXT_PUBLIC_IPFS_URL}${template['immutable_data']['image'] || template['immutable_data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
      desc={`${template['immutable_data']['name']} - ${template['immutable_data']['desc']} / ${template['immutable_data']['categorie']}`}
    >
      <SideBar hide={hide} active={'/collections'} mobileHide={mobileHide} setHide={setHide} />
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume}/>}
        <Banner modalType={MODAL_TYPES.CLAIM} />
        <div onClick={() => setMobileHide(true)}>
        {getContent()}
        </div>
      </Section>
    </PageLayout>
  );
};

export default NftPage;
