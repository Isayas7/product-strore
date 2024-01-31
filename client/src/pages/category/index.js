import React, { useContext } from "react";
import Table from "./Table";
import CreateCategory from "./CreateCategory";
import AlertDialog from "./Dialog";
import { Box } from "@mui/material";
import { categoryForm } from "../../FormSource";

function Category() {
  return (
    <Box>
      <Table />
      <CreateCategory inputs={categoryForm} />
      <AlertDialog />
    </Box>
  );
}

export default Category;
