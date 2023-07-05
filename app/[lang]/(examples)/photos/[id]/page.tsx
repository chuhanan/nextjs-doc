import PhotoItem from '~/components/biz/examples/photo-item'
import swagPhotos, { Photo } from '~/mock/photos'

export default function PhotoPage({ params: { id } }: { params: { id: string } }) {
  const photo: Photo = swagPhotos.find((p) => p.id === id)!

  return (
    <div className="container mx-auto my-10">
      <div className="w-1/2 mx-auto border border-gray-700">
        <PhotoItem photo={photo} />
      </div>
    </div>
  )
}
