import { OrbitControls } from '@react-three/drei';

import Lights from './Lights';
import Floor from './Floor';
import Walls from './Walls';
import Gallery from './Gallery';

import type { Album } from '../types/album';

type RoomProps = {
  albums: (Album | null)[];
  onSelect: (album: Album) => void;
  selectedSlotIndex: number | null;
  onSelectSlot: (index: number) => void;
};

export default function Room({
  albums,
  onSelect,
  selectedSlotIndex,
  onSelectSlot,
}: RoomProps) {
  return (
    <>
      <Lights />

      <Floor />

      <Walls />

      <Gallery
        albums={albums}
        onSelect={onSelect}
        selectedSlotIndex={selectedSlotIndex}
        onSelectSlot={onSelectSlot}
      />

      <OrbitControls />
    </>
  );
}
