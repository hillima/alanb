import PageLayout from '../components/PageLayout';
import { useEffect, useState } from 'react';
import { useVolumeContext } from '../components/Provider';
import { getAuctions } from '../services/auctions';
import SideBar from '../components/SideBar';
import Section from '../components/Section/Section';
import NavBar from '../components/NavBar';
import VolumeBar from '../components/VolumeBar';
import { BoldText, Divider, SmalText } from '../components/AuctionMainView/AuctionMainView.styled';
import { LiveAuctionTime } from '../components/LiveAuctions/LiveAuctions.styled';
import { useWindowSize } from '../hooks';
import dynamic from 'next/dynamic';

const LiveAuctions = dynamic(() => import('../components/LiveAuctions'), {
  ssr: false
});
const AuctionMainView = dynamic(() => import('../components/AuctionMainView'), {
  ssr: false
});

const Auctions = (): JSX.Element => {
  const size = useWindowSize();
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const {volume} = useVolumeContext();
  const [liveAuction, setLive] = useState([]);
  const [isFetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasNextPage, setNextPage] = useState(true);

  const Completionist = () => <span>End Auction</span>;
  const renderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <><BoldText>{(days*24) + hours}<Divider />{minutes}<Divider />{seconds}</BoldText><SmalText>Hours<Divider />Minutes<Divider />Seconds</SmalText></>;
    }
  };
  const liveRenderer = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return <Completionist />;
    } else {
      return <LiveAuctionTime>{(days*24) + hours}h {minutes}m {seconds}s</LiveAuctionTime>;
    }
  };

  const LiveList = async () => {
    const data = await getAuctions({limit: 26, page: page, state: '1'});
    await setLive([...liveAuction, ...data]);
    await setPage(page + 1)
    await setNextPage(0 < data.length);
    await setFetching(false);
  }

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    }
    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    if(0 < liveAuction.length){
      return;
    }else{
      LiveList();
    }
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) LiveList();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <PageLayout>
      <SideBar hide={hide} active={'/auctions'} mobileHide={mobileHide} setHide={setHide} />
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume}/>}
        <div onClick={() => setMobileHide(true)}>
          {liveAuction.length == 0 ? null : 
            <>
              <AuctionMainView data={liveAuction[0]} renderer={renderer} />
              <LiveAuctions data={liveAuction} renderer={liveRenderer} size={size} />
            </>
          }
        </div>
      </Section>
    </PageLayout>
  );
};

export default Auctions;
