const SkeletonWorkoutsSection = () => {
  return (
    <>
      <div className="w-2/3 h-5 bg-line rounded animate-pulse" />
      <div className="flex flex-col gap-2">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="flex items-center gap-4 p-3 bg-white border border-line rounded-xl"
          >
            <div className="size-9 bg-line rounded-full animate-pulse" />
            <div className="flex flex-col gap-1.5 flex-1">
              <div className="w-1/2 h-3.5 bg-line rounded animate-pulse" />
              <div className="w-1/3 h-3 bg-line rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default SkeletonWorkoutsSection;
