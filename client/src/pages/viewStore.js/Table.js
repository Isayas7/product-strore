import { DataGrid } from "@mui/x-data-grid";
import { Box, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useLocation } from "react-router-dom";
import { getProduct } from "../../apiCall/product";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormValues,
  setOpenDialog,
  setOpenModal,
  setOpenViewModal,
  setRowToDelete,
  setRowToEdit,
  setViewId,
} from "../../redux/commanSlice";
import { getSell } from "../../apiCall/sell";
import { getPurchase } from "../../apiCall/purchase";

function Table({ view }) {
  const storeId = useLocation().pathname.split("/")[2];

  const dispatch = useDispatch();

  const handleView = (id) => {
    dispatch(setViewId(id));
    dispatch(setOpenViewModal());
  };

  useEffect(() => {
    getProduct("", dispatch);
    getSell("", dispatch);
    getPurchase("", dispatch);
  }, []);

  const [search, setSearch] = useState("");
  const handleSearchchange = (e) => {
    setSearch(e.target.value);
  };

  const { currentUser } = useSelector((state) => state.auth);
  const { productData } = useSelector((state) => state.product);
  const { sellData } = useSelector((state) => state.sell);
  const { purchaseData } = useSelector((state) => state.purchase);

  const handleUpdate = (id) => {
    dispatch(setRowToEdit(id));
    const edit = productData.find((product) => product._id === id);
    dispatch(setFormValues(edit));
    dispatch(setOpenModal());
  };
  const handleDelete = (id) => {
    dispatch(setRowToDelete(id));
    dispatch(setOpenDialog());
  };

  const columns = [
    { field: "image", headerName: "Image", width: 130 },
    { field: "categoryName", headerName: "Category", width: 130 },
    { field: "type", headerName: "Type", width: 130 },
    { field: "productName", headerName: "Product Name", width: 130 },
    { field: "brandName", headerName: "Brand", width: 130 },
    { field: "color", headerName: "Color", width: 130 },
    { field: "price", headerName: "Price", width: 90 },
    { field: "amount", headerName: "Amount", width: 90 },
    { field: "condition", headerName: "Condition", width: 100 },
    ...(view === "sell"
      ? [{ field: "seller", headerName: "Seller", width: 130 }]
      : []),
    ...(view === "purchase"
      ? [{ field: "purchaser", headerName: "Purchaser", width: 130 }]
      : []),
  ];

  const filterData =
    view === "product"
      ? productData.filter((product) => {
          if (currentUser.role === "sm") {
            return product.storeId === currentUser.store;
          } else {
            return product.storeId === storeId;
          }
        })
      : view === "sell"
      ? sellData.filter((product) => {
          if (currentUser.role === "sm") {
            return product.storeId === currentUser.store;
          } else {
            return product.storeId === storeId;
          }
        })
      : purchaseData.filter((product) => {
          if (currentUser.role === "sm") {
            return product.storeId === currentUser.store;
          } else {
            return product.storeId === storeId;
          }
        });

  return (
    <>
      <Box className="  mt-3">
        <input
          placeholder=" Search product..."
          className=" border-2 focus:outline-none focus:border-blue-400 rounded-lg p-2 text-gray-600 "
          value={search}
          onChange={handleSearchchange}
        ></input>
      </Box>
      <DataGrid
        sx={{ width: "fit-content" }}
        rows={filterData}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10]}
        getRowId={(row) => row._id}
      />
    </>
  );
}

export default Table;
