import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import useAuth from "../../hooks/useAuth";
const Navbar = () => {
  const { auth } = useAuth();
  return (
    <div className="navbar">
      <div className="nav-route">
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/rent">Rent</Link>
          </li>
          <li>
            <Link to="/favorites">Favorites</Link>
          </li>
        </ul>
      </div>
      <div className="nav-auth">
        {!auth?.accessToken && (
          <ul>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        )}
        {auth?.accessToken && (
          <div>
            <h5>{auth.email}</h5>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
