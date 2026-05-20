import PropTypes from "prop-types";

const FormInput = ({ label, id, type = "text", register, error, ...rest }) => {
  return (
    <div className="flex flex-col mt-3 w-full">
      <label htmlFor={id} className="text-sm font-medium text-ink/80 mb-1.5">
        {label}
      </label>
      <input
        {...register(id)}
        id={id}
        type={type}
        className="bg-white w-full text-base px-3 py-2.5 rounded-md outline-none border border-line focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors placeholder:text-mute"
        {...rest}
      />
      {error && (
        <span className="text-brand text-sm mt-1">{error.message}</span>
      )}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  register: PropTypes.func.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
};

export default FormInput;
