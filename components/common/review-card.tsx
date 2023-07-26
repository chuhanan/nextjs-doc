import dayjs from 'dayjs'
import Link from 'next/link'
// import { getCookie } from '~/utils/cookie-client'
import Img from './img'
import { useTranslations } from 'next-intl'

type Props = { data?: any; className?: string; moreLink?: string; initialLoad?: boolean; needsRefresh?: boolean }

const LangMap: Record<string, string> = {
  zh: 'zh-cn',
  zht: 'zh-tw',
}

const FormatMap: Record<string, string> = {
  en: 'MMM D, YYYY',
  es: 'MMM. DD, YYYY',
  ja: 'MMM DD, YYYY',
  ko: 'MMM DD, YYYY',
  vi: 'MMM DD, YYYY',
  zh: 'YYYY.MM.DD',
  zht: 'YYYY.MM.DD',
}

export const getLocaleDateStr = (timestamp: number, lang: string, format?: string) => {
  return dayjs
    .unix(timestamp)
    .locale(LangMap[lang] ?? lang)
    .format(format ?? FormatMap[lang])
}

export default function ReviewCard({ data }: Props) {
  const t = useTranslations('ReviewList')
  const userId = '' //getCookie('user_id') || ''
  const lang = 'zh' //getCookie('site_lang') || 'en'

  return (
    <Link
      prefetch={false}
      href={data?.link || ''}
      className="border border-solid border-surface-1-fg-hairline-idle flex cursor-pointer rounded-3xl  overflow-hidden"
    >
      <div className="p-2.5 w-44">
        <div className="flex justify-start items-center mb-2">
          <div className="w-5 h-5 mr-2.5">
            <Img src={data?.user_avatar} />
          </div>
          <div className=" text-surface-1-fg-minor-idle flex flex-col">
            <div className="flex flex-1 items-center max-w-[132px]">
              <span className="enki-utility-xs max-w-[80%] inline-block whitespace-nowrap overflow-hidden text-ellipsis">{data?.user_name}</span>
              {data?.user_badge && (
                <div className="w-3 h-3 ml-3">
                  <Img className="w-3 h-3 ml-0.5" src={data.user_badge} />
                </div>
              )}
            </div>
            <div className="enki-utility-xs-subdued text-surface-1-fg-minor-idle whitespace-nowrap overflow-hidden text-ellipsis">
              {getLocaleDateStr(data.rec_create_time, lang as string)}
            </div>
          </div>
        </div>
        <div className="relative">
          <span className="text-surface-1-fg-default-idle enki-body-sm line-clamp-3">
            {+data?.featured === 1 && userId != data?.user_id && (
              <span className="bg-[#ee7778] text-white text-[13px] leading-[23px] w-[77px] h-[23px] inline-block text-center mr-1 rounded-md">
                {t('common_featured')}
              </span>
            )}
            {data?.comment_lang}
          </span>
        </div>
      </div>
      <div className="w-28 h-28 bg-surface-1-bg-hover">
        <Img src={data?.show_url} />
      </div>
    </Link>
  )
}
