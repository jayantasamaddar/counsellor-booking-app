import { StaticImageData } from 'next/image';
import Image from 'next/future/image';
import Link from 'next/link';
// import logo from '../assets/logo.svg';
import styles from './Logo.module.scss';

export interface ILogo {
  /** Logo Image URL */
  src: StaticImageData | string;
  /** Logo Width */
  width?: number;
  /** Logo Height */
  height?: number;
  /** Class attribute of the Logo Image */
  className?: string;
  /** Link to another URL */
  link?: string;
}

/** Organization Logo */
export const Logo = ({ src, width, height, className, link }: ILogo) => {
  return (
    <Link href={link || '/'} passHref>
      {/* <Image
        className={`${styles.logo} ${className || ''}`}
        title={link || process.env.NEXT_PUBLIC_ORGANIZATION}
        src={src}
        width={50 || width}
        height={50 || height}
        objectFit="contain"
        alt={process.env.NEXT_PUBLIC_ORGANIZATION || 'Logo'}
      /> */}
      <Image
        className={`${styles.logo} ${className || ''}`}
        title={link || process.env.NEXT_PUBLIC_ORGANIZATION}
        src={src}
        alt={process.env.NEXT_PUBLIC_ORGANIZATION || 'Logo'}
        fill
        sizes="120px"
      />
    </Link>
  );
};
