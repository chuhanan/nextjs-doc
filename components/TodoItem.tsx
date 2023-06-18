'use client'
import { prisma } from '~/db'

type TodoItemProps = {
  id: string
  title: string
  complete: boolean
  handleCheckChange: (checked: boolean, id: string) => void
}

export default function TodoItem(props: TodoItemProps) {
  return (
    <li key={props.id} className="mb-2 text-white">
      <input defaultChecked={props.complete} onChange={(e) => props.handleCheckChange(e.target.checked, props.id)} className="peer cursor-pointer" type="checkbox" name={props.id} id={props.id} />
      <label className="ml-1 cursor-pointer peer-checked:line-through" htmlFor={props.id}>
        {props.title}
      </label>
    </li>
  )
}
