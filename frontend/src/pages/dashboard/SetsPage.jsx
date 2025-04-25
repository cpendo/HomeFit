import { FaPlus } from "react-icons/fa6";

const SetsPage = () => {
  return (
    <div className="w-full max-w-7xl min-h-129  mx-auto bg-white rounded-lg my-4 pb-6">
      <div className="flex flex-row justify-between items-center p-3">
        <h2 className="text-4xl font-secondary ">Sets</h2>
        <button className="bg-red-secondary text-white font-secondary p-2 rounded-sm">
          {" "}
          <FaPlus className="inline" /> create new
        </button>
      </div>
      No sets added
    </div>
  );
};

export default SetsPage;
