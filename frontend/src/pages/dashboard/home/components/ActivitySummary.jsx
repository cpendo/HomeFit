import { FaEllipsis } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { LuBicepsFlexed } from "react-icons/lu";

const ActivitySummary = () => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="grid-cols-1 bg-gray-200 p-3 flex flex-col gap-4 rounded-sm">
        <div className="w-full flex flex-row justify-between items-center ">
          <h4 className="text-2xl capitalize font-secondary ">
            recent activity
          </h4>
          <p className="text-xl">
            <FaEllipsis />
          </p>
        </div>

        {/* top 3 logs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-3">
            <FaRegCheckCircle className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-500">5/5/2025</p>
              <h5 className="text-base font-medium">20 Jumping Jacks</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <FaRegCheckCircle className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-500">5/5/2025</p>
              <h5 className="text-base font-medium">10 Situps</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <FaRegCheckCircle className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-500">5/5/2025</p>
              <h5 className="text-base font-medium">5 Burpees</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Most performed Workouts */}
      <div className="grid-cols-1 bg-gray-200 p-3 flex flex-col gap-4 rounded-sm">
        <div className="w-full flex flex-row justify-between items-center ">
          <h4 className="text-2xl capitalize font-secondary ">Top Workouts</h4>
          <p className="text-xl">
            <FaEllipsis />
          </p>
        </div>

        {/* top 3 logs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-3">
            <LuBicepsFlexed className="text-xl text-red-secondary" />
            {/* <h5 className="text- font-semibold">Jumping Jacks (20x) </h5> */}
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-500">Performed (20x)</p>
              <h5 className="text-base font-medium">Jumping Jacks</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <LuBicepsFlexed className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-500">Performed (15x)</p>
              <h5 className="text-base font-medium">Situps</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <LuBicepsFlexed className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-500">Performed (12x)</p>
              <h5 className="text-base font-medium">Pushups</h5>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivitySummary;
