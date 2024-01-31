import { Box, Button } from "@mui/material";
import Table from "./Table";
import AlertDialog from "./Dialog";
import CreateProduct from "./CreateProduct";
import { productform } from "../../FormSource";
import ViewProduct from "./ViewProduct";

export default function Product() {
  return (
    <>
      <Table />
      <AlertDialog />
      <CreateProduct inputs={productform} />
      <ViewProduct />
    </>
  );
}
