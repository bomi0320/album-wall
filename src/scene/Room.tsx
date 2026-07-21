import { OrbitControls } from '@react-three/drei';
import type { Album } from '../types/album';

import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import Gallery from './Gallery';

type RoomProps = {
  selectedAlbum: Album | null;
  setSelectedAlbum: React.Dispatch<
    React.SetStateAction<Album | null>
  >;
};

export default function Room({
  selectedAlbum,
  setSelectedAlbum,
}: RoomProps) {
  return (
    <>
      <Lights />

      <Floor />

      <Walls />

      <Gallery
        selectedAlbum={selectedAlbum}
        setSelectedAlbum={setSelectedAlbum}
      />

      <OrbitControls />
    </>
  );
}
