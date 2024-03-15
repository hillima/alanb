import { useEffect, useState } from 'react';
import PageLayout from '../../components/PageLayout';
import Banner from '../../components/Banner';
import {
  MODAL_TYPES,
  useAuthContext,
  useVolumeContext,
} from '../../components/Provider';
import dynamic from 'next/dynamic'
import { getAuctionDetail } from '../../services/auctions';
import SideBar from '../../components/SideBar';
import Section from '../../components/Section/Section';
import NavBar from '../../components/NavBar';
import VolumeBar from '../../components/VolumeBar';
import { useCountdown } from '../../hooks';
import proton from '../../services/proton-rpc';
const AuctionDetail = dynamic(() => import("../../components/AuctionDetail"), {
  ssr: false,
});

export async function getServerSideProps({ params }) {
  const { auctionId } = params;
  const template = await getAuctionDetail(auctionId);
  return {
    props: { template },
  };
}

const AuctionPage = ({ template }): JSX.Element => {
  const {volume} = useVolumeContext();
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const { currentUserXprBalance, currentUser, login } = useAuthContext();
  const [inputVal, setInputVal] = useState<any>('');
  const [parseBalance, setBalance] = useState<any>('');
  const [days, hours, minutes, seconds] = useCountdown(new Date(parseInt(template['end_time'])));
  const [rate, setRate] = useState<any>();
  useEffect(() => {
    (async() => {
      const rate = await proton.getXPRtoXUSDCConversionRate();
      setRate(rate);
    })();
    if(currentUserXprBalance != undefined){
      setBalance(currentUserXprBalance.substring(0, currentUserXprBalance.indexOf('XPR') - 1));
    }
  }, []);

  return(
    <PageLayout
      title={`${template['collection']['name']} - ${template['assets'][0]['data']['name']}`} 
      img={`${process.env.NEXT_PUBLIC_IPFS_URL}${template['assets'][0]['data']['image'] || template['assets'][0]['data']['glbthumb']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
      desc={`${template['assets'][0]['data']['name']} - ${template['assets'][0]['data']['desc']} / ${template['assets'][0]['data']['categorie']}`}
    >
      <SideBar hide={hide} active={'/auc/'}  mobileHide={mobileHide} setHide={setHide} />
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume} />}
        <Banner modalType={MODAL_TYPES.CLAIM} />
        <div onClick={() => setMobileHide(true)}>
          <AuctionDetail 
            data={template} 
            currentUser={currentUser}
            login={login}
            inputVal={inputVal}
            setInputVal={setInputVal}
            parseBalance={parseBalance}
            currentUserXprBalance={currentUserXprBalance}  
            hours={0 < (days*24) + hours && (days*24) + hours < 10 ? `0${hours}` : (days*24) + hours}
            minutes={0 < minutes && minutes < 10 ? `0${minutes}` : minutes}
            seconds={0 < seconds && seconds < 10 ? `0${seconds}` : seconds}
            rate={rate}
          />
        </div>
      </Section>
    </PageLayout>
  );
};

export default AuctionPage;
