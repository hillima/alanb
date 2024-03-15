import { Dispatch, SetStateAction, ReactNode, FC, useEffect, useState } from 'react';
import {
  Container,
  Row,
  Column,
  TabTitle,
  TabRow,
} from './DetailsLayout.styled';
import SalesHistoryTable from '../SalesHistoryTable';
import AssetFormTitle from '../AssetFormTitle';
import AssetDisplay from '../AssetDisplay';
import AssetMeta from '../AssetMeta';
import { SaleAsset } from '../../services/sales';
import { Asset } from '../../services/assets';
import { tabs } from '../../components/SalesHistoryTable';
import axios from 'axios';
import { useWindowSize } from '../../hooks';

type Props = {
  children: ReactNode;
  image?: string;
  video?: string;
  model?: string;
  stage?: string;
  skybox?: string;
  usdz?: string;
  templateId: string;
  templateName: string;
  collectionDisplayName?: string;
  collectionName: string;
  collectionAuthor: string;
  collectionImage: string;
  error?: string;
  currentAsset?: Partial<SaleAsset> & Partial<Asset>;
  assetIds?: string[];
  saleIds?: string[];
  activeTab: string;
  isRefetchingAssets?: boolean;
  createdAtTime: string;
  setActiveTab: Dispatch<SetStateAction<string>>;
  setCurrentAssetAsModalProps?: () => void;
};

const DetailsLayout: FC<Props> = ({
  children,
  image,
  video,
  model,
  stage,
  skybox,
  usdz,
  templateId,
  templateName,
  collectionName,
  collectionDisplayName,
  collectionAuthor,
  collectionImage,
  error,
  currentAsset,
  assetIds,
  saleIds,
  activeTab,
  createdAtTime,
  isRefetchingAssets,
  setActiveTab,
  setCurrentAssetAsModalProps,
}) => {
  const [mutableData, setData] = useState('');
  const [format, setFormat] = useState([]);
  const { isMobile } = useWindowSize();
  const [ schemaName, setSchema ] = useState('');
  useEffect(() => {
    if(currentAsset.asset_id != undefined || currentAsset.assetId != undefined){
      axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/assets/${currentAsset.asset_id || currentAsset.assetId}`)
      .then(res => {
        let format = res.data.data.schema.format.slice(5, res.data.data.schema.format.length);
        setSchema(res.data.data.schema.schema_name);
        setFormat(format);
        setData(res.data.data.mutable_data);
      });
    }
  }, [currentAsset]);
  return (
    <Container>
      <AssetMeta
        templateName={templateName}
        collectionName={collectionName}
        collectionDisplayName={collectionDisplayName}
        collectionAuthor={collectionAuthor}
        image={image}
        video={video}
        model={model}
      />
      <Row>
        <AssetDisplay
          image={image}
          video={video}
          model={model}
          stage={stage}
          skybox={skybox}
          usdz={usdz}
          templateName={templateName}
          created={createdAtTime}
        />
        {mutableData === '' ? 
        <Column>
         <Row>
            <AssetFormTitle
              templateId={templateId}
              schemaName={schemaName}
              model={model}
              templateName={templateName}
              collectionDisplayName={collectionDisplayName}
              collectionName={collectionName}
              collectionAuthor={collectionAuthor}
              collectionImage={collectionImage}
              saleIds={saleIds}
              assetIds={assetIds}
              isRefetchingAssets={isRefetchingAssets}
              setCurrentAssetAsModalProps={setCurrentAssetAsModalProps}
            />
            {children}
          </Row>
        </Column>
        : 
        <Row style={isMobile ? {flexDirection: 'column'} : {display: 'flex', flexDirection: 'row'}}>
          <Row style={isMobile ? {width: '100%'} : {width: '50%'}}>
            <AssetFormTitle
              templateId={templateId}
              schemaName={schemaName}
              model={model}
              templateName={templateName}
              collectionDisplayName={collectionDisplayName}
              collectionName={collectionName}
              collectionAuthor={collectionAuthor}
              collectionImage={collectionImage}
              saleIds={saleIds}
              assetIds={assetIds}
              isRefetchingAssets={isRefetchingAssets}
              setCurrentAssetAsModalProps={setCurrentAssetAsModalProps}
            />
            {children}
          </Row>
          {Object.keys(mutableData).length === 0 ?
          <Row style={isMobile ? {width: '100%', background:'#050505', borderRadius: '32px',  display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '20px'} : {width: '50%', marginLeft: '39px', background:'#050505', borderRadius: '32px',  display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <p style={{color: '#FFF', paddingTop: '20px', paddingBottom: '20px'}}>No Attributes</p>
          </Row>: 
          <Row style={isMobile ? {width: '100%', marginLeft: '0', background:'#050505', borderRadius: '32px', padding: '12px'} : {width: '50%', marginLeft: '39px', background:'#050505', borderRadius: '32px', padding: '36px 48px 36px 48px'}}>
            <div style={{color: '#FFF', marginBottom:'23px'}}>Attributes</div>
            {format.map((it) => (
                <p style={{fontSize:'18px', marginBottom: '10px', display: 'flex'}}><h3 style={{color: '#7543E3', width: '113px', marginRight: '13px'}}>{it.name}</h3><span onClick={() => {
                  if(it.type === 'ipfs'){
                    window.open(`https://ipfs.io/ipfs/${mutableData[it.name]}`);
                  }
                }} style={it.type === 'ipfs' ? {cursor:'pointer', color: '#33FF00', textDecoration: 'underline'} : {color: '#D8D8D8'}}>{it.type === 'bool' ? mutableData[it.name] == '0' ? 'false' : 'true' : it.type === 'ipfs' ? 'open' : it.type === 'float' ? parseFloat(mutableData[it.name]).toFixed(2) : mutableData[it.name]}</span></p>
              ))}
          </Row>
          }
        </Row>
        }
      </Row>
      <TabRow>
        {tabs.map(({ type, title }) => {
          return (
            <TabTitle
              key={type}
              onClick={() => setActiveTab(type)}
              isActive={activeTab === type}>
              {title}
            </TabTitle>
          );
        })}
      </TabRow>
      <SalesHistoryTable
        activeTab={activeTab}
        error={error}
        asset={currentAsset}
        templateId={templateId}
      />
    </Container>
  );
};

export default DetailsLayout;
