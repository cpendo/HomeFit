const WorkoutStats = () => {
  return (
    <div className="w-full bg-white flex flex-col gap-2 py-2 rounded-sm">
      <h4 className="font-secondary text-2xl text-center">Workouts</h4>
      <div className="flex flex-row justify-around">
        <div className="flex flex-col items-center">
          <span className="text-base capitalize">saved</span>
          <h5 className="font-bold text-3xl">30</h5>
        </div>
        <div className="flex flex-col items-center">
          <span className="text-base capitalize">logged</span>
          <h5 className="font-bold text-3xl">10</h5>
        </div>
      </div>
    </div>
  );
}

export default WorkoutStats