import styled from 'styled-components';

export const BannerWrap = styled.div`
    width: 100%;
    height: 150px;
    background: linear-gradient(#7543E3 0%, #4A1EAD 100%);
    position: absolute;
    left: 0;
`;

export const Banner = styled.div`
    max-width: 944px;
    width: 100%;
    margin: 0 auto;
    padding-top: 25px;
    
    @media(max-width: 598px){
        max-width: 100%;
        padding: 40px 35px;
    }
`;

export const BannerTitle = styled.h2`
    font-style: normal;
    font-weight: 450;
    font-size: 36px;
    line-height: 40px;
    color: #FDFDFD;
`;

export const BannerSubTitle = styled.h3`
    margin-top: 10px;
    font-style: normal;
    font-weight: 450;
    font-size: 16px;
    line-height: 24px;
    color: #FFFFFF;
`;

export const OfferContainer = styled.div`
    max-width: 940px;
    margin: 0 auto;
    padding-top: 150px;
`;

export const OfferTabList = styled.ul`
    display: flex;
    height: 40px;
    border-bottom: 1px solid #4924C4;
`;

export const OfferTab = styled.li<{active: boolean}>`
    color: ${props => props.active ? '#FFF' : '#4924C4'};
    border-bottom: ${props => props.active ? '2px solid #4924C4' : 'none'};
    width: 150px;
    padding-top: 10px;
    text-align: center;
    cursor: pointer;
`;


export const OfferList = styled.div`
    margin-top: 34px;
`;

export const OfferItem = styled.div`
    display: flex;
    border: 2px solid #4924C4;
    box-sizing: border-box;
    border-radius: 15px;
    height: 200px;
    padding: 8px 22px 10px 12px;
    margin-bottom: 16px;
    
    @media(max-width: 598px){
        flex-direction: column;
        height: auto;
        padding: 10px;
    }
`;

export const OfferImg = styled.img`
    min-width: 180px;
    height: 180px;
    border-radius: 10px;
    
    @media(max-width: 598px){
        max-width: 100%;
        height: 280px;
    }
`;


export const OfferRightBox = styled.div`
    margin-left: 37px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    @media(max-width: 598px){
        margin: 0;
        margin-top: 17px;
    }
`;
export const OfferRightTop = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    
    @media(max-width: 598px){
        flex-direction: column;
    }
`; 
export const OfferRightBottom = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 50px;
    @media(max-width: 598px){
        flex-direction: column;
        height: auto;
    }
`;

export const OfferRightLeft = styled.div``;

export const OfferNFTName = styled.h2`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    color: #F0F0F0;
`;
export const OfferCollectionName = styled.h3`
    margin-top: 13px;
    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 23px;
    color: #F0F0F0;
`;
export const OfferRightRight = styled.div``;

export const OfferPrice = styled.h2`
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 32px;
    text-align: right;

    color: #FFFFFF;
    
    @media(max-width: 598px){
        text-align: left;
        margin-top: 12px;
        font-size: 18px;
    }
`;
export const OfferBuyer = styled.h3`
    font-style: normal;
    font-weight: 450;
    font-size: 18px;
    line-height: 32px;
    text-align: right;
    color: #F0F0F0;
    @media(max-width: 598px){
        text-align: left;
    }
`;
export const OfferMsg = styled.h3`
    font-style: normal;
    font-weight: 450;
    font-size: 16px;
    line-height: 32px;
    text-align: right;
    color: #FFFFFF;
    @media(max-width: 598px){
        text-align: left;
    }
`;

export const ButtonWrap = styled.div`
    display: flex;
    justify-content: space-between;
    width: 300px;
    height: 50px;
    align-items: center;
    @media(max-width: 598px){
        width: 100%;
        margin-top: 10px;
    }
`;

export const OfferDate = styled.h3`
    font-style: normal;
    font-weight: 700;
    font-size: 16px;
    line-height: 24px;
    text-align: right;
    color: #4924C4;
`;

export const OfferSerial = styled.h2`
    font-style: normal;
    font-weight: 450;
    font-size: 30px;
    line-height: 24px;
    color: #FFFFFF;
    @media(max-width: 598px){
        margin-top: 10px;
    }
`;