import Child from './_child'

export default function Product() {
  console.log('pc parent')
  return (
    <div>
      <Child />
      <div>pc</div>
    </div>
  )
}
