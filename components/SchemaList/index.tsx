import { useState, useEffect, FC, Dispatch, SetStateAction, FormEventHandler, useRef} from 'react';
import {
  Title,
  SubTitle,
  SchemaBox,
} from '../CreatePageLayout/CreatePageLayout.styled';
import {
  CREATE_PAGE_STATES,
  useCreateAssetContext
} from '../Provider';
import { CreateCollectionProps, UpdateCollectionProps } from '../Provider';
import {
  HalfButton,
} from '../Modal/Modal.styled';
import axios from 'axios';

const TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};

type Props = {
  type: string;
  modalProps: CreateCollectionProps | UpdateCollectionProps;
};

const SchemaList: FC<{
  setPageState: Dispatch<SetStateAction<string>>;
}> = ({ setPageState }) => {
  const {
    selectedCollection,
    setSelectedSchema
  } = useCreateAssetContext();
  const [schemas, setSchema] = useState([]);
  useEffect(() => {
    axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/schemas?collection_name=${selectedCollection.collection_name}&page=1&limit=100&order=desc&sort=created`)
    .then(res => {
        if(res.data.data[0] === undefined){
            return;
        }else{
            setSchema(res.data.data);
        }
    })
  }, []);
  return (
    <div style={{maxWidth: '424px'}}>
        <Title>Schemas</Title>
        <SubTitle>Select existing schema to mint NFT or create a new one!</SubTitle>
        {schemas.length === 0 ? null : 
          schemas.map((schema, index) => (
          <SchemaBox key={index} onClick={() => {
            setSelectedSchema(schema.schema_name);
            setPageState(CREATE_PAGE_STATES.UPDATE_SCHEMA);
          }}>
              {schema.schema_name}
              <img src="/schema_plus.svg" style={{cursor: 'pointer'}}/>
          </SchemaBox>
          ))
        }
        <HalfButton onClick={() => setPageState(CREATE_PAGE_STATES.CREATE_SCHEMA)} style={{width: '250px', alignSelf: 'flex-start', marginTop: '50px'}}>New Schema</HalfButton>
    </div>
  );
};

export default SchemaList;
