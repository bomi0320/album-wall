import AlbumFrame from './AlbumFrame';
import { getWallPosition, MAX_ALBUMS } from './layout';
import type { Album } from '../types/album';

type GalleryProps = {
  albums: (Album | null)[];
  onSelect: (album: Album) => void;
  selectedSlotIndex: number | null;
  onSelectSlot: (index: number) => void;
};

export default function Gallery({
  albums,
  onSelect,
  selectedSlotIndex,
  onSelectSlot,
}: GalleryProps) {
  return (
    <>
      {Array.from({ length: MAX_ALBUMS }, (_, index) => {
        const album = albums[index];

        const { position, rotation } =
          getWallPosition(index);

        return (
          <AlbumFrame
            key={album?.id ?? `empty-${index}`}
            image={album?.image}
            position={position}
            rotation={rotation}
            onSelect={() => {
              if (album) {
                onSelectSlot(index);
                onSelect(album);
              } else {
                onSelectSlot(index);
              }
            }}
            isSelected={selectedSlotIndex === index}
          />
        );
      })}
    </>
  );
}
