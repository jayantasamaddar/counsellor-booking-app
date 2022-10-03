import { ReactNode } from 'react';

export interface IExternalLink {
  /** The external link href */
  href: string;
  /** The component that is linked */
  children: ReactNode;
}

export const ExternalLink = ({ href, children }: IExternalLink) => {
  return (
    <a rel="noopener noreferrer" target="_blank" href={href}>
      {children}
    </a>
  );
};
