import Image from 'next/image';
import TemplateSearch from '../TemplateSearch';
import {
    MainBtn,
    Wrap,
    RefreshBox,
    SelectBox,
    SelectWrap,
    WrapDiv,
    FilterIcon
} from './SortTab.styled';
import { useState } from 'react';
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


export const SortTab = ({ hideFilter, hideBulk, setFilterHide, setBulkHide, setRenderTemplates, setLoading, setOrigin, onRefresh, setSort, sortValue, isSort }): JSX.Element => {
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
       <WrapDiv width={180} style={{display: 'flex'}}>
        <MainBtn isBackColor={!hideFilter} onClick={setFilterHide}>
            <FilterIcon src={hideFilter ? "/new/filter-white.svg" : "/new/close-icon.svg"} width={16} height={16} />
            Filters
        </MainBtn>
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
       </WrapDiv>
        <TemplateSearch
            isMobileSearchOpen={false} 
            closeMobileSearch={() => {}} 
            placeholder="Search NFts …"
            setRenderTemplates={setRenderTemplates}
            setLoading={setLoading}
            setOrigin={setOrigin}
        />
        <WrapDiv width={168} mr={16}>
          <FormControl className="form-control">
              <SelectWrap className='top-col-select-wrap'>
                <Select
                  value={sortValue}
                  onChange={(e) => setSort(e.target.value)}
                  disabled={!isSort}
                  displayEmpty
                  sx={{fontSize: '14px', color: '#A6A9B9', height: '40px'}}
                  className="top-col-select"
                >
                  <MenuItem value={'lowtohigh'} sx={{fontSize: '14px'}} className="top-col-select-option">Price low to high</MenuItem>
                  <MenuItem value={'hightolow'} sx={{fontSize: '14px'}} className="top-col-select-option">Price high to low</MenuItem>
                  <MenuItem value={'recently'} sx={{fontSize: '14px'}} className="top-col-select-option">Recently Listed</MenuItem>
                </Select>
              </SelectWrap>
            </FormControl>  
        </WrapDiv>
        <WrapDiv width={108}>
            <MainBtn isBackColor={!hideBulk} onClick={setBulkHide}>Bulk Buy</MainBtn>
        </WrapDiv>
    </Wrap>
)

}


