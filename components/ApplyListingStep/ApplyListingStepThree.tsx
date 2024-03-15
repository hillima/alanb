import { useState, FC, Dispatch, SetStateAction, FormEventHandler } from 'react';
import {
  Title,
  SubTitle,
  CommonStepBox,
  CommonList,
  CommonListTab,
  CommonStepText,
  RowBetween
} from './ApplyListingCommon.styled';
import Select from 'react-select'
import InputField from '../InputField';
import Spinner from '../Spinner';
import { useWindowSize } from '../../hooks';
import { Form, HalfButton } from '../Modal/Modal.styled';
import proton from '../../services/proton';
import { useAuthContext } from '../Provider';
import axios from 'axios';


const ApplyListingStepThree: FC<{
  setPageState: Dispatch<SetStateAction<string>>;
  newCollection: any;
  answers: any;
  contacts: any;
  sites: any;
  proofs: any;
}> = ({ setPageState, newCollection, answers, contacts, sites, proofs }) => {
  const { currentUser } = useAuthContext(); 
  const { isMobile } = useWindowSize();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isInvalid, setIsInvalid] = useState<boolean>(false);
  const [twitter, setTwitter] = useState<string>('https://twitter.com/');
  const [telegram, setTelegram] = useState<string>('https://t.me/');
  const [instagram, setInstagram] = useState<string>('https://www.instagram.com/');
  const [discord, setDiscord] = useState<string>('https://discord.gg/');
  const [youtube, setYoutube] = useState<string>('https://www.youtube.com/');
  const [website, setWebsite] = useState<string>('');
  const [linkedIn, setLinkedIn] = useState<string>('https://www.linkedin.com/in/');
  const [tiktok, setTikTok] = useState<string>('https://www.tiktok.com/');
  const [snipcoins, setSnip] = useState<string>('https://snipcoins.com/');
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

  const create = async () => {

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
      await proton.createCol({
        author: currentUser.actor,
        collection_name: newCollection['collection_name'],
        collection_description: newCollection['description'],
        collection_display_name: newCollection['name'],
        collection_image: newCollection['img'],
        collection_market_fee: (
          parseInt(newCollection.royalties) / 100
        ).toFixed(6),
        collection_url: totalUrl
      })
      .then(res => {
        if(res.success){
          axios.post(`/api/data/apply`, {
            data: {
              answer: answers,
              contacts: contacts,
              sites: sites,
              proofs: proofs,
              colname: newCollection['collection_name'],
              coldesc: newCollection['description'],
              royalties: newCollection.royalties,
              rating: answers[2],
              name: newCollection['name'],
              state: 'apply',
              author: currentUser.actor,
              img: newCollection['img'],
              banner: newCollection['banner']
            }
          })
          .then(rev => {
            if(rev.status == 200){
              window.location.href = '/apply/list';
            }
          })
        }
      })
  };
  

  const handleSubmit: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    await create();
    setIsLoading(false);
  };

  return (
    <div style={{ padding: '40px 20px' }}> 
      <div>
      <Title>Introduction</Title>
      <SubTitle><span style={{color: '#FF102D'}}>*</span>Required fields</SubTitle>
      <CommonStepBox>
        <CommonList>
            <CommonListTab isActive={false}>Introduction</CommonListTab>
            <CommonListTab isActive={false}>Collection</CommonListTab>
            <CommonListTab isActive={true}>Socials</CommonListTab>
        </CommonList>
        <CommonStepText>Step 3 of 3</CommonStepText>
      </CommonStepBox>
      <>
        <Form onSubmit={isLoading ? null : handleSubmit}>
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
              setValue={setWebsite}
              mt="16px"
            /> : 
            val['label'] == 'telegram' ? 
            <InputField
              placeholder="Telegram Link"
              value={telegram}
              setValue={setTelegram}
              mt="16px"
            /> :
            val['label'] == 'instagram' ? 
            <InputField
              placeholder="Instagram Link"
              value={instagram}
              setValue={setInstagram}
              mt="16px"
            /> :
            val['label'] == 'twitter' ? 
            <InputField
              placeholder="Twitter Link"
              value={twitter}
              setValue={setTwitter}
              mt="16px"
            /> :
            val['label'] == 'youtube' ? 
            <InputField
              placeholder="Youtube Link"
              value={youtube}
              setValue={setYoutube}
              mt="16px"
            /> :
            val['label'] == 'discord' ? 
            <InputField
              placeholder="Discord Link"
              value={discord}
              setValue={setDiscord}
              mt="16px"
            /> :
            val['label'] == 'linkedIn' ? 
            <InputField
              placeholder="LinkedIn Link"
              value={linkedIn}
              setValue={setLinkedIn}
              mt="16px"
            /> :
            val['label'] == 'tiktok' ? 
            <InputField
              placeholder="TikTok Link"
              value={tiktok}
              setValue={setTikTok}
              mt="16px"
            /> :
            val['label'] == 'snipcoins' ? 
            <InputField
              placeholder="Snipcoins Link"
              value={snipcoins}
              setValue={setSnip}
              mt="16px"
            /> 
            : null
            )) : null}
          <RowBetween>
            <HalfButton
              fullWidth={isMobile}
              disabled={isInvalid || isLoading}
              onClick={() => setPageState('two')}
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
              disabled={isInvalid || isLoading}
              padding={isLoading ? '11px 58px' : '11px 16px 13px'}>
              {isLoading ? (
                <Spinner size={22} />
              ) : (
                `Create Collection`
              )}
            </HalfButton>
          </RowBetween>
        </Form>
      </>
      </div>
    </div>
  );
};

export default ApplyListingStepThree;
