import { Container } from './ApplyGrid.styled';
import ApplyCard from '../ApplyCard';

type Props = {
  data: any;
  columns: any;
};

const ApplyGrid = ({ data, columns }: Props): JSX.Element => {
  
  return (
    <Container columns={columns}> 
      {data.length == 0 ? <div>No Apply Collection</div> : data.map((val, index) => (
        <ApplyCard
          key={index}
          data={val}
        />
      ))}
    </Container>
  );
};

ApplyGrid.defaultProps = {
  items: [],
  isLoadingPrices: false,
};

export default ApplyGrid;
