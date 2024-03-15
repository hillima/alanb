import { useState, useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import Banner from '../../components/Banner';
import { MODAL_TYPES, useAuthContext, useVolumeContext, useWhitelistContext } from '../../components/Provider';
import proton from '../../services/proton-rpc';
import UserPageHeader from '../../components/UserPageHeader';
import { userAssets, userCreatedAssets, userCreatedUnAssets, userUnAssets } from '../../services/assets';
import UserCollectionAsset from '../../components/UserCollectAsset';
import UserCollectionView from '../../components/UserCollectionView';
import SideBar from '../../components/SideBar';
import Section from '../../components/Section/Section';
import NavBar from '../../components/NavBar';
import VolumeBar from '../../components/VolumeBar';
import UserActiveTab from '../../components/UserActiveTab';
import UserFilterTab from '../../components/UserFilterTab';
import { getLowestPriceOwnerAsset } from '../../services/sales';
import { addPrecisionDecimal } from '../../utils';
import { getUserAuctions } from '../../services/auctions';
import AuctionView from '../../components/AuctionView';
import UserAuctionTab from '../../components/UserAuctionTab';
import { getUserOffers } from '../../services/offers';
import UserOffersView from '../../components/UserOffersView';
import axios from 'axios';
import UserCollectionWatchView from '../../components/UserCollectionWatchView';
import { getUserActivities } from '../../services/users';
import UserActivitiesView from '../../components/UserActivitiesView';


export async function getServerSideProps({ params }) {
  const { name } = params;
  const isLightKYCVerified = await proton.isAccountLightKYCVerified(
    name.toString()
  );
  const user = await proton.getUserByChainAccount(name.toString());
  const chainAccountAvatar = user.avatar ? user.avatar : '/default-avatar.png';
  const userInfo = {
    acc: name.toString(),
    actor: name.toString(),
    avatar: chainAccountAvatar,
    isLightKYCVerified,
    name: user.name == undefined ? name : user.name,
  };

  return {
    props: { userInfo, name },
  };
}

const ProfilePage = ({ userInfo, name }: any): JSX.Element => {
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const { isLoadingUser, currentUser } = useAuthContext();
  const { volume } = useVolumeContext();
  const [originAssets, setOriginAssets] = useState([]);
  const [assets, setAssets] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [auctions, setAuctions] = useState({
    seller: [],
    buyer: [],
    sold: [],
    bidder: []
  });
  const [offers, setOffers] = useState({
    made: [],
    received: []
  })
  const [tab, setTab] = useState(0);
  const [type, setType] = useState('sort');
  const { verifiedData } = useWhitelistContext();
  const [isLoading, setLoading] = useState(false);
  const [verifiedToggle,setToggle] = useState(true);
  const [verifiedCreatedToggle,setCreatedToggle] = useState(true);
  const [auctionTab, setAuctionTab] = useState(0);
  const [watches, setWatches] = useState([]);
  const [activities, setActivity] = useState([]);

  const getUserCreatedUnAssets = async () => {
    await setLoading(true);
    const assets = await userCreatedUnAssets({
      author: name
    });
    await setAssets(assets);
    await setLoading(false);
  }

  const getUserCreatedAssets = async () => {
    await setLoading(true);
    const assets = await userCreatedAssets({
      author: name
    });

    await setAssets(assets);
    await setLoading(false);
  }

  const getUserUnAssets = async () => {
    await setLoading(true);
    const assets = await userUnAssets({
      name: name
    });
    await setAssets(assets);
    await setLoading(false);
  }

  const getUserAssets = async () => {
    await setLoading(true);
    const assets = await userAssets({
        name: name
    });
    await setAssets(assets);
    await setOriginAssets(assets);
    await setLoading(false);
  }

  const getUserAllAuctions = async () => {
    await setLoading(true);
    const auctions:any = await getUserAuctions(name);
    await setAuctions(auctions);
    await setLoading(false);
  }

  const getUserAllOffers = async () => {
    await setLoading(true);
    const offers:any = await getUserOffers(name);
    await setOffers(offers);
    await setLoading(false);
  }

  const getUserAllActivities = async ( ) => {
    await setLoading(true);
    const activities = await getUserActivities(name);
    await setActivity(activities);
    await setLoading(false);
  }

  const getUserListedAssets = async () => {
    await setLoading(true);
    let newArr = [];
    for(let i = 0; i < originAssets.length; i++){
      let newAssets = await getLowestPriceOwnerAsset(originAssets[i]['assets'][0]['collection']['collection_name'], name);
      if(0 < newAssets.length){
        let jAssets = [];
        for(let j = 0; j < newAssets.length; j++){
          newAssets[j]['assets'][0]['lowestPrice'] = `${addPrecisionDecimal(newAssets[j]['listing_price'], 4, false)} XPR`;
          jAssets.push(newAssets[j]['assets'][0]);
        }
        let newObj = {
          assets: jAssets,
          total: originAssets[i]['total'],
          floor: originAssets[i]['floor']
        }
        newArr.push(newObj);
      }
    }
    await setAssets(newArr);
    await setLoading(false);
  }


  const getUserWatchedCol = async () => {
    const res = await axios.post(`/api/user/watches`, {
      data: {
        userName: name
      }
    });
    await setWatches(res.data.data);
  }

  useEffect(() => {
      if(activeTab == 0){
        setTab(0);
        if(verifiedToggle){
          getUserAssets();
        }else{
          getUserUnAssets();
        }
      } else if(activeTab == 1){
        setTab(0);
        if(verifiedCreatedToggle){
          getUserCreatedAssets();
        }else{
          getUserCreatedUnAssets();
        }
      } else if(activeTab == 2){
        getUserWatchedCol();
      } else if(activeTab == 3){
        getUserListedAssets();
      } else if(activeTab == 4){
        getUserAllAuctions();
      } else if(activeTab == 5){
        getUserAllOffers();
      } else if(activeTab == 7){
        getUserAllActivities();
      }
  }, [activeTab, verifiedToggle, verifiedCreatedToggle]);

  useEffect(() => {
    setTab(0);
    setAssets([]);
    setToggle(true);
    setCreatedToggle(true);
  }, [activeTab]);

  const searchFuc = async (value) => {
      let newArr = await assets;
      let data = await newArr.filter((it) => -1 < it['assets'][0]['collection']['name'].toLowerCase().indexOf(value));
      await setAssets([...data]);
  }

  const selectFuc = async (value) => {
    if(value === 'desc'){
      let newArr = assets.sort((a, b) => {
        if(a['assets'][0]['collection']['name'] < b['assets'][0]['collection']['name']){
          return -1;
        }
        if(a['assets'][0]['collection']['name'] > b['assets'][0]['collection']['name']){
          return 1;
        }
        return 0;
      });
      await setAssets([...newArr]);
    }else{
      let newArr = assets.sort((a, b) => {
        if(a['assets'][0]['collection']['name'] > b['assets'][0]['collection']['name']){
          return -1;
        }
        if(a['assets'][0]['collection']['name'] < b['assets'][0]['collection']['name']){
          return 1;
        }
        return 0;
      });
      await setAssets([...newArr]);
    }
    await setType(value);
  }
  const getContent = () => {
      return(
            <div>
                <UserPageHeader user={userInfo} />
                <UserActiveTab setActiveTab={setActiveTab} activeTab={activeTab} isOwner={currentUser && currentUser.acc == name} />
                {4 <= activeTab && activeTab <= 7 ?  null : <UserFilterTab 
                  activeTab={activeTab} tab={tab} 
                  setTab={setTab} type={type}
                  originAssets={originAssets} setAssets={setAssets} 
                  searchFuc={searchFuc} selectFuc={selectFuc} 
                  onRefresh={activeTab == 0 ? !verifiedToggle ? getUserUnAssets : getUserAssets : activeTab == 1 ? !verifiedCreatedToggle ? getUserCreatedUnAssets : getUserCreatedAssets : activeTab == 3 ? getUserListedAssets : () => {}} 
                  setToggle={setToggle} verifiedToggle={verifiedToggle} 
                  verifiedCreatedToggle={verifiedCreatedToggle} setCreatedToggle={setCreatedToggle}
                />}
                {activeTab == 4 ? <UserAuctionTab auctionTab={auctionTab} setAuctionTab={setAuctionTab} /> : null}
                {activeTab == 7 ? <UserActivitiesView data={activities} isLoading={isLoading} /> : 
                activeTab == 6 ? <UserOffersView data={offers['received']} isLoading={isLoading} state={'received'} reload={getUserAllOffers} /> :
                activeTab == 2 ? <UserCollectionWatchView data={watches} /> : 
                activeTab == 5 ? <UserOffersView data={offers['made']} isLoading={isLoading} state={'made'} reload={getUserAllOffers} /> : 
                activeTab == 4 ? <AuctionView allData={auctions} data={auctionTab == 0 ? auctions['seller'] : auctionTab == 1 ? auctions['buyer'] : auctionTab == 2 ? auctions['sold'] : auctions['bidder']}  isLoading={isLoading} reload={getUserAllAuctions} /> : 
                tab === 0 ? assets.length == 0 ? 
                <UserCollectionAsset data={[]} isLoading={isLoading} listingPrice={''} originAssets={originAssets} /> : 
                assets.map((item => (<UserCollectionAsset data={item} isLoading={isLoading} listingPrice={item['listing_price']} originAssets={originAssets} />))) : 
                <UserCollectionView data={assets} />}
            </div>
           )
    };

  return (
    <PageLayout title={userInfo.name}>
      <SideBar hide={hide} active={'/user/'} mobileHide={mobileHide} setHide={setHide} />
      <Section hide={hide}>
        <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume} />}
        <Banner modalType={MODAL_TYPES.CLAIM} />
        <div onClick={() => setMobileHide(true)}>
        {getContent()}
        </div>
      </Section>
    </PageLayout>
  )
};

export default ProfilePage;
