import { FaPlus } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import { useState } from "react";
import ModalWrapper from "./components/ModalWrapper";
import AddLog from "./forms/AddLog";
import { useGetWorkoutLogsQuery } from "../../features/logs/logsApi";
import LoadingPage from "../../components/LoadingPage";

const customStyles = {
  headCells: {
    style: {
      fontSize: "18px",
      fontFamily: "Anton, serif",
    },
  },
  cells: {
    style: {
      fontSize: "15px",
    },
  },
};

const columns = [
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
    <div className="w-full max-w-7xl min-h-129  mx-auto bg-white rounded-lg my-4 pb-6">
      <div className="flex flex-row justify-between items-center p-3">
        <h2 className="text-4xl font-secondary ">Logs</h2>
        <button
          onClick={() => setShowAddLog(true)}
          className="bg-red-secondary text-white font-secondary p-2 rounded-sm hover:bg-black"
        >
          <FaPlus className="inline" /> Add Log
        </button>
      </div>

      <div className="px-5 py-6">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={workoutLogs}
          striped
         // highlightOnHover
          fixedHeader
          pagination
        />
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
