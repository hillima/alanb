import { Checkbox } from '@mui/material';
import Image from 'next/image';
import { Input } from '../InputField/InputField.styled';
import {
    Wrap,
    TraitWrap,
    TraitTop,
    TraitTitle,
    TraitCnt,
    TraitValue,
    RightWrap,
    ValueWrap,
    Title,
    MainBtn,
    StatusWrap,
    PriceWrap,
    PriceInputWrap,
    CloseIcon
} from './FilterTab.styled';
import Toggle from 'react-toggle';


export const FilterTab = ({isDesktop, setFilterHide, filterKeys, filterValues, selectValue, selectedValues, active, setActive, isBuy, setBuy, saleLength, minValue, minChange, maxValue, maxChange, priceApply}): JSX.Element => (
    <Wrap>  
        {!isDesktop ? <CloseIcon onClick={() => setFilterHide(true)}/> : null}
        <Title>Status</Title>      
        <StatusWrap>
            <label style={{display: 'flex', alignItems: 'center'}}>
                <span style={{marginRight: '15px', fontSize: '14px'}}>Buy Now</span>
                <Toggle
                    checked={isBuy}
                    defaultChecked={isBuy}
                    icons={false}
                    onChange={() => setBuy(!isBuy)} 
                    disabled={saleLength == 0}
                />
            </label>
            {/* <MainBtn isBackColor={saleLength != 0 && isBuy} style={{width: '45%'}} onClick={() => setBuy(true)} disabled={saleLength == 0}>Buy now</MainBtn>
            <div style={{width: '24px'}} />
            <MainBtn isBackColor={saleLength == 0 || !isBuy} style={{width: '55%'}} onClick={() => setBuy(false)} disabled={saleLength == 0}>Not for sale</MainBtn> */}
        </StatusWrap>
        <Title>Price</Title>
        <PriceWrap>
            <PriceInputWrap>
                <Input placeholder='Min' onChange={(e) => minChange(e.target.value)} value={minValue} />
                <div style={{width: '24px'}} />
                <Input placeholder='Max' onChange={(e) => maxChange(e.target.value)} value={maxValue} />
            </PriceInputWrap>
            <MainBtn isBackColor={false} onClick={priceApply} disabled={saleLength == 0}>Apply</MainBtn>
        </PriceWrap>
        {filterKeys.map((key, index) => {
            return (
                <TraitWrap>
                    <TraitTop onClick={() => {
                        let newArr = active;
                        newArr[index] = !newArr[index];
                        setActive([...newArr]);
                    }}>
                        <TraitTitle>{key}</TraitTitle>
                        <RightWrap>
                            <TraitCnt>{filterValues[key].length}</TraitCnt>
                            <Image 
                                src={active[index] ? "/new/arrow-down-active.svg" : '/new/arrow-down.svg'} 
                                width="16px" 
                                height='16px' 
                                style={active[index] ? { transition: '.5s ease-in-out', transform: 'rotate(-180deg)', cursor: 'pointer'} : {cursor: 'pointer', transition: '.5s ease-in-out'}} 
                            />
                        </RightWrap>
                    </TraitTop>
                    {active[index] ? filterValues[key].map(value => (
                        <ValueWrap>
                            <Checkbox checked={0 < selectedValues.filter(obj => obj[key] == value).length} onClick={() => selectValue(value, key)}  style={{padding: 0, marginRight: '8px', color: '#7B0A75'}} />
                            <TraitValue>{value == '' ? 'NONE' : value}</TraitValue>
                        </ValueWrap>
                    )) : null}
                </TraitWrap>
        )})}
    </Wrap>
)




