import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Image } from '../../styles/index.styled';
import { useNavigatorUserAgent, useWindowSize } from '../../hooks';
import { useAuthContext } from '../Provider';
import {
  Container,
  Content,
  Title,
  SubTitle,
  ImageContainer,
  ButtonWrapper,
  MainBtn,
  TopWrap,
  GreyBack,
  WhiteText,
  FloatRight,
  BottomWrap,
  NftName,
  Author,
  BidText,
  BidPrice,
  BidBtn,
  BackOverlay,
  PrevBtn,
  NextBtn
} from './ExploreCard.styled';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import Link from 'next/link';

const ExploreCard = ({ data }): JSX.Element => {
  const router = useRouter();
  const [index, setIndex] = useState(0);
  const { currentUser, login } = useAuthContext();
  const [imgSrc, setImgSrc] = useState<string>('');
  const { isDesktop } = useNavigatorUserAgent();
  const { isMobile } = useWindowSize();

  useEffect(() => {
    if (isDesktop !== null && (!isDesktop || isMobile)) {
      setImgSrc('/new/dead.webp');
    } else {
      setImgSrc('/new/dead.webp');
    }
  }, [isDesktop, isMobile]);

  const handleGetCollectionClick = () => {
    router.push(`/collections/${data[index]['collection_name']}`);
  };

  return 0 < data.length ? (
    <Container>
      <Content>
        <Title>{data[index]['name']}</Title>
        <SubTitle>
          {data[index]['data']['description']}
        </SubTitle>
        <ButtonWrapper>
          <MainBtn
            isBackColor={true}
            onClick={handleGetCollectionClick}>
            Explore Collection
          </MainBtn>
        </ButtonWrapper>
      </Content>
      {data.length <= 0 ? null : <Carousel
            autoPlay
            infiniteLoop
            interval={5000}
            onChange={(index) => setIndex(index)}
            renderArrowPrev={(clickHandler, hasPrev, labelPrev) =>
              hasPrev && (
                  <PrevBtn onClick={clickHandler}>
                      <Image 
                          style={{width: '8px'}}
                          height="12px"
                          src={`/new/path-l.png`} />
                  </PrevBtn>
              )
          }
          renderArrowNext={(clickHandler, hasNext, labelNext) =>
              hasNext && (
                  <NextBtn onClick={clickHandler}>
                      <Image 
                          style={{width: '8px'}}
                          height="12px"
                          src={`/new/path-r.png`} />
                  </NextBtn>
              )
          }
          renderThumbs={() => null}
          renderIndicator={() => null}
      >
        {data.map((item, index) => (
          <Link href={`/collections/${item['collection_name']}`}>
          <a>
            <ImageContainer>
              <BackOverlay />
              <TopWrap>
                <GreyBack>
                  <WhiteText>Featured collection</WhiteText>
                </GreyBack>
              </TopWrap>
              <FloatRight>
              </FloatRight>
                <Image
                  width="100%"
                  alt="Explore"
                  id="explore-card-img"
                  src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`}
                />
              <BottomWrap>
                <NftName>{item['name']}</NftName>
                <Author>By {item['author']}</Author>
              </BottomWrap>
            </ImageContainer>
          </a>
          </Link>
        ))}
      </Carousel>
    }
    </Container>
  ) : null;
};

export default ExploreCard;
