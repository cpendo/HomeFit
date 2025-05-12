import BarChart from "../charts/BarChart";
import Select from "react-select";
import DoughnutChart from "../charts/DoughnutChart";

const Section1 = () => {
  return (
    <div className="col-span-2 h-fit bg-white grid gap-y-4">
      <div className="flex flex-col gap-4 bg-gray-200 p-3 rounded-sm">
        <div className="flex justify-between">
          <h4 className="font-secondary text-2xl flex flex-row items-center gap-2">
            Activity <span className="text-base font-primary">/ 120 mins</span>
          </h4>

          {/* add a calender to pick any week range for chart since the user started */}
          <div>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="color"
              // options={["This week", "Last week"]}
              // styles={selectStyles}
            />
          </div>
        </div>
        <div className="flex justify-center items-center">
          <BarChart />
        </div>
      </div>

      {/* top 3 categories chart */}
      <div className="flex flex-col gap-4 bg-gray-200 p-3 rounded-sm">
        <div className="flex justify-between">
          <h4 className="font-secondary text-2xl flex flex-row items-center gap-2">
            Categories
          </h4>

          {/* add a calender to pick any month for chart since the user started */}
          <div>
            <Select
              className="basic-single"
              classNamePrefix="select"
              name="color"
              // options={["This week", "Last week"]}
              // styles={selectStyles}
            />
          </div>
        </div>

        <div className="w-full flex flex-row justify-around">
          <div className="size-65">
            <DoughnutChart />
          </div>

          <div className="flex flex-col gap-4">
            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="size-4 bg-red-secondary"></div>
                <h5 className="font-secondary">Cardio Training</h5>
              </div>
              <p className="text-sm text-gray-500">
                20 cardio workouts performed
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="size-4 bg-white"></div>
                <h5 className="font-secondary">Strength Training</h5>
              </div>
              <p className="text-sm text-gray-500">
                10 strength workouts performed
              </p>
            </div>

            <div className="flex flex-col">
              <div className="flex flex-row items-center justify-start gap-2">
                <div className="size-4 bg-black"></div>
                <h5 className="font-secondary">Core Training</h5>
              </div>
              <p className="text-sm text-gray-500">
                10 core workouts performed
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Section1;
