import Frame from '~/components/biz/examples/photo-item'
import Modal from '~/components/common/modal'
import swagPhotos, { Photo } from '~/mock/photos'

export default function PhotoModal({ params: { id: photoId } }: { params: { id: string } }) {
  const photos = swagPhotos
  const photo: Photo = photos.find((p) => p.id === photoId)!

  return (
    <Modal>
      <Frame photo={photo} />
    </Modal>
  )
}
