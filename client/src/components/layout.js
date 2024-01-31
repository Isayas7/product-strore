import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { useSelector } from "react-redux";

function Layout() {
  const { isSidebarOpen } = useSelector((state) => state.layout);
  return (
    <Box>
      <Navbar />
      <Sidebar />;
      <Box
        sx={{
          marginTop: "83px",
          ml: isSidebarOpen ? 34 : 12,
          transition: "0.5s",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default Layout;
