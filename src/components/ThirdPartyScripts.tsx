import Script from 'next/script';

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const ADSENSE_CLIENT_ID = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID;
const isProd = process.env.NODE_ENV === 'production';

export default function ThirdPartyScripts() {
  if (!GA_MEASUREMENT_ID && !ADSENSE_CLIENT_ID && !isProd) {
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

      {isProd ? (
        <Script
          src="https://scripts.scriptwrapper.com/tags/7a58edc2-df76-4bb8-9b63-292011f23f69.js"
          strategy="afterInteractive"
          data-noptimize="1"
          data-cfasync="false"
        />
      ) : null}
    </>
  );
}


