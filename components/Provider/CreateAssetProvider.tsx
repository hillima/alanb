import {
  FC,
  createContext,
  useState,
  useContext,
  useMemo,
  SetStateAction,
  Dispatch,
  useEffect,
} from 'react';
import { CarouselCollection, NewCollection } from '../CollectionsCarousel';
import ProtonSDK from '../../services/proton';
import fees, { MintFee } from '../../services/fees';
import uploadToIPFS from '../../services/upload';
import {
  DEFAULT_SCHEMA,
  EXTEND_SCHEMA,
  LG_FILE_UPLOAD_TYPES_TEXT,
  SHORTENED_TOKEN_PRECISION,
} from '../../utils/constants';
import { Collection } from '../../services/collections';
import { useAuthContext } from './AuthProvider';

export const CREATE_PAGE_STATES = {
  CHOOSE_COLLECTION: 'CHOOSE_COLLECTION',
  CREATE_TEMPLATE: 'CREATE_TEMPLATE',
  CREATE_COLLECTION: 'CREATE_COLLECTION',
  SELECT_COLLECTION: 'SELECT_COLLECTION',
  CREATE_SCHEMA: 'CREATE_SCHEMA',
  UPDATE_SCHEMA: 'UPDATE_SCHEMA',
  SUCCESS: 'SUCCESS',
};

const placeholderCollection = {
  collection_name: '',
  name: '',
  img: '',
};

const MintFeeInitial = {
  specialMintFee: {
    display: Number('0').toFixed(SHORTENED_TOKEN_PRECISION).toString(),
    raw: 0,
  },
  accountRamFee: {
    display: Number('0').toFixed(SHORTENED_TOKEN_PRECISION).toString(),
    raw: 0,
  },
  userSpecialMintContractRam: 0,
  userAccountRam: 0,
  totalFee: Number('0').toFixed(SHORTENED_TOKEN_PRECISION).toString(),
};

interface CreateAssetContext {
  setSelectedSchemaFormat:  Dispatch<SetStateAction<any>>;
  setSelectedSchema: Dispatch<SetStateAction<string>>;
  setSelectedCollection: Dispatch<SetStateAction<CarouselCollection>>;
  setNewCollection: Dispatch<SetStateAction<NewCollection>>;
  setTemplateName: Dispatch<SetStateAction<string>>;
  setTemplateDescription: Dispatch<SetStateAction<string>>;
  setTemplateImage: Dispatch<SetStateAction<string>>;
  setThumbImage: Dispatch<SetStateAction<string>>;
  setTemplateVideo: Dispatch<SetStateAction<string>>;
  setMaxSupply: Dispatch<SetStateAction<string>>;
  setMintAmount: Dispatch<SetStateAction<string>>;
  setTemplateUploadedFile: Dispatch<SetStateAction<File | null>>;
  setThumbUploadedFile: Dispatch<SetStateAction<File | null>>;
  setUploadedFilePreview: Dispatch<SetStateAction<string>>;
  setUploadedThumbPreview: Dispatch<SetStateAction<string>>;
  setMintFee: Dispatch<SetStateAction<MintFee>>;
  setIsUncreatedCollectionSelected: Dispatch<SetStateAction<boolean>>;
  createNft: (mutable_data:any, schema_format: any, author: string, categoryValue?: string) => Promise<string[]>;
  selectedCollection: Collection;
  selectedSchema: string;
  selectedSchemaFormat: any;
  newCollection: NewCollection;
  templateName: string;
  templateDescription: string;
  templateImage: string;
  thumbImage: string;
  templateVideo: string;
  maxSupply: string;
  mintAmount: string;
  templateUploadedFile: File | null;
  thumbUploadedFile: File | null;
  uploadedFilePreview: string;
  uploadedThumbPreview: string;
  mintFee: MintFee;
  isUncreatedCollectionSelected: boolean;
  isGlb: boolean;
  setGlb: any;
}

const CreateAssetContext = createContext<CreateAssetContext>({
  setGlb: () => {},
  setSelectedCollection: () => {},
  setSelectedSchema: () => {},
  setSelectedSchemaFormat: () => {},
  setNewCollection: () => {},
  setTemplateName: () => {},
  setTemplateDescription: () => {},
  setTemplateImage: () => {},
  setThumbImage: () => {},
  setTemplateVideo: () => {},
  setMaxSupply: () => {},
  setMintAmount: () => {},
  setTemplateUploadedFile: () => {},
  setThumbUploadedFile: () => {},
  setUploadedFilePreview: () => {},
  setUploadedThumbPreview: () => {},
  setMintFee: () => {},
  setIsUncreatedCollectionSelected: () => {},
  createNft: async () => [],
  selectedSchema: '',
  selectedSchemaFormat: [],
  selectedCollection: placeholderCollection,
  newCollection: undefined,
  templateName: '',
  templateDescription: '',
  templateImage: '',
  thumbImage: '',
  templateVideo: '',
  maxSupply: '',
  mintAmount: '',
  templateUploadedFile: undefined,
  thumbUploadedFile: undefined,
  uploadedFilePreview: '',
  uploadedThumbPreview: '',
  mintFee: MintFeeInitial,
  isUncreatedCollectionSelected: false,
  isGlb: false
});

export const useCreateAssetContext = (): CreateAssetContext => {
  const context = useContext(CreateAssetContext);
  return context;
};

export const CreateAssetProvider: FC<{
  children: JSX.Element | JSX.Element[];
}> = ({ children }) => {
  const [
    selectedSchemaFormat,
    setSelectedSchemaFormat,
  ] = useState<any>([]);
  const [
    selectedSchema,
    setSelectedSchema,
  ] = useState<string>('');
  const [
    selectedCollection,
    setSelectedCollection,
  ] = useState<CarouselCollection>(placeholderCollection);
  const [newCollection, setNewCollection] = useState<NewCollection>();
  const [templateName, setTemplateName] = useState<string>('');
  const [templateDescription, setTemplateDescription] = useState<string>('');
  const [templateImage, setTemplateImage] = useState<string>('');
  const [thumbImage, setThumbImage] = useState<string>('');
  const [templateVideo, setTemplateVideo] = useState<string>('');
  const [maxSupply, setMaxSupply] = useState<string>('');
  const [mintAmount, setMintAmount] = useState<string>('');
  const [isGlb, setGlb] = useState(false);
  const [templateUploadedFile, setTemplateUploadedFile] = useState<File | null>(
    null
  );
  const [thumbUploadedFile, setThumbUploadedFile] = useState<File | null>(
    null
  );
  const [uploadedFilePreview, setUploadedFilePreview] = useState<string>('');
  const [uploadedThumbPreview, setUploadedThumbPreview] = useState<string>('');
  const [mintFee, setMintFee] = useState<MintFee>(MintFeeInitial);
  const { currentUser } = useAuthContext();
  const [
    isUncreatedCollectionSelected,
    setIsUncreatedCollectionSelected,
  ] = useState<boolean>(false);

  const resetCreatePage = () => {
    setTemplateUploadedFile(null);
    setThumbUploadedFile(null);
    setIsUncreatedCollectionSelected(false);
    setNewCollection(undefined);
    setTemplateName('');
    setTemplateDescription('');
    setGlb(false);
    setTemplateImage('');
    setThumbImage('');
    setTemplateVideo('');
    setMaxSupply('');
    setMintAmount('');
    setSelectedCollection(placeholderCollection);
  };

  const getCreateTemplateValidationErrors = (): string[] => {
    const errors = [];

    if (!templateUploadedFile) {
      errors.push(`upload a ${LG_FILE_UPLOAD_TYPES_TEXT}`);
    }
    if (isGlb && !thumbUploadedFile) {
      errors.push(`upload a ${LG_FILE_UPLOAD_TYPES_TEXT}`);
    }
    if (!templateName) {
      errors.push('set a name');
    }
    if (!templateDescription) {
      errors.push('set a description');
    }

    if (typeof maxSupply === 'undefined' || isNaN(parseInt(maxSupply))) {
      errors.push(
        "set the template's maximum edition size (0 for no maximum edition size)"
      );
    }

    if (!mintAmount) {
      errors.push('set an initial mint amount (minimum 1)');
    }

    if (maxSupply !== '0' && parseInt(mintAmount) > parseInt(maxSupply)) {
      errors.push('set an initial mint amount less than the edition size');
    }

    return errors;
  };

  useEffect(() => {
    if (currentUser) {
      fees.refreshRamInfoForUser(currentUser.actor);
    }
  });


  const createNft = async (mutable_data: any, schema_format: any, author: string, categoryValue?: string): Promise<string[]> => {
    const errors = getCreateTemplateValidationErrors();
    if (errors.length) {
      return errors;
    }
    try {
      if(isGlb){
        const templateIpfsImage = await uploadToIPFS(templateUploadedFile);
        const thumbIpfsImage = await uploadToIPFS(thumbUploadedFile);  
  
        if (!templateIpfsImage) {
          const errors = ['try again (unable to upload image)'];
          return errors;
        }

        if (!thumbIpfsImage) {
          const errors = ['try again (unable to upload image)'];
          return errors;
        }

        await fees.refreshRamInfoForUser(author);
        const finalMintFees = fees.calculateCreateFlowFees({
          numAssets: parseInt(mintAmount),
          actor: author,
        });
      
        const default_template = {
          name: templateName,
          desc: templateDescription,
          model: templateIpfsImage,
          video: '',
          image: '',
          glbthumb: thumbIpfsImage,
          marketplace: 'dgalaxy',
          categorie: categoryValue.toLowerCase(),
          series: 1
        };

        const immutable_data = Object.entries(DEFAULT_SCHEMA).map(
          ([key, type]) => ({
            key,
            value: [type, default_template[key] || ''],
          })
        );
        const new_mutable_data = await Object.entries(mutable_data).map(
          ([key, type]) => ({
            key: key,
            value: ['string', type == 'bool' && mutable_data[key] 
            ? 1 : type == 'bool' && !mutable_data[key] 
            ? 0 : type == 'float' 
            ? (parseFloat(mutable_data[key]).toFixed(2)) : mutable_data[key] || ''],
          })
        );
  
        const schemaExtendFormat = Object.entries({...schema_format}).map(([key, type]) => ({
          name: key,
          type,
        }));

        const result = await ProtonSDK.createTemplateAssets({
              mintFee: finalMintFees,
              author,
              collection_name: selectedCollection.collection_name,
              schema_name: selectedCollection.collection_name,
              max_supply: parseInt(maxSupply),
              initial_mint_amount: parseInt(mintAmount),
              immutable_data: immutable_data,
              mutable_data: new_mutable_data,
              schema_format: schemaExtendFormat
            });
        if (!result.success) {
          throw new Error();
        }
  
        resetCreatePage();
        return errors;
      } else{
        const templateIpfsImage = await uploadToIPFS(templateUploadedFile);
  
        if (!templateIpfsImage) {
          const errors = ['try again (unable to upload image)'];
          return errors;
        }
  
        // if (!thumbIpfsImage) {
        //   const errors = ['try again (unable to upload image)'];
        //   return errors;
        // }
  
        let isVideo = false;
        if (templateUploadedFile.type.includes('mp4')) {
          isVideo = true;
        }
  
        await fees.refreshRamInfoForUser(author);
        const finalMintFees = fees.calculateCreateFlowFees({
          numAssets: parseInt(mintAmount),
          actor: author,
        });
      
        const default_template = {
          name: templateName,
          desc: templateDescription,
          model: '',
          video: isVideo ? templateIpfsImage : '',
          image: isVideo ? ''  : templateIpfsImage,
          glbthumb: '',
          marketplace: 'dgalaxy',
          categorie: categoryValue.toLowerCase(),
          series: 1
        };
    
        const immutable_data = Object.entries(DEFAULT_SCHEMA).map(
          ([key, type]) => ({
            key,
            value: [type, default_template[key] || ''],
          })
        );
        const new_mutable_data = await Object.entries(mutable_data).map(
          ([key, type]) => ({
            key: key,
            value: ['string', type == 'bool' && mutable_data[key] 
            ? 1 : type == 'bool' && !mutable_data[key] 
            ? 0 : type == 'float' 
            ? (parseFloat(mutable_data[key]).toFixed(2)) : mutable_data[key] || ''],
          })
        );
  
        const schemaExtendFormat = Object.entries({...schema_format}).map(([key, type]) => ({
          name: key,
          type,
        }));
        const result = await ProtonSDK.createTemplateAssets({
              mintFee: finalMintFees,
              author,
              collection_name: selectedCollection.collection_name,
              schema_name: selectedCollection.collection_name,
              max_supply: parseInt(maxSupply),
              initial_mint_amount: parseInt(mintAmount),
              immutable_data: immutable_data,
              mutable_data: new_mutable_data,
              schema_format: schemaExtendFormat
            });
  
        if (!result.success) {
          throw new Error();
        }
  
        resetCreatePage();
        return errors;
      }
    } catch (err) {
      errors.push(err.message || 'Unable to create the NFT. Please try again.');
      return errors;
    }
  };

  const value = useMemo<CreateAssetContext>(
    () => ({
      setGlb,
      isGlb,
      setSelectedCollection,
      setSelectedSchema,
      setSelectedSchemaFormat,
      setNewCollection,
      setTemplateName,
      setTemplateDescription,
      setTemplateImage,
      setThumbImage,
      setTemplateVideo,
      setMaxSupply,
      setMintAmount,
      setThumbUploadedFile,
      setTemplateUploadedFile,
      setUploadedThumbPreview,
      setUploadedFilePreview,
      setMintFee,
      setIsUncreatedCollectionSelected,
      createNft,
      selectedSchema,
      selectedSchemaFormat,
      selectedCollection,
      newCollection,
      templateName,
      templateDescription,
      templateImage,
      thumbImage,
      templateVideo,
      maxSupply,
      mintAmount,
      templateUploadedFile,
      thumbUploadedFile,
      uploadedFilePreview,
      uploadedThumbPreview,
      mintFee,
      isUncreatedCollectionSelected,
    }),
    [
      setGlb,
      isGlb,
      selectedSchemaFormat,
      selectedSchema,
      selectedCollection,
      newCollection,
      templateName,
      templateDescription,
      templateImage,
      thumbImage,
      templateVideo,
      maxSupply,
      mintAmount,
      templateUploadedFile,
      thumbUploadedFile,
      uploadedFilePreview,
      uploadedThumbPreview,
      mintFee,
      isUncreatedCollectionSelected,
    ]
  );

  return (
    <CreateAssetContext.Provider value={value}>
      {children}
    </CreateAssetContext.Provider>
  );
};
