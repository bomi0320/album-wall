import type { Album } from '../types/album';

import './AlbumInfoPanel.css';

type AlbumInfoPanelProps = {
  album: Album | null;
  onDelete: (albumId: number) => void;
  onDeleteAll: () => void;
  onClose: () => void;
};

export default function AlbumInfoPanel({
  album,
  onDelete,
  onDeleteAll,
  onClose,
}: AlbumInfoPanelProps) {
  return (
    <div className="album-panel">
      <h2>Album Information</h2>

      <button
        className="album-panel-close"
        type="button"
        onClick={onClose}
        aria-label="앨범 정보 닫기"
      >
        ×
      </button>

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

      <button
        className="delete-all-button"
        type="button"
        onClick={onDeleteAll}
      >
        전체 삭제
      </button>
    </div>
  );
}
