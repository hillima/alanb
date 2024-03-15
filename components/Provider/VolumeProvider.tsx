import {
    createContext,
    useState,
    useContext,
    useEffect,
    useMemo,
    FC,
  } from 'react';
import axios from 'axios';

  interface VolumeContext {
    volume: any;
  }
  
  interface Props {
    children: JSX.Element | JSX.Element[];
  }
  
  const VolumeContext = createContext<VolumeContext>({
    volume: [],
  });
  
  export const useVolumeContext = (): VolumeContext => {
    const context = useContext(VolumeContext);
    return context;
  };
  
  export const VolumeProvider: FC<Props> = ({ children }) => {
    const [volume, setData] = useState([]);

    const marketApi = async () => {
      try{
        const data = await axios.get(`https://www.api.bloks.io/proton/tokens/XPR-proton-eosio.token`)
        setData(data.data);
      } catch(e) {
        return;
      }
    }
    useEffect(() => {
      marketApi();
    }, []);

    const value = useMemo<VolumeContext>(
      () => ({
        volume,
      }),
      [
        volume,
      ]
    );
  
    return (
      <VolumeContext.Provider value={value}>
        {children}
      </VolumeContext.Provider>
    );
  };