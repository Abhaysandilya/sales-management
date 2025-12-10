import '../styles/PaginationControls.css';

function PaginationControls({ pagination, onPageChange }) {
  if (!pagination) return null;

  const { currentPage, totalPages, hasNextPage, hasPreviousPage, totalItems } = pagination;

  const handlePrevious = () => {
    if (hasPreviousPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (hasNextPage) {
      onPageChange(currentPage + 1);
    }
  };

  const handlePageClick = (page) => {
    if (page !== currentPage && page >= 1 && page <= totalPages) {
      onPageChange(page);
    }
  };

  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;
    
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
      } else if (currentPage >= totalPages - 2) {
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        for (let i = currentPage - 2; i <= currentPage + 2; i++) {
          pages.push(i);
        }
      }
    }
    
    return pages;
  };

  return (
    <div className="pagination-controls">
      <div className="pagination-info">
        Showing page {currentPage} of {totalPages} ({totalItems} total items)
      </div>
      
      <div className="pagination-buttons">
        <button
          onClick={handlePrevious}
          disabled={!hasPreviousPage}
          className="pagination-btn"
          aria-label="Previous page"
        >
          Previous
        </button>

        <div className="pagination-pages">
          {getPageNumbers().map(page => (
            <button
              key={page}
              onClick={() => handlePageClick(page)}
              className={`pagination-page ${page === currentPage ? 'active' : ''}`}
              aria-label={`Go to page ${page}`}
            >
              {page}
            </button>
          ))}
        </div>

        <button
          onClick={handleNext}
          disabled={!hasNextPage}
          className="pagination-btn"
          aria-label="Next page"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default PaginationControls;

