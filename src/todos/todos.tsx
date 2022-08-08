import * as React from "react";
import Box from "@mui/material/Box";
import Input from "@mui/material/Input";

const ariaLabel = { "aria-label": "description" };

function Todos() {
  return (
    <Box>
      <Input placeholder="Placeholder" inputProps={ariaLabel} />
    </Box>
  );
}

export default Todos;
