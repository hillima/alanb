import { useState, useEffect, FC, Dispatch, SetStateAction, FormEventHandler, useRef} from 'react';
import {
  Title,
  SubTitle,
  BackText,
  FieldTitle,
  ErrorMessage,
  ColText,
  DescText,
  CollectionBox,
  ColInfo,
  AtrText,
  AtrSubText
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
import { DropdownMenu } from '../AssetFormBuy/AssetFormBuy.styled';
import axios from 'axios';

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
  const [url, setUrl] = useState<string>(selectedCollection.data.url || null);
  const [formError, setFormError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [updatedImage, setUpdatedImage] = useState<string>(selectedCollection.data.img);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
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

      const res = await ProtonSDK.updateCollection({
        author,
        collection_name: name,
        description,
        display_name: displayName,
        image,
        market_fee: (parseInt(royalties) / 100).toFixed(6),
        url: url
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
                `Update Collection`
              )}
            </HalfButton>
          </Form>
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
              <img src={updatedImage !== null ?  `https://ipfs.com/ipfs/${updatedImage}` : uploadedFile !== null ? URL.createObjectURL(uploadedFile) : ''} style={{width: '100%', height: '100%', objectFit: 'contain', borderRadius: '16px'}}/>
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

const UpdateSchema: FC<{
  setPageState: Dispatch<SetStateAction<string>>;
}> = ({ setPageState }) => {
  const {
    selectedCollection,
    selectedSchema,
    setSelectedSchemaFormat
  } = useCreateAssetContext();
  const { currentUser } = useAuthContext();
  const author = currentUser ? currentUser.actor : '';
  const [atrName, setAtrName] = useState<any[]>([]);
  const [atrArr, setAtrArr] = useState<string[]>([]);
  const [atrType, setAtrType] = useState<string[]>([]);
  const [fixedType, setFixedType] = useState<{name: string, type: string}[]>([]);

  const save = async () =>{
    let newArr = [];
    atrName.map((name, index) => {
      let newObj = {
        name: name,
        type: atrType[index]
      };
      newArr.push(newObj);
    });
    await ProtonSDK.extendSchema({
      author,
      schema_name: selectedSchema.toLowerCase(),
      collection_name: selectedCollection.collection_name,
      schema_format: newArr
    }).then(res =>{
      if(res.success){
        window.location.reload();
        setPageState(CREATE_PAGE_STATES.SELECT_COLLECTION);
      }
    });
  };

  useEffect(() => {
    axios.get(`https://proton.api.atomicassets.io/atomicassets/v1/schemas?collection_name=${selectedCollection.collection_name}&schema_name=${selectedSchema}`)
    .then(res => {
      let newArr = res.data.data[0].format.slice(5, res.data.data[0].format.length);
      setFixedType(newArr);
      setSelectedSchemaFormat(newArr);
    });
  }, []);
  return (
    <>
      <div style={{width: '100%', display: 'flex', justifyContent: 'center', marginBottom: '50px'}}>
        <img src="/schema-step.svg" style={{margin: '0 auto', width: '380px'}} />
      </div>
      <BackText onClick={() => setPageState(CREATE_PAGE_STATES.CHOOSE_COLLECTION)}><img src="/left.svg" />Back</BackText>
      <Title>Create a schema</Title>
      <SubTitle>Schemas define which kind of attributes the assets will have. You can add attributes later.</SubTitle>
      <div style={{maxWidth: '424px'}}>
      <CollectionBox>
        <img src={`https://ipfs.com/ipfs/${selectedCollection.data.img}`}  style={{width: '80px', height: '80px', borderRadius: '50%'}}  />
        <ColInfo>
          <ColText>Collection: {selectedCollection.data.name}</ColText>
          <DescText>{selectedCollection.data.description}</DescText>
        </ColInfo>
      </CollectionBox>
      <FieldTitle>Schema Name</FieldTitle>
      <div style={{display: 'flex'}}>
        <InputField
          mt="10px"
          mb="12px"
          value={selectedSchema}
          disabled
        />
      </div>
      <div>
        <div style={{display: 'flex', justifyContent:'space-between', marginTop: '37px'}}>
          <AtrText>Attribute Name</AtrText>
          <AtrText>Attribute Type</AtrText>
        </div>
        <div style={{marginBottom: '50px'}}>
          <AtrSubText>Custom Attributes (Mutable)</AtrSubText>
          {fixedType.length <= 0 ? null : 
            fixedType.map((it, index) => (
              <div style={{display: 'flex'}} key={index}>
                <InputField
                  mt="10px"
                  mb="12px"
                  mr="21px"
                  value={it.name}
                  key={index}
                  disabled
                />
                <DropdownMenu
                    style={{marginTop: '12px', cursor:'default'}}
                    name="Attribute Type"
                    value={it.type}
                    disabled>
                    <option key="blank" value="" disabled>Attribute Type</option>
                    <option key={"0"} value={"string"}>
                      Text (String)
                    </option>
                    <option key={"1"} value={"int64"}>
                      Number (int64)
                    </option>
                    <option key={"2"} value={"float"}>
                      Decimal (fixed32)
                    </option>
                    <option key={"3"} value={"ipfs"}>
                      IPFS Hash (Link to extra model)
                    </option>
                    <option key={"4"} value={"bool"}>
                      Boolean (True or False)
                    </option>
                </DropdownMenu>
              </div>
              ))}
          {atrArr.length === 0 ? null : 
          atrArr.map((it, index) => (
            <div style={{display: 'flex'}} key={index}>
              <img onClick={() => {
                let newArr = atrArr;
                let newName = atrName;
                let newType = atrType;

                newArr.splice(index, 1);
                newName.splice(index, 1);
                newType.splice(index, 1);
                
                setAtrArr([...newArr]);
                setAtrName([...newName]);
                return setAtrType([...newType]);
              }} src="/rem.svg" style={{cursor: 'pointer', position: 'absolute', marginTop: '22px', marginLeft: '-35px'}}/>
              <InputField
                mt="10px"
                mb="12px"
                mr="21px"
                placeholder="New Attribute Name"
                value={atrName[index]}
                key={index}
                setValue={(value) => {
                  let newArr = atrName;
                  newArr[index] = value;
                  return setAtrName([...newArr]);
                }}
              />
              <DropdownMenu
                  style={{marginTop: '12px'}}
                  name="Attribute Type"
                  value={atrType[index]}
                  onChange={(e) => {
                    let newArr = atrType;
                    newArr[index] = e.target.value;
                    return setAtrType([...newArr]);
                  }}>
                  <option key="blank" value="" disabled>Attribute Type</option>
                  <option key={"0"} value={"string"}>
                    Text (String)
                  </option>
                  <option key={"1"} value={"int64"}>
                    Number (int64)
                  </option>
                  <option key={"2"} value={"float"}>
                    Decimal (fixed32)
                  </option>
                  <option key={"3"} value={"ipfs"}>
                    IPFS Hash (Link to extra model)
                  </option>
                  <option key={"4"} value={"bool"}>
                    Boolean (True or False)
                  </option>
              </DropdownMenu>
            </div>
            ))}
          <HalfButton style={{marginTop: '20px'}} onClick={() => {
             if(atrArr.length === 0){
              setAtrName(['']);
              setAtrType(['']);
              return setAtrArr(['']);
            }else{
              setAtrName([...atrName, '']);
              setAtrType([...atrType, '']);
              return setAtrArr([...atrArr, '']);
            }
          }}>Add New Attribute +</HalfButton>
        </div>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <HalfButton onClick={save}>Extend Schema</HalfButton>
          <HalfButton style={{fontSize: '16px'}} onClick={() => setPageState(CREATE_PAGE_STATES.CREATE_TEMPLATE)}>Create NFT <img style={{marginLeft: '5px', width: '28px', height: '28px'}} src="/rocket.svg" /></HalfButton>
        </div>
      </div>
      </div>
    </>
  );
};

export default UpdateSchema;
