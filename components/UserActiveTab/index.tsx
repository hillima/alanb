import { memo } from 'react';
import { addPrecisionDecimal } from '../../utils';
import { Wrap, ListWrap, ListItem, CreateBtn } from './UserActiveTab';

const UserActiveTab = ({activeTab, setActiveTab, isOwner}: any): JSX.Element => {
  const list = ['Items', 'Created', 'Watched Items', 'Listed items', 'Auctions', 'Offers made', 'Offers received', 'Activities'];
  return (
    <Wrap>
      <ListWrap>
        {
          list.map((it, index) => !isOwner && index == 4 || !isOwner && index == 5 || !isOwner && index == 6 ? null : (
            <ListItem active={index === activeTab} onClick={() => setActiveTab(index)}>
              {it}
            </ListItem>
          ))
        }
      </ListWrap>
      {isOwner ? <CreateBtn onClick={() => window.location.href = '/create'}>Verified Minting</CreateBtn> : null}
    </Wrap>
  );
}

export default memo(UserActiveTab);
