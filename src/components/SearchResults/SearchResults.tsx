import type { Album } from '../../types/album';
import Pagination from '../Pagination/Pagination';

type SearchResultsProps = {
  albums: Album[];
  selectedAlbums: (Album | null)[];
  onSelect: (album: Album) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasSearched: boolean;
  isCoachMarkTarget: boolean;
};

export default function SearchResults({
  albums,
  selectedAlbums,
  onSelect,
  currentPage,
  totalPages,
  onPageChange,
  hasSearched,
  isCoachMarkTarget,
}: SearchResultsProps) {
  if (albums.length === 0) {
    if (!hasSearched) {
      return null;
    }

    return (
      <div
        id="coach-search-results"
        className={`
          fixed left-6 top-[84px]
          ${isCoachMarkTarget ? 'z-[110]' : 'z-50'}
          flex w-[360px] flex-col
          rounded-2xl
          border border-gallery-border
          bg-gallery-panel/95
          p-4
          shadow-gallery
          backdrop-blur-md
          max-h-[calc(100vh-108px)]
          overflow-hidden
        `}
      >
        <p
          className="
            mb-3 px-1
            text-xs font-medium uppercase tracking-[0.12em]
            text-text-secondary
          "
        >
          Search Results
        </p>

        <p
          className="
            py-10
            text-center text-sm
            text-text-muted
          "
        >
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div
      className={`
        fixed left-6 top-[84px] 
        ${isCoachMarkTarget ? 'z-[110]' : 'z-50'}
        flex w-[360px] flex-col
        rounded-2xl
        border border-gallery-border
        bg-gallery-panel/95
        p-4
        shadow-gallery
        backdrop-blur-md
        max-h-[calc(100vh-108px)]
        overflow-hidden
      `}
    >
      <p
        className="
          mb-3 px-1
          text-xs font-medium uppercase tracking-[0.12em]
          text-text-secondary
        "
      >
        Search Results
      </p>

      <div
        className="
          flex max-h-[500px] flex-1
          flex-col gap-2
          overflow-y-auto
          pr-1
        "
      >
        {albums.map((album) => {
          const isDisplayed = selectedAlbums.some(
            (selectedAlbum) =>
              selectedAlbum?.id === album.id,
          );

          return (
            <button
              key={album.id}
              type="button"
              onClick={() => onSelect(album)}
              className="
                group flex w-full items-center gap-3
                rounded-xl p-2
                text-left
                transition-all duration-200
                hover:translate-x-0.5
                hover:bg-primary-soft/50
              "
            >
              <img
                src={album.image}
                alt={`${album.artist} - ${album.title}`}
                className="
                  h-14 w-14 shrink-0
                  rounded-lg
                  object-cover
                  shadow-sm
                "
              />

              <div className="min-w-0 flex-1">
                <h3
                  className="
                    mb-1 truncate
                    text-sm font-semibold
                    text-text-primary
                  "
                >
                  {album.title}
                </h3>

                <p
                  className="
                    mb-1 truncate
                    text-xs
                    text-text-secondary
                  "
                >
                  {album.artist}
                </p>

                <span className="text-xs text-text-muted">
                  {album.year}
                </span>

                {isDisplayed && (
                  <span
                    className="
                      mt-1 block
                      text-[11px] font-medium
                      text-primary
                    "
                  >
                    이미 전시됨
                  </span>
                )}
              </div>
            </button>
          );
        })}
      </div>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
      />
    </div>
  );
}
