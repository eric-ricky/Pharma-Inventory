import { TextField } from "@material-ui/core";
import React from "react";

const Input = (props) => {
  const { name, label, value, error = null, onChange, ...other } = props;

  return (
    <TextField
      variant="outlined"
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })}
      {...other}
    />
    // <TextField
    //   variant="outlined"
    //   label={label}
    //   name={name}
    //   value={value}
    //   onChange={onChange}
    //   {...(error && { error: true, helperText: error })}
    //   {...(multiline && { multiline: true, rows: 4 })}
    // />
  );
};

export default Input;
