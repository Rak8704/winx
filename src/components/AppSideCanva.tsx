"use client";
import React, { useState } from "react";
import Drawer from "@mui/material/Drawer";

import SideNav from "./SideNav";

interface AppSideCanvaProps {
  trigger: React.ReactNode;
}

const AppSideCanva = ({ trigger }: AppSideCanvaProps) => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  return (
    <>
      <button onClick={toggleDrawer(true)} className="md:hidden">{trigger}</button>
      <Drawer
        open={open}
        onClose={toggleDrawer(false)}
        className="z-[1001] h-screen"
      >
        <SideNav />
      </Drawer>
    </>
  );
};

export default AppSideCanva;
