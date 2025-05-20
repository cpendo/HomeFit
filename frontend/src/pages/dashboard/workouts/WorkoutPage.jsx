import { LuSettings2 } from "react-icons/lu";
import DataTable from "react-data-table-component";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link, useSearchParams } from "react-router-dom";
import SkeletonTable from "../components/SkeletonTable";
import { useGetWorkoutsQuery } from "../../../features/workouts/workoutsApi";

const customStyles = {
  headRow: {
    style: {
      backgroundColor: "black",
      color: "white",
      borderRadius: "4px",
      marginBottom: "6px",
    },
  },
  headCells: {
    style: {
      fontSize: "18px",
      fontFamily: "Anton, serif",
    },
  },
  rows: {
    style: {
      fontSize: "13px",
      fontWeight: 400,
      color: "black",
      backgroundColor: "#e5e7eb",
      borderRadius: "4px",
      marginBottom: "4px",

      minHeight: "48px",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "0px",
        borderBottomColor: "white",
      },
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      textTransform: "capitalize",
    },
  },
};

const WorkoutPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.getAll("category");
  const selectedIntensity = searchParams.get("difficulty") || "";
  const searchTerm = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const {
    data,
    isLoading: isFetchingWorkouts,
    isError,
  } = useGetWorkoutsQuery({
    page: currentPage,
    category: selectedCategories,
    difficulty: selectedIntensity,
    search: searchTerm,
  });

  const workouts = data?.data ?? [];
  const totalWorkouts = data?.total ?? 1;
  const totalPages = data?.totalPages ?? 1;

  const handlePageChange = (newPage) => {
    setSearchParams((prev) => {
      const updated = new URLSearchParams(prev);
      updated.set("page", newPage);
      return updated;
    });
  };

  const columns = [
    {
      name: "Id",
      maxWidth: "10px",
      selector: (row, index) => {
        return `#${(currentPage - 1) * 7 + index + 1}`;
      },
    },
    {
      name: "Workout Name",
      minWidth: "250px",
      selector: (row) => (
        <Link to={`${row.id}`} className="hover:text-red-secondary hover:text-base"> {row.name} </Link>
      ),
    },
    {
      name: "Category",
      minwidth: "200px",
      selector: (row) => row.category.name,
    },
    {
      name: "Level",
      maxwidth: "150px",
      width: "150px",
      selector: (row) => row.difficulty,
    },
    {
      name: "Suggested Reps",
      minwidth: "250px",
      selector: (row) => row.suggested_reps,
    },
    {
      name: "Tags",
      minwidth: "100px",
      selector: (row) =>
        row.creator_id !== 2 ? (
          <p className="bg-red-secondary text-white text-xs rounded-sm p-2 ">Personal</p>
        ) : (
          <p className="bg-gray-400 text-black text-xs rounded-sm p-2 ">Default</p>
        ),
    },
    {
      name: "Action",
      selector: (row) =>
        row.creator_id !== 2 ? (
          <div className="flex flex-row gap-2">
            <button className="bg-red-secondary text-white p-2 rounded-sm">
              <MdModeEdit />
            </button>
            <button className="bg-red-secondary text-white p-2 rounded-sm">
              <MdDelete />
            </button>
          </div>
        ) : (
          <div className="flex flex-row gap-2">
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

  if (isError) return <p>Error</p>;

  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="text-3xl font-secondary">Workouts</h4>
          {isFetchingWorkouts ? (
            <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            <p className="text-sm text-gray-500">{totalWorkouts} workouts</p>
          )}
        </div>

        {/* buttons */}
        <div className="flex flex-row gap-2 font-secondary">
          <button
            disabled={isFetchingWorkouts}
            // className="bg-gray-300 p-2 rounded-sm text-black"
            className={`p-2 rounded-sm text-black bg-gray-300 ${
              isFetchingWorkouts
                ? "cursor-not-allowed"
                : "cursor-pointer hover:bg-gray-400"
            }`}
          >
            {" "}
            <LuSettings2 className="inline" /> Filter
          </button>
          <Link to="add">
            <button
              disabled={isFetchingWorkouts}
              className={`p-2 rounded-sm text-white bg-red-secondary ${
                isFetchingWorkouts
                  ? "cursor-not-allowed"
                  : " hover:bg-black cursor-pointer "
              }`}
            >
              Add New Workout
            </button>
          </Link>
        </div>
      </div>

      {isFetchingWorkouts ? (
        <SkeletonTable />
      ) : (
        <div>
          <DataTable
            columns={columns}
            data={workouts}
            customStyles={customStyles}
            fixedHeader
          />
        </div>
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <div className="flex flex-row items-center justify-center gap-2">
          <button onClick={handlePageChange} className="flex justify-center items-center bg-gray-300 text-black rounded-sm size-10">
            <IoIosArrowBack className="text-2xl" />{" "}
          </button>
          <button className="flex justify-center items-center font-secondary text-lg bg-gray-300 text-black rounded-sm size-10 ">
            01
          </button>
          <button className="flex justify-center items-center font-secondary text-lg bg-gray-300 text-black rounded-sm size-10">
            02
          </button>
          <button className="flex justify-center items-center font-secondary text-lg bg-gray-300 text-black rounded-sm size-10">
            03
          </button>
          <button className="flex justify-center items-center bg-gray-300 text-black rounded-sm size-10">
            <IoIosArrowForward className="text-2xl" />{" "}
          </button>
        </div>
      )}
    </div>
  );
};

export default WorkoutPage;
