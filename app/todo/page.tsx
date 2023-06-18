import Link from 'next/link'
import TodoItem from '~/components/TodoItem'
import { prisma } from '~/db'

async function getTodos() {
  'use server'

  //这里不需要await，因为prisma会返回一个promise, 如果这里await, 外面的就导致数据渲染不出来
  return prisma.todo.findMany()
}

export default async function Page() {
  const todos = await getTodos()
  const handleCheckChange = async (checked: boolean, id: string) => {
    'use server'

    const res = await prisma.todo.update({
      where: {
        id,
      },
      data: {
        complete: checked,
      },
    })
  }

  return (
    <div className="mb-4 min-h-screen bg-slate-600 px-5 pt-4">
      <h1 className="text-2xl">Todo</h1>

      <div>
        <Link className="border border-slate-300 text-slate-300 px-2 rounded hover:text-slate-400 outline-none" href="/todo/new">
          New One
        </Link>
      </div>

      <ul className="pl-4">
        {todos.map((item: any) => {
          return <TodoItem key={item.id} id={item.id} title={item.title} complete={item.complete} handleCheckChange={handleCheckChange} />
        })}
      </ul>
    </div>
  )
}
