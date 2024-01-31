import React, { useState } from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import { Dashboard, Store } from "@mui/icons-material";
import { Link } from "react-router-dom";
import Divider from "@mui/material/Divider";
import { useContext } from "react";
import { BsFillCartCheckFill } from "react-icons/bs";
import MoveDownIcon from "@mui/icons-material/MoveDown";
import SellIcon from "@mui/icons-material/Sell";
import PeopleIcon from "@mui/icons-material/People";
import CategoryIcon from "@mui/icons-material/Category";
import Shop2Icon from "@mui/icons-material/Shop2";
import { useDispatch, useSelector } from "react-redux";
import { setDrawerHover } from "../redux/layoutSlice";
const extended = 260;
const collapse = 70;

function Sidebar() {
  const [isActive, setIsActive] = useState(0);
  const handleClick = (index) => {
    setIsActive(index);
  };
  const dispatch = useDispatch();

  const { currentUser } = useSelector((state) => state.auth);
  const { isSidebarOpen, isDrawerHover } = useSelector((state) => state.layout);

  const menuItems = getMenuItems();
  function getMenuItems() {
    if (currentUser.role === "admin" || currentUser.role === "super") {
      return [
        {
          text: "Dashboard",
          icon: <Dashboard color="primary" />,
          path: "dashboard",
        },
        {
          text: "User",
          icon: <PeopleIcon color="primary" />,
          path: "user",
        },
        {
          text: "Store",
          icon: <Store color="primary" />,
          path: "store",
        },
        {
          text: "Category",
          icon: <CategoryIcon color="primary" />,
          path: "category",
        },
        {
          text: "Transfer",
          icon: <MoveDownIcon color="primary" />,
          path: "transfer",
        },
      ];
    } else {
      return [
        {
          text: "Dashboard",
          icon: <Dashboard color="primary" />,
          path: "dashboard",
        },
        {
          text: "Product",
          icon: <Store color="primary" />,
          path: "Product",
        },
        {
          text: "Sell",
          icon: <SellIcon color="primary" />,
          path: "sell",
        },
        {
          text: "Purchase",
          icon: <Shop2Icon color="primary" />,
          path: "purchase",
        },
      ];
    }
  }
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      onMouseEnter={() => dispatch(setDrawerHover())}
      onMouseLeave={() => dispatch(setDrawerHover())}
      sx={{
        "& .MuiDrawer-paper": {
          width: isSidebarOpen || isDrawerHover ? extended : collapse,
          transition: "0.5s",
        },
      }}
    >
      <div
        className="flex items-center justify-center"
        style={{
          marginBottom: isSidebarOpen || isDrawerHover ? 5 : 19,
          marginTop: isSidebarOpen || isDrawerHover ? 18 : 13,
        }}
      >
        <BsFillCartCheckFill className="w-8 h-8 mr-1" />
        <Typography
          variant="h4"
          sx={{
            display: isSidebarOpen || isDrawerHover ? "block" : "none",
          }}
        >
          PStore
        </Typography>
      </div>
      <Divider />

      {/* list of admin page */}

      <List>
        {menuItems.map((item, index) => (
          <ListItemButton
            sx={{
              backgroundColor: isActive === index ? "rgb(229, 247, 235)" : "",
            }}
            onClick={() => handleClick(index)}
            key={item.text}
          >
            <Link
              to={item.path}
              className="flex w-full justify-center items-center "
            >
              <ListItemIcon className="ml-1">{item.icon}</ListItemIcon>
              <ListItemText
                primary={item.text}
                sx={{
                  "&:hover": {
                    color: "#4454C3",
                  },
                  display: isSidebarOpen || isDrawerHover ? "block" : "none",
                }}
              />
            </Link>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
}

export default Sidebar;
