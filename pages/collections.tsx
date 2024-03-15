import PageLayout from '../components/PageLayout';
import { useVolumeContext } from '../components/Provider';
import TrendingCollections from '../components/TrendingCollections';
import { useEffect, useState } from 'react';
import { CollectionList, CollectionListStats } from '../services/collections';
import SideBar from '../components/SideBar';
import Section from '../components/Section/Section';
import NavBar from '../components/NavBar';
import VolumeBar from '../components/VolumeBar';

const Collections = (): JSX.Element => {
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const [page, setPage] = useState(1);
  const [originData, setOrigin] = useState([]);
  const [collections, setCol] = useState([]);
  const [type, setType] = useState('all');
  const { volume } = useVolumeContext();
  const [after, setAfter] = useState(1);
  const [stats, setStats] = useState([]);
  const [tab, setTab] = useState(0);
  const [isOpen, setOpen] = useState(false);

  const collectionList = async() => {
    let now = new Date();
    const data = await CollectionList({
      after: after == 0 ? 0 : new Date(now.setDate(now.getDate() - after)).getTime()
    })
    data.map(it => {
      it['owners'] = stats.filter(tt => tt['name'] == it['collection_name'])[0]['owners'];
      it['floor'] = stats.filter(tt => tt['name'] == it['collection_name'])[0]['floor'];
      it['total'] = stats.filter(tt => tt['name'] == it['collection_name'])[0]['total'];
    })
    data.sort((a, b) => b['volume'] - a['volume']);
    setOrigin(data);
    setCol(data);
  }
  const collectionStats = async () => {
    const stats = await CollectionListStats();
    await setStats(stats);
  }
  useEffect(() => {
    if(originData.length == 0 && stats.length == 0){
      collectionStats();
    }else{
      return;
    }
  }, []);
  
  useEffect(() => {
    if(0 < stats.length){
      collectionList();
    }
  }, [stats]);

  useEffect(() => {
    if(0 < originData.length){
      if(type == 'all'){
        setCol([...originData]);
      } else{
        setCol([...originData.filter((item) => item.rating === type)])
      }
    }
  }, [type]);

  useEffect(() => {
    if(0 < originData.length && 0 < stats.length){
      setCol([]);
      collectionList();
    }
  }, [after]);
  return (
    <PageLayout>
      <SideBar hide={hide} active={'/collections'} mobileHide={mobileHide} setHide={setHide} />
      {/* <Banner modalType={MODAL_TYPES.CLAIM} /> */}
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume} />}
        {/* <ExploreCardCollections /> */}
        <div onClick={() => setMobileHide(true)}>
        <TrendingCollections 
          data={collections} 
          type={type} 
          setType={setType} 
          setAfter={setAfter} 
          after={after} 
          tab={tab} 
          setTab={setTab} 
          isOpen={isOpen}
          setOpen={setOpen}
        /> 
        </div>
        {/* <Grid items={featuredTemplates} type={CARD_RENDER_TYPES.TEMPLATE} /> */}
      </Section>
    </PageLayout>
  );
};

export default Collections;
