import WorkoutCard from "./components/WorkoutCard";
import Filter from "./sections/Filter";
import { useSearchParams } from "react-router-dom";
import LoadingPage from "../../components/LoadingPage";
import Pagination from "./components/Pagination";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";
import { useGetWorkoutsQuery } from "../../features/workouts/workoutsApi";

const intensityOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const TrainingPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const selectedCategories = searchParams.getAll("category");
  const selectedIntensity = searchParams.get("difficulty") || "";
  const searchTerm = searchParams.get("search") || "";
  const currentPage = parseInt(searchParams.get("page")) || 1;

  const { data: categoryOptions = [], isLoading } = useGetCategoriesQuery();
  const { data, isLoading: isFetchingWorkouts, isError } = useGetWorkoutsQuery({
    page: currentPage,
    category: selectedCategories,
    difficulty: selectedIntensity,
    search: searchTerm,
  });

  const workouts = data?.data ?? [];
  const totalWorkouts = data?.total ?? 1;

  if (isLoading || isFetchingWorkouts) return <LoadingPage />;

  return (
    <section className="w-full min-h-screen">
      <div className="w-full px-7 mt-5 mb-10">
        <div className="flex flex-col justify-center items-center gap-5 bg-red-secondary p-3">
          <h2 className="font-secondary sm:text-5xl text-5xl uppercase">
            All Workouts
          </h2>

          <Filter
            categoryOptions={categoryOptions}
            selectedOptions={selectedCategories}
            intensityOptions={intensityOptions}
            selectedIntensity={selectedIntensity}
            searchTerm={searchTerm}
            setSearchParams={setSearchParams}
          />
        </div>

        <div className=" flex flex-row flex-wrap justify-center items-center gap-8 pt-8">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </div>

        {totalWorkouts > 8 && (
          <Pagination
            currentPage={currentPage}
            totalPages={Math.ceil(totalWorkouts / 8)}
            onPageChange={(page) => setSearchParams({ ...searchParams, page })}
          />
        )}

        {isError && <p className="font-secondary text-4xl text-center">No workouts found</p>}
      </div>
    </section>
  );
};

export default TrainingPage;