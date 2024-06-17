import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./nav";
import Main from "../../main/Main";
import Menu from "../../menu/Menu";
import Booktruck from "../../BookTruck/BookTruck";
import Catering from "../../catering/Catering";
import FindTruck from "../../findTruck/FindTruck";

function NavCase({ flag }) {
  return (
    <div>
      {flag && <Nav />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/find-truck" element={<FindTruck />} /> */}
          <Route path="/bookTruck" element={<Booktruck />} />
          <Route path="/catering" element={<Catering />} />

          {/* <Route path="/order-online" element={<OrderOnline />} /> */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default NavCase;
