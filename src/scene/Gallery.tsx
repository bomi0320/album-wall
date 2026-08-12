import AlbumFrame from './AlbumFrame';
import { getWallPosition } from './layout';
import type { Album } from '../types/album';

type GalleryProps = {
  albums: Album[];
  onSelect: (album: Album) => void;
};

export default function Gallery({
  albums,
  onSelect,
}: GalleryProps) {
  return (
    <>
      {albums.map((album, index) => {
        const { position, rotation } =
          getWallPosition(index);

        return (
          <AlbumFrame
            key={album.id}
            image={album.image}
            position={position}
            rotation={rotation}
            onSelect={() => onSelect(album)}
          />
        );
      })}
    </>
  );
}
