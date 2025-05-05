import { FaPlus } from "react-icons/fa6";
import DataTable from "react-data-table-component";
import ModalWrapper from "./components/ModalWrapper";
import { useState } from "react";
import AddSet from "./forms/AddSet";

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
    name: "Title",
    selector: (row) => row.title,
  },
  {
    name: "Year",
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
const SetsPage = () => {
  const [showAddSet, setShowAddSet] = useState(false);

  return (
    <div className="w-full max-w-7xl min-h-129  mx-auto bg-white rounded-lg my-4 pb-6">
      <div className="flex flex-row justify-between items-center p-3">
        <h2 className="text-4xl font-secondary ">Sets</h2>
        <button
          onClick={() => setShowAddSet(true)}
          className="bg-red-secondary text-white font-secondary p-2 rounded-sm"
        >
          <FaPlus className="inline" /> create new
        </button>
      </div>
      <div className="px-5 py-6">
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

      {showAddSet && (
        <ModalWrapper>
          <AddSet onClose={() => setShowAddSet(false)} />
        </ModalWrapper>
      )}
    </div>
  );
};

export default SetsPage;
