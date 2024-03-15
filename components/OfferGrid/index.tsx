import { useRouter } from 'next/router';
import { useAuthContext } from '../Provider/AuthProvider';
import { Template } from '../../services/templates';
import { Container } from './OfferGrid.styled';
import { useWindowSize } from '../../hooks';
import OfferTemplateCard from '../OfferTemplateCard';
import { NoDataWrap } from '../UserCollectionWatchView/UserCollectionWatchView.styled';

type Props = {
  isLoadingPrices: boolean;
  items: Template[];
  isFilter: boolean;
  isBulk: boolean;
  onClick: any;
};

const OfferGrid = ({ isLoadingPrices, items, isFilter, isBulk, onClick }: Props): JSX.Element => {
  const router = useRouter();
  const size = useWindowSize();
  const { currentUser } = useAuthContext();
  const isUsersTemplates =
    currentUser && router.query.chainAccount === currentUser.actor;
  return (
    <Container columns={isFilter && isBulk ? Math.floor(size['windowWidth'] / 320) : isFilter || isBulk ? Math.floor(size['windowWidth'] / 300) : Math.floor(size['windowWidth'] / 258)}> 
      {items.length == 0 ? <NoDataWrap>No Items</NoDataWrap> : items.map((template) => (
        <OfferTemplateCard
          key={template.template_id}
          template={template}
          isUsersTemplates={isUsersTemplates}
          hasShimmer={isLoadingPrices}
          onClick={() => onClick(template.template_id)}
        />
      ))}
    </Container>
  );
};

OfferGrid.defaultProps = {
  items: [],
  isLoadingPrices: false,
};

export default OfferGrid;
