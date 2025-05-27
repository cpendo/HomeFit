import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import PropTypes from "prop-types";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const current = Number(currentPage);
  const total = Number(totalPages);
  const pages = [];

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i);
  }

  return (
    <div className="flex flex-row items-center justify-center gap-2">
      <button
        onClick={() => onPageChange(current - 1)}
        disabled={current <= 1}
        className={`flex justify-center items-center rounded-sm size-10 ${
          current <= 1 ? "bg-gray-200 text-gray-400 cursor-not-allowed" : "bg-gray-300 text-black cursor-pointer"
        }`}
      >
        <IoIosArrowBack className="text-2xl" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`flex justify-center items-center font-secondary text-lg bg-gray-300 rounded-sm size-10 cursor-pointer ${
            current === page ? "text-red-secondary" : "text-black"
          }`}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => onPageChange(current + 1)}
        disabled={current >= total}
        className={`flex justify-center items-center rounded-sm size-10 ${
          current >= total
            ? "bg-gray-200 text-gray-400 cursor-not-allowed"
            : "bg-gray-300 text-black cursor-pointer"
        }`}
      >
        <IoIosArrowForward className="text-2xl" />
      </button>
    </div>
  );
};

Pagination.propTypes = {
  currentPage: PropTypes.string.isRequired,
  totalPages: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired,
};

export default Pagination;
