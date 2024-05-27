import React from "react";
import { NavLink, Link } from "react-router-dom";
import classes from "./header.modules.css"; // Import CSS Modules

import logos from '../../assets/imgs/test.bmp'

function Header() {
  return (
    <header className={classes.header}>
      <div className={classes.container}>
        <div className={classes.header__wrap}>
          <div className={classes.logo}>
            <Link to="/">
              <img src={logos} alt="logo picture" />
              {/* <img src={logo} alt="logo" /> */}
              <span className={classes.slogan}>Test project</span>
            </Link>
          </div>
          <nav className={classes.nav}>
            <ul className={classes.menu}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.menuItem} ${classes.active}`
                      : classes.menuItem
                  }
                  end // Use `end` to indicate exact match for NavLink
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.menuItem} ${classes.active}`
                      : classes.menuItem
                  }
                >
                  About
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    isActive
                      ? `${classes.menuItem} ${classes.active}`
                      : classes.menuItem
                  }
                >
                  Contact
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
