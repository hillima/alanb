import { useWindowSize } from '../../hooks';
import {
    ItemWrap,
    ItemImgWrap,
    Item,
    ColName,
    BottomWrap,
    BetweenWrap,
    NormalText,
    PurpleText,
    ItemCount
} from './UserCollectionView.styled';
import { Image } from '../../styles/index.styled';

const UserCollectionView = ({data}): JSX.Element => {
    const size = useWindowSize();
    return (
        <ItemWrap columns={Math.floor(size['windowWidth'] / 258)}>
            {data.map((item => (
                <Item onClick={() => window.location.href = `/collections/${item['assets'][0]['collection']['collection_name']}`}>
                            <ItemImgWrap>
                                <Image src={`${process.env.NEXT_PUBLIC_IPFS_URL}${item['assets'][0]['collection']['img']}?pinataGatewayToken=${process.env.NEXT_PUBLIC_PINATA_ACCESS_KEY}`} width="100%" height="100%" />
                                <ItemCount>
                                    {item['assets'].length} items
                                </ItemCount>
                            </ItemImgWrap>
                            <BottomWrap>
                                <ColName>{item['assets'][0]['collection']['name']}</ColName>
                                <BetweenWrap>
                                    <NormalText>Floor</NormalText>
                                    <PurpleText><Image src="/new/price-xpr.svg" width='20.74px' height='22.86px' style={{marginRight:'5px'}} />{item['floor'] == undefined ? '--' : `${item['floor']} XPR`}</PurpleText>
                                </BetweenWrap>
                                <BetweenWrap>
                                    <NormalText>Total value</NormalText>
                                    <PurpleText><Image src="/new/price-xpr.svg" width='20.74px' height='22.86px' style={{marginRight:'5px'}} />{item['total'] == undefined ? '--' : `${item['total']} XPR`}</PurpleText>
                                </BetweenWrap>
                            </BottomWrap>
                </Item>
            )))}
        </ItemWrap>
    );
};

export default UserCollectionView;
