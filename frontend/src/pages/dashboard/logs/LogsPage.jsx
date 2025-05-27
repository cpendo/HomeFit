import DataTable from "react-data-table-component";
import {
  useDeleteWorkoutLogMutation,
  useLazyGetWorkoutLogsQuery,
} from "../../../features/logs/logsApi";
import { LuSettings2 } from "react-icons/lu";
import { Link } from "react-router";
import boxImage from "../../../assets/paper.png";
import { MdDelete } from "react-icons/md";
import SkeletonTable from "../components/SkeletonTable";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import Select from "react-select";
import { useGetCategoriesQuery } from "../../../features/categories/categoriesApi";
import Swal from "sweetalert2";

const selectStyles = {
  control: (base, state) => ({
    ...base,
    minWidth: "250px",
    border: "0px solid gray",
    borderRadius: "4px",
    outline: state.isFocused ? "1px solid black" : "1px solid #99a1af",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};

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

const intensityOptions = [
  { value: "easy", label: "Easy" },
  { value: "medium", label: "Medium" },
  { value: "hard", label: "Hard" },
];

const LogsPage = () => {
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    difficulty: "",
  });

  const { data: categoryOptions = [], isLoading: isLoadingCategories } =
    useGetCategoriesQuery();
  const [triggerSearch, { data, isLoading }] = useLazyGetWorkoutLogsQuery();
  const [deleteWorkoutLog, { isLoading: isDeletingWorkout }] =
    useDeleteWorkoutLogMutation();

  const cleared = {
    dateFrom: "",
    dateTo: "",
    category: "",
    difficulty: "",
  };

  const clearFilters = () => setFilters(cleared);

  const resetFilters = () => {
    setFilters(cleared);
    triggerSearch({ page: 1 });
  };

  const handleFilters = () => {
    if (isLoading || isLoadingCategories) return;

    const hasValidDateRange =
      filters?.dateFrom &&
      filters?.dateTo &&
      filters?.dateFrom <= filters?.dateTo;

    const hasFilter =
      filters.category || filters.difficulty || hasValidDateRange;

    if (!hasValidDateRange && (filters.dateFrom || filters.dateTo)) {
      setFilters((f) => ({ ...f, dateFrom: "", dateTo: "" }));
      return Swal.fire("Validation Error", "Date Range Invalid", "error");
    }

    if (!hasFilter) {
      return Swal.fire(
        "Validation Error",
        "Select at least one filter",
        "error"
      );
    }

    const cleanedFilters = Object.fromEntries(
      Object.entries(filters).filter(([_, v]) => v !== "")
    );

    triggerSearch({
      page: 1,
      filters: cleanedFilters,
    });
  };

  const deleteWorkout = async (id) => {

    const result = await Swal.fire({
      title: "Do you want to delete this workout log?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) {
      Swal.fire("Workout log not deleted", "", "info");
      return;
    }

    try {
      const response = await deleteWorkoutLog(id).unwrap();
      await Swal.fire(response.message, "", "success");
    } catch (error) {
      //console.error("Delete failed:", error);
      Swal.fire(
        "Delete Log Failed!",
        error?.data?.message || "An error occurred",
        "error"
      );
    }
  };

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
      selector: (row) => (
        <button
          onClick={() => deleteWorkout(row.id)}
          disabled={isDeletingWorkout}
          className={` p-2 rounded-sm  ${
            isDeletingWorkout
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

  useEffect(() => {
    triggerSearch({ page });
  }, [page]);

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
          <button
            onClick={() => {
              resetFilters(), setShowFilters(false);
            }}
            className="p-2 rounded-sm hover:cursor-pointer bg-black text-white"
          >
            Reset Filters
          </button>

          <button
            onClick={() => {
              setShowFilters(!showFilters), clearFilters();
            }}
            className={`p-2 rounded-sm hover:cursor-pointer ${
              showFilters ? "bg-black text-white" : "bg-gray-300 text-black"
            }`}
          >
            <LuSettings2 className="inline" /> Filter
          </button>
          <Link to="add">
            <button className="p-2 rounded-sm text-white bg-red-secondary hover:bg-black hover:cursor-pointer">
              Add New Log
            </button>
          </Link>
        </div>
      </div>

      {isLoading ? (
        <SkeletonTable />
      ) : (
        <>
          {/* Filter Bar */}
          <div
            className={`transition-all duration-300 ease-in-out overflow-hidden ${
              showFilters ? "max-h-[200px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="flex flex-row flex-wrap gap-6 p-4 bg-gray-100 rounded-sm items-end">
              {/* Date Range */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">From</label>
                <input
                  type="date"
                  className="p-2 rounded-sm border border-gray-300"
                  value={filters.dateFrom}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, dateFrom: e.target.value }))
                  }
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">To</label>
                <input
                  type="date"
                  className="p-2 rounded-sm border border-gray-300"
                  value={filters.dateTo}
                  onChange={(e) =>
                    setFilters((f) => ({ ...f, dateTo: e.target.value }))
                  }
                />
              </div>

              {/* Category */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Category</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select workout category"
                  isLoading={isLoadingCategories}
                  isSearchable
                  isClearable
                  options={categoryOptions}
                  styles={selectStyles}
                  menuPortalTarget={document.body} // moves the dropdown to body
                  menuPosition="absolute"
                  value={
                    categoryOptions.find(
                      (opt) => opt.value === filters.category
                    ) || null
                  }
                  onChange={(selected) =>
                    setFilters((f) => ({
                      ...f,
                      category: selected?.value || "",
                    }))
                  }
                />
              </div>

              {/* Difficulty */}
              <div className="flex flex-col">
                <label className="text-sm font-medium mb-1">Difficulty</label>
                <Select
                  className="basic-single"
                  classNamePrefix="select"
                  placeholder="Select difficulty level"
                  isClearable
                  options={intensityOptions}
                  styles={selectStyles}
                  menuPortalTarget={document.body} // moves the dropdown to body
                  menuPosition="absolute"
                  value={
                    intensityOptions.find(
                      (opt) => opt.value === filters.difficulty
                    ) || null
                  }
                  onChange={(selected) =>
                    setFilters((f) => ({
                      ...f,
                      difficulty: selected?.value || "",
                    }))
                  }
                />
              </div>

              {/* Search Button */}

              <button
                onClick={handleFilters}
                className="p-2 rounded-sm bg-red-secondary text-white hover:cursor-pointer hover:bg-black"
              >
                Apply Filters
              </button>
            </div>
          </div>

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
                    No logs found. Add your first workout log!
                  </h1>
                </div>
              }
              persistTableHead={true}
              fixedHeader
            />
          </div>
        </>
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
