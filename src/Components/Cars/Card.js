import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus, faHeart } from "@fortawesome/free-solid-svg-icons";
import useAuth from "../../hooks/useAuth";
import axios from "../../api/axios";
import useGeneral from "../../hooks/useGeneral";
const Card = (props) => {
  const { ToastContainer, toast } = useGeneral();
  const { auth } = useAuth();
  const isFavorited = props.favorites?.some(
    ({ carId: pCarId }) => pCarId === props.carId
  );
  // Checking if car is in favs.
  const notify = () => {
    toast.info("Youu need to log in first.", {
      position: "bottom-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };

  const addToFav = async () => {
    if (auth) {
      try {
        const response = await axios.post(
          "/favorites/add",
          { userId: auth.userId, carId: props.carId },
          {
            withCredentials: true,
          }
        );
        props.setFavorites((prev) => {
          return [...prev, { carId: props.carId, userId: props.userId }];
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      notify();
    }
  };
  const removeFromFav = async () => {
    if (auth) {
      try {
        const response = await axios.post(
          "/favorites/delete",
          { userId: auth.userId, carId: props.carId },
          {
            withCredentials: true,
          }
        );
        props.setFavorites((prev) => {
          return prev.filter(({ carId }) => carId !== props.carId);
        });
      } catch (error) {
        console.log(error);
      }
    }
  };
  return (
    <div>
      <div className="car-card">
        <div className="card-header">
          <h3 className="card-title">
            {props.brandName} {props.carName}
          </h3>
        </div>
        <div className="card-img">
          <img src={props.imagePath} />
        </div>
        <div className="card-footer">
          <h3>Daily Price: {props.dailyPrice}$</h3>
          <br />
          <h4>Description: {props.description}</h4>
          <br />
          <h4>Model Year: {props.modelYear}</h4>

          <div className="card-buttons">
            <div className="card-fav">
              {!isFavorited && (
                <FontAwesomeIcon
                  onClick={addToFav}
                  className="not-fav"
                  icon={faHeartCirclePlus}
                />
              )}
              {isFavorited && (
                <FontAwesomeIcon
                  onClick={removeFromFav}
                  className="is-fav"
                  icon={faHeart}
                />
              )}
            </div>
            <div className="buttons">
              <Link to="/rent">
                <button className="rent-btn">Rent</button>
              </Link>
              <button className="detail-btn">See More</button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Card;
