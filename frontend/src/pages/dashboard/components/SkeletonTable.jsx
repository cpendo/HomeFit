const SkeletonTable = () => {
  return (
    <div className="space-y-2">
      {[1, 2, 3, 4, 5, 6].map((index) => (
        <div
          key={index}
          className="flex items-center justify-between px-4 py-3 bg-gray-200 border-b border-gray-300 rounded-md"
        >
          <div className=" flex items-center space-x-4 w-full">
            <div className="w-10 h-4 bg-gray-400 rounded animate-pulse"></div>
            <div className="w-40 h-4 bg-gray-400 rounded animate-pulse"></div>
            <div className="w-40 h-4 bg-gray-400 rounded animate-pulse"></div>
            <div className="w-20 h-4 bg-gray-400 rounded animate-pulse"></div>
            <div className="w-40 h-4 bg-gray-400 rounded animate-pulse"></div>
            <div className="flex space-x-2 ml-auto">
              <div className="w-8 h-8 bg-gray-400 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-400 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkeletonTable;
