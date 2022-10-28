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
import UserProfile from "./UserProfile";
import logo from "./logo.png";
const Profile = () => {
  const { sellerId } = useParams();
  const { auth, isDark } = useGeneral();
  const [cars, setCars] = useState();
  const [sellerData, setSellerData] = useState();
  const [isSeller, setIsSeller] = useState(false);
  const [x, setX] = useState(0);
  useEffect(() => {
    const handleUserInfos = async () => {
      const response = await axios.get(
        `/users/detailsbyuserid?id=${sellerId}`,
        {
          withCredentials: true,
        }
      );
      setSellerData(response.data);
    };
    handleUserInfos();
    return () => {
      setSellerData();
    };
  }, [sellerId]);
  useEffect(() => {
    const handleCars = async () => {
      const response = await axios.get(
        `/cars/getcarsbysellerid?id=${sellerId}`,
        {
          withCredentials: true,
        }
      );
      setCars(response.data.data);
    };
    handleCars();

    return () => {
      setCars();
    };
  }, [sellerId]);
  useEffect(() => {
    setIsSeller(cars?.some(({ sellerId }) => sellerId === auth?.userId));
    return () => {
      setIsSeller(false);
    };
  }, [cars]);
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
          dailyPrice={car.dailyPrice}
          x={x}
          isSeller={isSeller}
          carId={car.carId}
          imagePath={"http://localhost:5149" + car.images[0].imagePath}
        />
      </div>
    );
  });
  return (
    <div
      className={
        isDark
          ? "profile-container dark-theme"
          : "profile-container light-theme"
      }
    >
      <UserProfile
        firstName={sellerData?.firstName}
        lastName={sellerData?.lastName}
        email={sellerData?.email}
        telNumber={sellerData?.telNumber}
        imagePath={
          sellerData?.userPicture == null
            ? logo
            : "http://localhost:5149" + sellerData?.userPicture?.imagePath
        }
      />
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
