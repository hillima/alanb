import { MouseEvent, useState } from 'react';
import {
  useAuthContext,
  useModalContext,
  TransferOrBurnNFTModalProps,
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
import Image from 'next/image';

import ProtonSDK from '../../services/proton';
import { useWindowSize } from '../../hooks';
import Spinner from '../Spinner';
import { DropdownMenu } from '../AssetFormBuy/AssetFormBuy.styled';

export const BurnAssetModal = (): JSX.Element => {
  const {
    currentUser: { actor },
  } = useAuthContext();
  const { isMobile } = useWindowSize();
  const { closeModal, modalProps } = useModalContext();
  const [assetId, setAssetId] = useState('');
  const {
    assetIds,
    fetchPageData,
  } = modalProps as TransferOrBurnNFTModalProps;

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const burn = async () => {
    const result = await ProtonSDK.burn({
      owner: actor,
      asset_id: assetId,
    });

    if (result.success) {
      closeModal();
      fetchPageData();
    }
  };

  return (
    <Background onClick={handleBackgroundClick}>
      <ModalBox>
        <Section>
          <Title>Burn NFT</Title>
          <CloseIconContainer role="button" onClick={closeModal}>
            <Image src="/close.svg" width={16} height={16} />
          </CloseIconContainer>
        </Section>
        <Description>
          Are you sure you want to burn this NFT? This action will permanently
          delete the NFT and cannot be undone.
        </Description>
        {assetIds.length === 0 ? <div style={{marginBottom: '10px'}}><Spinner size={30} /></div> : <DropdownMenu
                name="Available Assets For Sale"
                value={assetId}
                onChange={(e) => {
                    setAssetId(e.target.value);
                }}>
                <option key="blank" value="" disabled>
                - - Select a Assets Number - -
                </option>
                {modalProps['assetIds'].length > 0 &&
                modalProps['assetIds'].map((val, index) => val ? (
                    <option key={index} value={[val]}>
                        #{modalProps['templateMint'][index]} - {val}
                    </option>
                ) : null)}
          </DropdownMenu>
          }
        <HalfButton
          fullWidth={isMobile}
          color="#7B0A75"
          hoverColor="#ff778e"
          onClick={burn}>
          Burn NFT
        </HalfButton>
      </ModalBox>
    </Background>
  );
};
