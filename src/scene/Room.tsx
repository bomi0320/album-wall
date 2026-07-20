import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import AlbumFrame from './AlbumFrame';
import albumImage from '../assets/test-album.jpg';

export default function Room() {
  const albums = [
    {
      id: 1,
      image: albumImage,
      position: [-5.92, 2, -4] as [number, number, number],
    },
    {
      id: 2,
      image: albumImage,
      position: [-5.92, 2, -2] as [number, number, number],
    },
    {
      id: 3,
      image: albumImage,
      position: [-5.92, 2, -0] as [number, number, number],
    },
  ];

  return (
    <>
      <Lights />

      <Floor />

      <Walls />

      {albums.map((album) => (
        <AlbumFrame
          key={album.id}
          image={album.image}
          position={album.position}
          rotation={[0, Math.PI / 2, 0]}
        />
      ))}

      <OrbitControls />
    </>
  );
}
