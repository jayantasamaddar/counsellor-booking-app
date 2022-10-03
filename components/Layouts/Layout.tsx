import { ReactNode } from 'react';
import { Header, Footer } from '..';
import styles from './Layout.module.scss';

export interface ILayout {
  /** The children elements that will use the Layout */
  children?: ReactNode;
  /** The class attribute */
  className?: string;
}

export const Layout = ({ children, className }: ILayout) => {
  return (
    <div className={`${styles.layout} ${className || ''}`}>
      <Header />
      <main className="main-container">{children}</main>
      <Footer />
    </div>
  );
};
