import { FaPlus } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import { useState } from "react";
import ModalWrapper from "./components/ModalWrapper";
import AddLog from "./logs-page/AddLog";

const customStyles = {
  headCells: {
    style: {
      fontSize: "18px",
      letterSpacing: "1px",
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
    name: "#",
    selector: (row) => row.id,
  },
  {
    name: "Name",
    selector: (row) => row.title,
  },
  {
    name: "Category",
    sortable: true,
    selector: (row) => row.year,
  },
  {
    name: "Intensity",
    sortable: true,
    selector: (row) => row.year,
  },

  {
    name: "Reps",
    sortable: true,
    selector: (row) => row.year,
  },
  {
    name: "Duration",
    sortable: true,
    selector: (row) => row.year,
  },
  {
    name: "Time",
    sortable: true,
    selector: (row) => row.year,
  },
];

const data = [
  {
    id: 1,
    title: "Beetlejuice",
    year: "1988",
  },
  {
    id: 2,
    title: "Ghostbusters",
    year: "1984",
  },
];

const LogsPage = () => {
  const [showAddLog, setShowAddLog] = useState(false);
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

      <div className="px-10 py-6">
        <DataTable
          customStyles={customStyles}
          columns={columns}
          data={data}
          striped
          highlightOnHover
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
