import {
  Container,
  TopWrap,
  Title, 
  ItemWrap,
  Item, 
  ItemName, 
  ItemColumn, 
  ItemContent,
  ItemDetail,
  ItemImgWrap,
  ArrowIcon,
} from './DigitalGalaxyBlog';
import { Image } from '../../styles/index.styled';

const DigitalGalaxyBlog = (): JSX.Element => {
  return (
    <Container>
      <TopWrap>
          <Title>Digital Galaxy blog</Title>
      </TopWrap>
      <ItemWrap>
        <Item>
          <ItemColumn>
            <ItemImgWrap>
              <Image src="/new/create-thumb.svg" width="100%" height="100%" objectFit='contain' />
            </ItemImgWrap>
            <ItemName>How to create a <br />WebAuth Wallet account</ItemName>
            <ItemContent>WebAuth Tutorials (Proton Blockchain)</ItemContent>
            <ItemDetail onClick={() => window.open(`https://www.youtube.com/embed/3mEtLG0z5No?list=PLr0wfX1P6nbZ8Q4zJ-tv0G_VEk4L-GmEv`)}>See more details <ArrowIcon src="/new/arrow-right-pp.svg" /></ItemDetail>
          </ItemColumn>
        </Item>
        <Item>
          <ItemColumn>
            <ItemImgWrap>
              <Image src="/new/send-thumb.svg" width="100%" height="100%" objectFit='contain' />
            </ItemImgWrap>
            <ItemName>How to send crypto in the <br />WebAuth Wallet</ItemName>
            <ItemContent>WebAuth Tutorials (Proton Blockchain)</ItemContent>
            <ItemDetail onClick={() => window.open(`https://www.youtube.com/embed/t00mej5oGWU?list=PLr0wfX1P6nbZ8Q4zJ-tv0G_VEk4L-GmEv`)}>See more details <ArrowIcon src="/new/arrow-right-pp.svg" /></ItemDetail>
          </ItemColumn>
        </Item>
        <Item>
          <ItemColumn>
            <ItemImgWrap>
              <Image src="/new/receive-thumb.svg" width="100%" height="100%" objectFit='contain' />
            </ItemImgWrap>
            <ItemName>How to receive crypto in the<br />WebAuth Wallet</ItemName>
            <ItemContent>WebAuth Tutorials (Proton Blockchain)</ItemContent>
            <ItemDetail onClick={() => window.open(`https://www.youtube.com/embed/S1jshHXmfI0?list=PLr0wfX1P6nbZ8Q4zJ-tv0G_VEk4L-GmEv`)}>See more details <ArrowIcon src="/new/arrow-right-pp.svg" /></ItemDetail>
          </ItemColumn>
        </Item>
      </ItemWrap>
    </Container>
  );
};

export default DigitalGalaxyBlog;
