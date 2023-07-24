import { Html, Head, Main, NextScript } from 'next/document'

export default function Document(ctx) {
  console.log(ctx.__NEXT_DATA__.props.pageProps, 'cccc')
  return (
    <Html>
      <Head>
        <link rel="stylesheet" href={`https://static.weeecdn.com/static/font-face-css/en-845175b2.css`} />
        <link rel="stylesheet" href={`https://static.weeecdn.com/static/font-enki-css/en-c65aeff5.css`} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
