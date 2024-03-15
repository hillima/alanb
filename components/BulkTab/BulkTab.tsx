import { addPrecisionDecimal } from '../../utils';
import {
    Wrap,
    BulkTop,
    Title,
    ClearText,
    Item,
    ItemLeft,
    CloseImg,
    ItemRight,
    Name,
    Price,
    ItemImg,
    CloseWrap,
    TotalWrap,
    TotalText,
    TotalPrice,
    MainBtn,
    BuyContent
} from './BulkTab.styled';


export const BulkTab = ({selectedCards, setCard, totalPrice, bulkBuy}): JSX.Element => (
    <Wrap>  
       <BulkTop>
            <Title>Bulk Buy ({selectedCards.length})</Title>
            <ClearText onClick={() => setCard([])}>Clear</ClearText>
       </BulkTop>
       {selectedCards.map((item) => (
            <Item>
                <ItemLeft>
                    <CloseWrap onClick={() => {
                        let newArr = selectedCards;
                        let index = selectedCards.findIndex((tem) => tem['sale_id'] == item['sale_id']);
                        newArr.splice(index, 1);
                        setCard([...newArr]);
                    }}>
                        <CloseImg src="/selected-close.svg" />
                    </CloseWrap>
                    <ItemImg src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['data']['image']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}&img-width=400`} /> 
                </ItemLeft>
                <ItemRight>
                    <Name>{item['data']['name']}</Name>
                    <Price>{addPrecisionDecimal(item['listing_price'], 4, false)} XPR</Price>
                </ItemRight>
            </Item>
       ))}
       <TotalWrap>
            <TotalText>Total price</TotalText>
            <TotalPrice>{addPrecisionDecimal(totalPrice(), 4, false)} XPR</TotalPrice>
       </TotalWrap>
       <MainBtn onClick={bulkBuy}>Buy now</MainBtn>
       <BuyContent>
        By clicking "Buy now", you agree to the Digital Galaxy Terms of Service. Each transaction will incure non-refundable gas fees.
       </BuyContent>
    </Wrap>
)




