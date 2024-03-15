import Lottie from 'react-lottie';
import dgLottie from './dg-lottie.json';

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: dgLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice"
  }
};
interface Props {
  size ?: number;
}
const Spinner = ({size}: Props): JSX.Element => (
  <Lottie 
	    options={defaultOptions}
      height={size == undefined ? 50 : size}
      width={size == undefined ? 50 : size}
  />
);


export default Spinner;
