import DataTable from "react-data-table-component";
import { useGetWorkoutLogsQuery } from "../../../features/logs/logsApi";
import { LuSettings2 } from "react-icons/lu";
import { Link } from "react-router";
import boxImage from "../../../assets/paper.png";
import { MdDelete } from "react-icons/md";
import SkeletonTable from "../components/SkeletonTable";
import Pagination from "../components/Pagination";
import { useState } from "react";

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

const LogsPage = () => {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useGetWorkoutLogsQuery({ page });

  const columns = [
    {
      name: "#",
      width: "60px",
      selector: (row, index) => {
        return `#${(data?.currentPage - 1) * 7 + index + 1}`;
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
      selector: () => (
        <button className="bg-red-secondary text-white p-2 rounded-sm cursor-pointer">
          <MdDelete />
        </button>
      ),
      width: "100px",
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-3">
      <div className="flex flex-row justify-between items-center">
        <div>
          <h4 className="text-3xl font-secondary">Logs</h4>
          {isLoading ? (
            <div className="w-full h-5 bg-gray-300 animate-pulse rounded"></div>
          ) : (
            <p className="text-sm text-gray-500">{data?.total} logs</p>
          )}{" "}
        </div>
        {/* buttons */}
        <div className="flex flex-row gap-2 font-secondary">
          <button className="p-2 rounded-sm text-black bg-gray-300">
            <LuSettings2 className="inline" /> Filter
          </button>
          <Link to="add">
            <button className="p-2 rounded-sm text-white bg-red-secondary">
              Add New Log
            </button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <div className="h-105 flex justify-center items-start">
          <DataTable
            customStyles={customStyles}
            columns={columns}
            data={data?.logs}
            noDataComponent={
              <div className="bg-gray-100 h-90  w-full flex flex-col justify-center items-center gap-5 rounded-sm">
                <img
                  src={boxImage}
                  alt="Illustration of an empty box"
                  className="w-25 h-auto object-contain"
                />
                <h1 className="font-secondary text-3xl">
                  No logs yet — get moving and add your first workout!
                </h1>
              </div>
            }
            persistTableHead={true}
            fixedHeader
          />
        </div>
      )}

      {/* pagination */}
      {data?.totalPages > 1 && (
        <Pagination
          currentPage={data?.currentPage}
          totalPages={data?.totalPages}
          onPageChange={(newPage) => {
            if (!isLoading) setPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default LogsPage;
