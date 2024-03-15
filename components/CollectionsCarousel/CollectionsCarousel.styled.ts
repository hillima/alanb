import styled from 'styled-components';
import { StyledButton } from '../Button/Button.styled';

export const BoxButton = styled.button`
  border: none;
  background: none;
  border-radius: 8px;
  border: 1px solid #e6e6e6;
  width: 150px;
  min-width: 150px;
  margin-right: 20px;
  height: 125px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  color: #1a1a1a;
  cursor: pointer;
  outline: none;

  span {
    margin-top: 8px;
  }

  img{
    width: 40px !important;
  }
  :hover,
  :focus-visible {
    border: 1px solid #7B0A75;
  }
`;

export const CarouselContainer = styled.div`
  width: 100%;
  overflow: hidden;
  
  .carousel {
    overflow: hidden;
    outline: none;
    position: unset;
    .carousel__slider {
      outline: none;
    }
  }

  .carousel__slider-tray {
    display: flex;
    flex-direction: row;
    outline: none;
    width: max-content !important;
    align-items: stretch;
    transition: 0.5s;
  }


  ul {
    outline: none;
    width: max-content !important;
    align-items: stretch;
    transition: 0.5s;
    li {
      width: initial !important;
      padding-bottom: 0px !important;
      outline: none;
    }
  }
`;

export const ChooseCollectionContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
  justify-content: center;
  align-items: center;
  max-height: 180px;
  padding-top: 20px;
  padding-bottom: 20px;
`;

export const ButtonNext = styled.button`
  position: absolute;
  left: calc(100% - 25px);
  top: calc(50% - 22px);
  width: 32px;
  height: 32px;
  background-color: #7B0A75;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  outline: none;
  border: none;
  box-shadow: 0px 2px 5px rgb(210, 210, 210);

  :disabled {
    display: none;
  }

  :hover {
    cursor: pointer;
  }
`;

export const ButtonBack = styled.button`
  position: absolute;
  right: calc(100% - 16px);
  top: calc(50% - 22px);
  width: 32px;
  height: 32px;
  background-color: #7B0A75;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  transform: rotate(180deg);
  outline: none;
  border: none;
  box-shadow: 0px -2px 5px rgb(210, 210, 210);

  :disabled {
    display: none;
  }

  :hover {
    cursor: pointer;
  }
`;

export const TryAgainButton = styled(StyledButton)`
  width: 110px;
  height: 32px;
  margin-top: 20px;
  padding: 3px 16px;
  background: #f2f2f2;
  color: #752eeb;
  font-size: 14px;
  border-radius: 4px;

  :active,
  :hover,
  :focus {
    background: #752eeb;
    color: #f2f2f2;
  }
`;


export const CreateText = styled.span`
  margin-top: 9px;
  font-family: 'Futura';
  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 21px;
  text-align: center;
  color: #9BA2AD;
`;