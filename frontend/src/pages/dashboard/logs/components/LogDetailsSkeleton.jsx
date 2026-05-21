const LogDetailsSkeleton = () => {
  return (
    <div className="w-full pt-6 sm:pt-8 flex flex-col gap-5">
      <div className="w-28 h-3 bg-line rounded animate-pulse" />
      <div className="bg-ink/90 rounded-2xl h-32 animate-pulse" />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 flex flex-col gap-5">
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 flex flex-col gap-4">
            <div className="w-1/3 h-5 bg-line rounded animate-pulse" />
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-20 bg-paper rounded-xl animate-pulse"
                />
              ))}
            </div>
          </div>
          <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 h-32 animate-pulse" />
        </div>
        <div className="bg-white border border-line rounded-2xl p-5 sm:p-6 h-48 animate-pulse" />
      </div>
    </div>
  );
};

export default LogDetailsSkeleton;
