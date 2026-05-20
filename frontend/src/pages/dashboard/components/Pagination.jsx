import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const current = Number(currentPage);
  const total = Number(totalPages);
  const pages = [];
  for (let i = 1; i <= totalPages; i++) pages.push(i);

  const navBtn =
    "inline-flex items-center justify-center size-10 rounded-full border border-line text-ink transition-colors";

  return (
    <div className="flex items-center justify-center gap-1.5 pt-2">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
        className={`${navBtn} ${
          current <= 1
            ? "text-mute opacity-50 cursor-not-allowed"
            : "hover:bg-ink hover:text-paper cursor-pointer"
        }`}
        aria-label="Previous page"
      >
        <IoIosArrowBack className="size-5" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`inline-flex items-center justify-center size-10 rounded-full text-sm font-medium transition-colors ${
            current === page
              ? "bg-ink text-paper"
              : "text-ink hover:bg-ink/5 cursor-pointer"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current >= total}
        className={`${navBtn} ${
          current >= total
            ? "text-mute opacity-50 cursor-not-allowed"
            : "hover:bg-ink hover:text-paper cursor-pointer"
        }`}
        aria-label="Next page"
      >
        <IoIosArrowForward className="size-5" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
