import type { Album } from '../../types/album';
import Pagination from '../Pagination/Pagination';

import './SearchResults.css';

type SearchResultsProps = {
  albums: Album[];
  selectedAlbums: (Album | null)[];
  onSelect: (album: Album) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  hasSearched: boolean;
};

export default function SearchResults({
  albums,
  selectedAlbums,
  onSelect,
  currentPage,
  totalPages,
  onPageChange,
  hasSearched,
}: SearchResultsProps) {
  if (albums.length === 0) {
    if (!hasSearched) {
      return null;
    }

    return (
      <div className="search-results">
        <p className="search-results-title">
          Search Results
        </p>

        <p className="search-results-empty">
          검색 결과가 없습니다.
        </p>
      </div>
    );
  }

  return (
    <div className="search-results">
      <p className="search-results-title">Search Results</p>

      <div className="search-results-list">
        {albums.map((album) => {
          const isDisplayed = selectedAlbums.some(
            (selectedAlbum) =>
              selectedAlbum?.id === album.id,
          );

          return (
            <button
              key={album.id}
              className="search-result-card"
              onClick={() => onSelect(album)}
            >
              <img
                src={album.image}
                alt={`${album.artist} - ${album.title}`}
              />

              <div className="search-result-info">
                <h3>{album.title}</h3>

                <p>{album.artist}</p>

                <span>{album.year}</span>

                {isDisplayed && (
                  <span className="already-displayed">
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
