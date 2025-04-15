import WorkoutCard from "./components/WorkoutCard";
import Filter from "./sections/Filter";
import { useEffect, useState } from "react";
import LoadingPage from "../../components/LoadingPage";
import { useGetCategoriesQuery } from "../../features/categories/categoriesApi";

const intensityOptions = [
  { value: "beginner", label: "Beginner" },
  { value: "intermediate", label: "Intermediate" },
  { value: "advanced", label: "Advanced" },
];

const TrainingPage = () => {
  const {
    data: categoryOptions = [],
    isLoading,
  } = useGetCategoriesQuery();

  const [workouts, setWorkouts] = useState([]);
  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("workout.json");
      const data = await response.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  }, []);
  console.log(categoryOptions);
  console.log(selectedOptions);

  if (isLoading) return <LoadingPage />;

  return (
    <section className="w-full min-h-screen">
      <div className="w-full px-7 mt-5 mb-10">
        <div className="flex flex-col justify-center items-center gap-5 bg-red-secondary p-3">
          <h2 className="font-secondary sm:text-5xl text-5xl uppercase">
            All Workouts
          </h2>

          <Filter
            categoryOptions={categoryOptions}
            selectedOptions={selectedOptions}
            setSelectedOptions={setSelectedOptions}
            intensityOptions={intensityOptions}
          />
        </div>

        <div className=" flex flex-row flex-wrap justify-center items-center gap-8 pt-8">
          {workouts
            .filter((workout) => workout.id < 9)
            .map((workout) => (
              <WorkoutCard key={workout.id} workout={workout} />
            ))}
        </div>
      </div>
    </section>
  );
};

export default TrainingPage;
