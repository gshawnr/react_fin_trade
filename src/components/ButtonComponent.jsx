import React from "react";
import { Button } from "@mui/material";

function ButtonComponent({ onClickHandler, btnStyle, nameText }) {
  return (
    <div>
      <Button variant="contained" sx={btnStyle} onClick={onClickHandler}>
        {nameText}
      </Button>
    </div>
  );
}

export default ButtonComponent;
