'use client'

import { useState } from 'react'

interface IProps {
  onChange: (val: string) => void
}

export default function Input(props: IProps) {
  const { onChange } = props
  const [val, setVal] = useState('')
  return (
    <div>
      <p>Input</p>
      <input
        className="border rounded"
        value={val}
        type="text"
        onChange={(e) => {
          setVal(e.target.value)
          onChange(e.target.value)
        }}
      />
    </div>
  )
}
