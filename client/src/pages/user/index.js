import React, { useState } from "react";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Button } from "@mui/material";
import AlertDialog from "./Dialog";
import CreateUser from "./CreateUser";
import ShowUserTable from "./ShowUserTable";
import { useDispatch, useSelector } from "react-redux";
import { setOpenModal } from "../../redux/commanSlice";

export default function User() {
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);

  const [value, setValue] = useState("1");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="Store Manager" value="1" />
            <Tab
              label="Admin"
              value="2"
              sx={{ display: currentUser.role === "super" ? "flex" : "none" }}
            />
          </TabList>
        </Box>

        <TabPanel value="1">
          <CreateUser role="sm" />
          <ShowUserTable role="sm" />
          <AlertDialog />
        </TabPanel>
        <TabPanel value="2">
          <ShowUserTable role="admin" />
          <CreateUser role="admin" />
          <AlertDialog />
        </TabPanel>
      </TabContext>
    </Box>
  );
}
