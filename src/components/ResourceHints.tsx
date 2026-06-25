const GA_HOST = 'https://www.googletagmanager.com';
const ADSENSE_HOST = 'https://pagead2.googlesyndication.com';
const GROW_ADS_HOST = 'https://scripts.scriptwrapper.com';

const shouldPreconnectGtm = Boolean(process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID);
const shouldPreconnectAdsense = Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID);
const isProd = process.env.NODE_ENV === 'production';

export default function ResourceHints() {
  if (!shouldPreconnectGtm && !shouldPreconnectAdsense && !isProd) {
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
      {isProd ? (
        <>
          <link rel="preconnect" href={GROW_ADS_HOST} crossOrigin="anonymous" />
          <link rel="dns-prefetch" href={GROW_ADS_HOST} />
        </>
      ) : null}
    </>
  );
}


