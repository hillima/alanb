import { MouseEvent, useCallback } from 'react';
import {
  useAuthContext,
  useModalContext,
  CancelSaleModalProps,
  CancelMultipleSalesModalProps,
} from '../Provider';
import {
  Background,
  ModalBox,
  Section,
  CloseIconContainer,
  Title,
  Description,
  HalfButton,
} from './Modal.styled';
import { useWindowSize } from '../../hooks';
import ProtonSDK from '../../services/proton';
import Image from 'next/image';
import toast from "../Toast";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  onButtonClick: () => Promise<void>;
};

const CancelModal = ({
  title,
  description,
  buttonText,
  onButtonClick,
}: Props): JSX.Element => {
  const { closeModal } = useModalContext();
  const { isMobile } = useWindowSize();

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <Background onClick={handleBackgroundClick}>
      <ModalBox>
        <Section>
          <Title>{title}</Title>
          <CloseIconContainer role="button" onClick={closeModal}>
            <Image src="/close.svg" width={16} height={16} />
          </CloseIconContainer>
        </Section>
        <Description>{description}</Description>
        <HalfButton
          fullWidth={isMobile}
          color="#7B0A75"
          hoverColor="#ff778e"
          margin="0 0 12px"
          onClick={onButtonClick}>
          {buttonText}
        </HalfButton>
      </ModalBox>
    </Background>
  );
};

export const CancelSaleModal = (): JSX.Element => {
  const { currentUser } = useAuthContext();
  const { closeModal, modalProps } = useModalContext();
  const { saleId, fetchPageData } = modalProps as CancelSaleModalProps;
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  
  const cancelSale = async () => {
    const res = await ProtonSDK.cancelSale({
      actor: currentUser ? currentUser.actor : '',
      sale_id: saleId,
    });

    if (res.success) {
      closeModal();
      notify("success", "Success!");
      fetchPageData();
    }
  };

  return (
    <CancelModal
      title="Cancel Sale?"
      description="By canceling the sale, your NFT will be removed from the marketplace until
          you mark it for sale again."
      buttonText="Cancel Sale"
      onButtonClick={cancelSale}
    />
  );
};

export const CancelMultipleSalesModal = (): JSX.Element => {
  const { currentUser } = useAuthContext();
  const { closeModal, modalProps } = useModalContext();
  const {
    saleIds,
    fetchPageData,
  } = modalProps as CancelMultipleSalesModalProps;

  const onButtonClick = async () => {
    try {
      const res = await ProtonSDK.cancelMultipleSales({
        actor: currentUser ? currentUser.actor : '',
        saleIds,
      });

      if (res.success) {
        closeModal();
        fetchPageData();
      }
    } catch (err) {
      throw new Error(err.message);
    }
  };

  return (
    <CancelModal
      title="Cancel Sales?"
      description={`You are canceling ${saleIds.length} items for sale. By canceling the sales, your NFTs will be removed from the marketplace until
          you mark them for sale again.`}
      buttonText="Cancel All Sales"
      onButtonClick={onButtonClick}
    />
  );
};
