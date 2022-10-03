import Head from 'next/head';

export interface IMeta {
  /** Title of the Page */
  title?: string;
  /** Meta Description of the Page */
  desc?: string;
  /** Keywords that may help search results */
  keywords?: string[];
}

export const Meta = ({ title, desc, keywords }: IMeta) => {
  return (
    <Head>
      <title>{title || process.env.NEXT_PUBLIC_ORGANIZATION}</title>
      {desc && <meta name="description" content={desc} />}
      {keywords && <meta name="keywords" content={keywords.join(', ')} />}
      <meta name="author" content="Jayanta Samaddar" />
      {process.env.NODE_ENV === 'development' && (
        <meta name="robots" content="noindex" />
      )}
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
};
