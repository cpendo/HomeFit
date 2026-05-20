import { MdBookmark } from "react-icons/md";
import { FaNoteSticky } from "react-icons/fa6";
import { IoIosArrowRoundBack, IoMdRefresh } from "react-icons/io";
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

  const { data: profileData } = useGetProfileQuery();
  const user = profileData?.user;

  const { loading, error, videoId } = useYoutubeSearch(
    workout?.youtube_video_id ? null : workout?.name
  );

  if (isLoading) return <SkeletonDetailsPage />;
  if (workoutError) return <WorkoutError />;

  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <Link
        to="/dashboard/workouts"
        className="inline-flex items-center gap-1 text-sm text-mute hover:text-ink w-fit transition-colors"
      >
        <IoIosArrowRoundBack className="size-5" />
        Back to workouts
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl p-5 sm:p-7 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <h1 className="font-secondary text-3xl sm:text-4xl tracking-tight uppercase">
              {workout.name}
            </h1>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em]">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-line text-mute">
                <span className="text-ink/60">Category</span>
                <span className="text-brand ml-1.5">{workout.category.name}</span>
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-line text-mute">
                <span className="text-ink/60">Intensity</span>
                <span className="text-brand ml-1.5">
                  {workout.difficulty?.name || workout.difficulty}
                </span>
              </span>
            </div>
          </div>

          <div
            className={`w-full aspect-video bg-ink/5 rounded-xl overflow-hidden ${
              loading ? "animate-pulse" : ""
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
              />
            ) : videoId ? (
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playlist=${videoId}&loop=1`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            ) : (
              !error &&
              !loading && (
                <div className="h-full flex items-center justify-center text-sm text-mute">
                  Video preview unavailable.
                </div>
              )
            )}

            {error && (
              <div className="h-full flex flex-col items-center justify-center gap-3 p-6 text-center">
                <h2 className="font-secondary text-2xl tracking-tight uppercase">
                  Demo video unavailable
                </h2>
                <p className="text-sm text-mute">
                  Try refreshing or check back later.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-paper text-sm hover:bg-brand transition-colors"
                >
                  <IoMdRefresh className="size-4" />
                  Refresh
                </button>
              </div>
            )}
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-t border-line pt-4">
            <div className="flex items-baseline gap-2">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">
                Suggested reps
              </span>
              <span className="text-base font-medium">
                {workout.suggested_reps}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {workout.creator_id === user?.id ||
                (!workout?.youtube_video_id && (
                  <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-line text-ink hover:bg-ink hover:text-paper transition-colors">
                    <MdBookmark className="size-4" />
                    Bookmark video
                  </button>
                ))}
              <button className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-brand text-paper hover:bg-brand-dark transition-colors">
                <FaNoteSticky className="size-4" />
                Log workout
              </button>
            </div>
          </div>
        </div>

        <aside className="flex flex-col gap-3">
          <OtherWorkoutsSection
            id={workout?.id}
            difficulty={workout?.difficulty}
          />
        </aside>
      </div>
    </div>
  );
};

export default WorkoutDetailsPage;
