import { NavBar, NavItem } from '../';
import { socialLinks } from '../../data';
import styles from './SocialIcons.module.scss';

export interface ISocialIcons {
  /** Class attribute of the Social Links */
  className?: string;
}

export const SocialIcons = ({ className }: ISocialIcons) => {
  return (
    <NavBar className={`${styles['social-links']} ${className || ''}`}>
      {socialLinks
        .filter(icon =>
          ['Facebook', 'Instagram', 'LinkedIn', 'Youtube', 'Email'].includes(
            icon.name
          )
        )
        .map(({ name, icon: Icon, link }, index) => (
          <NavItem
            key={index}
            index={index}
            className={styles['social-icons']}
            name={name}
            icon={<Icon />}
            to={link}
            external
          />
        ))}
    </NavBar>
  );
};
