import AlbumFrame from './AlbumFrame';
import albumImage from '../assets/test-album.jpg';

const albums = Array.from({ length: 6 }, (_, index) => {
  const row = index % 2;
  const col = Math.floor(index / 2);

  return {
    id: index,
    image: albumImage,
    position: [-5.92, 3 - row * 1.5, -4 + col * 2] as [
      number,
      number,
      number,
    ],
  };
});

export default function Gallery() {
  return (
    <>
      {albums.map((album) => (
        <AlbumFrame
          key={album.id}
          image={album.image}
          position={album.position}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}
    </>
  );
}
