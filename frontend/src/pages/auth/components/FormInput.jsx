import PropTypes from "prop-types"

const FormInput = ({ label, id, type = "text", register, error, ...rest }) => {
  return (
    <div className="flex flex-col mt-3 w-full">
      <label htmlFor={id}>{label}</label>
      <input
        {...register(id)}
        id={id}
        type={type}
        className="bg-[#D3D3D3] w-full text-base p-1.5 rounded-xs outline-none border-2 border-[#D3D3D3] focus:bg-white focus:border-black"
        {...rest}
      />
      {error && <span className="text-red-600 text-sm">{error.message}</span>}
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