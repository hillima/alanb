import { useRouter } from 'next/router';
import TemplateCard from '../TemplateCard';
import { useAuthContext } from '../Provider/AuthProvider';
import { Template } from '../../services/templates';
import { Container } from './Grid.styled';
import { useWindowSize } from '../../hooks';

type Props = {
  isLoadingPrices: boolean;
  items: Template[];
  isFilter: boolean;
  isBulk: boolean;
  listingPrice?: string;
};

const Grid = ({ isLoadingPrices, items, isFilter, isBulk, listingPrice }: Props): JSX.Element => {
  const router = useRouter();
  const size = useWindowSize();
  const { currentUser } = useAuthContext();
  const isUsersTemplates =
    currentUser && router.query.chainAccount === currentUser.actor;

  return (
    <Container columns={isFilter && isBulk ? Math.floor(size['windowWidth'] / 320) : isFilter || isBulk ? Math.floor(size['windowWidth'] / 280) : Math.floor(size['windowWidth'] / 258)}> 
      {items.length == 0 ? <span>No Items</span> : items.map((template, index) => (
        <TemplateCard
          key={template.template_id}
          template={template}
          isUsersTemplates={isUsersTemplates}
          hasShimmer={isLoadingPrices}
          listingPrice={listingPrice}
        />
      ))}
    </Container>
  );
};

Grid.defaultProps = {
  items: [],
  isLoadingPrices: false,
};

export default Grid;
