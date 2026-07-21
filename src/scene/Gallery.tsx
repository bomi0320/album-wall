import AlbumFrame from './AlbumFrame';
import albumImage from '../assets/test-album.jpg';
import { getWallPosition } from './layout';
import { useState } from 'react';

const albums = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  image: albumImage,
}));

export default function Gallery() {
  const [selectedAlbumId, setSelectedAlbumId] = useState<
    number | null
  >(null);

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
            selected={album.id === selectedAlbumId}
            onClick={() => setSelectedAlbumId(album.id)}
          />
        );
      })}
    </>
  );
}
