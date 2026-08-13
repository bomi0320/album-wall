import type { Album } from '../types/album';

import './AlbumInfoPanel.css';

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
        <p className="album-panel-empty">
          앨범을 선택해주세요.
        </p>
      ) : (
        <>
          <img
            className="album-panel-image"
            src={album.image}
            alt={album.title}
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
            className="delete-album-button"
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
