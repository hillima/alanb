import PageLayout from '../components/PageLayout';
import ExploreCard from '../components/ExploreCard';
import { MODAL_TYPES, useVolumeContext, useWhitelistContext } from '../components/Provider';
import TopCollection from '../components/TopCollection';
import RecentlyListed from '../components/RecentlyListed';
import RecentAuction from '../components/RecentAuction';
import DigitalGalaxyBlog from '../components/DigitalGalaxyBlog';
import TopCollectionLast from '../components/TopCollectionLast';
import { CollectionList } from '../services/collections';
import { useEffect, useState } from 'react';
import { getRecentSales } from '../services/sales';
import { getAuctions } from '../services/auctions';
import SideBar from '../components/SideBar';
import VolumeBar from '../components/VolumeBar';
import NavBar from '../components/NavBar';
import Section from '../components/Section/Section';
import Banner from '../components/Banner';
import axios from 'axios';

const MarketPlace = (): JSX.Element => {
  const [topData, setData] = useState([]);
  const [recentData, setRecent] = useState([]);
  const [recentAuction, setAuction] = useState([]);
  const [lastData, setLastData] = useState([]);
  const {isLoadingWhitelist} = useWhitelistContext();
  const [after, setAfter] = useState(1);
  const [rating, setRating] = useState('all');
  const [lastAfter, setLastAfter] = useState(1);
  const [carousel, setCarousel] = useState([]);
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const { volume } = useVolumeContext();
  const CarouselList = async () => {
    const res = await axios.post(`/api/data/carousel`);
    setCarousel(res.data.data);
  }
  const TopColList = async () => {
    let now = new Date();
    const data = await CollectionList({after: after == 0 ? 0 : new Date(now.setDate(now.getDate() - after)).getTime()});
    data.sort((a, b) => b['volume'] - a['volume']);
    setData(data);
  }
  const RecentSaleList = async () => {
    const data = await getRecentSales({ limit: 20 });
    setRecent(data);
  }
  const RecentAuctionList = async () => {
    const data = await getAuctions({limit: 10, page: 1, state: '1'});
    setAuction(data);
  }
  const TopLastColList = async () => {
    let now = new Date();
    const data = await CollectionList({after: lastAfter == 0 ? 0 : new Date(now.setDate(now.getDate() - lastAfter)).getTime()});
    data.sort((a, b) => b['volume'] - a['volume']);
    setLastData(data);
  }
  useEffect(() => {
    if(isLoadingWhitelist || 0 < topData.length){
      return;
    }else{
      CarouselList();
      RecentSaleList();
      RecentAuctionList();
    }
  }, [isLoadingWhitelist]);

  useEffect(() => {
    setData([]);
    TopColList();
  }, [after]);

  // useEffect(() => {
  //   setLastData([]);
  //   TopLastColList();
  // }, [lastAfter]);

  return (
    <PageLayout>
      <SideBar hide={hide} active={'/'} mobileHide={mobileHide} setHide={setHide} />
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume} />}
        <Banner modalType={MODAL_TYPES.CLAIM} />
        <div onClick={() => setMobileHide(true)}>
        <ExploreCard data={carousel} />
        <TopCollection 
          data={rating == 'all' ? topData.slice(0,9) : topData.filter((value) => value['rating'] === rating).slice(0, 9)} 
          setAfter={setAfter} after={after} 
          rating={rating} setRating={setRating}
        />
        <RecentlyListed data={recentData} />
        {recentAuction.length == 0 ? null : <RecentAuction data={recentAuction} />}
        {/* <TopCollectionLast data={lastData} setAfter={setLastAfter} after={lastAfter} /> */}
        <DigitalGalaxyBlog />
        </div>
      </Section>
      {/* <Grid items={featuredTemplates} type={CARD_RENDER_TYPES.TEMPLATE} /> */}
    </PageLayout>
  );
};

export default MarketPlace;
