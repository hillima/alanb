import { useState, useEffect } from 'react';
import PageLayout from '../../components/PageLayout';
import Banner from '../../components/Banner';
import { MODAL_TYPES, useAuthContext, useVolumeContext } from '../../components/Provider';
import SideBar from '../../components/SideBar';
import Section from '../../components/Section/Section';
import NavBar from '../../components/NavBar';
import VolumeBar from '../../components/VolumeBar';
import axios from 'axios';
import ApplyGrid from '../../components/ApplyGrid';
import { useWindowSize } from '../../hooks';


const ApplyListPage = (): JSX.Element => {
  const { isLoadingUser, currentUser } = useAuthContext();
  const size = useWindowSize();
  const { volume } = useVolumeContext();
  const [listData, setData] = useState([]);
  const [columns, setColumns] = useState("");
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  useEffect(() => {
    if(!isLoadingUser){
        axios.post(`/api/apply`,
        {
            data: {
                name: currentUser.actor,
                state: 'apply'
            }
        })
        .then(res => {
            setData(res.data.data);
            setColumns(Math.floor(size['windowWidth'] / 258).toString());
        })
    }else{
        return;
    }
  }, [currentUser]);

  const getContent = () => {
      return(
            <div style={{padding: '48px', width: '100%'}}>
                <h1 style={{fontSize: '28px'}}>Apply Collection List</h1>
                <ApplyGrid data={listData} columns={columns} />
            </div>
        )
    };

  return (
    <PageLayout>
      <SideBar hide={hide} active={'/user/'}  mobileHide={mobileHide} setHide={setHide} />
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

export default ApplyListPage;
