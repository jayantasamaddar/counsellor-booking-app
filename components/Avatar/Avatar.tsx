import Image from 'next/future/image';
import { StaticImageData } from 'next/image';
import avatarImg from '../../assets/Pallavi-Singh.jpg';
import styles from './Avatar.module.scss';

export interface IAvatar {
  /** Image for the Avatar */
  image?: StaticImageData | string;
  /** Name of the Person. Will be used as Alt Tag */
  name?: string;
}

export const Avatar = ({ image, name }: IAvatar) => {
  return (
    <div className={styles.avatar}>
      <Image
        src={image || avatarImg}
        title={name || (process.env.NEXT_PUBLIC_ORGANIZATION_OWNER as string)}
        alt={name || (process.env.NEXT_PUBLIC_ORGANIZATION_OWNER as string)}
        fill
        sizes="100vw"
      />
    </div>
  );
};
