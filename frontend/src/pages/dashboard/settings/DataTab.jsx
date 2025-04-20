import { useState } from "react";
import { FaRegTrashAlt, FaFileExport } from "react-icons/fa";
import Select from "react-select";

const rangeOptions = [
  { value: "7", label: "Last 7 days" },
  { value: "30", label: "Last 30 days" },
  { value: "all", label: "All time" },
];

const DataTab = () => {
  const [range, setRange] = useState({});

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col gap-5 border-2 border-dash-secondary rounded-sm p-5">
        <div className="flex flex-row flex-wrap justify-between items-center">
          <h4 className="font-secondary capitalize text-2xl">
            Export workout data
          </h4>
          <button className="bg-gray-200 text-black flex flex-row items-center gap-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-red-secondary hover:text-white">
            <FaFileExport className="inline text-sm" /> Export
          </button>
        </div>

        <p className="text-sm text-gray-600">
          Export your workout logs including duration, intensity, and
          categories. You can choose a custom time range.
        </p>

        <Select
          name="intensity"
          className="basic-single w-full md:w-80 outline-none"
          placeholder="Select Time Range"
          options={rangeOptions}
          value={rangeOptions.find((option) => option.value === range)}
          onChange={(e) => setRange(e?.value || "")}
          isClearable
        />
      </div>

      <div className="flex flex-row flex-wrap justify-between items-center md:gap-0 gap-4  border-2 border-dash-secondary rounded-sm p-5">
        <div className="flex flex-col gap-2">
          <h4 className="font-secondary text-2xl">Delete Workout Data</h4>
          <p>
            Deleting your workouts is irreversible. All your workout progress
            will be lost forever
          </p>
        </div>
        <button className="bg-gray-200 text-red-secondary flex flex-row items-center gap-1 py-1 px-2 rounded-sm cursor-pointer hover:bg-black hover:text-white">
          <FaRegTrashAlt className="inline text-sm" /> Delete Data
        </button>
      </div>
    </div>
  );
};

export default DataTab;
