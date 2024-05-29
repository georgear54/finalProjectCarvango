import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Nav from "./nav";
import Main from "../../main/Main";

function NavCase({ flag }) {
  return (
    <>
      {flag && <Nav />}
      <div className="container">
        <Routes>
          {/* Route for when first opening the website (Login)*/}
          {/* Route for the Home page */}
          <Route path="/home" element={<Main/>} />
          {/* Route for the login page */}
        
        </Routes>
      </div>
    </>
  );
}

export default NavCase;
