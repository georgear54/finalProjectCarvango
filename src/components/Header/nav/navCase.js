import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./nav";
import Main from "../../main/Main";
import Menu from "../../menu/Menu";
import Booktruck from "../../BookTruck/BookTruck";

function NavCase({ flag }) {
  return (
    <div>
      {flag && <Nav />}
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/find-truck" element={<FindTruck />} />
          <Route path="/bookTruck" element={<Booktruck />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/order-online" element={<OrderOnline />} />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </div>
  );
}

export default NavCase;

// Placeholder components for other routes
const FindTruck = () => <div>Find Truck Page</div>;
// const BookTruck = () => <div>Book Truck Page</div>;
const Catering = () => <div>Catering Page</div>;
const Shop = () => <div>Shop Page</div>;
const OrderOnline = () => <div>Order Online Page</div>;
