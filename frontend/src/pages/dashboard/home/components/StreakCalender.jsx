import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import { useGetStreakDatesQuery } from "../../../../features/logs/logsApi";
import { useMemo } from "react";

const parseDateString = (dateString) => {
  if (!dateString) return null;
  return new Date(`${dateString}T00:00:00`);
};

const StreakCalender = () => {
  const { data, isLoading, isError } = useGetStreakDatesQuery();

  const loggedDayObjects = useMemo(() => {
    if (!data?.dates) return [];
    return data.dates.map(parseDateString).filter(Boolean);
  }, [data]);

  const modifiers = { loggedDay: loggedDayObjects };
  const modifiersClassNames = { loggedDay: "logged-day" };
  const minDateForCalendar = data?.firstLogDate
    ? parseDateString(data.firstLogDate)
    : undefined;
  const today = new Date();

  return (
    <section className="dash-card flex flex-col gap-4">
      <div className="flex items-baseline justify-between">
        <h2 className="font-secondary text-2xl tracking-tight uppercase">
          Streak
        </h2>
        <span className="text-xs uppercase tracking-[0.18em] text-brand">
          {loggedDayObjects.length} days
        </span>
      </div>

      {isLoading ? (
        <div className="h-72 bg-paper rounded-lg animate-pulse" />
      ) : isError ? (
        <p className="text-sm text-mute">
          Couldn&apos;t load streak data. Try refreshing.
        </p>
      ) : (
        <div className="flex justify-center -mx-2">
          <DayPicker
            mode="single"
            selected={today}
            disabled={{ before: minDateForCalendar, after: today }}
            modifiers={modifiers}
            modifiersClassNames={modifiersClassNames}
            className="text-sm"
          />
        </div>
      )}
    </section>
  );
};

export default StreakCalender;
