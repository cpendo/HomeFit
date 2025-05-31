import ActivitySummary from "./components/ActivitySummary";
import CategoryBreakdown from "./components/CategoryBreakdown";
import UserStatsSection from "./components/UserStatsSection";
import WeeklyActivity from "./components/WeeklyActivity";

const HomePage = () => {
  return (
    <div className="w-full h-fit mt-4">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 grid gap-y-4">
          <WeeklyActivity />
          <ActivitySummary />
        </div>

        <CategoryBreakdown />
        <UserStatsSection />
      </div>
    </div>
  );
};

export default HomePage;
