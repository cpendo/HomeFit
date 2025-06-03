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

  const modifiers = {
    loggedDay: loggedDayObjects,
  };

  const modifiersClassNames = {
    loggedDay: "logged-day",
  };
  const minDateForCalendar = data?.firstLogDate
    ? parseDateString(data.firstLogDate)
    : undefined; 

  const today = new Date();

  if (isLoading)
    return (
      <div className="bg-gray-50 h-80 w-full rounded-sm animate-pulse"></div>
    );

  if (isError) {
    return (
      <div className="bg-gray-50 h-80 w-full rounded-sm animate-pulse">
        Error occured. Please refresh the page or try again later.
      </div>
    );
  }

  return (
    <div className="w-full h-80 flex justify-center py-2 bg-white rounded-sm ">
      <DayPicker
        mode="single"
        selected={new Date()}
        disabled={{ before: minDateForCalendar, after: today }}
        modifiers={modifiers} // Apply the 'loggedDay' modifier
        modifiersClassNames={modifiersClassNames} // Link modifier to CSS
        className="text-base"
      />
    </div>
  );
};

export default StreakCalender;
