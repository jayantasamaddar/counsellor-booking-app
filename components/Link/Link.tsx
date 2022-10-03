import Link from 'next/link';
import { ReactNode } from 'react';
import { ExternalLink } from '.';

export interface ILink {
  /** Whether Link is external. Default `false` */
  external?: boolean;
  /** The component that is linked */
  children: ReactNode;
  /** The Link href attribute */
  href: string;
  /** Link component that wraps a custom component. Default `true` */
  passHref: boolean;
}

const MasterLink = ({
  external = false,
  children,
  passHref = true,
  href,
  ...props
}: ILink) => {
  const extraProps = {
    rel: `${external ? 'noopener noreferrer' : undefined}`,
    target: `${external ? '_blank' : undefined}`,
    ...props,
  };

  return external ? (
    <ExternalLink href={href} {...extraProps}>
      {children}
    </ExternalLink>
  ) : (
    <Link passHref href={href} {...extraProps}>
      {children}
    </Link>
  );
};

export { MasterLink as Link };
