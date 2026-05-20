// Shared react-data-table-component + react-select theme tuned to match the
// Sport Club Editorial palette declared in App.css.
export const customStyles = {
  table: {
    style: {
      backgroundColor: "transparent",
    },
  },
  headRow: {
    style: {
      backgroundColor: "#0d0d0e",
      color: "#fafaf7",
      borderRadius: "10px",
      marginBottom: "8px",
      minHeight: "44px",
    },
  },
  headCells: {
    style: {
      fontSize: "13px",
      fontFamily: "DM Sans, sans-serif",
      fontWeight: 500,
      letterSpacing: "0.06em",
      textTransform: "uppercase",
    },
  },
  rows: {
    style: {
      fontSize: "14px",
      fontFamily: "DM Sans, sans-serif",
      fontWeight: 400,
      color: "#0d0d0e",
      backgroundColor: "#ffffff",
      borderRadius: "10px",
      marginBottom: "6px",
      minHeight: "52px",
      border: "1px solid #e6e3dc",
      "&:hover": {
        backgroundColor: "#fafaf7",
        cursor: "default",
      },
    },
  },
  cells: {
    style: {
      fontSize: "14px",
      textTransform: "capitalize",
    },
  },
  pagination: {
    style: {
      backgroundColor: "transparent",
      border: 0,
    },
  },
};

export const selectStyles = {
  control: (base, state) => ({
    ...base,
    minWidth: "140px",
    backgroundColor: "#ffffff",
    border: state.isFocused
      ? "1px solid #0d0d0e"
      : "1px solid #e6e3dc",
    boxShadow: state.isFocused ? "0 0 0 3px rgba(188,44,62,0.12)" : "none",
    borderRadius: "8px",
    minHeight: "40px",
    "&:hover": { borderColor: "#0d0d0e" },
  }),
  option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
      ? "#0d0d0e"
      : state.isFocused
      ? "#fafaf7"
      : "#ffffff",
    color: state.isSelected ? "#fafaf7" : "#0d0d0e",
    fontSize: "14px",
  }),
  menu: (base) => ({
    ...base,
    border: "1px solid #e6e3dc",
    borderRadius: "10px",
    overflow: "hidden",
    boxShadow: "0 12px 32px rgba(13,13,14,0.08)",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
  placeholder: (base) => ({ ...base, color: "#6f6f73", fontSize: "14px" }),
  singleValue: (base) => ({ ...base, color: "#0d0d0e", fontSize: "14px" }),
};
