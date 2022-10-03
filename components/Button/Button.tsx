// import Link from 'next/link';
import { Link } from '..';
import { MouseEvent, ReactNode } from 'react';
import styles from './Button.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

export interface IButton {
  /** Visible Text of the Button or a React Component */
  children: ReactNode;
  /** Button Type: `button` | `submit` | 'reset'. Defaults to `button` */
  type?: ButtonType;
  /** Class attribute of the Button element */
  className?: string;
  /** Whether Button points to an External Link */
  external?: boolean;
  /** Link Button is pointing to */
  link?: string;
  /** Whether Button text should be uppercase */
  uppercase?: boolean;
  /** Button onClick event */
  onClick?: (event: MouseEvent<HTMLButtonElement | HTMLInputElement>) => void;
}

export const Button = ({
  children,
  type = 'button',
  className,
  external,
  link,
  uppercase,
  onClick,
}: IButton) => {
  return (
    <Link href={link || '#'} passHref external={external}>
      <button
        type={type || 'button'}
        className={`${styles.button} ${className || ''}${
          uppercase ? ' uppercase' : ''
        }`}
        onClick={onClick}
      >
        {children}
      </button>
    </Link>
  );
};
