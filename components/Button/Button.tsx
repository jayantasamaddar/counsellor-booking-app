// import Link from 'next/link';
import { Link } from '..';
import {
  MouseEvent,
  ReactNode,
  forwardRef,
  ForwardedRef,
  useRef,
  useImperativeHandle,
} from 'react';
import styles from './Button.module.scss';

type ButtonType = 'button' | 'submit' | 'reset';

export interface DefaultButtonProps {
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

export interface IButton extends DefaultButtonProps {
  /** Visible Text of the Button or a React Component */
  children: ReactNode;
  /** Whether Button is an Upload Button */
  upload?: boolean;
}

const Button = forwardRef<HTMLButtonElement | HTMLInputElement, IButton>(
  (
    {
      children,
      type = 'button',
      className,
      external,
      link,
      uppercase,
      upload,
      onClick,
    },
    ref
  ) => {
    /************************************************************************************/
    /** Declare variables, refs */
    /************************************************************************************/

    const inputRef = useRef<HTMLInputElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useImperativeHandle(ref, () =>
      upload
        ? (inputRef.current as HTMLInputElement)
        : (buttonRef.current as HTMLButtonElement)
    );
    /************************************************************************************/
    /** Parse Props */
    /************************************************************************************/

    const buttonProps: DefaultButtonProps = {
      type: type || 'button',
      className: `${styles.button} ${className || ''}${
        uppercase ? ' uppercase' : ''
      }`,
      onClick: onClick,
    };

    /************************************************************************************/
    /** Render Button */
    /************************************************************************************/

    return link ? (
      <Link href={link || '#'} passHref external={external}>
        <button {...buttonProps} ref={buttonRef}>
          {children}
        </button>
      </Link>
    ) : (
      <button {...buttonProps} ref={buttonRef}>
        {children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };
