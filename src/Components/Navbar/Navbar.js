import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import {
  faCartShopping,
  faHome,
  faHeart,
  faCaretDown,
  faCaretRight,
  faArrowRightToBracket,
  faUser,
  faPlusCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import useGeneral from "../../hooks/useGeneral";
import useLogout from "../../services/auth/useLogout";
const Navbar = () => {
  const { auth, setCars, favorites, carsTemp, isDark, setIsDark } =
    useGeneral();
  const logout = useLogout();
  const [isActive, setIsActive] = useState(false);
  const handleClick = () => {
    if (favorites) {
      setCars((prev) => {
        return prev.filter((car) =>
          favorites?.some(({ carId }) => carId === car.carId)
        );
      });
    }
  };
  const handleTheme = () => {
    console.log(!isDark);
    localStorage.setItem("isDark", !isDark);
    setIsDark(!isDark);
  };
  const handleLogout = async () => {
    localStorage.removeItem("user");
    await logout();
  };
  return (
    <div className={isDark ? "navbar dark-theme" : "navbar light-theme"}>
      <div className="nav-route">
        <ul>
          <li onClick={() => setCars(carsTemp)}>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} /> Home
            </Link>
          </li>
          <li>
            <Link to="/">
              <FontAwesomeIcon icon={faCartShopping} /> My Cart
            </Link>
          </li>
          <li className="fav-icon" onClick={handleClick}>
            <FontAwesomeIcon icon={faHeart} />
            {favorites && auth && <span>{favorites?.length}</span>}
            Favorites
          </li>
          <li className="rent-icon">
            <Link to={`/car-add/${auth?.userId}`}>
              <FontAwesomeIcon icon={faPlusCircle} /> Rent Your Car
            </Link>
          </li>
        </ul>
      </div>
      <div className="nav-auth">
        {!auth?.accessToken && (
          <ul>
            <li>
              <label className="switch">
                <input type="checkbox" onChange={handleTheme} />
                <span
                  className={
                    isDark ? "slider dark-theme" : "slider light-theme"
                  }
                ></span>
              </label>
            </li>
            <li>
              <Link to="/login">Sign In</Link>
            </li>
            <li>
              <Link to="/register">Sign Up</Link>
            </li>
          </ul>
        )}
        {auth?.accessToken && (
          <ul>
            <li>
              <label className="switch">
                <input type="checkbox" onChange={handleTheme} />
                <span
                  className={
                    isDark ? "slider dark-theme" : "slider light-theme"
                  }
                ></span>
              </label>
            </li>
            <li>
              <h5>{auth?.email}</h5>
            </li>
            <li className="dropdown">
              {!isActive && (
                <div>
                  <FontAwesomeIcon
                    className="dropdown-icon"
                    onClick={() => setIsActive(true)}
                    icon={faCaretRight}
                  />
                </div>
              )}

              {isActive && (
                <div>
                  <FontAwesomeIcon
                    icon={faCaretDown}
                    onClick={() => setIsActive(false)}
                  />
                  <ul className="dropdown-container">
                    <li className="dropdown-logout" onClick={handleLogout}>
                      <FontAwesomeIcon icon={faArrowRightToBracket} />
                      Log Out
                    </li>
                    <li>
                      <Link to={`/profile/${auth.userId}`}>
                        <FontAwesomeIcon icon={faUser} />
                        My Profile
                      </Link>
                    </li>
                    <li>Settings</li>
                    <li>Contact</li>
                  </ul>
                </div>
              )}
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default Navbar;
