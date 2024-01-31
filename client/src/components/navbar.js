import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import {
  Badge,
  Box,
  Button,
  Divider,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import NotificationsIcon from "@mui/icons-material/Notifications";
import MessageOutlinedIcon from "@mui/icons-material/MessageOutlined";

import { useContext, useState, useEffect, useRef } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { GridMenuIcon } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import CheckCircleOutlineTwoToneIcon from "@mui/icons-material/CheckCircleOutlineTwoTone";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import { logout } from "../redux/authSlice";
import { toggleSidebar } from "../redux/layoutSlice";
import { getStore } from "../apiCall/store";
const drawerWidth = 240;
const collapse = 50;

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    getStore("", dispatch);
  }, []);
  const { currentUser } = useSelector((state) => state.auth);
  const { isSidebarOpen } = useSelector((state) => state.layout);
  const { storeData } = useSelector((state) => state.store);
  const [openNotfy, setOpenNotfiy] = useState(false);
  const [notificationData, setNotificationData] = useState([]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const res = await axios.get("/notification");
  //       setNotificationData(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };
  //   fetchData();
  // }, [notificationData]);

  // const unReadNotification = notificationData.filter(
  //   currentUser.role === "sm"
  //     ? (notify) =>
  //         notify.read === false && notify.storeId === currentUser.store
  //     : (notify) => notify.read === false && notify.role === "admin"
  // );

  // const filterdNotification = notificationData.filter(
  //   currentUser.role === "sm"
  //     ? (notify) => notify.storeId === currentUser.store
  //     : (notify) => notify.role === "admin"
  // );

  const [anchorEl, setAnchorEl] = useState(null);
  const openLogout = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // const viewDetail = (notification) => {
  //   if (notification.read === false) {
  //     let { read, ...others } = notification;
  //     read = true;
  //     const notificationData = { read, ...others };
  //     updateNotification(notificationData);
  //     if (currentUser.role !== "sm") {
  //       RequestToUpdate(notification.link);
  //     }
  //   }
  //   localStorage.setItem("viewId", notification.link);
  //   navigate("/request");
  //   setOpenNotfiy(!openNotfy);
  // };
  const Logout = () => {
    dispatch(logout());
    navigate("/login");
    handleClose();
  };

  let menuRef = useRef();

  // useEffect(() => {
  //   let handler = (event) => {
  //     if (!menuRef.current.contains(event.target)) {
  //       setOpenNotfiy(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handler);
  //   return () => {
  //     document.removeEventListener("mousedown", handler);
  //   };
  // });
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#E9EDF4",
        width: isSidebarOpen
          ? `calc(100% - ${drawerWidth}px)`
          : `calc(100% - ${collapse}px)`,
        transition: "0.5s",
      }}
    >
      <Toolbar className=" flex justify-between ">
        <Box className="flex items-center">
          <IconButton
            disableRipple
            size="small"
            edge="start"
            aria-label="open drawer"
            onClick={() => dispatch(toggleSidebar())}
          >
            {isSidebarOpen ? (
              <GridMenuIcon
                className="w-12 h-9 mr-2"
                sx={{
                  color: "#A1A9E1",
                }}
              />
            ) : (
              <AiOutlineClose
                style={{
                  color: "#A1A9E1",
                }}
                className="w-12 h-5 "
              />
            )}
          </IconButton>
          <Box className=" uppercase text-black font-medium">
            {currentUser.role === "sm" &&
              storeData.map((_data) => {
                return currentUser.store === _data._id ? _data.storeName : "";
              })}
          </Box>
        </Box>
        <Box className="flex gap-6 items-center ">
          {/* <Box className="relative " ref={menuRef}>
            <Badge
              onClick={() => {
                setOpenNotfiy(!openNotfy);
              }}
              badgeContent={unReadNotification.length}
              color="warning"
            >
              <NotificationsIcon color="action" />
            </Badge>
            {openNotfy && (
              <Box className="absolute top-9  h-96  w-72 -left-56 bg-white shadow-md rounded-md border overflow-y-scroll">
                <Box className=" flex justify-between">
                  <Typography className=" p-3 text-black">
                    Notification
                  </Typography>
                  <IconButton>
                    <CheckCircleOutlineTwoToneIcon className="  text-green-400" />
                  </IconButton>
                </Box>

                <Divider />
                {filterdNotification.map((notification) => {
                  return (
                    <>
                      <Box
                        className={`notification ${
                          notification.read === false ? " bg-indigo-100" : ""
                        }    hover:bg-indigo-100 flex  items-center `}
                      >
                        <IconButton className="">
                          <MessageOutlinedIcon className="text-amber-500 rounded-xl  p-1 bg-lime-300  w-full h-full " />
                        </IconButton>

                        <Box
                          key={notification._id}
                          className=" p-3 cursor-pointer"
                          onClick={() => viewDetail(notification)}
                        >
                          <Typography className=" text-slate-950">
                            {notification.content}
                          </Typography>
                        </Box>
                      </Box>

                      <Divider />
                    </>
                  );
                })}
              </Box>
            )}
          </Box> */}

          <Button
            variant="contained"
            id="basic-button"
            aria-controls={openLogout ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={openLogout ? "true" : undefined}
            onClick={handleClick}
          >
            Logout
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={openLogout}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem onClick={handleClose}>Profile</MenuItem>
            <MenuItem onClick={Logout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
export default Navbar;
