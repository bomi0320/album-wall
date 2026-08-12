import type { Album } from '../../types/album';

type SearchResultsProps = {
  albums: Album[];
};

export default function SearchResults({
  albums,
}: SearchResultsProps) {
  if (albums.length === 0) {
    return null;
  }

  return (
    <div className="search-results">
      {albums.map((album) => (
        <div
          key={album.id}
          className="search-result-card"
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
        </div>
      ))}
    </div>
  );
}
