import { DataGrid } from "@mui/x-data-grid";
import { Box, Button, IconButton } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { Delete, Edit } from "@mui/icons-material";
import { getCategory } from "../../apiCall/category";
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
    getCategory("", dispatch);
  }, []);

  const dispatch = useDispatch();
  const { categoryData, loading, error } = useSelector(
    (state) => state.category
  );

  const handleUpdate = (id) => {
    dispatch(setRowToEdit(id));
    const edit = categoryData.find((category) => category._id === id);
    dispatch(setFormValues(edit));
    dispatch(setOpenModal());
  };
  const handleDelete = (id) => {
    dispatch(setRowToDelete(id));
    dispatch(setOpenDialog());
  };
  const [search, setSearch] = useState("");
  const handleSearchchange = (e) => {
    setSearch(e.target.value);
  };

  const columns = [
    { field: "image", headerName: "Image", width: 130 },
    { field: "categoryName", headerName: "Category name", width: 130 },
    { field: "typeName", headerName: "Type", width: 200 },

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
        </>
      ),
    },
  ];
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
        rows={categoryData}
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
