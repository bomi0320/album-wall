import { OrbitControls } from '@react-three/drei';

import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import Gallery from './Gallery';

import type { Album } from '../types/album';

type RoomProps = {
  albums: Album[];
  onSelect: (album: Album) => void;
};

export default function Room({
  albums,
  onSelect,
}: RoomProps) {
  return (
    <>
      <Lights />

      <Floor />

      <Walls />

      <Gallery
        albums={albums}
        onSelect={onSelect}
      />

      <OrbitControls />
    </>
  );
}
