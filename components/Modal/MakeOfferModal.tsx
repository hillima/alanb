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
import { DropdownMenu } from '../AssetFormBuy/AssetFormBuy.styled';
import Image from 'next/image';
import Spinner from '../Spinner';


export const MakeOfferModal = (): JSX.Element => {
  const { currentUser, currentUserXprBalance } = useAuthContext();
  const { closeModal, modalProps } = useModalContext();
  const [amount, setAmount] = useState<string>('');
  const [memo, setMemo] = useState<string>('');
  const [error, setError] = useState<string>('');
  const { isMobile } = useWindowSize();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [assetId, setAssetId] = useState<string>('');
  const [recipient, setRec] = useState<string>('');
  const [symbol, setSymbol] = useState('XPR');
  const [symbolPre, setSymbolPre] = useState(4);
  const xprbalanceAmount = parseFloat(
    currentUserXprBalance.split(' ')[0]
  );
  const makeoffer = async () => {
    const res = await ProtonSDK.createOffer({
        from: currentUser.actor,
        memo: memo,
        quantity: `${amount} ${symbol}`,
        assetId: assetId,
        recipient: recipient,
        symbol: symbol
    });
    if (!res.success) {
      return setError(`Closed Modal`);
    }

    if (res.success) {
      return closeModal();
    }
  };
  const handleBackgroundClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };
  return (
    <Background onClick={handleBackgroundClick}>
      <ModalBox>
        <Section>
          <Title>Send Offer</Title>
          <CloseIconContainer role="button" onClick={closeModal}>
            <Image src="/close.svg" width={16} height={16} />
          </CloseIconContainer>
        </Section>
        <Description>
            Select an NFT and enter the token & offer amount.
        </Description>
        <Column>
        <DropdownMenu
                name="Symbol"
                value={symbol}
                onChange={(e) => {
                  setSymbol(e.target.value);
                  if(e.target.value === 'XUSDC'){
                    setSymbolPre(6);
                  }else{
                    setSymbolPre(4);
                  }
                }}>
                <option key="blank" value="XPR">
                  XPR
                </option>
          </DropdownMenu>
          {modalProps.length === 0 ? <div style={{marginBottom: '10px'}}><Spinner size={30} /></div> : <DropdownMenu
                name="Available Assets For Sale"
                value={assetId}
                onChange={(e) => {
                    let value = e.target.value.split(',');
                    setAssetId(value[0]);
                    setRec(value[1]);
                    if(amount != ''){
                        setIsValid(true);
                    }
                }}>
                <option key="blank" value="" disabled>
                - - Select a Assets Number - -
                </option>
                {modalProps.length > 0 &&
                modalProps.map(({ asset_id, owner }, index) => (
                    <option key={index} value={[asset_id, owner]}>
                        #{asset_id} - owner "{owner}"
                    </option>
                ))}
          </DropdownMenu>
          }
          <InputField
            value={amount}
            setValue={setAmount}
            onBlur={() => setAmount(parseFloat(amount).toFixed(symbolPre))}
            setFormError={setError}
            placeholder={`Enter amount in ${symbol}`}
            inputType='number'
            mb="16px"
            checkIfIsValid={(input: number) => {
              const isValid = 0 < input && input < 1000000000;
              if(assetId != ''){
                setIsValid(isValid);
              }
              const errorMessage =
                `Sales price must be between 0 ${symbol} and 1,000,000,000 ${symbol}.`;
              if(xprbalanceAmount < input){  
                  const isValid = false;
                  const errorMessage = "not enough funds";
                  return {
                    isValid,
                    errorMessage,
                  };  
              }
              return {
                isValid,
                errorMessage,
              };
            }}
          />
          <InputField
            value={memo}
            setValue={setMemo}
            setFormError={setError}
            placeholder="Memo - OPTIONAL"
            mb="24px"
          />
          <HalfButton
            fullWidth={isMobile}
            onClick={makeoffer}
            margin="0"
            disabled={xprbalanceAmount < parseFloat(amount)}>
            Make Offer
          </HalfButton>
          {error ? <ErrorMessage style={{fontSize: '18px'}}>{error}</ErrorMessage> : null}
        </Column>
      </ModalBox>
    </Background>
  );
};
