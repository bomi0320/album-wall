import { OrbitControls } from '@react-three/drei';
import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import Gallery from './Gallery';

export default function Room() {
  return (
    <>
      <Lights />

      <Floor />

      <Walls />

      <Gallery />

      <OrbitControls />
    </>
  );
}
