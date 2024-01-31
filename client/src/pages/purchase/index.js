import { DataGrid } from "@mui/x-data-grid";
import { getPurchase } from "../../apiCall/purchase";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";

function Purchase() {
  const dispatch = useDispatch();
  useEffect(() => {
    getPurchase("", dispatch);
  }, []);
  const { purchaseData } = useSelector((state) => state.purchase);
  const { currentUser } = useSelector((state) => state.auth);

  const columns = [
    { field: "image", headerName: "Image", width: 130 },
    { field: "categoryName", headerName: "Category", width: 130 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "productName", headerName: "Product Name", width: 130 },
    { field: "brandName", headerName: "Brand", width: 100 },
    { field: "color", headerName: "Color", width: 130 },
    { field: "price", headerName: "Price", width: 90 },
    { field: "amount", headerName: "Amount", width: 90 },
    { field: "condition", headerName: "Condition", width: 100 },
    { field: "purchaser", headerName: "Purchaser", width: 130 },
  ];

  const filterData = purchaseData.filter((product) => {
    return product.storeId === currentUser.store;
  });
  const [search, setSearch] = useState("");
  const handleSearchchange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Box className=" flex gap-5 items-center   mt-3">
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

export default Purchase;
