import PropTypes from "prop-types";

const FormInput = ({ label, id, type = "text", register, error, styles }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      {/* <label htmlFor={id} className="text-xl font-secondary"> */}
      <label htmlFor={id} >
        {label}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        className={styles}
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
  styles: PropTypes.string.isRequired
};

export default FormInput;
