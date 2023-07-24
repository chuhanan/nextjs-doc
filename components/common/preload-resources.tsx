'use client'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'

export default function PreloadResources(props: { lang: string }) {
  const { lang } = props
  ReactDOM.preload(`https://img01.weeecdn.com/static/font-face-css/${lang}-845175b2.css`, { as: 'style' })
  ReactDOM.preload(`https://img01.weeecdn.com/static/font-enki-css/${lang}-c65aeff5.css`, { as: 'style' })
  /**
   * React 18.3 does not yet include type definitions for ReactDOM.preload, ReactDOM.preconnect, and ReactDOM.preconnectDNS. You can use // @ts-ignore as a temporary solution to avoid type errors.
   */
  //@ts-ignore
  ReactDOM.preconnect('img01.weeecdn.com', { crossOrigin: 'anonymous' })
  //@ts-ignore
  ReactDOM.prefetchDNS('img01.weeecdn.com')
  // <link rel="preload" href={`https://img01.weeecdn.net/static/font-face-css/${lang}-845175b2.css`} as="style" />
  // <link rel="stylesheet" href={`https://img01.weeecdn.net/static/font-face-css/${lang}-845175b2.css`} />
  // <link rel="preload" href={`https://img01.weeecdn.net/static/font-enki-css/${lang}-c65aeff5.css`} as="style" />
  // <link rel="stylesheet" href={`https://img01.weeecdn.net/static/font-enki-css/${lang}-c65aeff5.css`} />

  useEffect(() => {
    const loadFastClick = async () => {
      const fastClick = await import('fastclick')
      fastClick.default.attach(document.body)
      fastClick.default.prototype.focus = function (targetElement) {
        targetElement.focus()
      }
    }

    loadFastClick()
  }, [])

  return <></>
}
