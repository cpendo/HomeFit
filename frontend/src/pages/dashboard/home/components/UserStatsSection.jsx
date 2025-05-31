import StreakCalender from "./StreakCalender";
import UserProfile from "./UserProfile";
import WorkoutStats from "./WorkoutStats";

const UserStatsSection = () => {
  return (
    <div className="bg-gray-200 flex flex-col items-center gap-5 rounded-sm p-3">
      <UserProfile />
      <StreakCalender />
      <WorkoutStats />
    </div>
  );
};

export default UserStatsSection;
