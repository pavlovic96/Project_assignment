import React, { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import { DataContext } from "../../context/DataContextProvider";

const Header = () => {
  const { loginStatus, changeLoginStatus } = useContext(DataContext);

  const setFavorites = (isActive) => {
    let className = "nav-link";
    if (loginStatus) {
      className = isActive ? "nav-link activeLink" : "nav-link";
    } else {
      className = "favorites-disabled";
    }
    return className
  };

  console.log(loginStatus);
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <ul className="navbar-nav me-auto">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive ? "nav-link activeLink" : "nav-link"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/favorites"
            className={({isActive}) =>
              setFavorites(isActive)
            }
          >
            Favorites
          </NavLink>
        </ul>
        <button
          type="button"
          className={loginStatus ? "login-disabled" : "login"}
          onClick={changeLoginStatus}
        >
          Login
        </button>
      </nav>
    </div>
  );
};

export default Header;
