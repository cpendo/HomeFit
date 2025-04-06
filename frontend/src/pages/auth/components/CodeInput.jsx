const CodeInput = ({value, onChange, onKeyDown, inputRef}) => {
  return (
    <input
      type="text"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      ref={inputRef}
      maxLength={1}
      className="bg-gray-300 sm:size-14 size-10 sm:text-5xl text-3xl text-center outline-none border-gray-300 border-2 rounded-xl focus:border-black"
    />
  );
};

import PropTypes from 'prop-types';

CodeInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.instanceOf(Element) })
  ])
};

export default CodeInput;
