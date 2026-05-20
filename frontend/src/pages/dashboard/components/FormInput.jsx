import PropTypes from "prop-types";

const baseInput =
  "w-full bg-white border border-line rounded-lg px-3 py-2 text-sm outline-none focus:border-ink focus:ring-2 focus:ring-brand/15 transition-colors";

const FormInput = ({
  label,
  id,
  type = "text",
  placeholder,
  optional,
  register,
  error,
  styles,
}) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={id} className="text-xs uppercase tracking-[0.14em] text-mute">
        {label}
        {optional && <span className="ml-1 normal-case text-mute">(optional)</span>}
      </label>
      <input
        {...register}
        id={id}
        type={type}
        className={styles || baseInput}
        placeholder={placeholder}
      />
      {error && <span className="text-brand text-xs mt-0.5">{error.message}</span>}
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
  error: PropTypes.shape({ message: PropTypes.string }),
  styles: PropTypes.string,
};

export default FormInput;
