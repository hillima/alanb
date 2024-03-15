import { FC, useState, ReactNode } from 'react';
import { TooltipIconContainer, TooltipContent } from './Tooltip.styled';

type Props = {
  text: string;
  numberOfLines: number;
  isLeftAlignedToParent?: boolean;
  children?: string | ReactNode;
};

const TooltipIcon: FC<{ color: string }> = ({ color }) => (
  <svg width="24" height="24" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M16 3C8.83203 3 3 8.83203 3 16C3 23.168 8.83203 29 16 29C23.168 29 29 23.168 29 16C29 8.83203 23.168 3 16 3ZM16 5C22.0859 5 27 9.91406 27 16C27 22.0859 22.0859 27 16 27C9.91406 27 5 22.0859 5 16C5 9.91406 9.91406 5 16 5ZM15 10V12H17V10H15ZM15 14V22H17V14H15Z" fill="#9BA2AD"/>
</svg>

);

const Tooltip: FC<Props> = ({
  text,
  numberOfLines,
  isLeftAlignedToParent,
  children,
}) => {
  const [isActive, setIsActive] = useState<boolean>(false);

  const hoverContent = children ? (
    <div
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}>
      {children}
    </div>
  ) : (
    <TooltipIconContainer
      onMouseEnter={() => setIsActive(true)}
      onMouseLeave={() => setIsActive(false)}>
      <TooltipIcon color={isActive ? '#7B0A75' : '#7B0A75'} />
    </TooltipIconContainer>
  );

  return (
    <>
      {hoverContent}
      <TooltipContent
        numberOfLines={numberOfLines}
        isActive={isActive}
        isLeftAlignedToParent={isLeftAlignedToParent}>
        {text}
      </TooltipContent>
    </>
  );
};

export default Tooltip;
