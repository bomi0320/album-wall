import type { Album } from '../types/album';

type AlbumInfoPanelProps = {
  album: Album | null;
};

export default function AlbumInfoPanel({
  album,
}: AlbumInfoPanelProps) {
  return (
    <div className="album-panel">
      <h2>Album Information</h2>

      {!album ? (
        <p>엘범을 선택해주세요.</p>
      ) : (
        <>
          <img
            src={album.image}
            alt={album.title}
            width={180}
          />
          <p>
            <strong>Title</strong>
          </p>
          <p>{album.title}</p>

          <p>
            <strong>Artist</strong>
          </p>
          <p>{album.artist}</p>

          <p>
            <strong>Year</strong>
          </p>
          <p>{album.year}</p>
        </>
      )}
    </div>
  );
}
