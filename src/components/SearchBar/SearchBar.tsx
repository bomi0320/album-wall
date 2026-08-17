import { useState } from 'react';

import './SearchBar.css';

type SearchBarProps = {
  onSearch: (query: string) => void;
  isLoading: boolean;
};

export default function SearchBar({
  onSearch,
  isLoading,
}: SearchBarProps) {
  const [query, setQuery] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) {
      return;
    }

    onSearch(trimmedQuery);
  };

  return (
    <form
      className="search-bar"
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="앨범 또는 아티스트 검색"
      />
      <button type="submit">
        {isLoading ? '검색 중...' : '검색'}
      </button>
    </form>
  );
}
