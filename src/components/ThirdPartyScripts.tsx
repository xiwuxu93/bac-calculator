import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;

export default function ThirdPartyScripts() {
  if (!GA_MEASUREMENT_ID && !ADSENSE_CLIENT_ID) {
    return null;
  }

  return (
    <>
      {GA_MEASUREMENT_ID ? (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_MEASUREMENT_ID}');
            `}
          </Script>
        </>
      ) : null}

      {ADSENSE_CLIENT_ID ? (
        <Script
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT_ID}`}
          strategy="lazyOnload"
          crossOrigin="anonymous"
        />
      ) : null}
    </>
  );
}
