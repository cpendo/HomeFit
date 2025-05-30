import { MdBookmark } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosArrowRoundBack } from "react-icons/io";
import { IoMdRefresh } from "react-icons/io";

//import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import SkeletonDetailsPage from "./components/SkeletonDetailsSection";
import { useGetWorkoutByIdQuery } from "../../../features/workouts/workoutsApi";
import useYoutubeSearch from "../../../hooks/useYoutubeSearch";
import WorkoutError from "./WorkoutError";
import OtherWorkoutsSection from "./OtherWorkoutsSection";
import { useGetProfileQuery } from "../../../features/users/usersApi";

const WorkoutDetailsPage = () => {
  const { id } = useParams();
  const {
    data: workout,
    isLoading,
    error: workoutError,
  } = useGetWorkoutByIdQuery(id);

  const {
    data: { user },
  } = useGetProfileQuery();


  const { loading, error, videoId } = useYoutubeSearch(
    workout?.youtube_video_id ? null : workout?.name
  );

  console.log(workout);
  console.log("error", error);

  if (isLoading) return <SkeletonDetailsPage />;
  if (workoutError) return <WorkoutError />;
  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-1">
      <div>
        <Link
          to="/dashboard/workouts"
          className="flex flex-row items-center gap-1 text-base text-gray-500"
        >
          <IoIosArrowRoundBack className="inline text-2xl" />
          Back to workouts
        </Link>
      </div>

      <div className="flex flex-row gap-4">
        <div className="flex-2 flex flex-col gap-3 bg-gray-200 rounded-sm p-3">
          {/* heading */}
          <div className="flex flex-row justify-between items-center">
            <h1 className="text-2xl font-secondary uppercase">
              {workout.name}
            </h1>
            <div className="flex flex-row gap-2">
              <p className="flex flex-row gap-1  text-lg text-black font-secondary capitalize">
                Category:
                <span className="text-red-secondary ">
                  {workout.category.name}
                </span>
              </p>
              <p className=" flex flex-row gap-1 text-lg text-black font-secondary capitalize">
                Difficulty:{" "}
                <span className="text-red-secondary">{workout.difficulty.name}</span>
              </p>
            </div>
          </div>

          {/* youtube video */}
          <div
            className={`w-full h-100 bg-gray-400 rounded-sm ${
              loading ? "animate-pulse" : "animate-none"
            }`}
          >
            {workout?.youtube_video_id ? (
              <iframe
                src={`https://www.youtube.com/embed/${workout.youtube_video_id}?autoplay=1&playlist=${workout.youtube_video_id}&loop=1`}
                allowFullScreen
                allow="autoplay; encrypted-media"
                title={`${workout.name} demo video`}
                width="100%"
                height="100%"
              ></iframe>
            ) : videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}&loop=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            ) : (
              <p>what the hell bitch</p>
            )}

            {error && (
              <div className="h-full flex flex-col justify-center items-center gap-4">
                <h1 className="text-4xl font-secondary">
                  Workout demo video unavailable.
                </h1>
                <p className="text-xl">Try refreshing or check back later.</p>
                <button
                  onClick={() => window.location.reload()}
                  className="flex flex-row gap-2 items-center text-xl bg-red-secondary p-2 rounded-sm text-white hover:cursor-pointer"
                >
                  <IoMdRefresh className="text-3xl" />
                  <span>Refresh</span>
                </button>
              </div>
            )}
          </div>

          {/* buttons */}
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row justify-center items-center gap-2">
              <h5 className="font-secondary text-lg">Suggested Reps:</h5>
              <p className="text-base"> {workout.suggested_reps}</p>
            </div>
            <div className="flex flex-row gap-4">
              {workout.creator_id === user?.id ||
                (!workout?.youtube_video_id && (
                  <button className="flex flex-row items-center gap-1 bg-red-secondary text-white text-sm rounded-sm p-2">
                    <MdBookmark className="inline text-base" />
                    Bookmark Video
                  </button>
                ))}
              <button className="flex flex-row items-center gap-1 bg-red-secondary text-white text-sm rounded-sm p-2">
                <FaNoteSticky className="inline text-base" />
                Log Workout
              </button>
            </div>
          </div>
        </div>

        <div className="flex-1 flex flex-col gap-2 ">
          <OtherWorkoutsSection
            id={workout?.id}
            difficulty={workout?.difficulty}
          />
        </div>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
