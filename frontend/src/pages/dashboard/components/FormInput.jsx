import PropTypes from "prop-types";

const FormInput = ({ label, id, type = "text", register, error }) => {
  return (
    <div className="flex flex-col gap-1">
      {/* <label htmlFor={id} className="text-xl font-secondary"> */}
      <label htmlFor={id} >
        {label}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        className="bg-white border-1 border-gray-400 outline-none text-base p-1 focus:border-black"
      />
      {error && <span className="text-red-600 text-sm">{error.message}</span>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  register: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default FormInput;
