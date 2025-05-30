import SkeletonTable from "../components/SkeletonTable";
import Pagination from "../components/Pagination";
import WorkoutHeader from "./components/WorkoutHeader";
import WorkoutFilters from "./components/WorkoutFilters";
import WorkoutTable from "./components/WorkoutTable";
import { useState, useEffect } from "react";
import {
  useDeleteWorkoutMutation,
  useLazyGetWorkoutsQuery,
} from "../../../features/workouts/workoutsApi";
import Swal from "sweetalert2";

const WorkoutPage = () => {
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    category: "",
    difficulty: "",
    search: "",
  });

  const updateFilter = (key, value) =>
    setFilters((prev) => ({ ...prev, [key]: value }));

  const [triggerSearch, { data, isLoading: isFetchingWorkouts }] =
    useLazyGetWorkoutsQuery();

  const [deleteWorkout, { isLoading: isDeletingWorkout }] =
    useDeleteWorkoutMutation();

  const workouts = data?.data ?? [];
  const totalWorkouts = data?.total ?? 1;
  const totalPages = data?.totalPages ?? 1;
  const currentPage = data?.page;

  const cleared = {
    category: "",
    difficulty: "",
    search: "",
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
    if (isFetchingWorkouts) return;

    const hasFilter = filters.category || filters.difficulty || filters.search;

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

  const handleDeleteWorkout = async (id) => {
    const result = await Swal.fire({
      title: "Do you want to delete this workout?",
      showCancelButton: true,
      confirmButtonText: "Yes",
    });

    if (!result.isConfirmed) {
      Swal.fire("Workout not deleted", "", "info");
      return;
    }

    try {
      const response = await deleteWorkout(id).unwrap();
      await Swal.fire(response.message, "", "success");
    } catch (error) {
      //console.error("Delete failed:", error);
      Swal.fire(
        "Delete Workout Failed!",
        error?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  useEffect(() => {
    triggerSearch({ page });
  }, [page, triggerSearch]);

  return (
    <div className="w-full mt-4 flex flex-col gap-2">
      <WorkoutHeader
        total={totalWorkouts}
        isLoading={isFetchingWorkouts}
        handleShowFilters={handleShowFilters}
        handleResetFilters={handleResetFilters}
      />

      <WorkoutFilters
        showFilters={showFilters}
        filters={filters}
        onUpdate={updateFilter}
        handleFilters={handleFilters}
      />

      {isFetchingWorkouts ? (
        <SkeletonTable />
      ) : (
        <WorkoutTable
          data={workouts}
          currentPage={currentPage}
          isDeletingWorkout={isDeletingWorkout}
          handleDeleteWorkout={handleDeleteWorkout}
        />
      )}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(newPage) => {
            if (!isFetchingWorkouts) setPage(newPage);
          }}
        />
      )}
    </div>
  );
};

export default WorkoutPage;
