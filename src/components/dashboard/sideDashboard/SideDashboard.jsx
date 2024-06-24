import React from "react";
import { NavLink } from "react-router-dom";
import styles from "./sideDashboard.module.css";

const SideDashboard = ({ isOpen }) => {
  return (
    <div className={`${styles.sidebar} ${isOpen ? styles.open : ""}`}>
      <div className={styles.logo}>
        <h2>Dashboard</h2>
      </div>
      <nav className={styles.nav}>
        <NavLink to="/" exact activeClassName={styles.active}>
          Home
        </NavLink>
        <NavLink to="/orders" activeClassName={styles.active}>
          Orders
        </NavLink>
        <NavLink to="/products" activeClassName={styles.active}>
          Products
        </NavLink>
        <NavLink to="/customers" activeClassName={styles.active}>
          Customers
        </NavLink>
        <NavLink to="/content" activeClassName={styles.active}>
          Content
        </NavLink>
        <NavLink to="/analytics" activeClassName={styles.active}>
          Analytics
        </NavLink>
        <NavLink to="/reports" activeClassName={styles.active}>
          Reports
        </NavLink>
        <NavLink to="/live-view" activeClassName={styles.active}>
          Live View
        </NavLink>
        <NavLink to="/blog-posts" activeClassName={styles.active}>
          Blog Posts
        </NavLink>
        <NavLink to="/collections" activeClassName={styles.active}>
          Collections
        </NavLink>
        <NavLink to="/gift-cards" activeClassName={styles.active}>
          Gift Cards
        </NavLink>
      </nav>
    </div>
  );
};

export default SideDashboard;
