import { useInView } from 'react-intersection-observer';
import { Button } from './PaginationButton.styled';
import { useEffect } from 'react';
import Image from 'next/image';

type Props = {
  onClick: () => Promise<void>;
  disabled: boolean;
  isLoading: boolean;
  isHidden?: boolean;
  autoLoad?: boolean;
};

const PaginationButton = ({
  onClick,
  disabled,
  isLoading,
  isHidden,
  autoLoad,
}: Props): JSX.Element => {
  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (autoLoad && inView && !isLoading && !isHidden) {
      onClick();
    }
  }, [inView]);

  return (
    <Button
      ref={ref}
      aria-label="Next page"
      onClick={onClick}
      disabled={disabled || isLoading}
      isHidden={isHidden || (disabled && !isLoading)}>
      {isLoading ? <Image src="/loading.svg" width={24} height={24}  /> : <Image src="/arrow.svg"  width={24} height={24}  />}
    </Button>
  );
};

export default PaginationButton;
