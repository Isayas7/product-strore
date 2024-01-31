import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { getSell } from "../../apiCall/sell";
import { useDispatch, useSelector } from "react-redux";
import { Box } from "@mui/material";
function Sell() {
  const dispatch = useDispatch();
  useEffect(() => {
    getSell("", dispatch);
  }, []);

  const { sellData } = useSelector((state) => state.sell);
  const { currentUser } = useSelector((state) => state.auth);

  const columns = [
    { field: "image", headerName: "Image", width: 100 },
    { field: "categoryName", headerName: "Category", width: 100 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "productName", headerName: "Product Name", width: 110 },
    { field: "brandName", headerName: "Brand", width: 100 },
    { field: "color", headerName: "Color", width: 100 },
    { field: "price", headerName: "Price", width: 90 },
    { field: "amount", headerName: "Amount", width: 90 },
    { field: "condition", headerName: "Condition", width: 100 },
    { field: "seller", headerName: "Seller", width: 100 },
  ];

  const filterData = sellData.filter((product) => {
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

export default Sell;
