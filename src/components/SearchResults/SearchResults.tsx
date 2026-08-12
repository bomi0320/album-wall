import type { Album } from '../../types/album';

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
          <div>
            <h3>{album.title}</h3>
            <p>{album.artist}</p>
            <span>{album.year}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
