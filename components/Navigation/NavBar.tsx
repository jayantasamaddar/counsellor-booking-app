import { ReactNode } from 'react';

export interface INavBar {
  /** The Nav Items */
  children: ReactNode;
  /** Class attribute of the NavBar List */
  className?: string;
}

export const NavBar = ({ children, className }: INavBar) => {
  return (
    <nav className="h-full">
      <ul className={`${className || ''}`}>{children}</ul>
    </nav>
  );
};
