import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
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
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import carDelete from "../../services/cars/carDelete";
import logo from "./logo.png";
const Profile = () => {
  const { sellerId } = useParams();
  const { auth, isDark, toast, ToastContainer, notifyError, notifySuccess } =
    useGeneral();
  const axiosPrivate = useAxiosPrivate();
  const [cars, setCars] = useState();
  const [sellerData, setSellerData] = useState();
  const [isSeller, setIsSeller] = useState(false);
  const [isRated, setIsRated] = useState(false);
  const [x, setX] = useState(0);
  useEffect(() => {
    const handleUserInfos = async () => {
      const response = await axiosPrivate.get(
        `/users/detailsbyuserid?id=${sellerId}`
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
  }, [sellerId, isRated]);
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

  const handleDelete = async (id) => {
    const response = await carDelete(id, axiosPrivate);
    response
      ? notifySuccess("Your has been withdrawed from renting...")
      : notifyError("An Error Accured");
    setCars(cars?.filter((car) => car.carId != id));
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
          axiosPrivate={axiosPrivate}
          handleDelete={handleDelete}
          isSeller={isSeller}
          carId={car.carId}
          imagePath={"http://localhost:5149" + car.images[0]?.imagePath}
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
      <ToastContainer />
      <UserProfile
        notify={notifySuccess}
        firstName={sellerData?.firstName}
        lastName={sellerData?.lastName}
        email={sellerData?.email}
        telNumber={sellerData?.telNumber}
        sellerId={sellerId}
        userId={auth?.userId}
        Rates={sellerData?.rates}
        setIsRated={setIsRated}
        imagePath={
          sellerData?.userPicture == null
            ? logo
            : "http://localhost:5149" + sellerData?.userPicture?.imagePath
        }
      />
      <div className="user-cars">
        {carCard}
        {cars?.length > 4 && (
          <button id="goLeft" onClick={goLeft}>
            <FontAwesomeIcon className="icons" icon={faChevronLeft} />
          </button>
        )}
        {cars?.length > 4 && (
          <button id="goRight" onClick={goRight}>
            <FontAwesomeIcon className="icons" icon={faChevronRight} />
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
