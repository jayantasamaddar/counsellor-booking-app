import styles from './Error.module.scss';

export interface IError {
  /** The Error message */
  children: string;
  /** The Class attribute of the Error message */
  className?: string;
}

export const Error = ({ children, className }: IError) => {
  return <p className={`${styles.error} ${className || ''}`}>{children}</p>;
};
