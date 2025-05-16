const SkeletonWorkoutsSection = () => {
  return (
    <div className="flex-1 flex flex-col gap-2">
      <h5 className="font-secondary text-2xl uppercase">Other Workouts</h5>
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4, 5].map((index) => (
          <div
            key={index}
            className="flex flex-row items-center gap-5 bg-gray-200 rounded-sm p-3"
          >
            <h1 className="flex items-center justify-center bg-gray-400 size-11 rounded-full animate-pulse"></h1>
            <div className="flex flex-col gap-1">
              <h2 className="w-50 h-8 bg-gray-400 rounded-sm animate-pulse"></h2>
              <div className="flex flex-row gap-4 text-base animate-pulse">
                <p className="w-30 h-5 bg-gray-400 rounded-sm"></p>
                <p className="w-30 h-5 bg-gray-400 rounded-sm"></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SkeletonWorkoutsSection