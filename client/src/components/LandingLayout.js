import React from "react";
import Navbar from "./LandingNavbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function LandingLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default LandingLayout;
