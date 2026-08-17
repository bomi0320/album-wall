type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  return (
    <div
      className="
        mt-3 flex items-center justify-center gap-1
        border-t border-gallery-border
        pt-3
      "
    >
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="
          flex h-7 w-7 items-center justify-center
          rounded-lg
          text-sm text-text-secondary
          transition-colors
          hover:bg-primary-soft hover:text-text-primary
          disabled:cursor-default
          disabled:opacity-30
        "
      >
        ‹
      </button>

      {Array.from({ length: totalPages }, (_, index) => {
        const page = index + 1;

        if (
          page === 1 ||
          page === totalPages ||
          Math.abs(page - currentPage) <= 2
        ) {
          return (
            <button
              type="button"
              key={page}
              onClick={() => onPageChange(page)}
              className={`
                flex h-7 w-7 items-center justify-center
                rounded-lg
                text-xs
                transition-colors
                ${
                  page === currentPage
                    ? 'bg-primary text-white shadow-sm'
                    : 'text-text-secondary hover:bg-primary-soft hover:text-text-primary'
                }
              `}
            >
              {page}
            </button>
          );
        }

        if (
          page === currentPage - 3 ||
          page === currentPage + 3
        ) {
          return (
            <span
              key={page}
              className="px-1 text-xs text-text-muted"
            >
              ...
            </span>
          );
        }

        return null;
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="
          flex h-7 w-7 items-center justify-center
          rounded-lg
          text-sm text-text-secondary
          transition-colors
          hover:bg-primary-soft hover:text-text-primary
          disabled:cursor-default
          disabled:opacity-30
        "
      >
        ›
      </button>
    </div>
  );
}
