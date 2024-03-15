import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import PageLayout from '../components/PageLayout';
import ErrorComponent from '../components/Error';
import LoadingPage from '../components/LoadingPage';
import { PurpleSpan, Wrap, Text } from '../styles/Title.styled';
import { useAuthContext, useVolumeContext } from '../components/Provider';
import {
  Template,
  getTemplatesSearchByCollection,
  formatSearchTemplatesWithPriceData,
} from '../services/templates';
import SideBar from '../components/SideBar';
import Section from '../components/Section/Section';
import NavBar from '../components/NavBar';
import VolumeBar from '../components/VolumeBar';
import SearchGrid from '../components/SearchGrid';

const Search = (): JSX.Element => {
  const router = useRouter();
  const { volume } = useVolumeContext();
  const { isLoadingUser } = useAuthContext();
  const searchTerm = router.query.keywords
    ? (router.query.keywords as string).toLowerCase()
    : '';
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [renderedTemplates, setRenderedTemplates] = useState<Template[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [mobileHide, setMobileHide] = useState(true);
  const [hide, setHide] = useState(true);

  useEffect(() => {
    (async () => {
      if (searchTerm) {
        setIsLoading(true);
        try {

          const templates = await getTemplatesSearchByCollection({
            keyword: searchTerm,
          });

          const templatesWithLowestPrice = await formatSearchTemplatesWithPriceData(
            templates
          );
          
          setRenderedTemplates(templatesWithLowestPrice);
          setIsLoading(false);
        } catch (e) {
          setErrorMessage(e.message);
        }
      }
    })();
  }, [searchTerm]);

  const getContent = () => {
    if (isLoading || isLoadingUser) {
      return <LoadingPage />;
    }

    if (!renderedTemplates.length) {
      return (
        <ErrorComponent errorMessage="No Search templates" />
      );
    }

    if (errorMessage) {
      return (
        <ErrorComponent
          errorMessage={errorMessage}
          buttonText="Try again"
          buttonOnClick={() => router.reload()}
        />
      );
    }

    return (
      <Wrap>
        <Text>Search results for “<PurpleSpan>{searchTerm}</PurpleSpan>”</Text>
        <SearchGrid items={renderedTemplates} isBulk={false} isFilter={false} />
      </Wrap>
    );
  };

  return (
    <PageLayout title="Search Results">
        <SideBar hide={hide} active={'/applylisting'} mobileHide={mobileHide} setHide={setHide} />
        {/* <Banner modalType={MODAL_TYPES.CLAIM} /> */}
        <Section hide={hide}>
        <NavBar  setMobileHide={setMobileHide} mobileHide={mobileHide} />
        {volume.length == 0 ? null : <VolumeBar data={volume} />}
        <div onClick={() => setMobileHide(true)}>
        {getContent()}
        </div>
        </Section>
    </PageLayout>
  );
};

export default Search;
