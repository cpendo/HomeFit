import { FaPlay } from "react-icons/fa";
import { useState } from "react";
import VideoOverlay from "./VideoOverlay";

const SidePanel = () => {
  const [showVideoOverlay, setShowVideoOverlay] = useState(false);

  return (
    <>
      <div className="bg-auth h-full w-1/2 p-16 hidden lg:flex flex-col gap-y-8 justify-center items-center">
        <div className="flex flex-col gap-8 size-120 rounded-2xl backdrop-blur-md bg-ink/50 p-10 border border-white/10">
          <button
            type="button"
            onClick={() => setShowVideoOverlay(true)}
            aria-label="Play intro video"
            className="w-14 h-14 rounded-full bg-paper/15 hover:bg-brand text-paper transition-colors flex items-center justify-center cursor-pointer"
          >
            <FaPlay className="text-lg ml-1" />
          </button>
          <h1 className="font-secondary uppercase text-5xl text-paper leading-tight tracking-tight">
            Train. <span className="text-brand">Track.</span>
            <br />
            Transform.
          </h1>
          <p className="text-xl text-paper/80 font-light leading-relaxed">
            Simplify your fitness, one workout at a time.
          </p>
        </div>
      </div>

      {showVideoOverlay && (
        <VideoOverlay onClose={() => setShowVideoOverlay(false)} />
      )}
    </>
  );
};

export default SidePanel;
