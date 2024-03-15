import { useState, useRef, memo } from 'react';
import { Image } from '../../styles/index.styled';
import {
  PageHeaderContainer,
  ImageContainer,
  RoundButton,
  Name,
  ButtonContainer,
  VerifiedIconContainer,
  PageHeaderAvatarContainer,
  BlockName
} from './UserPageHeader.styled';
import { ReactComponent as MoreIcon } from '../../public/more.svg';
import { ReactComponent as VerifiedIcon } from '../../public/icon-light-verified-24-px.svg';
import { useClickAway } from '../../hooks';
import { MODAL_TYPES, useModalContext } from '../Provider';

type UserPageHeaderProps = {
  user : any;
};

const UserPageHeader = ({
  user
}: UserPageHeaderProps): JSX.Element => {
  const [shareActive, setShareActive] = useState<boolean>(false);
  const shareRef = useRef(null);
  const { openModal } = useModalContext();
  useClickAway(shareRef, () => setShareActive(false));

  const avatarImg = user.avatar != '/default-avatar.png'
    ? `data:image/jpeg;base64,${user.avatar}`
    : '/default-avatar.png';

  const displayImg = avatarImg;


  const shareButton = (
    <RoundButton
      size="40px"
      ref={shareRef}
      onClick={() => setShareActive(!shareActive)}>
      <MoreIcon />
      {/* <ShareOnSocial top="50px" active={shareActive} /> */}
    </RoundButton>
  );

  const buttons =  (
    <ButtonContainer>
      <div style={{width: 'auto', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff1a', borderRadius: '8px', padding: '10px 20px'}}>
        <Image src="/new/block-icon.svg" width='24px' height='24px' />
        <BlockName>{user.acc}</BlockName>
      </div>
      <div style={{width: '20px'}}/>
      {/* <div style={{width: '162px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#F7F8FA', borderRadius: '4px', cursor: 'pointer'}}
        onClick={() => {
          openModal(MODAL_TYPES.EDIT_PROFILE);
        }}
      >
        <Image src="/user/user-edit-icon.svg" width='16px' height='16px' style={{marginRight: '11px'}} />
        <BlockName>Edit profile</BlockName>
      </div> */}
      <div style={{width: '20px'}}/>
      <div style={{width: 'auto', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#ffffff1a', borderRadius: '8px', padding: '10px 20px', cursor: 'pointer'}} onClick={() => window.location.href = '/applylisting'}>
        <BlockName>Apply for listing</BlockName>
      </div>
      
    </ButtonContainer>
  );

  return (
    <PageHeaderContainer>
      <PageHeaderAvatarContainer>
        <ImageContainer>
          <Image
            width="100%"
            height="100%"
            src={displayImg == "data:image/jpeg;base64,''" ? '/default-avatar.png' : displayImg}
            objectFit="cover"
          />
        </ImageContainer>
        {user.isLightKYCVerified && (
          <VerifiedIconContainer>
            <VerifiedIcon />
          </VerifiedIconContainer>
        )}
      </PageHeaderAvatarContainer>
      <Name>{user.name}</Name>
      {buttons}
    </PageHeaderContainer>
  );
};

export default memo(UserPageHeader);
