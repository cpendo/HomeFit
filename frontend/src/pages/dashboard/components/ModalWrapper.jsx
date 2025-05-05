import PropTypes from "prop-types";

const ModalWrapper = ({ children }) => {
  return (
    <div className="fixed inset-0 z-40 bg-black/70 flex justify-center items-center overflow-y-auto">
      {children}
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.element.isRequired,
};

export default ModalWrapper;
