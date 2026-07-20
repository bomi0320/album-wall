import AlbumFrame from './AlbumFrame';
import albumImage from '../assets/test-album.jpg';
import { getLeftWallPosition } from './layout';

const albums = Array.from({ length: 6 }, (_, index) => ({
  id: index,
  image: albumImage,
}));

export default function Gallery() {
  return (
    <>
      {albums.map((album, index) => (
        <AlbumFrame
          key={album.id}
          image={album.image}
          position={getLeftWallPosition(index)}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
    </>
  );
}
