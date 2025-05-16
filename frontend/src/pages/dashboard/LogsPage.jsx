import DataTable from "react-data-table-component";
import { useState } from "react";
import ModalWrapper from "./components/ModalWrapper";
import AddLog from "./forms/AddLog";
import { useGetWorkoutLogsQuery } from "../../features/logs/logsApi";
import LoadingPage from "../../components/LoadingPage";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

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
    name: "ID",
    maxWidth: "10px",
    selector: (row) => {
      return `#${row.id}`;
    },
  },
  {
    name: "Name",
    selector: (row) => row.workouts.name,
  },
  {
    name: "Category",
    sortable: true,
    selector: (row) => row.workouts.category.name,
  },
  {
    name: "Intensity",
    sortable: true,
    selector: (row) => row.workouts.difficulty_level,
  },

  {
    name: "Reps",
    selector: (row) => row.reps,
  },
  {
    name: "Duration",
    sortable: true,
    selector: (row) => {
      const minutes = Math.floor(row.duration / 60);
      const seconds = row.duration % 60;
      return `${minutes}m ${seconds}s`;
    },
  },
  {
    name: "Time",
    sortable: true,
    selector: (row) => {
      return new Date(row.performed_at).toLocaleString();
    },
  },
];

const LogsPage = () => {
  const [showAddLog, setShowAddLog] = useState(false);
  const { data: workoutLogs, isLoading } = useGetWorkoutLogsQuery();

  if (isLoading) return <LoadingPage />;
  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h4 className="text-3xl font-secondary">Logs</h4>
          <p className="text-sm text-gray-500">13 sets</p>
        </div>
        <button
          onClick={() => setShowAddLog(true)}
          className="bg-red-secondary text-white font-secondary p-2 rounded-sm hover:bg-black"
        >
          Add New Log
        </button>
      </div>

      <div>
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={workoutLogs}
          fixedHeader
        />
      </div>

      {/* pagination */}
      <div className="flex flex-row items-center justify-center gap-2">
        <button className="flex justify-center items-center bg-gray-300 text-black rounded-sm size-10">
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

      {showAddLog && (
        <ModalWrapper>
          <AddLog onClose={() => setShowAddLog(false)} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default LogsPage;
