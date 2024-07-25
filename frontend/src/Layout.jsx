import React from "react";
import Navbar from "./components/Navbar";
import 'react-toastify/dist/ReactToastify.css';

import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

function Layout() {
  return (
    <>
      <Navbar />
      <ToastContainer />

      <Outlet />
    </>
  );
}

export default Layout;
