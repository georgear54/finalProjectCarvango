import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Main from "./components/main/Main";
import Footer from "./components/footer/Footer";
import Header from "./components/Header/Header";
import Menu from "./components/menu/Menu";
// import FindTruck from "./components/findTruck/FindTruck";
import BookTruck from "./components/BookTruck/BookTruck.jsx";
import Catering from "./components/catering/Catering";
import LogIn from "./components/logIn/logIn.jsx";
import Cart from "./components/cart/Cart";
import MainDashboard from "./components/dashboard/mainDashboard/mainDashboard.jsx";
import SignUp from "./components/signUp/signUp.jsx";
import PrivateRoute from "./contexts/privateRoute.jsx";

function App() {
  let flag = true;
  if (
    window.location.pathname === "/signup" ||
    window.location.pathname === "/login" ||
    window.location.pathname === "/" ||
    window.location.pathname === ""
  ) {
    flag = true;
  }
  return (
    <div className="App">
      <Header flag={flag} />
      <div className="container">
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Main />} />
          <Route path="/menu" element={<Menu />} />
          {/* <Route path="/find-truck" element={<FindTruck />} /> */}
          <Route path="/bookTruck" element={<BookTruck />} />
          <Route path="/catering" element={<Catering />} />
          <Route path="/logIn" element={<LogIn />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signUp" element={<SignUp/>} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <MainDashboard />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
