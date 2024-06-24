import React, { useState } from "react";
import SideDashboard from "../sideDashboard/SideDashboard";
import Home from "../home/Home";
import classes from "./mainDashboard.module.css";

const MainDashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={classes.mainContainer}>
      <button className={classes.menuButton} onClick={toggleSidebar}>
        ☰
      </button>
      <SideDashboard isOpen={isSidebarOpen} />
      <div className={isSidebarOpen ? classes.contentShift : classes.content}>
        <Home />
      </div>
    </div>
  );
};

export default MainDashboard;
