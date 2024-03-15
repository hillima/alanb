import Image from 'next/image';
import { memo, useState } from 'react';
import {
  Wrap,  
  DisWrap,
  SearchWrap,
  SelectBox, 
  SelectWrap,
  RefreshBox,
  RightWrap,
  VerfiedToggleWrap,
  VerifiedToggleBtn,
  ActiveBox
} from './UserFilterTab';
import UserCollectionSearch from '../UserCollectionSearch';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core";
import { Autorenew } from "@material-ui/icons";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';

const useStyles = makeStyles((theme) => ({
  refresh: {
    cursor: "pointer",
    margin: "auto",
    "&.spin": {
      animation: "$spin 1s 1",
      pointerEvents: "none"
    }
  },
  "@keyframes spin": {
    "0%": {
      transform: "rotate(0deg)"
    },
    "100%": {
      transform: "rotate(360deg)"
    }
  }
}));

const UserFilterTab = ({activeTab, tab, setTab, type, setAssets, originAssets, searchFuc, selectFuc, onRefresh, setToggle, verifiedToggle, verifiedCreatedToggle, setCreatedToggle}: any): JSX.Element => {
  const [spin, setSpin] = useState(false);
  const classes = useStyles();
  const refreshCanvas = () => {
    onRefresh();
    setSpin(true);
    setTimeout(() => {
      setSpin(false);
    }, 1000);
  };
  return (
    <Wrap>
      <DisWrap>
        <RefreshBox onClick={refreshCanvas}>
          <Autorenew
            className={clsx({
              [classes.refresh]: true,
              spin: spin
            })}
            style={{
              width: '18px',
              height: '18px',
              color: 'rgba(155, 162, 173, 1)',
              transform: "rotate(90deg)",
            }}
          />
        </RefreshBox>
        {activeTab == 0 ?
        <VerfiedToggleWrap>
          <VerifiedToggleBtn isActive={verifiedToggle} onClick={() => setToggle(true)}>verified</VerifiedToggleBtn>
          <VerifiedToggleBtn isActive={!verifiedToggle} onClick={() => setToggle(false)}>unverified</VerifiedToggleBtn>
        </VerfiedToggleWrap> : null}
        {activeTab == 1 ?
          <VerfiedToggleWrap>
            <VerifiedToggleBtn isActive={verifiedCreatedToggle} onClick={() => setCreatedToggle(true)}>verified</VerifiedToggleBtn>
            <VerifiedToggleBtn isActive={!verifiedCreatedToggle} onClick={() => setCreatedToggle(false)}>unverified</VerifiedToggleBtn>
          </VerfiedToggleWrap> : null}
        <SearchWrap>
          <UserCollectionSearch
             isMobileSearchOpen={false} 
             closeMobileSearch={() => {}} 
             placeholder="Search collections …"
             setRenderTemplates={(value) => searchFuc(value)}
             setLoading={() => {}}
              setOrigin={() => {
                setAssets(originAssets)
              }}
          />
        </SearchWrap>
        <FormControl className="form-control" sx={{width: '155px',  height: '42px'}}>
              <SelectWrap className='top-col-select-wrap'>
                <Select
                  value={type}
                  onChange={(e) => selectFuc(e.target.value)}
                  displayEmpty
                  sx={{fontSize: '14px', color: '#A6A9B9', height: '42px', width: '100%'}}
                  className="top-col-select"
                  label="Sort by"
                >
                  <MenuItem value={'sort'} disabled sx={{fontSize: '14px'}} className="top-col-select-option">Sort by</MenuItem>
                  <MenuItem value={'desc'} sx={{fontSize: '14px'}} className="top-col-select-option">Name A-Z</MenuItem>
                  <MenuItem value={'asc'} sx={{fontSize: '14px'}} className="top-col-select-option">Name Z-A</MenuItem>
                </Select>
              </SelectWrap>
        </FormControl>  
      </DisWrap>
      <RightWrap>
        <ActiveBox onClick={() => setTab(0)} isActive={tab === 0}>
          <Image src={tab === 0 ? '/grid-on.svg' : '/grid-off.svg'} width="22px" height="22px" />
        </ActiveBox>
        <ActiveBox onClick={() => setTab(1)} isActive={tab === 1}>
          <Image src={tab === 1 ? '/menu-on.svg' : '/menu-off.svg'} width="22px" height="22px"/>
        </ActiveBox>
      </RightWrap>
    </Wrap>
  );
}

export default memo(UserFilterTab);
