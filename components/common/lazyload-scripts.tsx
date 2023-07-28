'use client'
import Script from 'next/script'
import { initWeeeTracker } from '~/utils/tracker'

export default function LazyloadScript() {
  return (
    <>
      <Script strategy="lazyOnload" id="googletagmanager" src="https://www.googletagmanager.com/gtag/js?id=UA-56885317-2" />
      <script
        id="googletagmanager-2"
        dangerouslySetInnerHTML={{
          __html: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        if(window.navigator.userAgent.match(/weeeapp/i)){
          gtag('config', 'UA-56885317-1')
        }else{
          gtag('config', 'UA-56885317-2')
        }
        gtag('config', 'AW-867720393');
        gtag('config', 'AW-466474693');
      `,
        }}
      />
      <Script
        strategy="lazyOnload"
        id="googletagmanager-gtm"
        dangerouslySetInnerHTML={{
          __html: `
                  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
                  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
                  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
                  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
                  })(window,document,'script','dataLayer','GTM-596KDHX');
              `,
        }}
      />
      {/* tracker */}
      <Script
        id="tracker"
        onLoad={initWeeeTracker}
        src={`${process.env.TRACK_SDK_HOST || process.env.NEXT_PUBLIC_TRACK_SDK_HOST}/data-tracking-sdk/biz-web/0.0.60/index.js`}
        strategy="lazyOnload"
      />
    </>
  )
}
