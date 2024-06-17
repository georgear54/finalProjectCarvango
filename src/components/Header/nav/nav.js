import React from "react";
import { Link, useLocation } from "react-router-dom";
import classes from "./nav.module.css";
import logo from "../../../assets/imgs/test.bmp"; // Update the path to your logo image

function CustomLink({ to, children }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <li className={isActive ? classes.active : ""}>
      <Link to={to}>{children}</Link>
    </li>
  );
}

export default function Nav(props) {
  return (
    <div className={classes.nav}>
      <div className={classes.logo}>
        <Link to="/home">
          <img src={logo} alt="Carvango Logo" />
        </Link>
      </div>
      <nav className={classes.navContent}>
        <ul>
          <CustomLink to="/menu">Menu</CustomLink>
          <CustomLink to="/find-truck">Find Truck</CustomLink>
          <CustomLink to="/bookTruck">Book Truck</CustomLink>
          <CustomLink to="/catering">Catering</CustomLink>
          <CustomLink to="/shop">Shop</CustomLink>
        </ul>
        <div className={classes.buttonGroup}>
          <div className={classes.logIn}>
            <CustomLink to="/logIn">Log In</CustomLink>
          </div>
          <div className={classes.orderOnline}>
            <CustomLink to="/order-online">Order Online</CustomLink>
          </div>
        </div>
      </nav>
    </div>
  );
}
