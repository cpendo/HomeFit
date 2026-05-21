import { Link, useNavigate, useParams } from "react-router-dom";
import {
  IoIosArrowRoundBack,
  IoIosSpeedometer,
  IoMdRefreshCircle,
} from "react-icons/io";
import { LuClock4, LuDumbbell } from "react-icons/lu";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import {
  useDeleteWorkoutLogMutation,
  useGetWorkoutLogByIdQuery,
} from "../../../features/logs/logsApi";
import LogDetailsSkeleton from "./components/LogDetailsSkeleton";

const moodLabels = {
  low: "Low",
  okay: "Okay",
  good: "Good",
  great: "Great",
};

const formatDuration = (seconds) => {
  if (!seconds && seconds !== 0) return "—";
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = seconds % 60;
  const parts = [];
  if (h) parts.push(`${h}h`);
  if (m || h) parts.push(`${m}m`);
  parts.push(`${s}s`);
  return parts.join(" ");
};

const Stat = ({ label, value, icon: Icon }) => (
  <div className="flex flex-col gap-1 p-4 rounded-xl border border-line bg-paper">
    <div className="flex items-center gap-1.5 text-mute">
      {Icon && <Icon className="size-3.5" />}
      <span className="text-xs uppercase tracking-[0.14em]">{label}</span>
    </div>
    <span className="font-secondary text-2xl tracking-tight">{value}</span>
  </div>
);

const EffortBar = ({ rating }) => {
  const clamped = Math.max(1, Math.min(5, rating ?? 1));
  return (
    <div className="flex items-center gap-1.5">
      {[1, 2, 3, 4, 5].map((n) => (
        <span
          key={n}
          className={`h-2 flex-1 rounded-full ${
            n <= clamped ? "bg-brand" : "bg-line"
          }`}
        />
      ))}
      <span className="ml-2 font-secondary text-lg text-brand min-w-[36px] text-right">
        {clamped}/5
      </span>
    </div>
  );
};

const MoodPill = ({ value, tone }) => (
  <span
    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${
      tone === "after"
        ? "bg-brand/10 text-brand border-brand/20"
        : "bg-white text-ink border-line"
    }`}
  >
    {moodLabels[value] || "—"}
  </span>
);

const LogDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading, error } = useGetWorkoutLogByIdQuery(id);
  const [deleteLog, { isLoading: isDeleting }] =
    useDeleteWorkoutLogMutation();

  if (isLoading) return <LogDetailsSkeleton />;

  if (error || !data?.log) {
    return (
      <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
        <Link
          to="/dashboard/logs"
          className="inline-flex items-center gap-1 text-sm text-mute hover:text-ink w-fit transition-colors"
        >
          <IoIosArrowRoundBack className="size-5" />
          Back to logs
        </Link>
        <div className="bg-white border border-line border-dashed rounded-2xl py-16 flex flex-col items-center text-center gap-3">
          <h2 className="font-secondary text-3xl tracking-tight uppercase">
            Log not found
          </h2>
          <p className="text-sm text-mute max-w-md">
            This log doesn&apos;t exist or you don&apos;t have access to it.
          </p>
          <Link
            to="/dashboard/logs"
            className="mt-2 inline-flex items-center px-5 py-2 rounded-full text-sm font-medium bg-ink text-paper hover:bg-brand transition-colors"
          >
            Back to all logs
          </Link>
        </div>
      </div>
    );
  }

  const log = data.log;
  const performedAt = new Date(log.performed_at);

  const handleDelete = async () => {
    const result = await Swal.fire({
      title: "Delete this log?",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });
    if (!result.isConfirmed) return;
    try {
      const response = await deleteLog(log.id).unwrap();
      await Swal.fire(response.message, "", "success");
      navigate("/dashboard/logs");
    } catch (err) {
      Swal.fire(
        "Delete failed",
        err?.data?.message || "An error occurred",
        "error"
      );
    }
  };

  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <Link
        to="/dashboard/logs"
        className="inline-flex items-center gap-1 text-sm text-mute hover:text-ink w-fit transition-colors"
      >
        <IoIosArrowRoundBack className="size-5" />
        Back to logs
      </Link>

      <div className="bg-ink text-paper rounded-2xl px-6 sm:px-8 py-6 sm:py-7 flex flex-col gap-3">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase tracking-[0.22em] text-brand">
              {performedAt.toLocaleDateString("en-US", { weekday: "long" })}
              <span className="text-paper/40 mx-2">/</span>
              <span className="text-paper/60">
                {performedAt.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </p>
            <h1 className="font-secondary text-3xl sm:text-4xl tracking-tight uppercase">
              {log.workouts?.name}
            </h1>
            <div className="flex flex-wrap gap-2 text-xs uppercase tracking-[0.14em]">
              <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/15 text-paper/70">
                <span className="text-paper/50">Category</span>
                <span className="text-brand ml-1.5">
                  {log.workouts?.category?.name}
                </span>
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/15 text-paper/70">
                <span className="text-paper/50">Intensity</span>
                <span className="text-brand ml-1.5">
                  {log.workouts?.difficulty}
                </span>
              </span>
              <span className="inline-flex items-center px-2.5 py-1 rounded-full border border-white/15 text-paper/70">
                {performedAt.toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "2-digit",
                })}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              to={`/dashboard/workouts/${log.workouts?.id}`}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm border border-white/15 text-paper hover:bg-white/10 transition-colors"
            >
              <LuDumbbell className="size-3.5" />
              View workout
            </Link>
            <button
              onClick={handleDelete}
              disabled={isDeleting}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm bg-brand text-paper hover:bg-brand-dark transition-colors disabled:opacity-60"
            >
              <MdDelete className="size-3.5" />
              {isDeleting ? "Deleting…" : "Delete log"}
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
            <h2 className="font-secondary text-xl tracking-tight uppercase text-ink/80">
              The session
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              <Stat
                label="Duration"
                value={formatDuration(log.duration)}
                icon={LuClock4}
              />
              <Stat
                label="Reps"
                value={log.performed_reps}
                icon={IoMdRefreshCircle}
              />
              <Stat
                label="Effort"
                value={`${Math.max(1, Math.min(5, log.effort_rating ?? 1))}/5`}
                icon={IoIosSpeedometer}
              />
            </div>

            <div className="flex flex-col gap-2 pt-2">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">
                Effort rating
              </span>
              <EffortBar rating={log.effort_rating} />
            </div>

            {log.equipment_used && (
              <div className="flex flex-col gap-1 pt-2 border-t border-line">
                <span className="text-xs uppercase tracking-[0.14em] text-mute">
                  Equipment
                </span>
                <p className="text-sm text-ink/80">{log.equipment_used}</p>
              </div>
            )}
          </div>

          {log.notes && (
            <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-2">
              <h2 className="font-secondary text-xl tracking-tight uppercase text-ink/80">
                Notes
              </h2>
              <p className="text-sm text-ink/80 leading-relaxed whitespace-pre-wrap">
                {log.notes}
              </p>
            </div>
          )}
        </div>

        <aside className="flex flex-col gap-5">
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
            <h2 className="font-secondary text-xl tracking-tight uppercase text-ink/80">
              How it felt
            </h2>
            {(log.mood_before || log.mood_after) ? (
              <div className="flex items-center gap-2">
                <MoodPill value={log.mood_before} tone="before" />
                <span className="text-mute">→</span>
                <MoodPill value={log.mood_after} tone="after" />
              </div>
            ) : (
              <p className="text-sm text-mute">
                No mood recorded for this session.
              </p>
            )}

            <div className="flex flex-col gap-1 pt-2 border-t border-line">
              <span className="text-xs uppercase tracking-[0.14em] text-mute">
                Suggested target
              </span>
              <p className="text-sm">
                {log.workouts?.suggested_reps || "—"}
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default LogDetailsPage;
