import { useState, useEffect, FC, Dispatch, SetStateAction, useRef, FormEventHandler } from 'react';
import {
  Title,
  SubTitle,
  ErrorMessage,
  CommonStepBox,
  CommonList,
  CommonListTab,
  CommonStepText,
  CommonStepRed,
  CommonTitle,
  RowBetween,
  CommonSubTitle,
  DragWrap,
  DragBannerWrap
} from './ApplyListingCommon.styled';
import InputField from '../InputField';
import Spinner from '../Spinner';
import {
  useAuthContext,
  CreateCollectionProps,
  useModalContext,
} from '../Provider';
import { useWindowSize } from '../../hooks';
import uploadToIPFS from '../../services/upload';
import { fileReader } from '../../utils';
import { getFromApi } from '../../utils/browser-fetch';
import { SM_FILE_UPLOAD_TYPES_TEXT } from '../../utils/constants';
import { Collection } from '../../services/collections';
import { Column, Description, DragDropButton, Form, HalfButton, Row } from '../Modal/Modal.styled';
import DragDropFileUploadSm from '../DragDropFileUploadSm';
import DragDropFileUploadApply from '../DragDropFileUploadApply';


const ApplyListingStepTwo: FC<{
  setPageState: Dispatch<SetStateAction<string>>;
  setNewCollection: any;
  newCollection: any;
}> = ({ setPageState, setNewCollection, newCollection }) => {
  const { isMobile } = useWindowSize();
  const uploadInputRef = useRef<HTMLInputElement>();
  const uploadBannerInputRef = useRef<HTMLInputElement>();
  const [name, setName] = useState<string>(!newCollection ? '' : newCollection['collection_name']);
  const [description, setDescription] = useState<string>(!newCollection ? '' : newCollection['description']);
  const [displayName, setDisplayName] = useState<string>(!newCollection ? '' : newCollection['name']);
  const [uploadError, setUploadError] = useState<string>('');
  const [uploadBannerError, setUploadBannerError] = useState<string>('');
  const [royalties, setRoyalties] = useState<string>(!newCollection ? '' : newCollection['royalties']);
  const [formError, setFormError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [updatedImage, setUpdatedImage] = useState<string>(!newCollection ? '' : newCollection['img']);
  const [uploadedBannerFile, setUploadedBannerFile] = useState<File | null>();
  const [updatedBannerImage, setUpdatedBannerImage] = useState<string>(!newCollection ? '' : newCollection['banner']);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);

  const create = async () => {
    try {
      const ipfsImage = await uploadToIPFS(uploadedFile);
      const ipfsBannerImage = await uploadToIPFS(uploadedBannerFile);

      setNewCollection({
        collection_name: name,
        name: displayName,
        img: ipfsImage,
        description: description,
        royalties,
        url: '',
        banner: ipfsBannerImage
      });
      setPageState('three');
    } catch (err) {
      setFormError('Unable to upload the collection image. Please try again.');
    }
  };
  

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormError('');

    const errors = [];

    if (uploadError) {
      errors.push(`upload a ${SM_FILE_UPLOAD_TYPES_TEXT}`);
    }

    if (uploadBannerError) {
      errors.push(`upload a ${SM_FILE_UPLOAD_TYPES_TEXT}`);
    }

    if (!displayName) {
      errors.push('set a collection name');
    }

    if (!description) {
      errors.push('set a description');
    }

    if (!royalties) {
      errors.push('set royalties');
    }

    if (errors.length === 1) {
      setFormError(`Please ${errors[0]}.`);
      return;
    }

    if (errors.length === 2) {
      setFormError(`Please ${errors[0]} and ${errors[1]}.`);
      return;
    }

    if (errors.length > 2) {
      const lastErrorIndex = errors.length - 1;
      let errorMessage = `Please ${errors[0]}`;

      for (let i = 1; i < errors.length; i++) {
        if (i === lastErrorIndex) {
          errorMessage += `, and ${errors[i]}.`;
          break;
        }
        errorMessage += `, ${errors[i]}`;
      }
      setFormError(errorMessage);
      return;
    }

    setIsLoading(true);
    await create();
    setIsLoading(false);
  };


  const createCollectionName = () => {
    const collectionName = [];
    const characters = '12345';
    const charactersLength = characters.length;
    for (let i = 0; i < 12; i++) {
      collectionName.push(
        characters.charAt(Math.floor(Math.random() * charactersLength))
      );
    }
    return collectionName.join('');
  };

  useEffect(() => {
    (async () => {
      if (!name) {
        let isUnique = false;

        while (!isUnique) {
          const collectionName = createCollectionName();
          try {
            const result = await getFromApi<Collection>(
              `${process.env.NEXT_PUBLIC_NFT_ENDPOINT}/atomicassets/v1/collections/${collectionName}`
            );
            if (!result.success) {
              setName(collectionName);
              isUnique = true;
            }
          } catch (e) {
            throw new Error(e);
          }
        }
      }
    })();
  }, []);


  return (
    <div style={{ padding: '40px 20px' }}> 
      <div>
      <Title>Introduction</Title>
      <SubTitle><CommonStepRed>*</CommonStepRed>Required fields</SubTitle>
      <CommonStepBox>
        <CommonList>
            <CommonListTab isActive={false}>Introduction</CommonListTab>
            <CommonListTab isActive={true}>Collection</CommonListTab>
            <CommonListTab isActive={false}>Socials</CommonListTab>
        </CommonList>
        <CommonStepText>Step 2 of 3</CommonStepText>
      </CommonStepBox>
      <>
        <Form onSubmit={isLoading ? null : handleSubmit} style={{height: 'auto', overflow: 'unset'}}>
          <CommonTitle>Collection name<CommonStepRed>*</CommonStepRed></CommonTitle>
          <InputField
            placeholder="Collection Name"
            value={displayName}
            setFormError={setFormError}
            setValue={setDisplayName}
            mb="40px"
            mt="15px"
          />
          <CommonTitle>Collection description<CommonStepRed>*</CommonStepRed></CommonTitle>
          <InputField
            placeholder="Description"
            mb="40px"
            mt="15px"
            value={description}
            setFormError={setFormError}
            setValue={setDescription}
            checkIfIsValid={(input: string) => {
              const isValid = input.length === 0 || input.length <= 1000;
              setIsInvalid(!isValid);
              const errorMessage =
                'Description is required (1000 characters or less)';
              return {
                isValid,
                errorMessage,
              };
            }}
          />
          <CommonTitle>Collection Royalties<CommonStepRed>*</CommonStepRed></CommonTitle>
          <InputField
            mb="40px"
            mt="15px"
            inputType="number"
            min={0}
            max={15}
            step={1}
            value={royalties}
            setFormError={setFormError}
            setValue={setRoyalties}
            placeholder="Royalties"
            numberOfTooltipLines={3}
            checkIfIsValid={(input) => {
              const numberInput = parseFloat(input as string);
              const isValid =
                !isNaN(numberInput) && numberInput >= 0 && numberInput <= 15;
              setIsInvalid(!isValid);
              const errorMessage = 'Royalties must be between 0% and 15%';
              return {
                isValid,
                errorMessage,
              };
            }}
          />
          <CommonTitle>Collection Thumbnail Image (400x400) <CommonStepRed>*</CommonStepRed></CommonTitle>
          <CommonSubTitle>File types supported: JPG, PNG, GIF. Max size: 5MB</CommonSubTitle>
          <DragWrap>
            <DragDropFileUploadApply
              placeholderImage={updatedImage}
              uploadInputRef={uploadInputRef}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              setUploadError={setUploadError}
              setFormError={setFormError}
            />
          </DragWrap>
          <CommonTitle>Collection banner Image (2000x700) <CommonStepRed>*</CommonStepRed></CommonTitle>
          <CommonSubTitle>File types supported: JPG, PNG, GIF. Max size: 10MB</CommonSubTitle>
          <DragBannerWrap>
            <DragDropFileUploadApply
              placeholderImage={updatedBannerImage}
              uploadInputRef={uploadBannerInputRef}
              uploadedFile={uploadedBannerFile}
              setUploadedFile={setUploadedBannerFile}
              setUploadError={setUploadBannerError}
              setFormError={setFormError}
            />
          </DragBannerWrap>
        <RowBetween>
          <HalfButton
              fullWidth={isMobile}
              onClick={() => setPageState('one')}
              style={{background: '#052251'}}
              padding={isLoading ? '11px 58px' : '11px 16px 13px'}>
              {isLoading ? (
                <Spinner size={22} />
              ) : (
                `Previous Step`
              )}
          </HalfButton>
          <HalfButton
            fullWidth={isMobile}
            type="submit"
            disabled={isInvalid || formError.length > 0 || isLoading}
            padding={isLoading ? '11px 58px' : '11px 16px 13px'}>
            {isLoading ? (
              <Spinner size={22} />
            ) : (
              `Next Step`
            )}
          </HalfButton>
        </RowBetween>
        </Form>
      </>
      </div>
    </div>
  );
};

export default ApplyListingStepTwo;
