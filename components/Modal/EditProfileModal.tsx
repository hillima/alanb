import { MouseEvent, useState } from 'react';
import {
  useAuthContext,
  useModalContext,
} from '../Provider';
import {
  Background,
  ModalBox,
  Section,
  CloseIconContainer,
  Title,
  Description,
  ErrorMessage,
  Column,
  HalfButton,
} from './Modal.styled';
import InputField from '../InputField';
import { useWindowSize } from '../../hooks';
import ProtonSDK from '../../services/proton';
import Image from 'next/image';
import Spinner from '../Spinner';


export const EditProfileModal = (): JSX.Element => {
  const { currentUser, currentUserBalance, currentUserXprBalance } = useAuthContext();
  const { closeModal } = useModalContext();
  const [error, setError] = useState<string>('');
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
          <Title>Edit Profile</Title>
          <CloseIconContainer role="button" onClick={closeModal}>
            <Image src="/close.svg" width={16} height={16} />
          </CloseIconContainer>
        </Section>
        <Description>
            Select an NFT and enter the token & offer amount.
        </Description>
        <Column>
          <HalfButton
            fullWidth={isMobile}
            onClick={() => {}}
            margin="0"
          >
            Edit
          </HalfButton>
          {error ? <ErrorMessage style={{fontSize: '18px'}}>{error}</ErrorMessage> : null}
        </Column>
      </ModalBox>
    </Background>
  );
};
