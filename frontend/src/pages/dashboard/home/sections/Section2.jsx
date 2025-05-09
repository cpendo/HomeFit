import { FaEllipsis } from "react-icons/fa6";
import { LuBicepsFlexed, LuShapes } from "react-icons/lu";
import { FaRegCheckCircle } from "react-icons/fa";

const Section2 = () => {
  return (
    <div className="bg-white grid gap-y-3">
      {/* Recent Activity */}
      <div className="w-full h-fit bg-gray-200 p-3 flex flex-col gap-4 rounded-sm">
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
              <p className="text-sm/2 text-gray-400">5/5/2025</p>
              <h5 className="text-base font-medium">20 Jumping Jacks</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <FaRegCheckCircle className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-400">5/5/2025</p>
              <h5 className="text-base font-medium">10 Situps</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <FaRegCheckCircle className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-400">5/5/2025</p>
              <h5 className="text-base font-medium">5 Burpees</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Most performed Workouts */}
      <div className="w-full h-fit bg-gray-200 p-3 flex flex-col gap-4 rounded-sm">
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
            <h5 className="text- font-semibold">Jumping Jacks (20x) </h5>
          </div>
          <div className="flex flex-row gap-3">
            <LuBicepsFlexed className="text-xl text-red-secondary" />
            <h5 className="text-base font-semibold">Situps (15x)</h5>
          </div>
          <div className="flex flex-row gap-3">
            <LuBicepsFlexed className="text-xl text-red-secondary" />
            <h5 className="text-base font-semibold">Pushups (12x)</h5>
          </div>
        </div>
      </div>

      {/* Most performed Sets */}
      <div className="w-full h-fit bg-gray-200 p-3 flex flex-col gap-4 rounded-sm">
        <div className="w-full flex flex-row justify-between items-center ">
          <h4 className="text-2xl capitalize font-secondary ">Top Sets</h4>
          <p className="text-xl">
            <FaEllipsis />
          </p>
        </div>

        {/* top 3 logs */}
        <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-3">
            <LuShapes className="text-xl text-red-secondary" />
            <h5 className="text-base font-semibold">Beginner Core (8x) </h5>
          </div>
          <div className="flex flex-row gap-3">
            <LuShapes className="text-xl text-red-secondary" />
            <h5 className="text-base font-semibold">HIIT Blast (6x) </h5>
          </div>
          <div className="flex flex-row gap-3">
            <LuShapes className="text-xl text-red-secondary" />
            <h5 className="text-base font-semibold">Full Body Burn (5x) </h5>
          </div>
        </div>
      </div>

      {/* Most performed Sets */}
      <div className="w-full h-fit bg-gray-200 p-3 flex flex-col gap-4 rounded-sm">
        <div className="w-full flex flex-row justify-between items-center ">
          <h4 className="text-2xl capitalize font-secondary ">AI Suggestion</h4>
          <p className="text-xl">
            <FaEllipsis />
          </p>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusamus,
        est!
        {/* <div className="flex flex-col gap-4">
          <div className="flex flex-row gap-3">
            <FaCircleCheck className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-400">5/5/2025</p>
              <h5 className="text-base font-semibold">20 Jumping Jacks</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <FaCircleCheck className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-400">5/5/2025</p>
              <h5 className="text-base font-semibold">10 Situps</h5>
            </div>
          </div>
          <div className="flex flex-row gap-3">
            <FaCircleCheck className="text-xl text-red-secondary" />
            <div className="flex flex-col">
              <p className="text-sm/2 text-gray-400">5/5/2025</p>
              <h5 className="text-base font-semibold">5 Burpees</h5>
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default Section2;
