export const customStyles = {
  headRow: {
    style: {
      backgroundColor: "black",
      color: "white",
      borderRadius: "4px",
      marginBottom: "6px",
    },
  },
  headCells: {
    style: {
      fontSize: "18px",
      fontFamily: "Anton, serif",
    },
  },
  rows: {
    style: {
      fontSize: "13px",
      fontWeight: 400,
      color: "black",
      backgroundColor: "#e5e7eb",
      borderRadius: "4px",
      marginBottom: "4px",

      minHeight: "48px",
      "&:not(:last-of-type)": {
        borderBottomStyle: "solid",
        borderBottomWidth: "0px",
        borderBottomColor: "white",
      },
    },
  },
  cells: {
    style: {
      fontSize: "15px",
      textTransform: "capitalize",
    },
  },
};

export const selectStyles = {
  control: (base, state) => ({
    ...base,
    minWidth: "250px",
    border: "0px solid gray",
    borderRadius: "4px",
    outline: state.isFocused ? "1px solid black" : "1px solid #99a1af",
  }),
  menuPortal: (base) => ({ ...base, zIndex: 9999 }),
};