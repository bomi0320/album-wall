import type { Album } from '../types/album';

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
    <div
      className="
        fixed right-6 bottom-6 z-20
        flex h-[670px] w-[280px] flex-col
        rounded-2xl
        border border-gallery-border
        bg-gallery-panel/95
        p-5
        shadow-gallery
        backdrop-blur-md
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-text-primary">
          Album Information
        </h2>

        <button
          type="button"
          onClick={onClose}
          aria-label="앨범 정보 닫기"
          className="
            flex h-7 w-7 items-center justify-center
            rounded-lg
            text-xl font-light leading-none
            text-text-muted
            transition-colors
            hover:bg-primary-soft
            hover:text-text-primary
          "
        >
          ×
        </button>
      </div>

      {!album ? (
        <div className="flex flex-1 items-center justify-center">
          <p className="text-center text-sm text-text-muted">
            앨범을 선택해주세요.
          </p>
        </div>
      ) : (
        <>
          {/* Album Image */}
          <img
            src={album.image}
            alt={album.title}
            className="
              mt-5 aspect-square w-full
              rounded-xl object-cover
              shadow-sm
            "
          />

          {/* Album Information */}
          <div className="mt-5 space-y-3">
            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Title
              </p>
              <p className="truncate text-sm font-medium text-text-primary">
                {album.title}
              </p>
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Artist
              </p>
              <p className="truncate text-sm text-text-secondary">
                {album.artist}
              </p>
            </div>

            <div>
              <p className="mb-1 text-[10px] font-semibold uppercase tracking-[0.08em] text-text-muted">
                Year
              </p>
              <p className="text-sm text-text-secondary">
                {album.year}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-auto space-y-2">
            <a
              href={album.appleMusicUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="
                block w-full rounded-xl
                bg-primary px-3 py-2.5
                text-center text-xs font-semibold text-white
                no-underline
                transition-colors
                hover:bg-primary-hover
              "
            >
              Apple Music에서 보기
            </a>

            <button
              type="button"
              onClick={() => onDelete(album.id)}
              className="
                w-full rounded-xl
                border border-gallery-border
                bg-transparent px-3 py-2.5
                text-xs font-medium text-text-secondary
                transition-colors
                hover:border-primary-soft
                hover:bg-primary-soft
                hover:text-text-primary
              "
            >
              앨범 삭제
            </button>

            <button
              type="button"
              onClick={onDeleteAll}
              className="
                w-full rounded-xl
                border border-gallery-border
                bg-transparent px-3 py-2.5
                text-xs font-medium text-text-muted
                transition-colors
                hover:border-red-200
                hover:bg-red-50
                hover:text-red-500
              "
            >
              전체 삭제
            </button>
          </div>
        </>
      )}

      {/* Empty state에서도 전체 삭제 버튼은 유지 */}
      {!album && (
        <button
          type="button"
          onClick={onDeleteAll}
          className="
            mt-auto w-full rounded-xl
            border border-gallery-border
            bg-transparent px-3 py-2.5
            text-xs font-medium text-text-muted
            transition-colors
            hover:border-red-200
            hover:bg-red-50
            hover:text-red-500
          "
        >
          전체 삭제
        </button>
      )}
    </div>
  );
}
