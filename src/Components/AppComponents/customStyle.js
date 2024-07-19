const customStyles = {
  control: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused ? "inital" : "initial",
    color: state.isFocused ? "white" : "initial",
    "&:hover": {
      backgroundColor: state.isFocused ? "inital" : "initial",
      color: state.isFocused ? "white" : "initial",
    },
  }),
  menu: (provided) => ({
    ...provided,
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "red" : "initial",
    color: state.isSelected ? "white" : "initial",
    "&:hover": {
      backgroundColor: state.isFocused ? "lightgrey" : "initial",
      color: state.isSelected ? "white" : "initial",
    },
  }),
  singleValue: (provided) => ({
    ...provided,
    color: "initial",
  }),
};
export default customStyles;
