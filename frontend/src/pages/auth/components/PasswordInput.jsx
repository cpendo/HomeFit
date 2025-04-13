// components/PasswordInput.jsx
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

const PasswordInput = ({ label, id, register, error }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col mt-3 w-full">
      <label htmlFor={id}>{label}</label>
      <div className="relative">
        <input
          {...register(id)}
          type={visible ? "text" : "password"}
          id={id}
          className="bg-[#D3D3D3] text-base w-full p-1.5 rounded-xs outline-none border-2 border-[#D3D3D3] focus:bg-white focus:border-black pr-10"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute top-1/2 right-3 transform -translate-y-1/2 text-black"
        >
          {visible ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {error && (
        <span className="text-red-600 text-sm">{error.message}</span>
      )}
    </div>
  );
};
PasswordInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default PasswordInput;
