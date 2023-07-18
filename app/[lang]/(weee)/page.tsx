import { cookies, headers } from 'next/headers'

export default async function Home({ params: { lang } }) {
  console.log(headers().get('x-session-token'), 'sssss')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>weee home page</div>
      {headers().get('x-session-token')} token
    </main>
  )
}
