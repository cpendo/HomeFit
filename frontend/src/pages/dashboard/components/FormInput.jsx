import PropTypes from "prop-types";

const FormInput = ({ label, id, type = "text",placeholder , optional,register, error, styles }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={id}>
        {label}
        {optional && <span className="text-gray-500 text-sm ml-1">(optional)</span>}
      </label>
      <input {...register} id={id} type={type} className={styles} placeholder={placeholder} />
      {error && <span className="text-red-600 text-sm">{error.message}</span>}
    </div>
  );
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string,
  placeholder: PropTypes.string,
  optional: PropTypes.bool,
  register: PropTypes.object.isRequired,
  error: PropTypes.shape({
    message: PropTypes.string,
  }),
  styles: PropTypes.string.isRequired
};

export default FormInput;
