import { DataGrid } from "@mui/x-data-grid";
import { Delete, Edit } from "@mui/icons-material";
import { Box, Button, IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { getUser } from "../../apiCall/user";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormValues,
  setOpenDialog,
  setOpenModal,
  setRowToDelete,
  setRowToEdit,
} from "../../redux/commanSlice";

function Table({ role }) {
  useEffect(() => {
    getUser("", dispatch);
  }, []);

  const dispatch = useDispatch();
  const { userData, loading, error } = useSelector((state) => state.user);

  const handleUpdate = (id) => {
    dispatch(setRowToEdit(id));
    const editUser = userData.find((user) => user._id === id);
    dispatch(setFormValues(editUser));
    dispatch(setOpenModal());
  };
  const handleDelete = (id) => {
    dispatch(setRowToDelete(id));
    dispatch(setOpenDialog());
  };
  const columns = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "gender", headerName: "Gender", width: 70 },
    { field: "email", headerName: "Email", width: 180 },
    { field: "phoneNumber", headerName: "Phone Number", width: 130 },
    { field: "address", headerName: "Address", width: 130 },
    ...(role === "sm"
      ? [
          {
            field: "storeName",
            headerName: "Store",
            width: 190,
            key: "storeNameColumn",
          },
        ]
      : []),
    {
      field: "",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <>
          <IconButton
            color="gray"
            aria-label="edit"
            onClick={() => handleUpdate(params.id)}
          >
            <Edit />
          </IconButton>
          <IconButton
            aria-label="delete"
            color="error"
            onClick={() => handleDelete(params.id)}
          >
            <Delete />
          </IconButton>
        </>
      ),
    },
  ];
  const filterData = userData.filter((user) => {
    return user.role === role;
  });
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
