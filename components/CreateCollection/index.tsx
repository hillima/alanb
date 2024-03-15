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
  const { currentUser } = useAuthContext();
  const { setModalProps } = useModalContext();
  const uploadInputRef = useRef<HTMLInputElement>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [royalties, setRoyalties] = useState<string>('');
  const [url, setUrl] = useState<string>('');
  const [twitter, setTwitter] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [updatedImage, setUpdatedImage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const author = currentUser ? currentUser.actor : '';
  const {
    setSelectedCollection,
    setNewCollection,
    setIsUncreatedCollectionSelected,
  } = useCreateAssetContext();

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

  const create = async () => {
    const {
      setSelectedCollection,
      setIsUncreatedCollectionSelected,
    } = modalProps as CreateCollectionProps;
    try {
      const ipfsImage = await uploadToIPFS(uploadedFile);
      fileReader((img) => {
        setSelectedCollection({
          collection_name: name,
          name: displayName,
          img,
        });
      }, uploadedFile);
      
      let totalUrl = '';
      totalUrl += 'website:' + url +'\n';
      totalUrl += 'twitter:' + twitter + '\n';
      totalUrl += 'telegram:' + telegram + '\n';
      totalUrl += 'instagram:' + instagram + '\n';

      await ProtonSDK.createCol({
        author: author,
        collection_name: name,
        collection_display_name: displayName,
        collection_image: ipfsImage,
        collection_description: description,
        collection_market_fee: (
          parseInt(royalties) / 100
        ).toFixed(6),
        collection_url: totalUrl
      });

      await setIsUncreatedCollectionSelected(true);
      window.location.href = '/create';
    } catch (err) {
      setFormError('Unable to upload the collection image. Please try again.');
    }
  };

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

      const {
        defaultRoyalties,
        fetchPageData,
      } = modalProps as UpdateCollectionProps;

      const hasUpdatedRoytalies =
        parseFloat(defaultRoyalties) !== parseInt(royalties) / 100;
      let totalUrl = '';
      if(url !== ''){
        totalUrl += 'website:' + url +'\n';
      }
      if(twitter !== ''){
        totalUrl += 'twitter:' + twitter + '\n';
      }
      if(telegram !== ''){
        totalUrl += 'telegram:' + telegram + '\n';
      }
      if(instagram !== ''){
        totalUrl += 'instagram:' + instagram + '\n';
      }

      const res = await ProtonSDK.updateCollection({
        author,
        collection_name: name,
        description,
        display_name: displayName,
        image,
        url,
        market_fee: hasUpdatedRoytalies
          ? (parseInt(royalties) / 100).toFixed(6)
          : '',
      });

      if (!res.success) {
        throw new Error('Unable to update the collection. Please try again.');
      }

      await delay(1000); // 1 second delay to give blockchain time to update before refetching page data
      await fetchPageData();
    } catch (err) {
      setFormError('Unable to update the collection. Please try again.');
    }
  };

  const formActions = {
    [TYPES.CREATE]: create,
    [TYPES.UPDATE]: update,
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
    await formActions[type]();
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
      <div style={{border: '1px solid #E6E6E6', padding: '31px 38px 36px 38px', borderRadius: '16px'}}>
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
              mb="16px"
            />
            <FieldTitle>Description</FieldTitle>
            <InputField
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
              mt="5px"
              mb="12px"
              placeholder="Website URL"
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
              mt="5px"
              mb="24px"
              inputType="number"
              min={0}
              max={15}
              step={1}
              value={royalties}
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
                `${type === TYPES.UPDATE ? 'Update' : 'Create'} Collection`
              )}
            </HalfButton>
          </Form>
        <div style={{top: '264px', marginLeft: '450px', position: 'absolute', border: '1px solid #E6E6E6', borderRadius: '16px', width: '264px', display: 'flex',justifyContent: 'center',alignItems: 'center'}}>
        {uploadedFile == null ? 
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
              <img src="/photo1.svg" style={{position: 'absolute', right: '15.3px', top: '21.66px'}} onClick={() => setUploadedFile(null)} />
              <img src={URL.createObjectURL(uploadedFile)} style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px'}}/>
            </>
          }
          </div>
      </div>
  );
};

export const CreateCollectionModal = (): JSX.Element => {
  const { modalProps } = useModalContext() as any;
  return <CollectionModal type={TYPES.CREATE} modalProps={modalProps} />;
};

export const UpdateCollectionModal = (): JSX.Element => {
  const { modalProps } = useModalContext() as {
    modalProps: UpdateCollectionProps;
  };
  return <CollectionModal type={TYPES.UPDATE} modalProps={modalProps} />;
};

const CreateCollection: FC<{
  setPageState: Dispatch<SetStateAction<string>>;
}> = ({ setPageState }) => {
  return (
    <div style={{maxWidth: '450px'}}>
      <BackText onClick={() => setPageState(CREATE_PAGE_STATES.CHOOSE_COLLECTION)}><img src="/left.svg" />Back</BackText>
      <Title>Create New Collection</Title>
      <SubTitle>
        Create a new collection first, then create schema and NFTs!
      </SubTitle>
      <CreateCollectionModal />
    </div>
  );
};

export default CreateCollection;
