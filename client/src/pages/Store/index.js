import React from "react";
import Table from "./Table";
import AlertDialog from "./Dialog";
import CreateStore from "./CreateStore";
import { Box } from "@mui/material";
function Store() {
  return (
    <Box>
      <Table />
      <CreateStore />
      <AlertDialog />
    </Box>
  );
}

export default Store;
