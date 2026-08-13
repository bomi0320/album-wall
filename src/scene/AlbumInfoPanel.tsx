import type { Album } from '../types/album';

type AlbumInfoPanelProps = {
  album: Album | null;
  onDelete: (albumId: number) => void;
};

export default function AlbumInfoPanel({
  album,
  onDelete,
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

          <button
            type="button"
            onClick={() => onDelete(album.id)}
          >
            앨범 삭제
          </button>

          <a
            className="apple-music-link"
            href={album.appleMusicUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            Apple Music에서 보기
          </a>
        </>
      )}
    </div>
  );
}
