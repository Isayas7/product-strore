import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Delete, Edit } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { getStore } from "../../apiCall/store";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormValues,
  setOpenDialog,
  setOpenModal,
  setRowToDelete,
  setRowToEdit,
} from "../../redux/commanSlice";
function Table() {
  useEffect(() => {
    getStore("", dispatch);
  }, []);

  const dispatch = useDispatch();
  const { storeData, loading, error } = useSelector((state) => state.store);

  const handleUpdate = (id) => {
    dispatch(setRowToEdit(id));
    const edit = storeData.find((store) => store._id === id);
    dispatch(setFormValues(edit));
    dispatch(setOpenModal());
  };
  const handleDelete = (id) => {
    dispatch(setRowToDelete(id));
    dispatch(setOpenDialog());
  };

  const columns = [
    { field: "storeName", headerName: "Store name", width: 130 },
    { field: "storeLocation", headerName: "Location", width: 130 },
    { field: "ProductAmount", headerName: "product", width: 100 },
    { field: "sellAmount", headerName: "Selled", width: 100 },
    { field: "purchaseAmount", headerName: "Purchased", width: 100 },

    { field: "storeManager", headerName: "Manager", width: 70 },

    {
      field: "",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            aria-label="edit"
            color="primary"
            onClick={() => handleUpdate(params.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="primary"
            onClick={() => handleDelete(params.id)}
          >
            <Delete />
          </IconButton>
          <Link to={`${params.id}`}>
            <IconButton aria-label="view" color="primary">
              <VisibilityIcon />
            </IconButton>
          </Link>
        </>
      ),
    },
  ];
  const [search, setSearch] = useState("");
  const handleSearchchange = (e) => {
    setSearch(e.target.value);
  };
  return (
    <>
      <Box className=" flex gap-5 items-center mt-1">
        <Button
          onClick={() => {
            dispatch(setOpenModal());
          }}
          color="primary"
          variant="contained"
          className=""
        >
          +New
        </Button>
        <input
          placeholder=" Search product..."
          className=" border-2 focus:outline-none focus:border-blue-400 rounded-lg p-2 text-gray-600 "
          value={search}
          onChange={handleSearchchange}
        ></input>
      </Box>
      <DataGrid
        sx={{ width: "fit-content" }}
        rows={storeData}
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
