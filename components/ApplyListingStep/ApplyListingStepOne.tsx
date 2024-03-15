import { FC, Dispatch, SetStateAction, useState } from 'react';
import {
  Title,
  SubTitle,
  CommonStepBox,
  CommonList,
  CommonListTab,
  CommonStepText,
  CommonStepRed,
  SelectBox,
  RowWrap,
  ColumnWrap,
  DragWrap
} from './ApplyListingCommon.styled';
import Switch from '@mui/material/Switch';
import { styled } from '@mui/material/styles';
import { HalfButton } from '../Modal/Modal.styled';
import Image from 'next/image';
import InputField from '../InputField';
import DragDropFileUploadApply from '../DragDropFileUploadApply';
import uploadToIPFS from '../../services/upload';

const ApplyListingStepOne: FC<{
  setPageState: Dispatch<SetStateAction<string>>;
  answers: any;
  setAnswers: any;
  contacts: any;
  setContacts: any;
  sites: any;
  setSites: any;
  proofs: any;
  setProofs: any;
  proofInputRef: any;
  proofFile: any;
  setProofFile: any;
}> = ({ setPageState, answers, setAnswers,
  contacts, setContacts,
  sites, setSites,
  proofs, setProofs,
  proofInputRef, proofFile, setProofFile
}) => { 
  const handleSubmit = async () => {
    if(contacts['name'] == '' || contacts['phone'] == '' || contacts['email'] == '' ||
      sites['twitter'] == '' || proofFile == '' || proofs['desc'] == ''
    ){
      return;
    }
    const ipfsImage = await uploadToIPFS(proofFile);
    let newObj = proofs;
    newObj['work'] = ipfsImage;
    await setProofs({
      ...newObj
    });
    await setPageState('two');
  }
  return (
    <div style={{ padding: '40px 20px' }}> 
      <div>
      <Title>Introduction</Title>
      <SubTitle><CommonStepRed>*</CommonStepRed>Required fields</SubTitle>
      <CommonStepBox>
        <CommonList>
            <CommonListTab isActive={true}>Introduction</CommonListTab>
            <CommonListTab isActive={false}>Collection</CommonListTab>
            <CommonListTab isActive={false}>Socials</CommonListTab>
        </CommonList>
        <CommonStepText>Step 1 of 3</CommonStepText>
      </CommonStepBox>
      <>
        <SubTitle>
          Contact details <CommonStepRed>*</CommonStepRed>
        </SubTitle>
        <div style={{display: 'flex'}}>
        <InputField 
           placeholder="Your full name"
           value={contacts['name']}
           setValue={(value) => {
            let newObj = contacts;
            newObj['name'] = value;
            setContacts({
              ...newObj
            });
           }}
           halfWidth
           mr="10px"
           mt="16px"
        />
        <InputField 
           placeholder="Your phone number"
           value={contacts['phone']}
           setValue={(value) => {
            let newObj = contacts;
            newObj['phone'] = value;
            setContacts({
              ...newObj
            });
           }}
           halfWidth
           ml="10px"
           mt="16px"
        />
        </div>
        <InputField 
           placeholder="Your email address"
           value={contacts['email']}
           setValue={(value) => {
            let newObj = contacts;
            newObj['email'] = value;
            setContacts({
              ...newObj
            });
           }}
           mt="16px"
        />
        <SubTitle>
          Which Blockchain is your collection on <CommonStepRed>*</CommonStepRed>
        </SubTitle>
        <RowWrap>
          <SelectBox width="49%" onClick={() => {
            let newArr = answers;
            newArr[0] = 'proton';
            setAnswers([...newArr]);
          }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Image src="/proton-xpr-logo3.svg" width="21px" height="24px" /><span style={{marginLeft: '12px'}}>Proton(XPR)</span>
            </div>
            {answers[0] == 'proton' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
          <div style={{width:"2%"}} />
          <SelectBox width="49%" onClick={() => {
            let newArr = answers;
            newArr[0] = 'solana';
            setAnswers([...newArr]);
          }}>
            <div style={{display: 'flex', alignItems: 'center'}}>
              <Image src="/solana-sol-logo.svg" width="17px" height="13px" /><span style={{marginLeft: '12px'}}>Solana(SOL)</span>
            </div>
            {answers[0] == 'solana' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
        </RowWrap>
        <SubTitle>
          Is the artwork, avatar and banner either your original artwork or artwork you have 
          legal permission to use, distribute and sell? <CommonStepRed>*</CommonStepRed>
        </SubTitle>
        <ColumnWrap>
          <SelectBox width="100%" onClick={() => {
            let newArr = answers;
            newArr[1] = '1';
            setAnswers([...newArr]);
          }}>
            Yes , i am the author
            {answers[1] == '1' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
          <SelectBox width="100%" onClick={() => {
            let newArr = answers;
            newArr[1] = '2';
            setAnswers([...newArr]);
          }}>
            Yes, i have the license to use the art
            {answers[1] == '2' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
          <SelectBox width="100%" onClick={() => {
            let newArr = answers;
            newArr[1] = '3';
            setAnswers([...newArr]);
          }}>
            No
            {answers[1] == '3' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
        </ColumnWrap>
        <SubTitle>
          Which verification level are you applying for in relation to this collection? <CommonStepRed>*</CommonStepRed>
        </SubTitle>
        <ColumnWrap>
          <SelectBox width="100%" onClick={() => {
            let newArr = answers;
            newArr[2] = 'gold';
            setAnswers([...newArr]);
          }}>
            Gold
            {answers[2] == 'gold' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
          <SelectBox width="100%" onClick={() => {
            let newArr = answers;
            newArr[2] = 'silver';
            setAnswers([...newArr]);
          }}>
            Silver
            {answers[2] == 'silver' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
          <SelectBox width="100%" onClick={() => {
            let newArr = answers;
            newArr[2] = 'bronze';
            setAnswers([...newArr]);
          }}>
            Bronze
            {answers[2] == 'bronze' ? <Image src="/tick-circle.svg" width="24px" height="24px" /> : null}
          </SelectBox>
        </ColumnWrap>
        <SubTitle>
          Collection Twitter profile <CommonStepRed>*</CommonStepRed>
        </SubTitle>
        <InputField 
           placeholder="Collection twitter url"
           value={sites['twitter']}
           setValue={(value) => {
            let newObj = sites;
            newObj['twitter'] = value;
            setSites({
              ...newObj
            });
           }}
           mt="16px"
        />
        <SubTitle>
          Collection website url
        </SubTitle>
        <InputField 
           placeholder="Collection website url"
           value={sites['website']}
           setValue={(value) => {
            let newObj = sites;
            newObj['website'] = value;
            setSites({
              ...newObj
            });
           }}
           mt="16px"
        />
        <SubTitle>
          Discord invite code
        </SubTitle>
        <InputField 
           placeholder="Discord invite url"
           value={sites['discord']}
           setValue={(value) => {
            let newObj = sites;
            newObj['discord'] = value;
            setSites({
              ...newObj
            });
           }}
           mt="16px"
        />
        <SubTitle>
          Proof of work <CommonStepRed>*</CommonStepRed>
        </SubTitle>
        <DragWrap>
            <DragDropFileUploadApply
              placeholderImage={proofs['work']}
              uploadInputRef={proofInputRef}
              uploadedFile={proofFile}
              setUploadedFile={setProofFile}
            />
        </DragWrap>
        <SubTitle>
          Proof of work description <CommonStepRed>*</CommonStepRed>
        </SubTitle>
        <InputField 
           placeholder="Proof of works description"
           value={proofs['desc']}
           setValue={(value) => {
            let newObj = proofs;
            newObj['desc'] = value;
            setProofs({
              ...newObj
            });
           }}
           mt="16px"
        />
        <HalfButton 
          onClick={handleSubmit}
          disabled={contacts['name'] == '' || contacts['phone'] == '' || contacts['email'] == '' ||
          sites['twitter'] == '' || proofFile == '' || proofs['desc'] == ''}
          style={{marginTop: '60px', float: 'right'}}
        >Next Step</HalfButton>
      </>
      </div>
    </div>
  );
};

export default ApplyListingStepOne;
