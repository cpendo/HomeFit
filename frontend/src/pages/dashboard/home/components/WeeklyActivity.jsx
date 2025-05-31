import BarChart from "../charts/BarChart";
import Select from "react-select";

const WeeklyActivity = () => {
  return (
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
  );
};

export default WeeklyActivity;
