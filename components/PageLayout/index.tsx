import { ReactNode } from 'react';
import Head from 'next/head';
import Router from 'next/router';
import { Main, Container } from './PageLayout.styled';
import { useModalContext, MODAL_TYPES } from '../Provider';
import {
  ClaimBalanceModal,
  CreateSaleModal,
  CreateMultipleSalesModal,
  CancelSaleModal,
  CancelMultipleSalesModal,
  TransferModal,
  CreateCollectionModal,
  UpdateCollectionModal,
  MintAssetModal,
  BurnAssetModal,
  MakeOfferModal,
  ReportModal,
  EditProfileModal
} from '../Modal';
import { useEscapeKeyClose } from '../../hooks';
import { META } from '../../utils/constants';

type Props = {
  title?: string;
  img?: string;
  desc?: string
  children: ReactNode;
};

const PageLayout = ({ title, img, desc, children }: Props): JSX.Element => {
  const { closeModal, modalType } = useModalContext();
  useEscapeKeyClose(closeModal);

  Router.events.on('routeChangeComplete', () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });

  const renderModal = () => {
    switch (modalType) {
      case MODAL_TYPES.CLAIM:
        return <ClaimBalanceModal />;
      case MODAL_TYPES.CREATE_SALE:
        return <CreateSaleModal />;
      case MODAL_TYPES.CREATE_MULTIPLE_SALES:
        return <CreateMultipleSalesModal />;
      case MODAL_TYPES.CANCEL_SALE:
        return <CancelSaleModal />;
      case MODAL_TYPES.CANCEL_MULTIPLE_SALES:
        return <CancelMultipleSalesModal />;
      case MODAL_TYPES.TRANSFER:
        return <TransferModal />;
      case MODAL_TYPES.CREATE_COLLECTION:
        return <CreateCollectionModal />;
      case MODAL_TYPES.UPDATE_COLLECTION:
        return <UpdateCollectionModal />;
      case MODAL_TYPES.MINT_ASSET:
        return <MintAssetModal />;
      case MODAL_TYPES.BURN_ASSET:
        return <BurnAssetModal />;
      case MODAL_TYPES.REPORT:
        return <ReportModal />;
      case MODAL_TYPES.MAKE_OFFER:
        return <MakeOfferModal />;
      case MODAL_TYPES.EDIT_PROFILE:
        return <EditProfileModal />;
      default:
        return null;
    }
  };

  const fullTitle = title ? `${title}` : META.siteName;
  const fullImg = img ? `${img}` : META.logo;
  const fullType = img ? "summary_large_image" : "summary";
  return (
    <Main>
      <Head>
        <title>{fullTitle}</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="twitter:card" content={fullType} />
        <meta name="twitter:site" content={META.twitterHandle} />
        <meta name="twitter:image" content={fullImg} />
        <meta name="twitter:title" content={fullTitle} />
        <meta
          name="twitter:description"
          content={desc || META.description}
          key="twdescription"
        />
        <meta
          name="description"
          content={desc || META.description}
        />
        <meta name="og:title" content={fullTitle} />
        <meta name="og:site_name" content={META.siteName} />
        <meta name="og:image" content={fullImg} />
        <meta name="og:type" content="website" />
        <meta
          name="og:description"
          content={desc || META.description}
          key="ogdescription"
        />
      </Head>
      <Container>{children}</Container>
      {renderModal()}
    </Main>
  );
};

export default PageLayout;
