const SkeletonDetailsPage = () => {
  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <div className="w-32 h-3 bg-line rounded animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 bg-white border border-line rounded-2xl p-5 sm:p-7 flex flex-col gap-5">
          <div className="flex flex-col sm:flex-row sm:justify-between gap-3">
            <div className="w-1/2 h-8 bg-line rounded animate-pulse" />
            <div className="w-1/3 h-6 bg-line rounded animate-pulse" />
          </div>
          <div className="w-full aspect-video bg-line rounded-xl animate-pulse" />
          <div className="flex justify-between">
            <div className="w-1/3 h-5 bg-line rounded animate-pulse" />
            <div className="w-1/3 h-5 bg-line rounded animate-pulse" />
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="w-2/3 h-5 bg-line rounded animate-pulse" />
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-16 bg-white border border-line rounded-xl animate-pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkeletonDetailsPage;
