import './Pagination.css';

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
    <div className="pagination">
      <button
        type="button"
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
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
              className={
                page === currentPage ? 'active' : ''
              }
              onClick={() => onPageChange(page)}
            >
              {page}
            </button>
          );
        }

        if (
          page === currentPage - 3 ||
          page === currentPage + 3
        ) {
          return <span key={page}>...</span>;
        }

        return null;
      })}

      <button
        type="button"
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
    </div>
  );
}
