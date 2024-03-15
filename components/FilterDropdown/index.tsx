import { FC, useState } from 'react';
import {
  MenuContainer,
  MenuButton,
  MenuButtonText,
  Menu,
  MenuItem,
  TransparentBackground,
} from './FilterDropdown.styled';
import { useEscapeKeyClose } from '../../hooks';
import { Filter } from '../../utils/constants';
import Image from 'next/image';

export type FilterDropdownProps = {
  filters: Filter[];
  activeFilter: Filter;
  handleFilterClick: (filter: Filter) => void;
};

const FilterDropdown: FC<FilterDropdownProps> = ({
  filters = [],
  activeFilter = undefined,
  handleFilterClick = () => {},
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const togglePopupMenu = () => setIsOpen(!isOpen);
  const closePopupMenu = () => setIsOpen(false);
  useEscapeKeyClose(closePopupMenu);

  return (
    <MenuContainer>
      <MenuButton onClick={togglePopupMenu}>
        <MenuButtonText>Sort by</MenuButtonText>
        <Image src= "/down-arrow-sm.svg" width={24} height={24} />
      </MenuButton>
      <Menu isOpen={isOpen}>
        {filters.map((filter) => (
          <MenuItem
            key={filter.label}
            tabIndex={0}
            onClick={() => {
              handleFilterClick(filter);
              closePopupMenu();
            }}>
            <span>{filter.label}</span>
            <span>
              {activeFilter && activeFilter.label === filter.label && (
                <Image src="/icon-light-check-24-px.svg" width={24} height={24} />
              )}
            </span>
          </MenuItem>
        ))}
      </Menu>
      <TransparentBackground isOpen={isOpen} onClick={closePopupMenu} />
    </MenuContainer>
  );
};

export default FilterDropdown;
