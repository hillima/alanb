import { useState, useEffect, FC, Dispatch, SetStateAction } from 'react';
import {
  Title,
  SubTitle,
  Step,
  Red,
  LabelText,
  ElementTitleSecond,
  ErrorMessage,
  Terms,
  TermsLink,
  FeeLabel,
  DescriptionArea,
} from '../CreatePageLayout/CreatePageLayout.styled';
import DragDropFileUploadLg from '../DragDropFileUploadLg';
import InputField from '../InputField';
import Button from '../Button';
import { BackButton } from '../CreatePageLayout/CreatePageLayout.styled';
import Spinner from '../Spinner';
import {
  useAuthContext,
  useCreateAssetContext,
  CREATE_PAGE_STATES,
} from '../../components/Provider';
import fees from '../../services/fees';
import CreatableSelect from 'react-select/creatable';
import { DropdownMenu } from '../AssetFormBuy/AssetFormBuy.styled';
import axios from 'axios';
import { EXTEND_SCHEMA } from '../../utils/constants';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';

const IOSSwitch = styled((props: any) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 42,
  height: 26,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    transitionDuration: '300ms',
    '&.Mui-checked': {
      transform: 'translateX(16px)',
      color: '#fff',
      '& + .MuiSwitch-track': {
        backgroundColor: theme.palette.mode === 'dark' ? '#4924C4' : '#4924C4',
        opacity: 1,
        border: 0,
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: '#33cf4d',
      border: '6px solid #fff',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 22,
    height: 22,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

const CreateTemplate: FC<{
  setPageState: Dispatch<SetStateAction<string>>, value: any, setValue: any
}> = ({ setPageState, value, setValue }) => {
  const { currentUser } = useAuthContext();
  const {
    setTemplateName,
    setTemplateDescription,
    setMaxSupply,
    setMintAmount,
    setTemplateUploadedFile,
    thumbUploadedFile,
    setUploadedThumbPreview,
    uploadedThumbPreview,
    setThumbUploadedFile,
    selectedCollection,
    setSelectedCollection,
    setUploadedFilePreview,
    setMintFee,
    createNft,
    templateName,
    templateDescription,
    maxSupply,
    mintAmount,
    templateUploadedFile,
    uploadedFilePreview,
    mintFee,
    newCollection,
    setNewCollection,
    isGlb,
    setGlb
  } = useCreateAssetContext();
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isValid, setIsValid] = useState<boolean>(false);
  const [categoryValue, setCategory] = useState<string>('');
  const [format, setFormat] = useState<any>([]);
  const categories = ['PFPs and Avatars', 'One-of-one (1/1) artwork', 'Collectables', 'Photography NFTs',
  'Music NFTs', 'Gamified NFTs',  'NFT event tickets', 'Membership passes', 'Domain names', 'Generative art',
  'Virtual Land', 'Real World Assets', 'NFT Fashion', 'Video clips and GIFs', 'Trading Card NFTs'];
  const defaultFormat = ['name', 'desc', 'model', 'glbthumb', 'series', 'categorie', 'image', 'audio', 'video', 'marketplace'];

  useEffect(() => {
    if(!newCollection){
      axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/schemas?collection_name=${selectedCollection.collection_name}&schema_name=${selectedCollection.collection_name}`)
      .then(res => {
        let data = res.data.data[0]['format'];
        setFormat(data);
        let filterData = data.filter((obj) => defaultFormat.indexOf(obj['name']) < 0);
        let newArr = [];
        filterData.map((obj) => {
          let newObj = {
            label: obj['name'],
            value: obj['name'],
            __isNew__: true,
            newVal: ''
          }
          newArr.push(newObj);
        });
        setValue(newArr);
        // setFixedType(newArr);
        // setSelectedSchemaFormat(newArr);
      });
    }
  }, [newCollection]);


  const setErrorMessages = (errors: string[]): void => {
    if (errors.length === 1) {
      setError(`${errors[0]}.`);
      return;
    }

    if (errors.length === 1) {
      setError(`${errors[0]}.`);
      return;
    }

    if (errors.length === 2) {
      setError(`${errors[0]} and ${errors[1]}.`);
      return;
    }

    if (errors.length > 2) {
      const lastErrorIndex = errors.length - 1;
      let errorMessage = `${errors[0]}`;

      for (let i = 1; i < errors.length; i++) {
        if (i === lastErrorIndex) {
          errorMessage += `, and ${errors[i]}.`;
          break;
        }
        errorMessage += `, ${errors[i]}`;
      }

      setError(errorMessage);
      return;
    }
  };

  const validateAndCreate = async () => {
    setIsLoading(true);
    setError('');
    let newMutable = {};
    let schemaFormat = {};
    value.map((val) => {
      if(val['newVal'] != undefined){
        newMutable[val['label']] = val['newVal'];
        let findIndex = format.findIndex((obj) => obj['name'] == val['label']);
        Object.entries(EXTEND_SCHEMA).map(([key]) => {
          let index = format.findIndex((obj) => obj['name'] == key);
          if(index < 0){
            schemaFormat[key] = EXTEND_SCHEMA[key];
          }
        });
        if(findIndex < 0){
          schemaFormat[val['label']] = 'string';
        }
      }
    });
    
    const errors = await createNft(newMutable, schemaFormat, currentUser.actor, categoryValue);
    setIsLoading(false);
    if (errors.length) {
      setErrorMessages(errors);
      return;
    }

    setPageState(CREATE_PAGE_STATES.SUCCESS);
  };

  const resetTemplatePage = () => {
    setThumbUploadedFile(null);
    setTemplateUploadedFile(null);
    setUploadedFilePreview('');
    setUploadedThumbPreview('');
    setTemplateName('');
    setTemplateDescription('');
    setSelectedCollection({
      collection_name: '',
      name: '',
      img: '',
    });
    setNewCollection(undefined);
    setMaxSupply('');
    setMintAmount('');
    setError('');
  };

  useEffect(() => {
    if (mintAmount && !maxSupply) {
      setMintAmount('');
    }
  }, [maxSupply]);

  useEffect(() => {
    const numAssets = parseInt(mintAmount);
    const mintFees = fees.calculateCreateFlowFees({
      numAssets,
      actor: currentUser ? currentUser.actor : '',
    });
    setMintFee(mintFees);
  }, [mintAmount, currentUser, isLoading]);

  const checkMintAmountValidity = (amount) => {
    const number = parseInt(amount);
    let valid = false;
    let errorMessage;

    if (number >= 1 && number <= 500) {
      if (parseInt(maxSupply) > 0) {
        if (number <= parseInt(maxSupply)) {
          valid = true;
        } else {
          errorMessage = 'You cannot mint more than the set edition size';
        }
      } else {
        valid = true;
      }
    } else {
      errorMessage = 'You can mint up to 500 assets at a time';
    }

    setIsValid(valid);
    return {
      isValid: valid,
      errorMessage,
    };
  };
  const allFieldsFilled =
    templateUploadedFile &&
    templateName &&
    templateDescription &&
    maxSupply &&
    mintAmount &&
    categoryValue;

  return (
    <>
      <Step>Step 2 of 2</Step>
      <Title>Create a NFT</Title>
      <SubTitle>
        Each NFT edition follows a specific &quot;template&quot; which
        identifies the fields of the NFT. This is also saved on the chain
        itself.
      </SubTitle>
      <ElementTitleSecond>Collections</ElementTitleSecond>
      <LabelText mb="9px">Category<Red>*</Red></LabelText>
      <DropdownMenu
        name="Available Assets For Sale"
        value={categoryValue}
        onChange={(e) => setCategory(e.target.value)}
      >
        <option key="blank" value="" disabled>
          - - Select a Category - -
        </option>
        {categories.map((name, index) => (
            <option key={index} value={name}>
              {name}
            </option>
          ))}
      </DropdownMenu>
      <LabelText mb="9px">Select Glb</LabelText>
      <IOSSwitch checked={isGlb} onChange={() => {
        setGlb(!isGlb);
        setTemplateUploadedFile(null);
        setThumbUploadedFile(null);
        setUploadedFilePreview('');
        setUploadedThumbPreview('');
      }} />
      { 
        isGlb ?
        <>
          <LabelText mb="9px" mt="12px">Glb file<Red>*</Red></LabelText>
          <DragDropFileUploadLg
              setTemplateUploadedFile={setTemplateUploadedFile}
              templateUploadedFile={templateUploadedFile}
              setUploadedFilePreview={setUploadedFilePreview}
              uploadedFilePreview={uploadedFilePreview}
              isGlb={isGlb}
          />
        </> : null}
      <LabelText mb="9px" mt="12px">{isGlb ? 'Thumbnail Upload' : 'Upload file' }<Red>*</Red></LabelText>
      {
        isGlb ? 
        <DragDropFileUploadLg
          setTemplateUploadedFile={setThumbUploadedFile}
          templateUploadedFile={thumbUploadedFile}
          setUploadedFilePreview={setUploadedThumbPreview}
          uploadedFilePreview={uploadedThumbPreview}
          isGlb={false}
        /> : 
        null
      }
      {
        !isGlb ? 
        <DragDropFileUploadLg
          setTemplateUploadedFile={setTemplateUploadedFile}
          templateUploadedFile={templateUploadedFile}
          setUploadedFilePreview={setUploadedFilePreview}
          uploadedFilePreview={uploadedFilePreview}
          isGlb={false}
        /> 
        : null
      }
      <LabelText mt="20px">Name<Red>*</Red></LabelText>
      <InputField
        mt="7px"
        value={templateName}
        setValue={setTemplateName}
        placeholder="Name"
      />
      <LabelText mt="20px">Description<Red>*</Red></LabelText>
      <DescriptionArea 
        value={templateDescription} 
        onChange={(e) => setTemplateDescription(e.target.value)} 
        placeholder="Description"
      />
      <LabelText mt="20px">Attributes</LabelText>
      <CreatableSelect 
        isClearable isMulti 
        classNamePrefix='react-select' placeholder="Attributes" 
        value={value} onChange={(newValue) => setValue(newValue)}
      />
      {0 < value.length ? 
      value.map((val, index) => (
        <InputField
        mt="9px"
        value={val['newVal']}
        setValue={(targetVal) => {
          let newArr = value;
          newArr[index]['newVal'] = targetVal;
          setValue([...newArr]);
        }}
        placeholder={`Enter "${val['label']}" value`}
      />
      )) : null
      }
      <LabelText mt="20px">Edition Size<Red>*</Red></LabelText>
      <InputField
        mt="9px"
        inputType="number"
        min={0}
        step={1}
        value={maxSupply}
        setValue={setMaxSupply}
        placeholder="Edition Size"
        tooltip="Maximum number of NFTs in this edition. Put 0 for an unlimited edition size."
        checkIfIsValid={(input) => {
          const numberInput = parseFloat(input as string);
          const isValid = !isNaN(numberInput) && numberInput >= 0;
          const errorMessage = 'Edition size must be 0 or greater.';

          return {
            isValid,
            errorMessage,
          };
        }}
        numberOfTooltipLines={3}
      />
      <LabelText mt="20px">Number of NFTs to create now<Red>*</Red></LabelText>
      <InputField
        inputType="number"
        min={1}
        max={500}
        step={1}
        mt="16px"
        value={mintAmount}
        disabled={!maxSupply}
        setValue={setMintAmount}
        placeholder="Enter mint amount"
        tooltip="Choose an initial mint amount (first 10 are for free). Minting takes a bit of time, so we recommend no more than 500 tokens in your initial mint."
        numberOfTooltipLines={5}
        submit={
          !isValid || isLoading || !allFieldsFilled ? null : validateAndCreate
        }
        checkIfIsValid={checkMintAmountValidity}
      />
      <FeeLabel>
        <span>Mint Fee:</span>
        <span>{mintFee.totalFee} XUSDC</span>
      </FeeLabel>

      <Terms>By clicking “Create NFT”: </Terms>
      <span>
        <Terms>
          - You agree to our{' '}
          <TermsLink target="_blank" href="https://proton.org/terms">
            Terms of Service &amp; Privacy Policy.
          </TermsLink>
        </Terms>
      </span>
      <Terms>
        - You declare that everything you have uploaded is original artwork. Any
        plagiarization is not allowed and will be subject to removal.
      </Terms>
      <br />
      {error ? <ErrorMessage>{error}</ErrorMessage> : null}
      <Button
        onClick={isLoading ? null : validateAndCreate}
        disabled={
          !isValid ||
          isLoading ||
          !allFieldsFilled
        }
        padding={isLoading ? '12px 0' : '12px 0'}
      >
        {isLoading ? (
          <Spinner size={20} />
        ) : (
          'Create NFT'
        )}
      </Button>
      <BackButton
        disabled={isLoading}
        onClick={() => {
          resetTemplatePage();
          setPageState(CREATE_PAGE_STATES.CHOOSE_COLLECTION);
        }}>
        Back
      </BackButton>
    </>
  );
};

export default CreateTemplate;
