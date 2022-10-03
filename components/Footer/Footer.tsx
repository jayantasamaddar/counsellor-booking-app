import { ReactElement } from 'react';
import { Logo, SocialIcons } from '..';
import LogoMain from '../../assets/Bodies-Speak-Logo.png';
import styles from './Footer.module.scss';

export interface IFooter {
  /** Footer Logo */
  logo?: ReactElement;
  /** Slogan */
  slogan?: string;
  /** Class attribute of the footer element */
  className?: string;
}

export const Footer = ({
  logo,
  slogan = '...when words fail!',
  className,
}: IFooter) => {
  return (
    <footer className={`${styles.footer} ${className || ''}`}>
      <div className="footer_container">
        <div className="footer_logo">
          <Logo src={LogoMain} />
        </div>
        <div className="footer_slogan">{slogan}</div>
        <SocialIcons />
        <div className="footer_copyright">
          © {new Date().getFullYear()} {process.env.NEXT_PUBLIC_ORGANIZATION}
        </div>
        <div className="footer_signature">
          <p className="footer_author">
            Made by {process.env.NEXT_PUBLIC_AUTHOR}
          </p>
        </div>
      </div>
    </footer>
  );
};
