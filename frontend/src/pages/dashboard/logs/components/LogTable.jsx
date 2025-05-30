import DataTable from "react-data-table-component";
import { MdDelete } from "react-icons/md";
import { customStyles } from "../../styles";
import PropTypes from "prop-types";
import boxImage from "../../../../assets/paper.png";

const LogTable = ({
  data,
  currentPage,
  handleDeleteLog,
  isDeletingLog,
}) => {
  const columns = [
    {
      name: "#",
      width: "60px",
      selector: (row, index) => {
        return `#${(currentPage - 1) * 7 + index + 1}`;
      },
    },
    {
      name: "Name",
      grow: 2,
      selector: (row) => row.workouts.name,
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
      name: "Logged At",
      grow: 2,
      selector: (row) => {
        return new Date(row.performed_at).toLocaleString();
      },
    },
    {
      name: "Action",
      selector: (row) => (
        <button
          onClick={() => handleDeleteLog(row.id)}
          disabled={isDeletingLog}
          className={` p-2 rounded-sm  ${
            isDeletingLog
              ? "cursor-not-allowed bg-gray-400 text-gray-600"
              : "cursor-pointer bg-red-secondary text-white"
          }`}
        >
          <MdDelete />
        </button>
      ),
      width: "100px",
      ignoreRowClick: true,
      //button: true,
    },
  ];

  return (
    <div className="h-105 flex justify-center items-start">
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={data}
        noDataComponent={
          <div className="bg-gray-100 h-90  w-full flex flex-col justify-center items-center gap-5 rounded-sm">
            <img
              src={boxImage}
              alt="Illustration of an empty box"
              className="w-25 h-auto object-contain"
            />
            <h1 className="font-secondary text-3xl">
              No logs found. Add your first workout log!
            </h1>
          </div>
        }
        persistTableHead={true}
        fixedHeader
      />
    </div>
  );
};

LogTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      performed_reps: PropTypes.string,
      duration: PropTypes.number,
      performed_at: PropTypes.string,
      workouts: PropTypes.shape({
        name: PropTypes.string,
        idifficulty: PropTypes.string,
        category: PropTypes.shape({
          name: PropTypes.string,
          id: PropTypes.number,
        }),
      }),
    })
  ),
  currentPage: PropTypes.string,
  handleDeleteLog: PropTypes.func,
  isDeletingLog: PropTypes.bool 
};

export default LogTable;
