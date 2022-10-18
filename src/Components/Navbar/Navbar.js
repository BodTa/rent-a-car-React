import React from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import useAuth from "../../hooks/useAuth";
import {
  faCartShopping,
  faHome,
  faHeart,
  faArrowRightToBracket,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGeneral from "../../hooks/useGeneral";
const Navbar = () => {
  const { auth } = useAuth();
  const { cars, setCars } = useGeneral();
  return (
    <div className="navbar">
      <div className="nav-route">
        <ul>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faCartShopping} /> My Cart
            </Link>
          </li>
          <li>
            <FontAwesomeIcon
              // onClick={setCars(car?.filter({}))}
              icon={faHeart}
            />
            Favorites
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
