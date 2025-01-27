import { useEffect, useState } from "react";

const Display = () => {
  //console.log(workouts)
  const [workouts, setWorkouts] = useState([]);

  useEffect(() => {
    const fetchWorkouts = async () => {
      const response = await fetch("workout.json");
      const data = await response.json();
      setWorkouts(data);
    };

    fetchWorkouts();
  });

  return (
    <div className="flex flex-col w-full px-4">
      <div className="flex flex-row justify-between">
        <h2 className="font-secondary font-semibold text-2xl uppercase">
          All Workouts
        </h2>
        <select
          // onChange={(e) => setSelectedCategory(e.target.value)}
          name="category"
          id="category"
          className="border bg-[#EAEAEA] border-gray-300 rounded-md px-4 py-2 focus:outline-none"
        >
          {["Beginner", "Intermediate", "Advanced"].map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      {/* Workouts Display */}
      <div className="flex flex-wrap gap-x-6 gap-y-6 mt-4">
        {workouts.map((workout) => (
          <div key={workout.id} className="border-1 p-3 w-75">
            <div className="h-38 w-full">
              <iframe
                className="h-full w-full"
                loading="lazy"
                src="https://www.youtube.com/embed/6Li55TURhVg?wmode=transparent"

                title="Wall Sit"
                // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
                onError={(e) => {
                  console.error(e)
                  // Display a message or alternative content to users
                }}
              ></iframe>
              {/* <img src="https://img.youtube.com/vi/6Li55TURhVg/hqdefault.jpg" alt="" className="h-full w-full object-cover" /> */}
            </div>

            <h3 className="font-secondary text-2xl hover:text-blue-600 hover:underline">{workout.name}</h3>

            <div className="text-sm tracking-tight flex flex-row pt-0.5 gap-2 ">
              <p className="bg-[#D3D3D3] px-2 rounded-2xl ">
                {workout.difficulty}
              </p>
              <p className="bg-[#D3D3D3] px-2 rounded-2xl ">{workout.type}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Display;
