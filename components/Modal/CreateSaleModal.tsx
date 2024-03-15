import {
  FC,
  useEffect,
  useState,
  MouseEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import {
  useAuthContext,
  useModalContext,
  CreateSaleModalProps,
  CreateMultipleSalesModalProps,
} from '../Provider';
import InputField from '../InputField';
import {
  Background,
  ModalBox,
  Section,
  CloseIconContainer,
  Title,
  Description,
  HalfButton,
  FeeLabel,
} from './Modal.styled';
import Image from 'next/image';
import {
  RAM_AMOUNTS,
} from '../../utils/constants';
import ProtonSDK from '../../services/proton';
import { useWindowSize } from '../../hooks';
import fees, { ListingFee } from '../../services/fees';
import { DropdownMenu } from '../AssetFormBuy/AssetFormBuy.styled';
import Spinner from '../Spinner';
import toast from "../Toast";

type Props = {
  title: string;
  description: string;
  buttonText: string;
  amount: string;
  numSales: number;
  listingFee: ListingFee;
  createOneSale: any;
  createOneAuction: any;
  setAmount: Dispatch<SetStateAction<string>>;
  setListingFee: Dispatch<SetStateAction<ListingFee>>;
  symbol: string;
  setSymbol: any;
  symbolPre: number;
  setSymbolPre: any;
  duration ?: number;
  setDuration ?: any;
  type ?: string;
  setType ?: any;
  auctionType ?: string;
  setAuctionType ?: any;
};

const SaleModal: FC<Props> = ({
  title,
  description,
  buttonText,
  amount,
  numSales,
  listingFee = {
    display: '0.00',
    raw: null,
  },
  setAmount,
  createOneSale,
  createOneAuction,
  setListingFee,
  symbol,
  setSymbol,
  symbolPre,
  setSymbolPre,
  duration,
  setDuration,
  type,
  setType,
  auctionType,
  setAuctionType
}) => {
  const { closeModal, modalProps } = useModalContext();
  const { currentUser } = useAuthContext();
  const { isMobile } = useWindowSize();
  const [assetId, setAssetId] = useState<string>('');
  const isInvalid = type == 'auction' ? 
  !amount ||
  isNaN(parseFloat(amount)) ||
  parseFloat(amount) === 0 ||
  parseFloat(amount) > 1000000000 ||
  0 === duration ||
  auctionType == 'day' ? 30 < duration :
  auctionType == 'hour' ? 720 < duration : 43200 < duration && duration < 121
  :
  !amount ||
  isNaN(parseFloat(amount)) ||
  parseFloat(amount) === 0 ||
  parseFloat(amount) > 1000000000;

  useEffect(() => {
    const fee = fees.calculateFee({
      numAssets: numSales,
      actor: currentUser ? currentUser.actor : '',
      ramCost: RAM_AMOUNTS.LIST_SALE,
    });
    setListingFee(fee);
  }, [numSales, currentUser]);

  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const getFee = () => (
    <FeeLabel>
      <span>Listing Fee</span>
      <span>≈ {listingFee.display} XUSDC</span>
    </FeeLabel>
  );

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
        {modalProps['assetIds'].length === 0 ? <div style={{marginBottom: '10px'}}><Spinner size={30} /></div> : <DropdownMenu
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
        <DropdownMenu
                name="type"
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                }}>
                <option key="blank" value="sale">
                 SALE
                </option>
                <option key="blank" value="auction">
                 AUCTION
                </option>
        </DropdownMenu>
        <DropdownMenu
                name="Symbol"
                value={symbol}
                onChange={(e) => {
                  setSymbol(e.target.value);
                  if(e.target.value === 'XUSDC'){
                    setSymbolPre(6);
                    const numberAmount = parseFloat(amount).toFixed(6);
                    setAmount(numberAmount);
                  }else{
                    const numberAmount = parseFloat(amount).toFixed(4);
                    setAmount(numberAmount);
                    setSymbolPre(4);
                  }
                }}>
                <option key="blank" value="XPR">
                 XPR
                </option>
        </DropdownMenu>
        {type == 'auction' ? 
        <div style={{display: 'flex'}}>
        <InputField
          inputType="number"
          mb="12px"
          mr="8px"
          min={1}
          max={43200}
          value={duration}
          setValue={setDuration}
          submit={isInvalid ? null : createOneAuction}
          placeholder={`Enter Duration`}
          checkIfIsValid={(input) => {
            const isValid = input > 0 && input <= 43200;
            const errorMessage = `Invalid value`;
            return {
              isValid,
              errorMessage,
            };
          }}
        />
        <DropdownMenu
                name="auctionType"
                value={auctionType}
                onChange={(e) => {
                  setAuctionType(e.target.value);
                }}>
                <option key="blank" value="minute">
                 minutes
                </option>
                <option key="blank" value="hour">
                 hours
                </option>
                <option key="blank" value="day">
                 days
                </option>
        </DropdownMenu>
        </div> : null}
        <InputField
          inputType="number"
          min={1}
          max={1000000000}
          step={1 / 10 ** symbolPre}
          value={amount}
          setValue={setAmount}
          submit={isInvalid ? null : createOneSale}
          placeholder={type == 'auction' ? `Enter Start Bid amount in ${symbol}` : `Enter amount in ${symbol}`}
          onBlur={() => {
            const numberAmount = parseFloat(amount).toFixed(symbolPre);
            setAmount(numberAmount);
          }}
          checkIfIsValid={(input) => {
            const floatAmount = parseFloat(input as string);
            const isValid = floatAmount > 0 && floatAmount <= 1000000000;
            const errorMessage = `Sales price must be between 0 ${symbol} and 1,000,000,000 ${symbol}.`;
            return {
              isValid,
              errorMessage,
            };
          }}
        />
        {getFee()}
        <HalfButton
          disabled={isInvalid}
          fullWidth={isMobile}
          margin="24px 0 0"
          onClick={type == 'sale' ? () => createOneSale(assetId) : () => createOneAuction(assetId)}
        >
          {buttonText}
        </HalfButton>
      </ModalBox>
    </Background>
  );
};

export const CreateSaleModal: FC = () => {
  const { currentUser } = useAuthContext();
  const { closeModal, modalProps } = useModalContext();
  const notify = useCallback((type, message) => {
    toast({ type, message });
  }, []);
  const { fetchPageData } = modalProps as CreateSaleModalProps;
  const [amount, setAmount] = useState<string>('');
  const [listingFee, setListingFee] = useState<ListingFee>({
    display: '0.00',
    raw: null,
  });
  const [symbol, setSymbol] = useState('XPR');
  const [symbolPre, setSymbolPre] = useState(4);
  const [duration, setDuration] = useState(0);
  const [type, setType] = useState('sale');
  const [auctionType, setAuctionType] = useState('day');

  const createOneSale = async (assetId: string) => {
    try {
      const formattedAmount = parseFloat(amount).toFixed(symbolPre);
      await fees.refreshRamInfoForUser(currentUser.actor);
      const finalFee = fees.calculateFee({
        numAssets: 1,
        actor: currentUser ? currentUser.actor : '',
        ramCost: RAM_AMOUNTS.LIST_SALE,
      });
      const res = await ProtonSDK.createSale({
        seller: currentUser ? currentUser.actor : '',
        asset_id: assetId,
        price: `${formattedAmount} ${symbol}`,
        currency: `${symbolPre},${symbol}`,
        listing_fee: finalFee.raw,
      });

      if (res.success) {
        closeModal();
        notify("success", "Success!");
        fetchPageData();
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  const createOneAuction = async (assetId: string) => {
    let newDuration = auctionType == 'day' ? duration * 3600 * 24 : auctionType == 'hour' ? duration * 3600 : duration * 60;
    try {
      const formattedAmount = parseFloat(amount).toFixed(symbolPre);
      const res = await ProtonSDK.createAuction({
        asset_id: assetId,
        starting_bid: `${formattedAmount} ${symbol}`,
        duration: newDuration
      });

      if (res.success) {
        closeModal();
        fetchPageData();
      }
    } catch (err) {
      console.warn(err.message);
    }
  };

  return (
    <SaleModal
      numSales={1}
      title="Listing Price"
      description="Enter the amount you want to sell your NFT for."
      buttonText={type == 'sale' ? "Mark for sale" : "Mark for auction"}
      amount={amount}
      listingFee={listingFee}
      setAmount={setAmount}
      setListingFee={setListingFee}
      createOneSale={createOneSale}
      createOneAuction={createOneAuction}
      symbol={symbol}
      setSymbol={setSymbol}
      symbolPre={symbolPre}
      setSymbolPre={setSymbolPre}
      duration={duration}
      setDuration={setDuration}
      type={type}
      setType={setType}
      auctionType={auctionType}
      setAuctionType={setAuctionType}
    />
  );
};

export const CreateMultipleSalesModal: FC = () => {
  const { currentUser } = useAuthContext();
  const { closeModal, modalProps, setModalProps } = useModalContext();
  const {
    assetIds,
    fetchPageData,
    setIsModalWithFeeOpen,
  } = modalProps as CreateMultipleSalesModalProps;
  const [amount, setAmount] = useState<string>('');
  const [listingFee, setListingFee] = useState<ListingFee>({
    display: '0.00',
    raw: null,
  });
  const [symbol, setSymbol] = useState('XUSDC');
  const [symbolPre, setSymbolPre] = useState(6);
  const numSales = assetIds.length;
  const maxNumSales = 100;

  const createMultipleSales = async () => {
    try {
      const formattedAmount = parseFloat(amount).toFixed(symbolPre);
      await fees.refreshRamInfoForUser(currentUser.actor);
      const finalFee = fees.calculateFee({
        numAssets: numSales,
        actor: currentUser ? currentUser.actor : '',
        ramCost: RAM_AMOUNTS.LIST_SALE,
      });
      const res = await ProtonSDK.createMultipleSales({
        seller: currentUser ? currentUser.actor : '',
        assetIds: assetIds.slice(0, maxNumSales),
        price: `${formattedAmount} ${symbol}`,
        currency: `${symbolPre},${symbol}`,
        listing_fee: finalFee.raw,
      });

      if (!res.success) {
        throw new Error('Unable to list items for sale. Please try again.');
      }

      if (numSales > maxNumSales) {
        setModalProps((prevModalProps) => ({
          ...prevModalProps,
          assetIds: assetIds.slice(maxNumSales),
        }));
        return;
      }

      closeModal();
      setIsModalWithFeeOpen(false);
      fetchPageData();
    } catch (err) {
      console.warn(err.message);
    }
  };

  const createMultipleAuctions = async () => {
    try {
      const formattedAmount = parseFloat(amount).toFixed(symbolPre);
      await fees.refreshRamInfoForUser(currentUser.actor);
      const finalFee = fees.calculateFee({
        numAssets: numSales,
        actor: currentUser ? currentUser.actor : '',
        ramCost: RAM_AMOUNTS.LIST_SALE,
      });
      const res = await ProtonSDK.createMultipleSales({
        seller: currentUser ? currentUser.actor : '',
        assetIds: assetIds.slice(0, maxNumSales),
        price: `${formattedAmount} ${symbol}`,
        currency: `${symbolPre},${symbol}`,
        listing_fee: finalFee.raw,
      });

      if (!res.success) {
        throw new Error('Unable to list items for sale. Please try again.');
      }

      if (numSales > maxNumSales) {
        setModalProps((prevModalProps) => ({
          ...prevModalProps,
          assetIds: assetIds.slice(maxNumSales),
        }));
        return;
      }

      closeModal();
      setIsModalWithFeeOpen(false);
      fetchPageData();
    } catch (err) {
      console.warn(err.message);
    }
  };

  const description = `You have ${
    numSales === 1 ? '1 item' : `${numSales} items`
  } you can list for sale. ${
    numSales > maxNumSales
      ? `You can list ${maxNumSales} items for sale at a time due to network restrictions. `
      : ''
  }Enter the amount you want to sell ${
    numSales === 1 ? 'your NFT' : 'each of your NFTs'
  } for.`;

  const buttonText = `Mark ${
    numSales > maxNumSales ? `${maxNumSales} NFTs` : 'all'
  } for sale`;

  return (
    <SaleModal
      numSales={numSales}
      title="Listing Price"
      description={description}
      buttonText={buttonText}
      amount={amount}
      listingFee={listingFee}
      setAmount={setAmount}
      setListingFee={setListingFee}
      createOneSale={createMultipleSales}
      createOneAuction={createMultipleAuctions}
      symbol={symbol}
      setSymbol={setSymbol}
      symbolPre={symbolPre}
      setSymbolPre={setSymbolPre}
    />
  );
};
