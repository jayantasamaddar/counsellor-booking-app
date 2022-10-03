import React, { MouseEvent, ReactElement } from 'react';
import { Link } from '../';

export interface INavItem {
  /** ID of the Navigation Item */
  id?: string;
  /** Title attribute the Navigation Item */
  name: string;
  /** Index order of the Navigation List Item */
  index: number;
  /** Icon representation of the Navigation Item */
  icon?: ReactElement;
  /** Class attribute of the Navigation Item */
  className?: string;
  /** Href attribute of the Navigation Item */
  to?: string;
  /** Unlink the Navigation Item from any redirects and make it a regular list item */
  unlink?: boolean;
  /** Whether Link is an external Link */
  external?: boolean;
  /** onClick handler function that triggers when Navigation Item is clicked */
  onClick?: (event: MouseEvent<HTMLLIElement>) => void;
  /** Nested elements that stem from this Navigation Element */
  nested?: ReactElement;
}

export const NavItem = ({
  id,
  name,
  className,
  icon,
  index,
  to,
  unlink,
  external,
  onClick,
  nested,
}: INavItem) => {
  return (
    <>
      {unlink ? (
        <li
          title={name}
          className={`nav-item cursor-pointer ${className || ''}`}
          onClick={onClick}
        >
          {icon || name}
          {nested}
        </li>
      ) : (
        <Link
          href={
            to
              ? to
              : `/${name
                  .replace(/[^a-zA-Z ]/g, '')
                  .replace(/\s+/g, '-')
                  .toLowerCase()}`
          }
          passHref
          external={external}
        >
          <li
            id={id}
            title={name}
            data-index={index}
            className={`nav-item cursor-pointer ${className || ''}`}
            onClick={onClick}
          >
            {icon || name}
          </li>
        </Link>
      )}
    </>
  );
};
