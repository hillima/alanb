import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import SearchInput from '../SearchInput';
import { Image } from '../../styles/index.styled';
import {
  Background,
  Nav,
  NavLeftContainer,
  Section,
  AvatarContainer,
  ImageLink,
  DropdownLink,
  GradientBackground,
  DropdownList,
  MobileIcon,
  DesktopIcon,
  DesktopNavLink,
  DesktopOnlySection,
  Name,
  Subtitle,
  Balance,
  OpenSearchButton,
  UserMenuButton,
  UserMenuText,
  CloseIconButton,
  WalletButton,
  ColorCircle,
  DropDownItem,
  DropBalanceWrap,
  DropBalanceCol,
  DropdownProfile,
  ViewProfileText,
  WalletImg,
  ArrowDownIcon
} from './NavBar.styled';
import { useEscapeKeyClose, useNavigatorUserAgent, useWindowSize } from '../../hooks';
import { useAuthContext } from '../Provider';
import { ReactComponent as MagnifyingIcon } from '../../public/icon-light-search-24-px.svg';
import { ReactComponent as CloseIcon } from '../../public/icon-light-close-16-px.svg';
import { TOKEN_SYMBOL } from '../../utils/constants';
import { addPrecisionDecimal } from '../../utils';

type DropdownProps = {
  isOpen: boolean;
  closeNavDropdown: () => void;
};



const UserAvatar = ({ isOpen, avatar, toggleNavDropdown, user, isDesktop }) => {
  const currentUserAvatar = isDesktop ? (
    <UserMenuButton>
      <AvatarContainer>
        <Image
          alt="chain account avatar"
          src={avatar == "data:image/jpeg;base64,''" || avatar == '' ? '/default-avatar.png' : avatar}
          width="24px"
          height="24px"
          style={{borderRadius: '50%'}}
        />
        <ColorCircle color={"#12B76A"} />
      </AvatarContainer>
      <UserMenuText>{user.acc}</UserMenuText>
      <ArrowDownIcon />
    </UserMenuButton>
  ) : (
    <div style={{width: '40px'}}>
        <Image
          alt="chain account avatar"
          src={avatar == "data:image/jpeg;base64,''" || avatar == '' ? '/default-avatar.png' : avatar}
          width="40px"
          height="40px"
          style={{borderRadius: '50%'}}
        />
    </div>
  );

  const mobileNavbarIcon = isOpen ? (
    <CloseIconButton>
      <CloseIcon />
    </CloseIconButton>
  ) : (
    currentUserAvatar
  );

  return (
    <>
      <DesktopIcon onClick={toggleNavDropdown} role="button">
        {currentUserAvatar}
      </DesktopIcon>
      <MobileIcon onClick={toggleNavDropdown} role="button">
        {mobileNavbarIcon}
      </MobileIcon>
    </>
  );
};

const Dropdown = ({ isOpen, closeNavDropdown }: DropdownProps): JSX.Element => {
  const router = useRouter();
  const { currentUser, currentUserXprBalance, logout } = useAuthContext();
  const { isMobile, isTablet } = useWindowSize();
  useEscapeKeyClose(closeNavDropdown);

  const routes =
    isMobile || isTablet
      ? [
        {
          name: 'My NFTs',
          path: '',
          onClick: () => {
            closeNavDropdown();
            router.push(`/user/${currentUser.actor}`);
          },
          iconPath: '/new/mynfts.svg',
          isRed: false,
        },
        {
          name: 'Verified Minting',
          path: '',
          onClick: () => {
            closeNavDropdown();
            router.push(`/create`);
          },
          iconPath: '/new/sidebar/apply-listing.svg',
          isRed: false,
          },
          {
            name: 'Logout',
            path: '',
            onClick: () => {
              closeNavDropdown();
              logout();
              router.push('/');
            },
            iconPath: '/new/logout.svg',
            isRed: false,
          },
        ]
      : [
        {
          name: 'My NFTs',
          path: '',
          onClick: () => {
            closeNavDropdown();
            router.push(`/user/${currentUser.actor}`);
          },
          iconPath: '/new/mynfts.svg',
          isRed: false,
        },
        {
          name: 'Verified Minting',
          path: '',
          onClick: () => {
            closeNavDropdown();
            router.push(`/create`);
          },
          iconPath: '/new/sidebar/apply-listing.svg',
          isRed: false,
        },
        {
            name: 'Logout',
            path: '',
            onClick: () => {
              closeNavDropdown();
              logout();
              router.push('/');
            },
            iconPath: '/new/logout.svg',
            isRed: false,
          },
        ];

  return (
    <DropdownList isOpen={isOpen}>
      {currentUser && currentUser.avatar ? (
        <DropdownProfile>
          <AvatarContainer>
            <Image
              alt="chain account avatar"
              src={currentUser.avatar == "data:image/jpeg;base64,''" || currentUser.avatar == '' ? '/default-avatar.png' : currentUser.avatar}
              width="43px"
              height="43px"
              style={{borderRadius: '50%'}}
            />
            <ColorCircle color={"#12B76A"} />
          </AvatarContainer>
          <DropBalanceCol>
            <UserMenuText>{currentUser.acc}</UserMenuText>
          </DropBalanceCol>
          <Image src="/new/pf-arrow-down.svg" width="20px" height="20px" style={{  transform: 'rotate(180deg)', position: 'absolute', right: '26px', cursor:'pointer'}} onClick={closeNavDropdown}/>
        </DropdownProfile>
      ) : null}
      <DropBalanceWrap>
        <Image src="/new/wallet-xpr.svg" width="33px" height="33px" />
        <DropBalanceCol>
          <Subtitle>Main Wallet</Subtitle>
          <Balance>{`${addPrecisionDecimal(currentUserXprBalance.substring(0, currentUserXprBalance.indexOf('.')), 0, false)} XPR` || `0.0000 ${TOKEN_SYMBOL}`}</Balance>
        </DropBalanceCol>
      </DropBalanceWrap>
      {routes.map(({ name, path, onClick, isRed, iconPath }) =>
        path ? (
          <Link href={path} passHref key={name}>
            <DropdownLink onClick={onClick}>{name}</DropdownLink>
          </Link>
        ) : (
          <DropDownItem>
            <Image src={iconPath} width="16px" height="16px" />
            <DropdownLink tabIndex={0} onClick={onClick} key={name} red={isRed}>
              {name}
            </DropdownLink>
          </DropDownItem>
        )
      )}
    </DropdownList>
  );
};

const DesktopNavRoutes = () => {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  const routes = [
    // {
    //   name: 'Explore',
    //   path: '/',
    // },
    // {
    //   name: 'My Items',
    //   path: `/user/${currentUser ? currentUser.actor : ''}`,
    // },
    // {
    //   name: 'Create',
    //   path: `/create`,
    // },
  ];

  return (
    <DesktopOnlySection>
      {routes.map(({ name, path }) => {
        const isActive = router.pathname.split('/')[1] === path.split('/')[1];
        const shouldRefresh =
          router.pathname.includes('create') && path.includes('create');
        const isHidden = !currentUser;
        const refreshPage = () => router.reload();
        return isHidden ? null : (
          <Link href={path} passHref key={name}>
            <DesktopNavLink
              isActive={isActive}
              onClick={shouldRefresh ? refreshPage : null}>
              {name}
            </DesktopNavLink>
          </Link>
        );
      })}
    </DesktopOnlySection>
  );
};

const NavBar = ({ setMobileHide, mobileHide }): JSX.Element => {
  const { currentUser, login } = useAuthContext();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoginDisabled, setIsLoginDisabled] = useState<boolean>(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState<boolean>(false);
  const { isDesktop } = useNavigatorUserAgent();

  const toggleNavDropdown = () => {
    setMobileHide(true);
    setIsOpen(!isOpen);
  }

  const closeNavDropdown = () => setIsOpen(false);

  const connectWallet = async () => {
    setIsLoginDisabled(true);
    await login();
    closeNavDropdown();
    setIsLoginDisabled(false);
  };

  const mobileSearchHiddenNavItems = isMobileSearchOpen ? null : (
    <>
      <OpenSearchButton onClick={() => {
        setIsMobileSearchOpen(true);
        setMobileHide(true);
      }}>
        <MagnifyingIcon />
      </OpenSearchButton>
      {currentUser && currentUser.avatar ? (
        <UserAvatar
          isOpen={isOpen}
          avatar={currentUser.avatar}
          toggleNavDropdown={toggleNavDropdown}
          user={currentUser}
          isDesktop={isDesktop}
        />
      ) : (
        <WalletButton disabled={isLoginDisabled} onClick={connectWallet}>
          <><WalletImg></WalletImg>{isDesktop ? <span>Connect Wallet</span> : null}</>
        </WalletButton>
      )}
    </>
  );

  return (
    <Background isMobileSearchOpen={isMobileSearchOpen || isOpen}>
      <Nav>
        <NavLeftContainer>
          {!isDesktop ? <div style={{display: 'flex'}}>
            <button onClick={() => setMobileHide(!mobileHide)}><Image src="/menu-icon.svg" width='24px' height='24px' /></button>
            <Image width="45px" height="auto" alt="logo" src="/logo-full.svg" onClick={() => window.location.href = '/'} style={{marginLeft: '10px'}} /> 
          </div> : null}
          <SearchInput
            isMobileSearchOpen={isMobileSearchOpen}
            closeMobileSearch={() => setIsMobileSearchOpen(false)}
            placeholder="Search auctions, collections, or creators"
          />
        </NavLeftContainer>
        <Section>
          <DesktopNavRoutes />
          {mobileSearchHiddenNavItems}
        </Section>
        <Dropdown isOpen={isOpen} closeNavDropdown={closeNavDropdown} />
        <GradientBackground isOpen={isOpen} onClick={closeNavDropdown} />
      </Nav>
    </Background>
  );
};

export default NavBar;
