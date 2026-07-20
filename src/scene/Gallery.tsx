import AlbumFrame from './AlbumFrame';
import albumImage from '../assets/test-album.jpg';
import { getWallPosition } from './layout';

const albums = Array.from({ length: 12 }, (_, index) => ({
  id: index,
  image: albumImage,
}));

export default function Gallery() {
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
          />
        );
      })}
    </>
  );
}
