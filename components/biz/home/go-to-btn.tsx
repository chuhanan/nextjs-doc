'use client'
import { useRouter } from 'next/navigation'

interface IProps {
  lang: string
  cation: string
}

export default function GoToBtn(props: IProps) {
  const { lang, cation } = props
  const router = useRouter()

  return (
    <div>
      <button
        onClick={() => router.push(`/${lang}/todo`)}
        className="bg-gradient-to-r from-yellow-500 to-indigo-500 bg-clip-text font-bold tracking-tight text-transparent dark:from-amber-200 dark:to-sky-400"
      >
        Go to Todo page
      </button>
      <div>{cation}</div>
    </div>
  )
}
