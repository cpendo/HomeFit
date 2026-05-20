import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import PropTypes from "prop-types";

const PasswordInput = ({ label, id, register, error }) => {
  const [visible, setVisible] = useState(false);

  return (
    <div className="flex flex-col mt-3 w-full">
      <label htmlFor={id} className="text-sm font-medium text-ink/80 mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          {...register(id)}
          type={visible ? "text" : "password"}
          id={id}
          className="bg-white text-base w-full px-3 py-2.5 rounded-md outline-none border border-line focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors pr-10 placeholder:text-mute"
        />
        <button
          type="button"
          onClick={() => setVisible(!visible)}
          className="absolute top-1/2 right-3 -translate-y-1/2 text-mute hover:text-ink transition-colors"
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <FaEye /> : <FaEyeSlash />}
        </button>
      </div>
      {error && (
        <span className="text-brand text-sm mt-1">{error.message}</span>
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
