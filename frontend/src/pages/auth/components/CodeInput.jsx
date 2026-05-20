import PropTypes from "prop-types";

const CodeInput = ({ value, onChange, onKeyDown, inputRef }) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={inputRef}
      maxLength={1}
      className="bg-white sm:size-14 size-10 sm:text-4xl text-2xl text-center outline-none border border-line rounded-xl focus:border-brand focus:ring-1 focus:ring-brand/30 transition-colors"
    />
  );
};

CodeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
  ]),
};

export default CodeInput;
