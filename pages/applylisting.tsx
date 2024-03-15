import PageLayout from '../components/PageLayout';
import { MODAL_TYPES, useCreateAssetContext, useModalContext, useVolumeContext } from '../components/Provider';
import SideBar from '../components/SideBar';
import Section from '../components/Section/Section';
import NavBar from '../components/NavBar';
import VolumeBar from '../components/VolumeBar';
import { useRef, useState } from 'react';
import ApplyListingStepTwo from '../components/ApplyListingStep/ApplyListingStepTwo';
import ApplyListingStepOne from '../components/ApplyListingStep/ApplyListingStepOne';
import ApplyListingStepThree from '../components/ApplyListingStep/ApplyListingStepThree';
const getContent = (pageState, setPageState, 
    answers, setAnswers, 
    newCollection, setNewCollection,
    contacts, setContacts,
    sites, setSites,
    proofs, setProofs,
    proofInputRef, proofFile, setProofFile
  ) => {
    switch(pageState){
        case 'one':
            return <ApplyListingStepOne 
              setPageState={setPageState} 
              answers={answers} 
              setAnswers={setAnswers} 
              contacts={contacts}
              setContacts={setContacts}
              sites={sites}
              setSites={setSites}
              proofs={proofs}
              setProofs={setProofs}
              proofInputRef={proofInputRef}
              proofFile={proofFile}
              setProofFile={setProofFile}
            />;
        case 'two':
            return <ApplyListingStepTwo setPageState={setPageState} newCollection={newCollection} setNewCollection={setNewCollection} />;
        case 'three':
              return <ApplyListingStepThree 
                setPageState={setPageState} newCollection={newCollection} 
                answers={answers} 
                contacts={contacts}
                sites={sites}
                proofs={proofs}
              />;
        default:
            return;
    }
}
const ApplyListing = (): JSX.Element => {
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const {volume} = useVolumeContext();
  const { newCollection, setNewCollection } = useCreateAssetContext();
  const [pageState, setPageState] = useState('one');
  const [answers, setAnswers] = useState(['proton', '1', 'gold']);
  const proofInputRef = useRef<HTMLInputElement>();
  const [proofFile, setProofFile] = useState<File | null>();
  const [contacts, setContacts] = useState({
    name: '',
    phone: '',
    email: ''
  });
  const [sites, setSites] = useState({
    twitter: '',
    website: '',
    discord: ''
  })
  const [proofs, setProofs] = useState({
    work: '',
    desc: ''
  });
  return (
    <PageLayout>
      <SideBar hide={hide} active={'/applylisting'}  mobileHide={mobileHide} setHide={setHide} />
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume}/>}
        <div onClick={() => setMobileHide(true)}>
        {getContent(pageState, setPageState, 
          answers, setAnswers, 
          newCollection, setNewCollection,
          contacts, setContacts,
          sites, setSites,
          proofs, setProofs,
          proofInputRef, proofFile, setProofFile
        )}
        </div>
      </Section>
    </PageLayout>
  );
};

export default ApplyListing;
