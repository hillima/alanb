import {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
  FC,
} from 'react';
import { useRouter } from 'next/router';
import { getFromApi, postFromApi } from '../../utils/browser-fetch';
type verifiedObj = {
  rating: string;
  name: string;
}
interface Whitelist {
  collectionsWhitelist: string[];
  verifiedData: verifiedObj[];
}

interface WhitelistContext extends Whitelist {
  isLoadingWhitelist: boolean;
}

interface Props {
  children: JSX.Element | JSX.Element[];
}

const WhitelistContext = createContext<WhitelistContext>({
  collectionsWhitelist: [],
  verifiedData: [],
  isLoadingWhitelist: true,
});

export const useWhitelistContext = (): WhitelistContext => {
  const context = useContext(WhitelistContext);
  return context;
};

export const WhitelistProvider: FC<Props> = ({ children }) => {
  const [isLoadingWhitelist, setisLoadingWhitelist] = useState<boolean>(true);
  const [collectionsWhitelist, setCollectionsWhitelist] = useState<string[]>([]);
  const [verifiedData, setVerifiedData] = useState<verifiedObj[]>([]);
  const { asPath: routerPath } = useRouter();
  
  const getList = async () => {
    setisLoadingWhitelist(true);
    if(collectionsWhitelist.length == 0 && verifiedData.length == 0){
      const res = await getFromApi(`/api/data/whitelist`);
      const whiteList = res.data['whitelistName'];
      const verifiedValue = res.data['verifiedValue'];

      setCollectionsWhitelist(whiteList);
      setVerifiedData(verifiedValue);
    }
    setisLoadingWhitelist(false);
  };

  useEffect(() => {
    getList();
  }, []);

  useEffect(() => {
    if (routerPath.includes('/search')) {
      getList();
    }
  }, [routerPath]);

  const value = useMemo<WhitelistContext>(
    () => ({
      collectionsWhitelist,
      isLoadingWhitelist,
      verifiedData
    }),
    [
      collectionsWhitelist,
      isLoadingWhitelist,
      verifiedData
    ]
  );

  return (
    <WhitelistContext.Provider value={value}>
      {children}
    </WhitelistContext.Provider>
  );
};
