import { ReactNode } from 'react';
import Footer from '../Footer';
import {
   Wrap
  } from './Section.styled';

  type Props = {
    children: ReactNode;
    hide: boolean;
  };

  const Section = ({ children, hide }: Props): JSX.Element => {
    return (
        <Wrap hide={hide}>
            {children}
            <Footer />
        </Wrap>
    );

  };


  export default Section;