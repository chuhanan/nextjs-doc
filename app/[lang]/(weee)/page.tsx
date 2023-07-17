import { cookies } from 'next/headers'

export default async function Home({ params: { lang } }) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div>weee home page</div>
      {cookies()
        .getAll()
        .map((cookie) => (
          <div key={cookie.name}>
            <p>Name: {cookie.name}</p>
            <p>Value: {cookie.value}</p>
          </div>
        ))}
    </main>
  )
}
