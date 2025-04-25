import PropTypes from "prop-types";

const FormInput = ({ label, id, type = "text" }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xl font-secondary">
        {label}
      </label>
      <input
        id={id}
        type={type}
        className="text-lg p-1 border-black border outline-none"
      />
    </div>
  );
};

FormInput.proptypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default FormInput;
