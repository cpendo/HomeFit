const SkeletonTable = () => {
  return (
    <div className="space-y-2">
      <div className="h-11 bg-ink rounded-xl" />
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div
          key={index}
          className="flex items-center gap-4 px-4 py-3 bg-white border border-line rounded-xl"
        >
          <div className="w-8 h-3 bg-line rounded animate-pulse" />
          <div className="w-40 h-3 bg-line rounded animate-pulse" />
          <div className="w-32 h-3 bg-line rounded animate-pulse" />
          <div className="w-20 h-3 bg-line rounded animate-pulse" />
          <div className="w-36 h-3 bg-line rounded animate-pulse" />
          <div className="ml-auto flex gap-2">
            <div className="size-8 bg-line rounded-full animate-pulse" />
            <div className="size-8 bg-line rounded-full animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
