import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import PropTypes from "prop-types";

const Accordion = ({ title, content }) => {
  const [isActive, setIsActive] = useState(false);

  return (
    <div className={`border-b-2 mb-7 ${isActive && "border-red-secondary"}`}>
      <div
        className={`flex flex-row justify-between items-center font-secondary text-black text-lg sm:text-2xl ${
          isActive && "text-red-secondary"
        }`}
      >
        <h3 >{title}</h3>
        <p onClick={() => setIsActive(!isActive)}>
          {isActive ? <FaMinus /> : <FaPlus />}
        </p>
      </div>
      {isActive && <div className="font-light text-sm sm:text-base mt-4 mb-1">{content}</div>}
    </div>
  );
};

Accordion.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
};

export default Accordion;
