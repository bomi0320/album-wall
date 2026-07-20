import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import AlbumFrame from './AlbumFrame';
import albumImage from '../assets/test-album.jpg';

export default function Room() {
  return (
    <>
      <Lights />

      <Floor />

      <Walls />

      <AlbumFrame
        image={albumImage}
        position={[-5.92, 2, -4]}
        rotation={[0, Math.PI / 2, 0]}
      />

      <OrbitControls />
    </>
  );
}
