import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { CarouselProvider, Slider, Slide } from 'pure-react-carousel';
import CollectionBox from '../CollectionBox';
import { ReactComponent as Arrow } from '../../public/chevron-right.svg';
import { Collection } from '../../services/collections';
import { Image } from '../../styles/index.styled';
import {
  BoxButton,
  CarouselContainer,
  ChooseCollectionContainer,
  ButtonNext,
  ButtonBack,
  TryAgainButton,
  CreateText
} from './CollectionsCarousel.styled';
import Spinner from '../Spinner';

export type CarouselCollection = Pick<
  Collection,
  'collection_name' | 'name' | 'img'
>;

export type NewCollection = CarouselCollection & {
  collection_name: string;
  name: string;
  img: string;
  description: string;
  royalties: string;
  url: string;
  banner ?: string;
};

type CollectionsCarouselProps = {
  collectionsList: Collection[];
  error?: string;
  isLoading: boolean;
  newCollection?: NewCollection;
  selectedCollection: CarouselCollection;
  getUserCollections: () => Promise<void>;
  setSelectedCollection: Dispatch<SetStateAction<CarouselCollection>>;
  setNewCollection: Dispatch<SetStateAction<NewCollection>>;
  setIsUncreatedCollectionSelected: Dispatch<SetStateAction<boolean>>;
  collectionsWhitelist: any;
};

const CollectionsCarousel = ({
  collectionsList,
  error,
  isLoading,
  newCollection,
  selectedCollection,
  getUserCollections,
  setSelectedCollection,
  setIsUncreatedCollectionSelected,
  collectionsWhitelist
}: CollectionsCarouselProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState<number>(0);
  const [slideStep] = useState<number>(3);
  const [totalSlides, setTotalSlides] = useState<number>(
    collectionsList.length + 1
  );

  const selectCollection = (collection: CarouselCollection) => {
    setSelectedCollection(collection);
    setIsUncreatedCollectionSelected(
      newCollection &&
        collection &&
        collection.collection_name === newCollection.collection_name
    );
  };

  const onClickForward = () => {
    const totalSlides = collectionsList.length + 1;
    const nextSlide = currentSlide + slideStep;
    const maxSlide = totalSlides - slideStep;
    if (nextSlide > maxSlide) {
      setCurrentSlide(maxSlide);
    } else {
      setCurrentSlide(currentSlide + slideStep);
    }
  };

  const onClickBackward = () => {
    const nextSlide = currentSlide - slideStep;
    if (nextSlide < 0) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(nextSlide);
    }
  };

  useEffect(() => {
    setTotalSlides(collectionsList.length + 1);
  }, [collectionsList]);

  const getContent = () => {
    if (isLoading) {
      return (
        <ChooseCollectionContainer>
          <Spinner />
        </ChooseCollectionContainer>
      );
    } else if (error) {
      return (
        <ChooseCollectionContainer>
          <p>Unable to get collections</p>
          <TryAgainButton onClick={getUserCollections}>
            Try again
          </TryAgainButton>
        </ChooseCollectionContainer>
      );
    } else {
      return (
        <ChooseCollectionContainer>
          <CarouselContainer>
            <CarouselProvider
              totalSlides={totalSlides}
              currentSlide={currentSlide}
              naturalSlideHeight={136}
              naturalSlideWidth={144}
              >
              <Slider>
                <Slide index={0} key={0}>
                  <BoxButton onClick={() => window.location.href = '/applylisting'}>
                    <Image
                      width="40px"
                      height="40px"
                      alt="plus icon"
                      src="/plus-icon.svg"
                    />
                    <CreateText>Create</CreateText>
                  </BoxButton>
                </Slide>
                {collectionsList.map((collection, i) => collectionsWhitelist.indexOf(collection.collection_name) < 0 ? (
                  <Slide
                    index={newCollection ? i + 2 : i + 1}
                    key={newCollection ? i + 2 : i + 1}
                    style={{opacity: '0.4'}}>
                    <CollectionBox
                      collection={collection}
                      active={
                        collection.collection_name ===
                        selectedCollection.collection_name
                      }
                    />
                  </Slide>
                ) : (
                  <Slide
                    index={newCollection ? i + 2 : i + 1}
                    key={newCollection ? i + 2 : i + 1}
                    onClick={() => {
                      selectCollection({
                        collection_name: collection.collection_name,
                        name: collection.name,
                        img: collection.img
                      })
                    }}>
                    <CollectionBox
                      collection={collection}
                      active={
                        collection.collection_name ===
                        selectedCollection.collection_name
                      }
                    />
                  </Slide>
                ))}
              </Slider>
              <ButtonBack
                onClick={onClickBackward}
                disabled={currentSlide === 0}>
                <Arrow />
              </ButtonBack>
              <ButtonNext
                onClick={onClickForward}
                disabled={currentSlide >= totalSlides - slideStep}>
                <Arrow />
              </ButtonNext>
            </CarouselProvider>
          </CarouselContainer>
        </ChooseCollectionContainer>
      );
    }
  };

  return getContent();
};

export default CollectionsCarousel;
