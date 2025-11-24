const GA_HOST = 'https://www.googletagmanager.com';
const ADSENSE_HOST = 'https://pagead2.googlesyndication.com';

const shouldPreconnectGtm = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const shouldPreconnectAdsense = Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);

export default function ResourceHints() {
  if (!shouldPreconnectGtm && !shouldPreconnectAdsense) {
    return null;
  }

  return (
    <>
      {shouldPreconnectGtm ? (
        <>
          <link rel="preconnect" href={GA_HOST} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={GA_HOST} />
        </>
      ) : null}
      {shouldPreconnectAdsense ? (
        <>
          <link rel="preconnect" href={ADSENSE_HOST} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={ADSENSE_HOST} />
        </>
      ) : null}
    </>
  );
}
