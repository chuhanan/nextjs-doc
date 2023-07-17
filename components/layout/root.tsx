import PreloadResources from '~/components/common/preload-resources'

interface IRootLayoutProps {
  lang: string
  children: React.ReactNode
}

export default function BaseLayout(props: IRootLayoutProps) {
  const { lang, children } = props
  return (
    <>
      <PreloadResources lang={lang} />
      <html lang={lang}>
        <body>
          <div>WeeeLayout</div>
          <main>{children}</main>
        </body>
      </html>
    </>
  )
}
