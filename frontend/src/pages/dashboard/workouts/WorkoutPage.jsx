import { LuSettings2 } from "react-icons/lu";
import DataTable from "react-data-table-component";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { MdDelete, MdModeEdit } from "react-icons/md";
import { Link } from "react-router-dom";

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
      fontSize: "16px",
      textTransform: "capitalize",
    },
  },
};

const columns = [
  {
    name: "Id",
    maxWidth: "10px",
    selector: (row) => {
      return `#${row.id}`;
    },
  },
  {
    name: "Workout Name",
    minWidth: "300px",
    selector: (row) => row.title,
  },
  {
    name: "Category",
    minWidth: "300px",
    selector: (row) => row.title,
  },
  {
    name: "Level",
    maxWidth: "150px",
    width: "150px",
    selector: (row) => row.level,
  },
  {
    name: "Added By",
    selector: (row) => row.title,
  },
  {
    name: "Action",
    selector: () => (
      <div className="flex flex-row gap-2">
        <button className="bg-red-secondary text-white p-2 rounded-sm">
          <MdModeEdit />
        </button>
        <button className="bg-red-secondary text-white p-2 rounded-sm">
          <MdDelete />
        </button>
      </div>
    ),
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice Beetlejuice ",
    year: "1988",
    level: "easy",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
    level: "medium",
  },
  {
    id: 3,
    title: "Beetlejuice Beetlejuice ",
    year: "1988",
    level: "hard",
  },
  {
    id: 4,
    title: "Ghostbusters",
    year: "1984",
    level: "easy",
  },
  {
    id: 5,
    title: "Beetlejuice Beetlejuice ",
    year: "1988",
    level: "medium",
  },
  {
    id: 6,
    title: "Ghostbusters",
    year: "1984",
    level: "hard",
  },
  {
    id: 7,
    title: "Ghostbusters",
    year: "1984",
    level: "hard",
  },
];

const WorkoutPage = () => {
  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      <div className="flex flex-row items-center justify-between">
        <div>
          <h4 className="text-3xl font-secondary">Workouts</h4>
          <p className="text-sm text-gray-500">53 workouts</p>
        </div>
        {/* row.year */}
        <div className="flex flex-row gap-2 font-secondary">
          <button className="bg-gray-300 p-2 rounded-sm text-black">
            {" "}
            <LuSettings2 className="inline" /> Filter
          </button>
          <Link to="add">
            <button className="bg-red-secondary text-white p-2 rounded-sm">
              Add New Workout
            </button>
          </Link>
        </div>
      </div>

      <div>
        <DataTable
          columns={columns}
          data={data}
          customStyles={customStyles}
          fixedHeader
        />
      </div>

      {/* pagination */}
      <div className="flex flex-row items-center justify-center gap-2">
        <button className="flex justify-center items-center bg-gray-300 text-black rounded-sm size-10">
          <IoIosArrowBack className="text-2xl" />{" "}
        </button>
        <button className="flex justify-center items-center font-secondary text-xl bg-gray-300 text-black rounded-sm size-10 ">
          01
        </button>
        <button className="flex justify-center items-center font-secondary text-xl bg-gray-300 text-black rounded-sm size-10">
          02
        </button>
        <button className="flex justify-center items-center font-secondary text-xl bg-gray-300 text-black rounded-sm size-10">
          03
        </button>
        <button className="flex justify-center items-center bg-gray-300 text-black rounded-sm size-10">
          <IoIosArrowForward className="text-2xl" />{" "}
        </button>
      </div>
    </div>
  );
};

export default WorkoutPage;
