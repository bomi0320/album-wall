import { useState } from 'react';

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
      className="
        fixed left-6 top-6 z-20
        flex w-[360px] items-center gap-2
        rounded-2xl border border-gallery-border
        bg-gallery-panel/95 p-1.5
        shadow-gallery backdrop-blur-md
      "
      onSubmit={handleSubmit}
    >
      <input
        type="text"
        value={query}
        onChange={(event) => {
          setQuery(event.target.value);
        }}
        placeholder="앨범 또는 아티스트 검색"
        className="
          min-w-0 flex-1
          bg-transparent px-3 py-2.5
          text-sm text-text-primary
          outline-none
          placeholder:text-text-muted
        "
      />

      <button
        type="submit"
        disabled={isLoading}
        className="
          shrink-0 rounded-xl
          bg-primary px-4 py-2.5
          text-sm font-medium text-white
          transition-all duration-200
          hover:bg-primary-hover
          active:scale-95
          disabled:cursor-wait
          disabled:opacity-70
        "
      >
        {isLoading ? '검색 중...' : '검색'}
      </button>
    </form>
  );
}
