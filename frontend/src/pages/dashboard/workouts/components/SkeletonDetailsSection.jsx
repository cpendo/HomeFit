const SkeletonDetailsPage = () => {
  return (
    <div className="w-full h-fit mt-4 flex flex-col gap-1">
      <div className="bg-gray-300 w-45 h-7 rounded-sm"></div>

      <div className="flex flex-row gap-4">
        <div className="flex-2 flex flex-col gap-3 bg-gray-200 rounded-sm p-3">
          {/* heading */}
          <div className="flex flex-row justify-between items-center">
            <h1 className="w-50 h-8 bg-gray-400 rounded-sm animate-pulse"></h1>
            <div className="w-50 h-8 bg-gray-400 rounded-sm animate-pulse"></div>
          </div>

          {/* youtube video */}
          <div className="w-full h-100 bg-gray-400 rounded-sm"> </div>

          {/* buttons */}
          <div className="flex flex-row justify-between items-center ">
            <div className="w-60 h-8 bg-gray-400 rounded-sm animate-pulse"></div>
            <div className="w-60 h-8 bg-gray-400 rounded-sm animate-pulse"></div>
          </div>
        </div>        
      </div>
    </div>
  );
};

export default SkeletonDetailsPage;
