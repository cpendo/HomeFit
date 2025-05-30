import DataTable from "react-data-table-component";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { customStyles } from "../../styles";
import PropTypes from "prop-types";
import boxImage from "../../../../assets/paper.png";
import { useGetProfileQuery } from "../../../../features/users/usersApi";

const WorkoutTable = ({ data, currentPage, handleDeleteWorkout }) => {
  const {
    data: { user },
  } = useGetProfileQuery();

  const columns = [
    {
      name: "Id",
      selector: (row, index) => `#${(currentPage - 1) * 7 + index + 1}`,
      maxWidth: "10px",
    },
    {
      name: "Workout Name",
      selector: (row) => (
        <Link
          to={`${row.id}`}
          className="hover:text-red-secondary hover:text-base"
        >
          {row.name}
        </Link>
      ),
      minWidth: "250px",
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
      minWidth: "200px",
    },
    {
      name: "Level",
      selector: (row) => row.difficulty,
      width: "150px",
    },
    {
      name: "Suggested Reps",
      selector: (row) => row.suggested_reps,
      minWidth: "250px",
    },
    {
      name: "Tags",
      selector: (row) =>
        row.creator_id === user?.id ? (
          <p className="bg-red-secondary text-white text-xs rounded-sm p-2">
            Personal
          </p>
        ) : (
          <p className="bg-gray-400 text-black text-xs rounded-sm p-2">
            Default
          </p>
        ),
    },
    {
      name: "Action",
      selector: (row) =>
        row.creator_id === user?.id ? (
          <div className="flex gap-2">
            <Link to={`update/${row.id}`}>
              <button className="bg-red-secondary text-white p-2 rounded-sm cursor-pointer">
                <MdModeEdit />
              </button>
            </Link>
            <button
              onClick={() => handleDeleteWorkout(row.id)}
              className="bg-red-secondary text-white p-2 rounded-sm cursor-pointer"
            >
              <MdDelete />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button className="bg-gray-400 text-gray-600 p-2 rounded-sm cursor-not-allowed">
              <MdModeEdit />
            </button>
            <button className="bg-gray-400 text-gray-600 p-2 rounded-sm cursor-not-allowed">
              <MdDelete />
            </button>
          </div>
        ),
    },
  ];

  return (
    <div className="h-105 flex justify-center items-start">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        fixedHeader
        noDataComponent={
          <div className="bg-gray-100 h-90  w-full flex flex-col justify-center items-center gap-5 rounded-sm">
            <img
              src={boxImage}
              alt="Illustration of an empty box"
              className="w-25 h-auto object-contain"
            />
            <h1 className="font-secondary text-3xl">
              No workouts found. Add your first workout!
            </h1>
          </div>
        }
        persistTableHead={true}
      />
    </div>
  );
};

WorkoutTable.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      difficulty: PropTypes.string,
      suggested_reps: PropTypes.string,
      is_ai_generated: PropTypes.bool,
      creator_id: PropTypes.number,
      category: PropTypes.shape({
        name: PropTypes.string,
        id: PropTypes.number
      }),
    })
  ),
  currentPage: PropTypes.string,
  handleDeleteWorkout: PropTypes.func,
};

export default WorkoutTable;
