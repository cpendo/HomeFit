import HeroBanner from "./components/HeroBanner";
import WeeklyActivity from "./components/WeeklyActivity";
import CategoryBreakdown from "./components/CategoryBreakdown";
import StreakCalender from "./components/StreakCalender";
import WorkoutStats from "./components/WorkoutStats";

const HomePage = () => {
  return (
    <div className="w-full flex flex-col gap-5 sm:gap-6 pt-6 sm:pt-8">
      <HeroBanner />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5 sm:gap-6">
        <div className="xl:col-span-2 flex flex-col gap-5 sm:gap-6">
          <WeeklyActivity />
          <CategoryBreakdown />
        </div>
        <div className="flex flex-col gap-5 sm:gap-6">
          <StreakCalender />
          <WorkoutStats />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
