import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { customStyles } from "../../styles";
import PropTypes from "prop-types";

const LogTable = ({ data, currentPage, handleDeleteLog, isDeletingLog }) => {
  const columns = [
    {
      name: "#",
      width: "60px",
      selector: (row, index) => `#${(currentPage - 1) * 7 + index + 1}`,
    },
    {
      name: "Workout",
      grow: 2,
      selector: (row) => (
        <Link
          to={`${row.id}`}
          className="font-medium text-ink hover:text-brand transition-colors"
        >
          {row.workouts.name}
        </Link>
      ),
    },
    {
      name: "Category",
      grow: 1,
      selector: (row) => row.workouts.category.name,
    },
    {
      name: "Intensity",
      width: "120px",
      selector: (row) => row.workouts.difficulty,
    },
    {
      name: "Reps",
      width: "160px",
      selector: (row) => row.performed_reps,
    },
    {
      name: "Duration",
      width: "120px",
      selector: (row) => {
        const minutes = Math.floor(row.duration / 60);
        const seconds = row.duration % 60;
        return `${minutes}m ${seconds}s`;
      },
    },
    {
      name: "Logged at",
      grow: 2,
      selector: (row) => new Date(row.performed_at).toLocaleString(),
    },
    {
      name: "Actions",
      width: "90px",
      ignoreRowClick: true,
      selector: (row) => (
        <button
          onClick={() => handleDeleteLog(row.id)}
          disabled={isDeletingLog}
          className={`inline-flex items-center justify-center size-8 rounded-full transition-colors ${
            isDeletingLog
              ? "bg-line text-mute cursor-not-allowed"
              : "bg-brand/10 text-brand hover:bg-brand hover:text-paper"
          }`}
          aria-label="Delete log"
        >
          <MdDelete className="size-4" />
        </button>
      ),
    },
  ];

  return (
    <div className="min-h-[420px] -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={data}
        responsive
        noDataComponent={
          <div className="w-full py-16 flex flex-col items-center gap-4 bg-white border border-line border-dashed rounded-xl">
            <span className="inline-flex items-center justify-center size-14 rounded-full bg-brand/10 text-brand">
              <FaNoteSticky className="size-6" />
            </span>
            <div className="text-center">
              <h3 className="font-secondary text-2xl tracking-tight uppercase">
                No logs yet
              </h3>
              <p className="text-sm text-mute mt-1">
                Track your first workout to start building a streak.
              </p>
            </div>
          </div>
        }
        persistTableHead
        fixedHeader
      />
    </div>
  );
};

LogTable.propTypes = {
  data: PropTypes.array,
  currentPage: PropTypes.string,
  handleDeleteLog: PropTypes.func,
  isDeletingLog: PropTypes.bool,
};

export default LogTable;
