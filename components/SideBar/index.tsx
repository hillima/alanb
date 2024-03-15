import Link from 'next/link';
import { memo } from 'react';
import { DesktopIcon, ImageLink } from '../NavBar/NavBar.styled';
import { Wrap, Zone, Title, Tab, TabText, DeskTopImg, ColIcon, AucIcon, CreIcon, AppIcon, ApAuIcon, IntIcon, 
  DeskTopSmImg,
  SocialZone, 
  SocialItem} from './SideBar';
import { useAuthContext } from '../Provider';
import proton from '../../services/proton';
import { useNavigatorUserAgent } from '../../hooks';


const Logo = ({ hide }): JSX.Element => {
  return (
    <Link href="/" passHref>
      <ImageLink>
        {!hide ? 
          <DesktopIcon style={{paddingLeft: '16px', paddingRight: '60px'}}>
            <DeskTopImg />
          </DesktopIcon> :
          <DesktopIcon>
            <DeskTopSmImg />
          </DesktopIcon>
        }
      </ImageLink>
    </Link>
  );
};
const marketzone = ['Collections', 'Auctions'];
const marketPath = ['/collections', '/auctions'];
const creatorszone = ['Create and Verify New Collection'];
const creatorpath = ['/applylisting'];
const introzone = ['Support', 'Verification Process'];
const SideBar = ({ hide, active, mobileHide, setHide }): JSX.Element => {
  const { currentUser } = useAuthContext();
  const { isDesktop } = useNavigatorUserAgent();
  return isDesktop ? (
  <Wrap hide={hide} onMouseOver={() => setHide(false)} onMouseLeave={() => setHide(true)}>
    <Logo hide={hide} />
    <Zone>
      <Title hide={hide}>Marketplace</Title>
      {marketzone.map((item, index) => (
      <Link href={marketPath[index]}>
        <a> 
          <Tab active={-1 < active.indexOf(marketPath[index])}>
              {
              item == 'Collections' ? 
              <ColIcon 
                active={-1 < active.indexOf(marketPath[index])}
              /> : 
              item == 'Auctions' ?
              <AucIcon 
                active={-1 < active.indexOf(marketPath[index])} 
              /> : 
              <CreIcon 
                active={-1 < active.indexOf(marketPath[index])}
              />}
              <TabText id="tab-text" active={-1 < active.indexOf(marketPath[index])} hide={hide}>{item}</TabText>
            </Tab>
          </a>
        </Link>
      ))}
    </Zone>
    <Zone>
      <Title hide={hide}>For creators</Title>
      {creatorszone.map((item, index) => currentUser != undefined ? (
          <Link href={'/applylisting'}>
             <a> 
            <Tab active={-1 < active.indexOf(creatorpath[index])}>
              {
                item == 'Create and Verify New Collection' ? 
                <AppIcon 
                  active={-1 < active.indexOf(creatorpath[index])}
                /> : <ApAuIcon active={-1 < active.indexOf(creatorpath[index])} />
              }
              <TabText id="tab-text" active={-1 < active.indexOf(creatorpath[index])} hide={hide}>{item}</TabText>
            </Tab>
          </a>
        </Link>
      ) : 
        <Tab active={-1 < active.indexOf(creatorpath[index])} style={{cursor: 'pointer'}} onClick={() => proton.login().then(res => {
          if(res.error === ''){
            window.location.href = '/applylisting';
          }
        })}>
          {
            item == 'Create and Verify New Collection' ? 
            <AppIcon 
              active={-1 < active.indexOf(creatorpath[index])}
            /> : <ApAuIcon active={-1 < active.indexOf(creatorpath[index])} />
          }
          <TabText id="tab-text" active={-1 < active.indexOf(creatorpath[index])} hide={hide}>{item}</TabText>
        </Tab>
      )}
    </Zone>
    <Zone>
      <Title hide={hide}>Intro to Digital Galaxy</Title>
      {introzone.map((item, index) => (
      <Tab active={-1 < active.indexOf(introzone[index])} onClick={() => window.open(item == 'Support' ? 'https://support.digital-galaxy.io/' : 'https://support.digital-galaxy.io/knowledge-base/make-a-title-about-proton-nfts-or-whatever/')}>
        <IntIcon 
          active={-1 < active.indexOf(introzone[index])}
        />
        <TabText id="tab-text" active={-1 < active.indexOf(introzone[index])} hide={hide}>{item}</TabText>
      </Tab>
      ))}
    </Zone>
    <SocialZone hide={hide}>
      <SocialItem hide={hide} onClick={() => window.open('https://www.tiktok.com/@digitalgalaxy1')}><img src="/new/icons/tiktok.svg" height="20px" width="20px" />TikTok</SocialItem>
      <SocialItem hide={hide} onClick={() => window.open('https://discord.gg/vcg3khuKPG')}><img src="/new/icons/discord.svg" height="20px" width="20px" /> Discord</SocialItem>
      <SocialItem hide={hide} onClick={() => window.open('https://twitter.com/DigitalGalaxyio')}><img src="/new/icons/twitter.svg" height="20px" width="20px" />Twitter</SocialItem>
    </SocialZone>
  </Wrap>
  ) : 
  (
    <Wrap mobileHide={mobileHide}>
      <Logo hide={hide} />
      <Zone>
        <Title hide={hide}>Marketplace</Title>
        {marketzone.map((item, index) => (
        <Link href={marketPath[index]}>
          <a> 
            <Tab active={-1 < active.indexOf(marketPath[index])}>
                {
                item == 'Collections' ? 
                <ColIcon 
                  active={-1 < active.indexOf(marketPath[index])}
                /> : 
                item == 'Auctions' ?
                <AucIcon 
                  active={-1 < active.indexOf(marketPath[index])} 
                /> : 
                <CreIcon 
                  active={-1 < active.indexOf(marketPath[index])}
                />}
                <TabText id="tab-text" active={-1 < active.indexOf(marketPath[index])} hide={hide}>{item}</TabText>
              </Tab>
            </a>
          </Link>
        ))}
      </Zone>
      <Zone>
        <Title hide={hide}>For creators</Title>
        {creatorszone.map((item, index) => currentUser != undefined ? (
            <Link href={'/applylisting'}>
               <a> 
              <Tab active={-1 < active.indexOf(creatorpath[index])}>
                {
                  item == 'Create and Verify New Collection' ? 
                  <AppIcon 
                    active={-1 < active.indexOf(creatorpath[index])}
                  /> : <ApAuIcon active={-1 < active.indexOf(creatorpath[index])} />
                }
                <TabText id="tab-text" active={-1 < active.indexOf(creatorpath[index])} hide={hide}>{item}</TabText>
              </Tab>
            </a>
          </Link>
        ) : 
          <Tab active={-1 < active.indexOf(creatorpath[index])} style={{cursor: 'pointer'}} onClick={() => proton.login().then(res => {
            if(res.error === ''){
              window.location.href = '/applylisting';
            }
          })}>
            {
              item == 'Create and Verify New Collection' ? 
              <AppIcon 
                active={-1 < active.indexOf(creatorpath[index])}
              /> : <ApAuIcon active={-1 < active.indexOf(creatorpath[index])} />
            }
            <TabText id="tab-text" active={-1 < active.indexOf(creatorpath[index])} hide={hide}>{item}</TabText>
          </Tab>
        )}
      </Zone>
      <Zone>
        <Title hide={hide}>Intro to Digital Galaxy</Title>
        {introzone.map((item, index) => (
        <Tab active={-1 < active.indexOf(introzone[index])} onClick={() => window.open('https://support.digital-galaxy.io/')}>
          <IntIcon 
            active={-1 < active.indexOf(introzone[index])}
          />
          <TabText id="tab-text" active={-1 < active.indexOf(introzone[index])} hide={hide}>{item}</TabText>
        </Tab>
        ))}
      </Zone>
      <SocialZone hide={hide} mobileHide={mobileHide}>
          <SocialItem hide={hide} mobileHide={mobileHide} onClick={() => window.open('https://www.tiktok.com/@digitalgalaxy1')}><img src="/new/icons/tiktok.svg" height="20px" width="20px" />TikTok</SocialItem>
          <SocialItem hide={hide} mobileHide={mobileHide} onClick={() => window.open('https://discord.gg/vcg3khuKPG')}><img src="/new/icons/discord.svg" height="20px" width="20px" /> Discord</SocialItem>
          <SocialItem hide={hide} mobileHide={mobileHide} onClick={() => window.open('https://twitter.com/DigitalGalaxyio')}><img src="/new/icons/twitter.svg" height="20px" width="20px" />Twitter</SocialItem>
      </SocialZone>
    </Wrap>
    );
}

export default memo(SideBar);
