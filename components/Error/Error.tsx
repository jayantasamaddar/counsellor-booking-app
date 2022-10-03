import styles from './Error.module.scss';

export interface IFormError {
  /** The Error message */
  children: string;
  /** The Class attribute of the Error message */
  className?: string;
}

export const FormError = ({ children, className }: IFormError) => {
  return <p className={`${styles.error} ${className || ''}`}>{children}</p>;
};
