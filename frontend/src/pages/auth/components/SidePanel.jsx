import { FaPlay } from "react-icons/fa";
import VideoOverlay from "./VideoOverlay";
import { useState } from "react";

const SidePanel = () => {
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);

  return (
    <>
      <div className="bg-auth h-full w-1/2 p-16 hidden lg:flex flex-col gap-y-8 justify-center items-center">
        <div className="flex flex-col gap-8 size-120 rounded-xs backdrop-blur-sm bg-black/40 p-10">
          <FaPlay
            className="text-5xl text-[#D3D3D3] hover:text-black hover:cursor-pointer"
            onClick={() => setShowVideoOverlay(true)}
          />
          <h1 className="font-secondary text-5xl text-black">
            Train.
            <span className="text-6xl text-white">Track.</span> <br />
            Transform.
          </h1>
          <h2 className=" text-4xl text-[#D3D3D3]">
            Simplify your <span className="text-black text-5xl"> fitness</span>{" "}
            one <span className="text-black text-5xl "> workout </span> at a
            time
          </h2>
        </div>
      </div>

      {showVideoOverlay && (
        <VideoOverlay onClose={() => setShowVideoOverlay(false)} />
      )}
    </>
  );
};

export default SidePanel;
