import { useState } from 'react';
import { Search, Minus } from 'lucide-react';

type SearchBarProps = {
  onSearch: (query: string) => void;
  isLoading: boolean;
  isCoachMarkTarget: boolean;
  isOpen: boolean;
  onToggle: () => void;
};

export default function SearchBar({
  onSearch,
  isLoading,
  isCoachMarkTarget,
  isOpen,
  onToggle,
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

  if (!isOpen) {
    return (
      <button
        type="button"
        className="
          fixed left-6 top-6 z-50
          flex h-12 w-12 items-center justify-center
          rounded-2xl
          border border-gallery-border
          bg-gallery-panel/95
          text-lg
          shadow-gallery
          backdrop-blur-md
          transition-all duration-200
          hover:bg-primary-soft
          active:scale-95
        "
        onClick={onToggle}
        aria-label="검색창 열기"
      >
        <Search
          size={15}
          strokeWidth={1.8}
        />
      </button>
    );
  }

  return (
    <form
      id="coach-search"
      className={`        
        fixed left-6 top-6
        ${isCoachMarkTarget ? 'z-[110]' : 'z-50'}
        flex w-[360px] items-center gap-2
        rounded-2xl border border-gallery-border
        bg-gallery-panel/95 p-1.5
        shadow-gallery backdrop-blur-md
      `}
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
        type="button"
        onClick={onToggle}
        disabled={isCoachMarkTarget}
        className="
          shrink-0 rounded-xl
          px-2.5 py-2.5
          text-text-muted
          transition-all duration-200
          hover:bg-primary-soft
          hover:text-text-primary
          active:scale-95
        "
        aria-label="검색창 접기"
      >
        <Minus
          size={15}
          strokeWidth={1.8}
        />
      </button>

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
