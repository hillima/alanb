import { StyledTableDataCell } from './TableDataCell.styled';

type Props = {
  children: any;
  color?: string;
  onClick?: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
};

const TableDataCell = ({
  children,
  color,
  onClick,
  onMouseEnter,
  onMouseLeave,
}: Props): JSX.Element => {
  return (
    <StyledTableDataCell
      color={color}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}>
      {children}
    </StyledTableDataCell>
  );
};

export default TableDataCell;
