import ClientChild from './_child'

export default function Product() {
  console.log('mobile ===')
  return (
    <div>
      <div>mobile</div>
      <ClientChild />
    </div>
  )
}
