import { useEffect, useState } from "react";
import { useParams } from "react-router";
import useYoutubeSearch from "../../hooks/useYoutubeSearch";

import spinner from "../../assets/fade-stagger-squares.svg"

const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const [workout, setWorkout] = useState(null);

  const { loading, error, videoId } = useYoutubeSearch(workout?.name);

  useEffect(() => {
    const fetchWorkout = async () => {
      const response = await fetch("/workout.json");
      const data = await response.json();
      const foundWorkout = data.find((workout) => workout.id === parseInt(id));
      setWorkout(foundWorkout || {});
    };

    fetchWorkout();
  }, [id]);

  if (!workout) return (<div>
    <img src={spinner} alt="Loading..." className="size-30" />;
    <p>Geting workout details!</p>
  </div>);

  return (
    <section className="flex flex-col my-5 mx-12">
      <h1 className="text-5xl font-secondary uppercase">{workout.name}</h1>

      <div className="flex flex-row gap-3">
        <p className="bg-red-secondary text-white px-2 rounded-2xl ">
          {workout.difficulty}
        </p>
        <p className="bg-red-secondary text-white px-2 rounded-2xl ">
          {workout.type}
        </p>
      </div>

      {/* <button>show instructions</button> */}
      {/* <div>{workout.instructions}</div>  */}
       {loading && (
        <div className="">
           <img src={spinner} alt="Loading..." className="size-40" />
           <p className="text-3xl">Geting workout demo video</p>
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
