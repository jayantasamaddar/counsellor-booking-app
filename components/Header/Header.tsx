import { StaticImageData } from 'next/image';
import { Logo } from '..';
import BodiesSpeakLogo from '../../assets/Bodies-Speak-Logo.png';
import styles from './Header.module.scss';

type LogoPosition = 'center' | 'left' | 'right';

export interface IHeader {
  /** The Header Logo */
  logo?: string | StaticImageData;
  /** Position of the logo. Possible values: `center` | `left` | `right`. Defaults to `center`. */
  logoPosition?: LogoPosition;
}

export const Header = ({ logo, logoPosition }: IHeader) => {
  return (
    <header className={styles.header}>
      <div className="header_logo">
        <Logo src={logo || BodiesSpeakLogo} />
      </div>
    </header>
  );
};
