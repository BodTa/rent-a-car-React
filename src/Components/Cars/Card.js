import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import axios from "../../api/axios";
import { useNavigate } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";
import { motion } from "framer-motion";
const Card = (props) => {
  const { auth, ToastContainer, toast } = useGeneral();
  const navigate = useNavigate();
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
  const handleClick = () => {
    navigate(`/carinfo/${props.carId}`);
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
    <motion.div layout>
      <div
        className={
          props?.isDark ? "car-card dark-theme" : "car-card light-theme"
        }
      >
        <div className="card-img">
          <img src={props.imagePath} />
        </div>
        <div className="card-footer">
          <h3 className="car-price">{props.dailyPrice} $</h3>
          <h3 className="card-title">
            {props.brandName} {props.carName}
          </h3>
          <div className="card-buttons">
            <div className="card-fav">
              {!props.isFavorited && (
                <FontAwesomeIcon
                  onClick={addToFav}
                  className="not-fav"
                  icon={faHeartCirclePlus}
                />
              )}
              {props.isFavorited && (
                <FontAwesomeIcon
                  onClick={removeFromFav}
                  className="is-fav"
                  icon={faHeart}
                />
              )}
            </div>
            <div className="buttons">
              <button onClick={handleClick} className="learn-more">
                <span className="circle" aria-hidden="true">
                  <span className="icon arrow"></span>
                </span>
                <span className="button-text">Learn More</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </motion.div>
  );
};

export default Card;
