import styled, { keyframes } from 'styled-components';
import { breakpoint } from '../../styles/Breakpoints';

const placeHolderShimmer = keyframes`
  0% {
    background-position: -500px 0
  }
  100% {
    background-position: 500px 0
  }
`;
export const CardBottom = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding-left: 20px;
  padding-bottom: 20px;
  ${breakpoint.mobile`
    padding-left: 5px;
    padding-bottom: 10px;
  `}
`;
const loadingAsset = keyframes`
  0% {
    background-color: #ffffff;
  }
  50% {
    background-color: #eaeaea;
  }
  100% {
    background-color: #ffffff;
  }
`;

type CardProps = {
  hasMultiple: boolean;
};

export const Card = styled.article<CardProps>`
  padding: 0;
  -webkit-box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
  border-radius: 10px 10px 10px 10px;
  border: 3px solid #7b76e6;
  margin-bottom: 10px;
  position: relative;
  -webkit-transition: all .2s;
  transition: all .2s;
  top: 0;
  background-color: #000;

  :hover {
    transform: scale(1.02);
  }

  :focus-visible {
    transform: scale(1.02);
  }
  ${breakpoint.mobile`
    margin-bottom: 10px;
`}
`;

export const Row = styled.div`
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
  color: #FFF;
  display: flex;
  align-items: center;
  position: relative;
  margin-top: -30px;
  padding: 7px 20px 7px 9px;
  border-radius: 22px;
  -webkit-box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
  box-shadow: 0 3px 6px 0 rgb(0 0 0 / 16%);
  border: 2px solid #FFF;
  background-color: #000;
  z-index: 2;
  height: 50px;
  width: calc(100% - 20px);
  ${breakpoint.mobile`
    width: calc(100% - 10px);
    padding: 5px;
  `}
`;

export const Title = styled.h1`
  font-size: 21px;
  padding-left: 10px;
  line-height: 32px;
  color: #FFFFFF;
  margin-top: 20px;
  margin-bottom: 8px;
  ${breakpoint.mobile`
    margin-top: 10px;
    font-size: 16px;
    margin-bottom: 0;
  `}
`;

export const Text = styled.span`
  font-size: 16px;
  line-height: 24px;
  color: #FFFFFF;
  text-align: left;
  max-width: 190px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  ${breakpoint.mobile`
    font-size: 14px;
    line-height: 16px;
    max-width: 95px;
  `}
`;

export const Price = styled.span`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 24px;
  line-height: 24px;
  color: #FFFFFF;
  text-align: left;
  padding-left: 10px;
  padding-right: 20px;
  max-width: 100%;
  overflow: hidden;
  img{
    width: 32px;
    height: 32px;
  }
  ${breakpoint.mobile`
    font-size: 18px;
    padding-right: 10px;
    img{
      width: 24px;
      height: 24px;
    }
  `}
`;

export const CollectionNameButton = styled.button`
  display: flex;
  align-items: center;
  background-color: transparent;
  outline: none;
  border: none;
  z-index: 1;
  cursor: pointer;
`;

export const GreyText = styled.span`
  color: #808080;
  margin-bottom: 8px;
  padding-left: 10px;
  ${breakpoint.mobile`
    font-size: 12px;
  `}
`;

export const Tag = styled.div`
  font-family: CircularStdBold;
  font-size: 10px;
  line-height: 16px;
  letter-spacing: 1px;
  position: absolute;
  bottom: 0;
  left: 0;
  margin: 16px;
  padding: 8px 16px;
  opacity: 0.6;
  border-radius: 4px;
  background-color: #000000;
  color: #fff;
`;

export const PlaceholderPrice = styled.div`
  height: 8px;
`;

export const ShimmerBlock = styled(PlaceholderPrice)`
  animation: ${placeHolderShimmer} 1s linear infinite;
  background: linear-gradient(to right, #eeeeee 8%, #e7e7e7 18%, #eeeeee 33%);
  background-size: 1000px 18px;
  width: 200px;
  height: 14px;
`;

export const PlaceholderAsset = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  animation: ${loadingAsset} 1s infinite;
`;
