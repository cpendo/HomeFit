import DataTable from "react-data-table-component";
import { MdModeEdit, MdDelete } from "react-icons/md";
import { LuBicepsFlexed } from "react-icons/lu";
import { Link } from "react-router-dom";
import { customStyles } from "../../styles";
import PropTypes from "prop-types";
import { useGetProfileQuery } from "../../../../features/users/usersApi";

const Tag = ({ children, variant }) => {
  const styles = {
    personal: "bg-brand/10 text-brand border-brand/20",
    default: "bg-ink/5 text-ink/70 border-line",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium uppercase tracking-wider border ${styles[variant]}`}
    >
      {children}
    </span>
  );
};

const WorkoutTable = ({
  data,
  currentPage,
  handleDeleteWorkout,
  isDeletingWorkout,
}) => {
  const { data: profileData } = useGetProfileQuery();
  const user = profileData?.user;

  const columns = [
    {
      name: "#",
      selector: (row, index) => `#${(currentPage - 1) * 7 + index + 1}`,
      width: "60px",
    },
    {
      name: "Workout",
      selector: (row) => (
        <Link
          to={`${row.id}`}
          className="font-medium text-ink hover:text-brand transition-colors"
        >
          {row.name}
        </Link>
      ),
      grow: 2,
    },
    {
      name: "Category",
      selector: (row) => row.category.name,
      grow: 1,
    },
    {
      name: "Intensity",
      selector: (row) => row.difficulty,
      width: "120px",
    },
    {
      name: "Suggested reps",
      selector: (row) => row.suggested_reps,
      grow: 1,
    },
    {
      name: "Tag",
      selector: (row) =>
        row.creator_id === user?.id ? (
          <Tag variant="personal">Personal</Tag>
        ) : (
          <Tag variant="default">Default</Tag>
        ),
      width: "120px",
    },
    {
      name: "Actions",
      width: "130px",
      ignoreRowClick: true,
      selector: (row) =>
        row.creator_id === user?.id ? (
          <div className="flex gap-2">
            <Link to={`update/${row.id}`}>
              <button
                className="inline-flex items-center justify-center size-8 rounded-full bg-ink text-paper hover:bg-brand transition-colors"
                aria-label="Edit workout"
              >
                <MdModeEdit className="size-4" />
              </button>
            </Link>
            <button
              disabled={isDeletingWorkout}
              onClick={() => handleDeleteWorkout(row.id)}
              className={`inline-flex items-center justify-center size-8 rounded-full transition-colors ${
                isDeletingWorkout
                  ? "bg-line text-mute cursor-not-allowed"
                  : "bg-brand/10 text-brand hover:bg-brand hover:text-paper"
              }`}
              aria-label="Delete workout"
            >
              <MdDelete className="size-4" />
            </button>
          </div>
        ) : (
          <div className="flex gap-2">
            <button
              className="inline-flex items-center justify-center size-8 rounded-full bg-line text-mute cursor-not-allowed"
              disabled
              aria-label="Edit disabled"
            >
              <MdModeEdit className="size-4" />
            </button>
            <button
              className="inline-flex items-center justify-center size-8 rounded-full bg-line text-mute cursor-not-allowed"
              disabled
              aria-label="Delete disabled"
            >
              <MdDelete className="size-4" />
            </button>
          </div>
        ),
    },
  ];

  return (
    <div className="min-h-[420px] -mx-4 sm:mx-0 px-4 sm:px-0 overflow-x-auto">
      <DataTable
        columns={columns}
        data={data}
        customStyles={customStyles}
        fixedHeader
        responsive
        noDataComponent={
          <div className="w-full py-16 flex flex-col items-center gap-4 bg-white border border-line border-dashed rounded-xl">
            <span className="inline-flex items-center justify-center size-14 rounded-full bg-brand/10 text-brand">
              <LuBicepsFlexed className="size-6" />
            </span>
            <div className="text-center">
              <h3 className="font-secondary text-2xl tracking-tight uppercase">
                No workouts yet
              </h3>
              <p className="text-sm text-mute mt-1">
                Add your first workout to start building your library.
              </p>
            </div>
          </div>
        }
        persistTableHead={true}
      />
    </div>
  );
};

WorkoutTable.propTypes = {
  data: PropTypes.array,
  currentPage: PropTypes.string,
  handleDeleteWorkout: PropTypes.func,
  isDeletingWorkout: PropTypes.bool,
};

export default WorkoutTable;
