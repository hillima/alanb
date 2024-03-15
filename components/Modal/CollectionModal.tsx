import {
  FormEventHandler,
  MouseEvent,
  useState,
  useRef,
  useEffect,
} from 'react';
import { useAuthContext, useModalContext } from '../Provider';
import { CreateCollectionProps, UpdateCollectionProps } from '../Provider';
import DragDropFileUploadSm from '../DragDropFileUploadSm';
import InputField from '../InputField';
import Spinner from '../Spinner';
import {
  Background,
  ModalBox,
  Section,
  CloseIconContainer,
  Title,
  Form,
  Row,
  Column,
  HalfButton,
  DragDropButton,
  Description,
  ErrorMessage,
} from './Modal.styled';
import { useWindowSize } from '../../hooks';
import uploadToIPFS from '../../services/upload';
import { fileReader, delay } from '../../utils';
import { SM_FILE_UPLOAD_TYPES_TEXT } from '../../utils/constants';
import { getFromApi } from '../../utils/browser-fetch';
import { Collection } from '../../services/collections';
import Image from 'next/image';
import Select from 'react-select'
import proton from '../../services/proton';
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
  const { currentUser } = useAuthContext();
  const { isMobile } = useWindowSize();
  const { closeModal } = useModalContext();
  const uploadInputRef = useRef<HTMLInputElement>();
  const uploadBannerInputRef = useRef<HTMLInputElement>();
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [displayName, setDisplayName] = useState<string>('');
  const [uploadError, setUploadError] = useState<string>('');
  const [royalties, setRoyalties] = useState<string>('');
  const [formError, setFormError] = useState<string>('');
  const [uploadedFile, setUploadedFile] = useState<File | null>();
  const [updatedImage, setUpdatedImage] = useState<string>();
  const [uploadedBannerFile, setUploadedBannerFile] = useState<File | null>();
  const [updatedBannerImage, setUpdatedBannerImage] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [twitter, setTwitter] = useState<string>('');
  const [telegram, setTelegram] = useState<string>('');
  const [instagram, setInstagram] = useState<string>('');
  const [discord, setDiscord] = useState<string>('');
  const [youtube, setYoutube] = useState<string>('');
  const [website, setWebsite] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('');
  const [tiktok, setTikTok] = useState<string>('');
  const [snipcoins, setSnip] = useState<string>('');
  const [value, setValue] = useState<any>([]);
  const selectValue = [{
    value: 'website', label: 'website'
  }, {
    value: 'twitter', label: 'twitter'
  }, {
    value: 'telegram', label: 'telegram'
  }, {
    value: 'instagram', label: 'instagram'
  }, {
    value: 'discord', label: 'discord'
  }, {
    value: 'youtube', label: 'youtube'
  }, {
    value: 'linkedIn', label: 'linkedIn'
  }, {
    value: 'tiktok', label: 'tiktok'
  }, {
    value: 'snipcoins', label: 'snipcoins'
  }];
  useEffect(() => {
    if (type === TYPES.UPDATE) {
      const {
        collectionName,
        defaultDescription,
        defaultDisplayName,
        defaultRoyalties,
        defaultImage,
        defaultUrl,
        defaultBannerImage
      } = modalProps as UpdateCollectionProps;
      setName(collectionName);
      setDescription(defaultDescription);
      setDisplayName(defaultDisplayName);
      setRoyalties((parseFloat(defaultRoyalties) * 100).toString());
      setUpdatedImage(defaultImage);
      setUpdatedBannerImage(defaultBannerImage);
      if(defaultUrl != undefined){
        let newArr = defaultUrl.split('\n');
        let value = [];
        if(5 < newArr.length){
          const index = newArr[5].indexOf('youtube_video_link:');
          if(-1 < index){
            newArr.splice(5, 1);
          }
        }
        if(0 < newArr.length){
          const website = newArr[0].substring(newArr[0].indexOf('website:') + 8, newArr[0].length);
          if(website != ''){
            value.push({value: 'website', label: 'website'});
            setWebsite(website);
          }
          if(1 < newArr.length){
            const twitterLink = newArr[1].substring(newArr[0].indexOf('twitter:') + 9, newArr[1].length);
            if(twitterLink != ''){
              value.push({value: 'twitter', label: 'twitter'});
              setTwitter(twitterLink);
            }
            if(2 < newArr.length){
              const telegramLink = newArr[2].substring(newArr[0].indexOf('telegram:') + 10, newArr[2].length);
              if(telegramLink != ''){
                value.push({value: 'telegram', label: 'telegram'});
                setTelegram(telegramLink);
              }
              if(3 < newArr.length){
                const instaLink = newArr[3].substring(newArr[0].indexOf('instagram:') + 11, newArr[3].length);
                if(instaLink != ''){
                  value.push({value: 'instagram', label: 'instagram'});
                  setInstagram(instaLink);
                }
                if(4 < newArr.length){
                  const youtubeLink = newArr[4].substring(newArr[0].indexOf('youtube:') + 9, newArr[4].length);
                  if(youtubeLink != ''){
                    value.push({value: 'youtube', label: 'youtube'});
                    setYoutube(youtubeLink);
                  }
                  if(5 < newArr.length){
                    const discordLink = newArr[5].substring(newArr[0].indexOf('discord:') + 9, newArr[5].length);
                    if(discordLink != ''){
                      value.push({value: 'discord', label: 'discord'});
                      setDiscord(discordLink);
                    }
                    if(6 < newArr.length){
                      const linkedLink = newArr[6].substring(newArr[0].indexOf('linkedIn:') + 10, newArr[6].length);
                      if(linkedLink != ''){
                        value.push({value: 'linkedIn', label: 'linkedIn'});
                        setLinkedIn(linkedLink)
                      } 
                      if(7 < newArr.length){
                        const tikTokLink = newArr[7].substring(newArr[0].indexOf('tikTok:') + 8, newArr[7].length);
                        if(tikTokLink != ''){
                          value.push({value: 'tiktok', label: 'tiktok'});
                          setTikTok(tikTokLink);
                        }
                        if(8 < newArr.length){
                          const snipLink = newArr[8].substring(newArr[0].indexOf('snipcoins:') + 11, newArr[8].length);
                          if(snipLink != ''){
                            value.push({value: 'snipcoins', label: 'snipcoins'});
                            setSnip(snipLink);
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
        setValue([...value]);
      }
    }
  }, []);

  const create = async () => {
    const {
      setNewCollection,
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
      totalUrl += 'website:' + website +'\n';
      totalUrl += 'twitter:' + twitter + '\n';
      totalUrl += 'telegram:' + telegram + '\n';
      totalUrl += 'instagram:' + instagram + '\n';
      totalUrl += 'youtube:' + youtube + '\n';
      totalUrl += 'discord:' + discord + '\n';
      totalUrl += 'linkedIn:' + linkedIn + '\n';
      totalUrl += 'tikTok:' + tiktok + '\n';
      totalUrl += 'snipcoins:' + snipcoins + '\n';

      setNewCollection({
        collection_name: name,
        name: displayName,
        img: ipfsImage,
        description: description,
        royalties,
        url: totalUrl
      });

      setIsUncreatedCollectionSelected(true);
      closeModal();
    } catch (err) {
      setFormError('Unable to upload the collection image. Please try again.');
    }
  };

  const update = async () => {
    try {
      const image = await updateImage();
      const banner = await updateBannerImage();

      let totalUrl = '';
      totalUrl += 'website:' + website +'\n';
      totalUrl += 'twitter:' + twitter + '\n';
      totalUrl += 'telegram:' + telegram + '\n';
      totalUrl += 'instagram:' + instagram + '\n';
      totalUrl += 'youtube:' + youtube + '\n';
      totalUrl += 'discord:' + discord + '\n';
      totalUrl += 'linkedIn:' + linkedIn + '\n';
      totalUrl += 'tikTok:' + tiktok + '\n';
      totalUrl += 'snipcoins:' + snipcoins + '\n';

      const {
        defaultRoyalties,
        fetchPageData,
      } = modalProps as UpdateCollectionProps;

      const hasUpdatedRoytalies =
        parseFloat(defaultRoyalties) !== parseInt(royalties) / 100;

      const res = await proton.updateCollection({
        author: currentUser.actor,
        collection_name: name,
        description,
        display_name: displayName,
        image,
        url: totalUrl,
        market_fee: hasUpdatedRoytalies
          ? (parseInt(royalties) / 100).toFixed(6)
          : '',
      })
      if(res.success){
        await axios.post(`/api/data/banner`, {
          data: {
            name: name,
            ipfs: banner
          }
        })
        .then(res => {
          if(res.status == 200){
            window.location.reload();
          }
        })
      }

      if (!res.success) {
        throw new Error('Unable to update the collection. Please try again.');
      }

      await delay(1000); // 1 second delay to give blockchain time to update before refetching page data
      closeModal();
      await fetchPageData();
    } catch (err) {
      setFormError('Unable to update the collection. Please try again.');
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

  const updateBannerImage = async (): Promise<string> => {
    if (!uploadedBannerFile) {
      return updatedBannerImage;
    }

    try {
      const ipfsImage = await uploadToIPFS(uploadedBannerFile);
      setUpdatedImage(ipfsImage);
      fileReader((img) => setUpdatedImage(img), uploadedBannerFile);
      return ipfsImage;
    } catch (err) {
      throw new Error(err.message);
    }
  };

  const formActions = {
    [TYPES.CREATE]: create,
    [TYPES.UPDATE]: update
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

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const openUploadWindow = () => {
    if (uploadInputRef && uploadInputRef.current) {
      uploadInputRef.current.click();
    }
  };

  const openUploadBannerWindow = () => {
    if (uploadBannerInputRef && uploadBannerInputRef.current) {
      uploadBannerInputRef.current.click();
    }
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
    <Background onClick={handleBackgroundClick}>
      <ModalBox>
        <Section>
          <Title>{type === TYPES.UPDATE ? 'Update' : 'New'} collection</Title>
          <CloseIconContainer role="button" onClick={closeModal}>
            <Image src="/new/close-icon.svg" width={16} height={16} />
          </CloseIconContainer>
        </Section>
        <Row>
          <DragDropFileUploadSm
            placeholderImage={updatedImage}
            uploadInputRef={uploadInputRef}
            uploadedFile={uploadedFile}
            setUploadedFile={setUploadedFile}
            setUploadError={setUploadError}
            setFormError={setFormError}
          />
          <Column>
            <Description mb="8px">
              We recommend a collection image of at least 400x400. Gifs work
              too.
            </Description>
            <DragDropButton onClick={openUploadWindow}>
              Choose file
            </DragDropButton>
            <ErrorMessage>{uploadError}</ErrorMessage>
          </Column>
        </Row>
        {type === TYPES.UPDATE ? <Row>
          <DragDropFileUploadSm
            placeholderImage={updatedBannerImage}
            uploadInputRef={uploadBannerInputRef}
            uploadedFile={uploadedBannerFile}
            setUploadedFile={setUploadedBannerFile}
            setUploadError={setUploadError}
            setFormError={setFormError}
          />
          <Column>
            <Description mb="8px">
              We recommend a collection banner image of at least 2000x700
            </Description>
            <DragDropButton onClick={openUploadBannerWindow}>
              Choose file
            </DragDropButton>
            <ErrorMessage>{uploadError}</ErrorMessage>
          </Column>
        </Row> : null}
        <Form onSubmit={isLoading ? null : handleSubmit}>
          {type === TYPES.UPDATE ? (
            <InputField value={name} disabled={true} mb="16px" />
          ) : null}
          <Select 
          options={selectValue} isMulti 
          classNamePrefix='react-select' placeholder="Add Social Links" 
          isClearable value={value} onChange={(e) => setValue(e)}
          />
          {0 < value.length ? value.map((val) => (
            val['label'] == 'website' ? 
            <InputField
              placeholder="Website Link"
              value={website}
              setFormError={setFormError}
              setValue={setWebsite}
              mt="16px"
            /> : 
            val['label'] == 'telegram' ? 
            <InputField
              placeholder="Telegram Link"
              value={telegram}
              setFormError={setFormError}
              setValue={setTelegram}
              mt="16px"
            /> :
            val['label'] == 'instagram' ? 
            <InputField
              placeholder="Instagram Link"
              value={instagram}
              setFormError={setFormError}
              setValue={setInstagram}
              mt="16px"
            /> :
            val['label'] == 'twitter' ? 
            <InputField
              placeholder="Twitter Link"
              value={twitter}
              setFormError={setFormError}
              setValue={setTwitter}
              mt="16px"
            /> :
            val['label'] == 'youtube' ? 
            <InputField
              placeholder="Youtube Link"
              value={youtube}
              setFormError={setFormError}
              setValue={setYoutube}
              mt="16px"
            /> :
            val['label'] == 'discord' ? 
            <InputField
              placeholder="Discord Link"
              value={discord}
              setFormError={setFormError}
              setValue={setDiscord}
              mt="16px"
            /> :
            val['label'] == 'linkedIn' ? 
            <InputField
              placeholder="LinkedIn Link"
              value={linkedIn}
              setFormError={setFormError}
              setValue={setLinkedIn}
              mt="16px"
            /> :
            val['label'] == 'tikTok' ? 
            <InputField
              placeholder="TikTok Link"
              value={tiktok}
              setFormError={setFormError}
              setValue={setTikTok}
              mt="16px"
            /> :
            val['label'] == 'snipcoins' ? 
            <InputField
              placeholder="Snipcoins Link"
              value={snipcoins}
              setFormError={setFormError}
              setValue={setSnip}
              mt="16px"
            /> 
            : null
            )) : null}
          <InputField
            placeholder="Collection Name"
            value={displayName}
            setFormError={setFormError}
            setValue={setDisplayName}
            mb="16px"
            mt="16px"
          />
          <InputField
            placeholder="Description"
            mb="16px"
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
          <InputField
            mb="16px"
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
          <ErrorMessage>{formError}</ErrorMessage>
          <HalfButton
            fullWidth={isMobile}
            type="submit"
            disabled={isInvalid || formError.length > 0 || isLoading}
            padding={isLoading ? '11px 58px' : '11px 16px 13px'}>
            {isLoading ? (
              <Spinner size={22} />
            ) : (
              `${type === TYPES.UPDATE ? 'Update' : 'Create'} Collection`
            )}
          </HalfButton>
        </Form>
      </ModalBox>
    </Background>
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
