import { Box, Tab } from "@mui/material";
import TabContext from "@mui/lab/TabContext/TabContext";
import TabList from "@mui/lab/TabList/TabList";
import TabPanel from "@mui/lab/TabPanel/TabPanel";
import React, { useState } from "react";
import Table from "./Table";

function ViewStore() {
  const [value, setValue] = useState("1");

  const handleChange = (e, newValue) => {
    setValue(newValue);
  };
  return (
    <Box sx={{ width: "100%", typography: "body1" }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <TabList onChange={handleChange} aria-label="lab API tabs example">
            <Tab label="product" value="1" />
            <Tab label="sell" value="2" />
            <Tab label="purchase" value="3" />
          </TabList>
        </Box>
        <TabPanel value="1">
          <Table view="product" />
        </TabPanel>
        <TabPanel value="2">
          <Table view="sell" />
        </TabPanel>
        <TabPanel value="3">
          <Table view="purchase" />
        </TabPanel>
      </TabContext>
    </Box>
  );
}

export default ViewStore;
