import { Link, useParams } from "react-router";
import useYoutubeSearch from "../../hooks/useYoutubeSearch";
import LoadingPage from "../../components/LoadingPage";

import spinner from "../../assets/fade-stagger-squares.svg";
import { useGetWorkoutByIdQuery } from "../../features/workouts/workoutsApi";

const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const {
    data: workout,
    isLoading,
    error: workoutError,
  } = useGetWorkoutByIdQuery(id);

  const { loading, error, videoId } = useYoutubeSearch(workout?.name);

  if (isLoading) <LoadingPage />;
  if (workoutError || !workout)
    return (
      <section className="my-10 text-center text-red-secondary">
        <h2 className="text-3xl font-bold">Workout not found</h2>
        <p className="text-lg">
          The workout you&apos;re looking for doesn&apos;t exist or
          couldn&apos;t be loaded.
        </p>
        <Link to="/workouts" className="text-black underline mt-4 inline-block">
          Back to all workouts
        </Link>
      </section>
    );

  return (
    <section className="flex flex-col my-5 mx-12">
      <h1 className="text-5xl font-secondary uppercase">{workout.name}</h1>

      <div className="flex flex-row gap-3">
        <p className="bg-red-secondary text-white px-2 rounded-2xl ">
          {workout.difficulty_level}
        </p>
        <p className="bg-red-secondary text-white px-2 rounded-2xl ">
          {workout.category.name}
        </p>
      </div>

      {loading && (
        <div className="">
          <img src={spinner} alt="Loading..." className="size-20" />
          <p className="text-2xl">Geting workout demo video</p>
        </div>
      )}
      {error && <p>{error}</p>}

      <div className="h-screen w-full mt-8">
        {videoId && (
          <iframe
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}&loop=1`}
            allowFullScreen
            allow="autoplay; encrypted-media"
            title={`${workout.name} demo video`}
            width="100%"
            height="100%"
          ></iframe>
        )}
      </div>
    </section>
  );
};

export default WorkoutDetailsPage;
