import {
  Dispatch,
  SetStateAction,
  MutableRefObject,
  KeyboardEventHandler,
} from 'react';
import {
  ResultsList,
  ResultListTitle,
  ResultItem,
  ResultItemName,
  SeeAllLink,
  LoadingSearchBox,
  CollectionImg,
  RatingImg
} from './CollectionSearchResultsList.styled';
import { SearchCollection, SearchAuthor } from '../../services/search';
import { Template } from '../../services/templates';
import TemplateIcon from '../TemplateIcon';
import AvatarIcon from '../AvatarIcon';
import { useRouter } from 'next/router';
import Spinner from '../Spinner';
import { useWhitelistContext } from '../Provider';

type Props = {
  input: string;
  collections?: SearchCollection[];
  templates?: Template[];
  authors?: any;
  inputRef: MutableRefObject<HTMLInputElement>;
  resultsListRef: MutableRefObject<HTMLDivElement>;
  clearTextButtonRef: MutableRefObject<HTMLButtonElement>;
  setInput: Dispatch<SetStateAction<string>>;
  search: (string) => void;
  isSearching: boolean;
};

const CollectionSearchResultsList = ({
  input,
  collections,
  authors,
  templates,
  inputRef,
  resultsListRef,
  clearTextButtonRef,
  search,
  setInput,
  isSearching,
}: Props): JSX.Element => {
  const { verifiedData } = useWhitelistContext();
  const router = useRouter();
  const navigatePrevious: KeyboardEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const previousSibling = target.previousElementSibling as HTMLElement;

    if (previousSibling && previousSibling.tagName === 'H3') {
      (previousSibling.previousElementSibling as HTMLElement).focus();
    } else if (previousSibling) {
      previousSibling.focus();
    }
  };

  const navigateNext: KeyboardEventHandler<HTMLElement> = (e) => {
    e.preventDefault();
    const target = e.target as HTMLElement;
    const nextSibling = target.nextElementSibling as HTMLElement;

    if (nextSibling && nextSibling.tagName === 'H3') {
      (nextSibling.nextElementSibling as HTMLElement).focus();
    } else if (nextSibling) {
      nextSibling.focus();
    }
  };

  const handleFirstResultItemKeyDown: KeyboardEventHandler<HTMLElement> = (
    e
  ) => {
    const isUpArrow = e.key === 'ArrowUp';
    const isShiftTab = e.key === 'Tab' && e.shiftKey;
    if (isUpArrow || isShiftTab) {
      e.preventDefault();
      inputRef.current.focus();
      return;
    }

    handleResultItemKeyDown(e);
  };

  const handleResultItemKeyDown: KeyboardEventHandler<HTMLElement> = (e) => {
    const element = e.target as HTMLElement;
    const name = element.innerText;
    switch (e.key) {
      case 'Enter':
        setInput('');
        router.push(element.getAttribute('data-key'));
        break;
      case 'ArrowUp':
        navigatePrevious(e);
        break;
      case 'ArrowDown':
        navigateNext(e);
        break;
      case 'Tab':
        e.preventDefault();
        if (!e.shiftKey && input !== name) {
          setInput(name);
        } else {
          clearTextButtonRef.current.focus();
        }
        break;
      default:
        break;
    }
  };

  const handleClick = (link) => {
    setInput('');
    router.push(link);
  };

  if (isSearching) {
    return (
      <LoadingSearchBox ref={resultsListRef}>
        <Spinner size={45} />
      </LoadingSearchBox>
    );
  }
  if (!input || (!collections.length && !authors.length && !templates.length)) {
    return <></>;
  }
  return (
    <ResultsList ref={resultsListRef}>
      {collections.length ? (
        <ResultListTitle>Collections</ResultListTitle>
      ) : null}
      {collections.map(({ name, img, collection_name, author }, i) => {
        const link = `/collections/${collection_name}`;
        return (
          <ResultItem
            className="collection"
            onKeyDown={
              i + templates.length === 0
                ? handleFirstResultItemKeyDown
                : handleResultItemKeyDown
            }
            onClick={() => handleClick(link)}
            tabIndex={0}
            data-key={link}
            key={`${author} - ${collection_name}`}>
            <CollectionImg src={`${process.env.NEXT_PUBLIC_IPFS_URL}${img}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} />
            <ResultItemName>{name || collection_name}</ResultItemName>
            <RatingImg src={verifiedData.filter((data) => data['name'] == collection_name)[0]['rating'] === 'gold' ? '/new/verified/gold-icon.svg' : 
            verifiedData.filter((data) => data['name'] == collection_name)[0]['rating'] === 'silver' ? '/new/verified/silver-icon.svg' : '/new/verified/bronze-icon.svg'}
            />
          </ResultItem>
        );
      })}
      <SeeAllLink
        onClick={() => search(input)}
        onKeyDown={(e) => {
          e.preventDefault();
          if (e.key === 'ArrowUp') navigatePrevious(e);
          if (e.key === 'Enter') search(input);
        }}>
        See all search results
      </SeeAllLink>
    </ResultsList>
  );
};

export default CollectionSearchResultsList;
