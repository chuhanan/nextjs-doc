'use client'
import { useState } from 'react'
import Input from '~/components/common/input'
import { useTranslations } from 'next-intl'

export default function LocaleValClient() {
  const [val, setVal] = useState('')
  const t = useTranslations('Root')
  return (
    <div>
      <p>{t('Metadata.TitleTemplate', { name: val })}</p>
      <Input onChange={(v) => setVal(v)} />
    </div>
  )
}
