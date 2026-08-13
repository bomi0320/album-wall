import type { Album } from '../../types/album';

import './SearchResults.css';

type SearchResultsProps = {
  albums: Album[];
  onSelect: (album: Album) => void;
};

export default function SearchResults({
  albums,
  onSelect,
}: SearchResultsProps) {
  if (albums.length === 0) {
    return null;
  }

  return (
    <div className="search-results">
      <p className="search-results-title">Search Results</p>

      <div className="search-results-list">
        {albums.map((album) => (
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
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
