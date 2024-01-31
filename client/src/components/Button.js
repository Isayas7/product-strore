import { Button } from "@mui/material";
import React from "react";

const CustomButton = ({ onClick, type, color, children }) => {
  return (
    <Button
      color={color}
      type={type}
      onClick={onClick}
      variant="contained"
      className="   "
    >
      {children}
    </Button>
  );
};

export default CustomButton;
