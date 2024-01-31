import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ShoppingCartOutlined,
  FavoriteBorderOutlined,
  MessageOutlined,
  NotificationsOutlined,
  SearchOutlined,
} from "@mui/icons-material";

function LandingNavbar() {
  const path = useLocation().pathname.split("/")[1];
  return (
    <nav className=" bg-primery w-full px-10 text-white z-10 flex gap-10 items-center py-5 flex-wrap ">
      <div className="flex-1 ">
        <Link to="/">
          <span className=" text-lg">OmniStock</span>
        </Link>
      </div>
      {path !== "login" && (
        <div className="flex-1 flex ">
          <input
            placeholder="serch product here..."
            className=" focus:outline-none w-full px-2  py-1 text-lg rounded-l-md text-gray-700"
          />
          <button className=" bg-buttonColor py-2 px-4  rounded-r-md">
            search
          </button>
        </div>
      )}

      <div className="flex-1 flex  justify-end gap-4 items-center">
        <Link>
          <span className=" rounded-xl p-1">Contact</span>
        </Link>
        <Link>
          <span className=" rounded-xl p-1">About us</span>
        </Link>

        {path !== "login" && (
          <Link to="/login">
            <button className=" py-1 px-3 rounded-md  border bg-buttonColor text-black ">
              Login
            </button>
          </Link>
        )}
      </div>
    </nav>
  );
}

export default LandingNavbar;
