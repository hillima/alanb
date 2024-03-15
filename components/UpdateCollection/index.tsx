import { useState, useEffect, FC, Dispatch, SetStateAction, FormEventHandler, useRef} from 'react';
import {
  Title,
  SubTitle,
  BackText,
  FieldTitle,
  ErrorMessage,
} from '../CreatePageLayout/CreatePageLayout.styled';
import InputField from '../InputField';
import Spinner from '../Spinner';
import {
  useAuthContext,
  CREATE_PAGE_STATES,
  useModalContext,
  useCreateAssetContext
} from '../Provider';
import { CreateCollectionProps, UpdateCollectionProps } from '../Provider';
import DragDropFileUploadSm from '../DragDropFileUploadSm';
import {
  Form,
  Column,
  HalfButton,
  Description,
} from '../Modal/Modal.styled';
import uploadToIPFS from '../../services/upload';
import { fileReader, delay } from '../../utils';
import ProtonSDK from '../../services/proton';
import { SM_FILE_UPLOAD_TYPES_TEXT } from '../../utils/constants';
import { getFromApi } from '../../utils/browser-fetch';
import { Collection } from '../../services/collections';

const TYPES = {
  CREATE: 'CREATE',
  UPDATE: 'UPDATE',
};

type Props = {
  type: string;
  modalProps: CreateCollectionProps | UpdateCollectionProps;
};

const CollectionModal = ({ type, modalProps }: Props): JSX.Element => {
  const {
    setSelectedCollection,
    setNewCollection,
    setIsUncreatedCollectionSelected,
    selectedCollection
  } = useCreateAssetContext();
  const { currentUser } = useAuthContext();
  const { setModalProps } = useModalContext();
  const uploadInputRef = useRef<HTMLInputElement>();
  const [name, setName] = useState<string>(selectedCollection.collection_name);
  const [description, setDescription] = useState<string>(selectedCollection.data.description);
  const [displayName, setDisplayName] = useState<string>(selectedCollection.name);
  const [uploadError, setUploadError] = useState<string>('');
  const [royalties, setRoyalties] = useState<string>(`${selectedCollection.market_fee * 100}`);
  const [url, setUrl] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [updatedImage, setUpdatedImage] = useState<string>(selectedCollection.data.img);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [isEdit, setEdit] = useState<boolean>(false);
  const author = currentUser ? currentUser.actor : '';
  useEffect(() => {
    setModalProps({
      setNewCollection,
      setSelectedCollection,
      setIsUncreatedCollectionSelected
    });
    
    if (type === TYPES.UPDATE) {
      const {
        collectionName,
        defaultDescription,
        defaultDisplayName,
        defaultRoyalties,
        defaultImage,
      } = modalProps as UpdateCollectionProps;
      setName(collectionName);
      setDescription(defaultDescription);
      setDisplayName(defaultDisplayName);
      setRoyalties((parseFloat(defaultRoyalties) * 100).toString());
      setUpdatedImage(defaultImage);
    }
  }, []);

  useEffect(() => {
    if(selectedCollection.data.url != '' && selectedCollection.data.url != undefined){
      let newArr = selectedCollection.data.url.split('\n');
      const website = newArr[0].substring(newArr[0].indexOf('website:') + 8, newArr[0].length);
      const twitterLink = newArr[1].substring(newArr[0].indexOf('twitter:') + 9, newArr[1].length);
      const telegramLink = newArr[2].substring(newArr[0].indexOf('telegram:') + 10, newArr[2].length);
      const instaLink = newArr[3].substring(newArr[0].indexOf('instagram:') + 11, newArr[3].length);
      
      setUrl(website);
      setTwitter(twitterLink);
      setTelegram(telegramLink);
      setInstagram(instaLink);
    }
  }, [selectedCollection]);
  const updateImage = async (): Promise<string> => {
    if (!uploadedFile) {
      return updatedImage;
    }

    try {
      const ipfsImage = await uploadToIPFS(uploadedFile);
      setUpdatedImage(ipfsImage);
      fileReader((img) => setUpdatedImage(img), uploadedFile);
      return ipfsImage;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const update = async () => {
    try {
      const image = await updateImage();

      let totalUrl = '';
      totalUrl += 'website:' + url +'\n';
      totalUrl += 'twitter:' + twitter + '\n';
      totalUrl += 'telegram:' + telegram + '\n';
      totalUrl += 'instagram:' + instagram + '\n';

      const res = await ProtonSDK.updateCollection({
        author,
        collection_name: name,
        description,
        display_name: displayName,
        image,
        market_fee: (parseInt(royalties) / 100).toFixed(6),
        url: totalUrl
      });

      if (!res.success) {
        throw new Error('Unable to update the collection. Please try again.');
      }else{
        window.location.href = await '/create';
      }
    } catch (err) {
      setFormError('Unable to update the collection. Please try again.');
    }
  };


  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setFormError('');

    const errors = [];

    if (!(uploadedFile || updatedImage) || uploadError) {
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
    await update();
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
      if (!name && type === TYPES.CREATE) {
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
      <div style={{width: '100%', maxWidth: '450px', border: '1px solid #E6E6E6', padding: '31px 38px 36px 38px', borderRadius: '16px'}}>
            <Form onSubmit={isLoading ? null : handleSubmit}>
            {type === TYPES.UPDATE ? (
              <InputField value={name} disabled={true} mb="16px" />
            ) : null}
            <FieldTitle>Collection Name</FieldTitle>
            <InputField
              mt="5px"
              placeholder="Name"
              value={displayName}
              setFormError={setFormError}
              setValue={setDisplayName}
              disabled={!isEdit}
              mb="16px"
            />
            {!isEdit ? null : 
            <>
              <FieldTitle>Description</FieldTitle>
              <InputField
                disabled={!isEdit}  
                mt="5px"
                mb="24px"
                placeholder="Description"
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
              <FieldTitle>Website Link</FieldTitle>
              <InputField
                disabled={!isEdit}
                mt="5px"
                mb="12px"
                placeholder="URL"
                value={url}
                setFormError={setFormError}
                setValue={setUrl}
                checkIfIsValid={(input: string) => {
                  const isValid = input.length === 0 || input.length <= 100;
                  setIsInvalid(!isValid);
                  const errorMessage =
                    'Website Link is required (100 characters or less)';
                  return {
                    isValid,
                    errorMessage,
                  };
                }}
              />
              <FieldTitle>Twitter Link</FieldTitle>
              <InputField
                disabled={!isEdit}
                mt="5px"
                mb="12px"
                placeholder="Twitter URL"
                value={twitter}
                setFormError={setFormError}
                setValue={setTwitter}
                checkIfIsValid={(input: string) => {
                  const isValid = input.length === 0 || input.length <= 100;
                  setIsInvalid(!isValid);
                  const errorMessage =
                    'Twitter Link is required (100 characters or less)';
                  return {
                    isValid,
                    errorMessage,
                  };
                }}
              />
              <FieldTitle>Telegram Link</FieldTitle>
              <InputField
                disabled={!isEdit}
                mt="5px"
                mb="12px"
                placeholder="Telegram URL"
                value={telegram}
                setFormError={setFormError}
                setValue={setTelegram}
                checkIfIsValid={(input: string) => {
                  const isValid = input.length === 0 || input.length <= 100;
                  setIsInvalid(!isValid);
                  const errorMessage =
                    'Telegram Link is required (100 characters or less)';
                  return {
                    isValid,
                    errorMessage,
                  };
                }}
              />
              <FieldTitle>Instagram Link</FieldTitle>
              <InputField
                disabled={!isEdit}
                mt="5px"
                mb="12px"
                placeholder="Instagram URL"
                value={instagram}
                setFormError={setFormError}
                setValue={setInstagram}
                checkIfIsValid={(input: string) => {
                  const isValid = input.length === 0 || input.length <= 100;
                  setIsInvalid(!isValid);
                  const errorMessage =
                    'Instagram Link is required (100 characters or less)';
                  return {
                    isValid,
                    errorMessage,
                  };
                }}
              />
              <FieldTitle>Royalties</FieldTitle>
              <InputField
                disabled={!isEdit}
                mt="5px"
                mb="24px"
                inputType="number"
                min={0}
                max={15}
                step={1}
                value={parseInt(royalties)}
                setFormError={setFormError}
                setValue={setRoyalties}
                placeholder="Royalties"
                tooltip="A percentage of gross revenues derived from the use of an asset sold"
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
              <ErrorMessage>{formError}</ErrorMessage>
              <HalfButton
                fullWidth={true}
                type="submit"
                disabled={isInvalid || formError.length > 0 || isLoading}
                padding={isLoading ? '0 58px' : '11px 16px 13px'}>
                {isLoading ? (
                  <Spinner />
                ) : (
                  `Update Collection`
                )}
              </HalfButton>
            </>
            }
          </Form>
          {!isEdit ?
          <HalfButton
              fullWidth={true}
              onClick={() => setEdit(true)}
              disabled={isInvalid || formError.length > 0 || isLoading}
              padding={isLoading ? '0 58px' : '11px 16px 13px'}>
              {isLoading ? (
                <Spinner />
              ) : (
                `Edit Collection`
              )}
            </HalfButton> : null}
        <div style={{top: '327px', marginLeft: '450px', position: 'absolute', border: '1px solid #E6E6E6', borderRadius: '16px', width: '264px', display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        {uploadedFile == null && updatedImage == null ? 
          <Column style={{paddingTop: '54px'}}>
            <DragDropFileUploadSm
              placeholderImage={updatedImage}
              uploadInputRef={uploadInputRef}
              uploadedFile={uploadedFile}
              setUploadedFile={setUploadedFile}
              setUploadError={setUploadError}
              setFormError={setFormError}
            />
            <Column style={{textAlign: 'center'}}>
              <Description mb="8px">
                Add a collection photo
              </Description>
              <Description mb="8px" style={{color: 'rgba(141, 141, 141, 1)'}}>
                JPG, PNG, GIF
              </Description>
              <ErrorMessage>{uploadError}</ErrorMessage>
            </Column>
          </Column>
            :
            <>
              <img src="/photo1.svg" style={{position: 'absolute', right: '15.3px', top: '21.66px'}} onClick={() => {
                setUploadedFile(null);
                setUpdatedImage(null); 
              }} />
              <img src={updatedImage !== null ? `https://ipfs.com/ipfs/${updatedImage}` :  URL.createObjectURL(uploadedFile)} style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px'}}/>
            </>
          }
          </div>
      </div>
  );
};

export const CreateCollectionModal = (): JSX.Element => {
  const { modalProps } = useModalContext() as {
    modalProps: CreateCollectionProps;
  };
  return <CollectionModal type={TYPES.CREATE} modalProps={modalProps} />;
};

export const UpdateCollectionModal = (): JSX.Element => {
  const { modalProps } = useModalContext() as {
    modalProps: UpdateCollectionProps;
  };
  return <CollectionModal type={TYPES.UPDATE} modalProps={modalProps} />;
};

const UpdateCollection: FC<{
  setPageState: Dispatch<SetStateAction<string>>;
}> = ({ setPageState }) => {
  const {
    selectedCollection
  } = useCreateAssetContext();
  return (
    <>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '50px'}}>
        <img src="/collection-step.svg" style={{margin: '0 auto', width: '380px'}} />
      </div>
      <BackText onClick={() => setPageState(CREATE_PAGE_STATES.CHOOSE_COLLECTION)}><img src="/left.svg" />Back</BackText>
      <Title>Collection: {selectedCollection.data.name}</Title>
      <SubTitle>
        Edit your collection or choose Schema below to mint an NFT!
      </SubTitle>
      <CreateCollectionModal />
    </>
  );
};

export default UpdateCollection;
