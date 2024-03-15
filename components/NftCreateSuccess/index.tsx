import { useRouter } from 'next/router';
import { useAuthContext } from '../Provider';
import {
  CheckIconContainer,
  SuccessPageContainer,
  SuccessContentContainer,
  SuccessText,
  SuccessDescription,
  PurpleButton,
  GrayButton,
  ButtonsContainer,
} from './CreateNftSuccess.styled';
import Image from 'next/image';

type CreateNftSuccessProps = {
  backToChooseCollection: () => void;
};

const CreateNftSuccess = ({
  backToChooseCollection,
}: CreateNftSuccessProps): JSX.Element => {
  const router = useRouter();
  const {
    currentUser: { actor },
  } = useAuthContext();

  return (
    <SuccessPageContainer>
      <SuccessContentContainer>
        <CheckIconContainer>
          <Image src="/check.svg" width={36} height={36} />
        </CheckIconContainer>
        <SuccessText>Success</SuccessText>
        <SuccessDescription>
          Your minting was successful! List them for sale, and go ahead and
          create more!
        </SuccessDescription>
        <ButtonsContainer>
          <PurpleButton onClick={() => router.push(`/user/${actor}`)}>
            Go To My NFTs
          </PurpleButton>
          <GrayButton onClick={backToChooseCollection}>
            Create More NFTs
          </GrayButton>
        </ButtonsContainer>
      </SuccessContentContainer>
    </SuccessPageContainer>
  );
};

export default CreateNftSuccess;
