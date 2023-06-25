import Link from 'next/link'
import { prisma } from '~/db'
import { redirect } from 'next/navigation'

const hanldeNewTodo = async (formData: FormData) => {
  'use server'
  const title = formData.get('title')
  if (!title) return
  const todo = await prisma.todo.create({
    data: {
      title: title.toString(),
      complete: false,
    },
  })
  if (todo) {
    redirect('/todo')
  }
}

export default async function TodoNew() {
  return (
    <div className="p-4">
      <h1>TodoNew</h1>
      <div>
        <form action={hanldeNewTodo}>
          <input required name="title" className="border border-slate-400 rounded outline-none px-2 py-1" type="text" />
          <div className="flex justify-start mt-2">
            <button className="border border-slate-300 text-black px-2 rounded hover:text-slate-400 outline-none" type="submit">
              Submit
            </button>
            <Link className="ml-2 border border-slate-300 text-slate-300 px-2 rounded hover:text-slate-400 outline-none" href="/todo">
              Cancel
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
