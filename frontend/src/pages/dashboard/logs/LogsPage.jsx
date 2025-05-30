import {
  useDeleteWorkoutLogMutation,
  useLazyGetWorkoutLogsQuery,
} from "../../../features/logs/logsApi";
import SkeletonTable from "../components/SkeletonTable";
import Pagination from "../components/Pagination";
import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import LogHeader from "./components/LogHeader";
import LogFilters from "./components/LogFilters";
import LogTable from "./components/LogTable";

const LogsPage = () => {
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    dateFrom: "",
    dateTo: "",
    category: "",
    difficulty: "",
  });

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const [triggerSearch, { data, isLoading: isFetchingLogs }] =
    useLazyGetWorkoutLogsQuery();
  const [deleteWorkoutLog, { isLoading: isDeletingLog }] =
    useDeleteWorkoutLogMutation();

  const logs = data?.logs ?? [];
  const totalLogs = data?.total ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.currentPage;

  const cleared = {
    dateFrom: "",
    dateTo: "",
    category: "",
    difficulty: "",
  };

  const clearFilters = () => setFilters(cleared);

  const handleShowFilters = () => {
    setShowFilters((prev) => !prev);
    clearFilters();
  };

  const handleResetFilters = () => {
    handleShowFilters();
    triggerSearch({ page: 1 });
  };

  const handleFilters = () => {
    if (isFetchingLogs) return;

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
      // eslint-disable-next-line no-unused-vars
      Object.entries(filters).filter(([_, v]) => v !== "")
    );

    triggerSearch({
      page: 1,
      filters: cleanedFilters,
    });
  };

  const handleDeleteLog = async (id) => {
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

  useEffect(() => {
    triggerSearch({ page });
  }, [page, triggerSearch]);

  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-2">
      <LogHeader
        total={totalLogs}
        isLoading={isFetchingLogs}
        handleShowFilters={handleShowFilters}
        handleResetFilters={handleResetFilters}
      />

      <LogFilters
        showFilters={showFilters}
        filters={filters}
        onUpdate={updateFilter}
        handleFilters={handleFilters}
      />

      {isFetchingLogs ? (
        <SkeletonTable />
      ) : (
        <LogTable
          data={logs}
          currentPage={currentPage}
          handleDeleteLog={handleDeleteLog}
          isDeletingLog={isDeletingLog}
        />
      )}

      {/* pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            if (!isFetchingLogs) setPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default LogsPage;
