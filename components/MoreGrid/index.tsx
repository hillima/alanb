import { useRouter } from 'next/router';
import { useAuthContext } from '../Provider/AuthProvider';
import { Template } from '../../services/templates';
import { Container, Scroll } from './MoreGrid.styled';
import { useWindowSize } from '../../hooks';
import ScrollTemplate from '../ScrollTemplate';

type Props = {
  isLoadingPrices: boolean;
  items: Template[];
  isFilter: boolean;
  isBulk: boolean;
};

const MoreGrid = ({ isLoadingPrices, items }: Props): JSX.Element => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const size = useWindowSize();
  const isUsersTemplates =
    currentUser && router.query.chainAccount === currentUser.actor;

  return (
    <Container> 
      <Scroll>
        {items.length == 0 ? <span>No Items</span> : items.map((template, index) => size['windowWidth'] < 1170 && index == 3 ? null : (
          <ScrollTemplate
            key={template.template_id}
            template={template}
            isUsersTemplates={isUsersTemplates}
            hasShimmer={isLoadingPrices}
          />
        ))}
      </Scroll>
    </Container>
  );
};

MoreGrid.defaultProps = {
  items: [],
  isLoadingPrices: false,
};

export default MoreGrid;
