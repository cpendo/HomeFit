import WorkoutCard from "../components/WorkoutCard";
import Filter from "./Filter";
import { useEffect, useState } from "react";

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("workout.json");
      const data = await response.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  });

  return (
    <div className="w-full px-7 mt-5 mb-10">
      <div className="flex flex-col justify-center items-center gap-5 bg-red-secondary p-3">
        <h2 className="font-secondary sm:text-5xl text-5xl uppercase">
          All Workouts
        </h2>

        <Filter />
      </div>

      <div className=" flex flex-row flex-wrap justify-center items-center gap-8 pt-8">
        {workouts
          .filter((workout) => workout.id < 9)
          .map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
      </div>
    </div>
  );
};

export default Workouts;
