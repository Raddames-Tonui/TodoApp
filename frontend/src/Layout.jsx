import React from "react";
import { Toaster } from "react-hot-toast"; 
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <Toaster
        position="top-right"  
        reverseOrder={true}
        toastOptions={{
          style: {
            zIndex: 100 
          }
        }}
      />
      <Outlet />
    </>
  );
}

export default Layout;
