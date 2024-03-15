import { useRouter } from 'next/router';
import { useNavigatorUserAgent } from '../../hooks';
import {
  Container,
  Content,
  Title,
  SubTitle,
  ButtonWrapper,
  MainBtn
} from './ExploreCardCollections.styled';

const ExploreCardCollections = (): JSX.Element => {
  const router = useRouter();
  const { isDesktop } = useNavigatorUserAgent();


  const handleGetStartedClick = () => {
    router.push('/learn-more');
  };

  return (
    <Container>
      <Content>
        <Title>Explore Proton NFT{isDesktop ? <br /> : null} Collections</Title>
        <SubTitle>
          Explore, buy and sell popular Proton NFTs on Digital Galaxy and enjoy NO gas <br />
          fees and fast transaction speeds. Learn more about Digital Galaxy.
        </SubTitle>
        <ButtonWrapper>
          <MainBtn
            isBackColor={true}
            onClick={handleGetStartedClick}>
            Explore
          </MainBtn>
          <MainBtn
            isBackColor={false}
            onClick={handleGetStartedClick}>
            Create
          </MainBtn>
        </ButtonWrapper>
      </Content>
    </Container>
  );
};

export default ExploreCardCollections;
