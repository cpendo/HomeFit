import { IoCloseOutline } from "react-icons/io5";
import Proptypes from "prop-types";

const VideoOverlay = ({ onClose }) => {
  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex justify-center items-center">
      <div className="h-[70%] w-[50%]">
        <button
          onClick={onClose}
          className="absolute top-18 right-75 text-black bg-white border-0 p-1 hover:bg-red-secondary rounded-sm"
        >
          <IoCloseOutline className="text-4xl" />
        </button>
        <video autoPlay muted loop>
          <source src="/video.mp4" type="video/mp4" />{" "}
        </video>
      </div>
    </div>
  );
};

VideoOverlay.propTypes = {
  onClose: Proptypes.func.isRequired,
};

export default VideoOverlay;
