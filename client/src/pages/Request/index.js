import { DataGrid } from "@mui/x-data-grid";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";

import { Box, Button } from "@mui/material";
import { RequestContext } from "../../context/RequestContext";
import styled from "@emotion/styled";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
function Request() {
  const { RequestToUpdate } = useContext(RequestContext);
  // const { data } = useFetch("/request");
  const { user } = useContext(AuthContext);
  const [data, setData] = useState([]);
  const [id, setId] = useState();
  const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    "& .stored-request-row": {
      backgroundColor: "#EDE7F6",
    },
  }));

  useEffect(() => {
    setId(localStorage.getItem("viewId"));
    const fetchData = async () => {
      try {
        const res = await axios.get("/request");
        setData(res.data);
      } catch (err) {}
    };
    fetchData();
  }, [id]);

  const columns = [
    { field: "image", headerName: "Image", width: 100 },
    ...(user.role === "super" || user.role === "admin"
      ? [{ field: "storeName", headerName: "Store", width: 130 }]
      : []),
    { field: "categoryName", headerName: "Category", width: 130 },
    { field: "type", headerName: "Type", width: 100 },
    { field: "productName", headerName: "Product Name", width: 130 },
    { field: "brandName", headerName: "Brand", width: 100 },

    { field: "price", headerName: "Price", width: 90 },
    { field: "amount", headerName: "Amount", width: 90 },

    { field: "status", headerName: "Status", width: 100 },

    ...(user.role === "super" || user.role === "admin"
      ? [{ field: "manager", headerName: "requester", width: 130 }]
      : []),
    {
      field: "",
      headerName: "Actions",
      width: 150,
      sortable: false,
      renderCell: (params) => (
        <Box className="flex">
          {user.role === "admin" || user.role === "super" ? (
            <Button
              aria-label="transfer"
              color="primary"
              // onClick={() => RequestToUpdate(params.id)}
            >
              transfer
            </Button>
          ) : (
            <Button
              aria-label="send Request"
              variant="contained"
              color="primary"
              onClick={() => RequestToUpdate(params.id)}
              className={
                params.row.status !== "warning" ? "pointer-events-none" : ""
              }
            >
              {params.row.status === "warning" ? " send" : "sent"}
            </Button>
          )}
        </Box>
      ),
    },
  ];
  const requestData = data.filter((request) => {
    if (user.role === "super" || user.role === "admin") {
      return request.status === "approved" || request.status === "panding";
    } else {
      return request.storeId === user.store;
    }
  });
  return (
    <StyledDataGrid
      sx={{ width: "fit-content" }}
      rows={requestData}
      columns={columns}
      initialState={{
        pagination: {
          paginationModel: { page: 0, pageSize: 5 },
        },
      }}
      pageSizeOptions={[5, 10]}
      getRowId={(row) => row._id}
      getRowClassName={(parms) =>
        id === parms.row._id ? "stored-request-row" : ""
      }
      onRowClick={() => setId(null)}
    />
  );
}

export default Request;
