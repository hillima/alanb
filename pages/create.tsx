/* eslint-disable jsx-a11y/media-has-caption */
import { FC, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '../components/PageLayout';
import MobileCreatePagePlaceholder from '../components/MobileCreatePagePlaceholder';
import NftCreateSuccess from '../components/NftCreateSuccess';
import CreatePageLayout from '../components/CreatePageLayout';
import ChooseCollection from '../components/ChooseCollection';
import CreateTemplate from '../components/CreateTemplate';
import { useAuthContext, CREATE_PAGE_STATES, useVolumeContext, useWhitelistContext } from '../components/Provider';
import fees from '../services/fees';
import { useNavigatorUserAgent, useWindowSize } from '../hooks';
import SideBar from '../components/SideBar';
import Section from '../components/Section/Section';
import NavBar from '../components/NavBar';
import VolumeBar from '../components/VolumeBar';

const Create: FC = () => {
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);
  const router = useRouter();
  const { currentUser, isLoadingUser } = useAuthContext();
  const { volume } = useVolumeContext();
  const { isMobile } = useWindowSize();
  const { collectionsWhitelist } = useWhitelistContext();
  const [pageState, setPageState] = useState<string>(
    CREATE_PAGE_STATES.CHOOSE_COLLECTION
  );
  const [value, setValue] = useState([]);

  useEffect(() => {
    if (!currentUser && !isLoadingUser) {
      router.push('/');
    }
    (async () => {
      if (currentUser && currentUser.actor) {
        await fees.refreshRamInfoForUser(currentUser.actor);
      }
    })();
  }, [currentUser, isLoadingUser]);

  const getContent = () => {
    if (!currentUser) {
      return null;
    }

    if (isMobile) {
      return <MobileCreatePagePlaceholder />;
    }

    switch (pageState) {
      case CREATE_PAGE_STATES.SUCCESS:
        return (
          <NftCreateSuccess
            backToChooseCollection={() =>
              setPageState(CREATE_PAGE_STATES.CHOOSE_COLLECTION)
            }
          />
        );
      case CREATE_PAGE_STATES.CREATE_TEMPLATE:
        return (
          <CreatePageLayout value={value}>
            <CreateTemplate setPageState={setPageState} value={value} setValue={setValue} />
          </CreatePageLayout>
        );
      default:
        return (
          <CreatePageLayout>
            <ChooseCollection setPageState={setPageState} collectionsWhitelist={collectionsWhitelist} />
          </CreatePageLayout>
        );
    }
  };

  return (
    <PageLayout>
    <SideBar hide={hide} active={'/applylisting'} mobileHide={mobileHide} setHide={setHide} />
    {/* <Banner modalType={MODAL_TYPES.CLAIM} /> */}
    <Section hide={hide}>
      <NavBar setMobileHide={setMobileHide} mobileHide={mobileHide} />
      {volume.length == 0 ? null : <VolumeBar data={volume} />}
      <div onClick={() => setMobileHide(true)}>
      {getContent()}
      </div>
    </Section>
  </PageLayout>
  )
};

export default Create;
