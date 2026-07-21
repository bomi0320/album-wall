import AlbumFrame from './AlbumFrame';
import albumImage from '../assets/test-album.jpg';
import { getWallPosition } from './layout';

type Album = {
  id: number;
  title: string;
  artist: string;
  year: number;
  image: string;
};

const albums: Album[] = Array.from(
  { length: 12 },
  (_, index) => ({
    id: index,
    title: `Album ${index + 1}`,
    artist: `Artist ${index + 1}`,
    year: 2025,
    image: albumImage,
  }),
);

type GalleryProps = {
  selectedAlbum: Album | null;
  setSelectedAlbum: React.Dispatch<
    React.SetStateAction<Album | null>
  >;
};

export default function Gallery({
  selectedAlbum,
  setSelectedAlbum,
}: GalleryProps) {
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
            selected={selectedAlbum?.id === album.id}
            onClick={() => setSelectedAlbum(album)}
          />
        );
      })}
    </>
  );
}
