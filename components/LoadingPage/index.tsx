import { Container } from './LoadingPage.styled';
import Spinner from '../Spinner';
import { useWindowSize } from '../../hooks';

type Props = {
  margin: string;
};

const LoadingPage = ({ margin }: Props): JSX.Element => {

  return (
    <Container margin={margin}>
      <Spinner />
    </Container>
  );
};

LoadingPage.defaultProps = {
  margin: '0',
};

export default LoadingPage;
