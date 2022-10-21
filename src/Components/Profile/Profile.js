import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "../../api/axios";
import useGeneral from "../../hooks/useGeneral";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";
import "./Profile.css";
import UserCarCard from "./UserCarCard";
const Profile = () => {
  const { userId } = useParams();
  const [cars, setCars] = useState();
  const [userData, setUserData] = useState();
  const [x, setX] = useState(0);
  useEffect(() => {
    const handleUserInfos = async () => {
      const response = await axios.get(`/users/getbyid?id=${userId}`, {
        withCredentials: true,
      });
      setUserData(response.data.data);
    };
    handleUserInfos();
    return () => {};
  }, []);
  useEffect(() => {
    const handleCars = async () => {
      const response = await axios.get(`/cars/getcarsbysellerid?id=${userId}`, {
        withCredentials: true,
      });
      setCars(response.data.data);
    };
    handleCars();

    return () => {};
  }, []);

  const goLeft = () => {
    x === 0 ? setX(-100 * (cars?.length - 1)) : setX(x + 200);
  };
  const goRight = () => {
    x === -100 * (cars?.length - 1) ? setX(0) : setX(x - 200);
  };

  const carCard = cars?.map((car) => {
    return (
      <div
        className="user-carCards"
        key={car.carId}
        style={{ transform: `translateX(${x}%)` }}
      >
        <UserCarCard
          brandName={car.brandName}
          carName={car.carName}
          x={x}
          carId={car.carId}
          imagePath={"http://localhost:5149" + car.images[0].imagePath}
        />
      </div>
    );
  });

  return (
    <div className="profile-container">
      <div className="user-info-container"> User's infos</div>
      <div className="user-cars">
        {carCard}
        <button id="goLeft" onClick={goLeft}>
          <FontAwesomeIcon className="icons" icon={faChevronLeft} />
        </button>
        <button id="goRight" onClick={goRight}>
          <FontAwesomeIcon className="icons" icon={faChevronRight} />
        </button>
      </div>
    </div>
  );
};

export default Profile;
