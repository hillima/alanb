import Image from 'next/image';
import { memo } from 'react';
import {
  Wrap,  
  ActiveTab
} from './UserAuctionTab';

const UserAuctionTab = ({auctionTab, setAuctionTab}: any): JSX.Element => {
  return (
    <Wrap>
      <ActiveTab onClick={() => setAuctionTab(0)} isActive={auctionTab == 0}><span>Created Auction</span></ActiveTab>
      <ActiveTab onClick={() => setAuctionTab(1)} isActive={auctionTab == 1}><span>Bought Auction</span></ActiveTab>
      <ActiveTab onClick={() => setAuctionTab(2)} isActive={auctionTab == 2}><span>Sold Auction</span></ActiveTab>
      <ActiveTab onClick={() => setAuctionTab(3)} isActive={auctionTab == 3}><span>My bid Auction</span></ActiveTab>
    </Wrap>
  );
}

export default memo(UserAuctionTab);
