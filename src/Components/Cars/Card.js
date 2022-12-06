import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Cars.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCirclePlus, faHeart } from "@fortawesome/free-solid-svg-icons";

import { useNavigate } from "react-router-dom";
import useGeneral from "../../hooks/useGeneral";
import { motion } from "framer-motion";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useAuth from "../../hooks/useAuth";
const Card = (props) => {
  const { notifyInfo } = useGeneral();
  const { auth } = useAuth();
  const axiosPrivate = useAxiosPrivate();
  const navigate = useNavigate();
  // Checking if car is in favs.

  // Navigating to car Infos.
  const handleClick = () => {
    navigate(`/carinfo/${props.carId}`);
  };
  // Adding to the Favs
  const addToFav = async () => {
    if (auth) {
      try {
        const response = await axiosPrivate.post("/favorites/add", {
          userId: auth.userId,
          carId: props.carId,
        });
        props.setFavorites((prev) => {
          return [...prev, { carId: props.carId, userId: props.userId }];
        });
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: "/" }, replace: true });
      }
    } else {
      notifyInfo();
    }
  };
  //Removing from Favs
  const removeFromFav = async () => {
    if (auth) {
      try {
        const response = await axiosPrivate.post("/favorites/delete", {
          userId: auth.userId,
          carId: props.carId,
        });
        props.setFavorites((prev) => {
          return prev.filter(({ carId }) => carId !== props.carId);
        });
      } catch (error) {
        console.log(error);
        navigate("/login", { state: { from: "/" }, replace: true });
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
          <img src={props.imagePath} loading="lazy" />
        </div>
        <div className="card-footer">
          <h3 className="car-price">{props.dailyPrice} $</h3>
          <h3 className="card-title">
            {props.brandName} {props.carModel}
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
    </motion.div>
  );
};

export default Card;
